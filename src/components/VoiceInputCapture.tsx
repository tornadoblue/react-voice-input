import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, AlertTriangle, RotateCcw, Info, Save } from 'lucide-react';
import EditableTextDisplay from './EditableTextDisplay';
import WaveformDisplay from './WaveformDisplay';
import EnhancedSpeechRecorder from '@/services/EnhancedSpeechRecorder';
import { VoiceInputCaptureProps, RecordingState } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { decodeAudioBlob, findLastSoundEndTime, trimAudioBuffer, audioBufferToWavBlob } from '@/utils/audioUtils';
import packageJson from '../../package.json'; 

const STOP_COMMAND = "stop recording";
const MIN_TRAILING_SILENCE_FOR_TRIM_S = 0.75;
const DEFAULT_VIC_SILENCE_TIMEOUT = 3000;
const DEFAULT_VIC_INITIAL_SPEECH_TIMEOUT = 5000;

const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const VoiceInputCapture: React.FC<VoiceInputCaptureProps> = ({
  onSave,
  initialText = "",
  autoStartRecording = false,
  showWaveform = true,
  showInterimTranscript = true,
  customWaveformColor,
  placeholder = "Press Record button to start the dictation, or type here...",
  disabled = false,
  silenceTimeout = DEFAULT_VIC_SILENCE_TIMEOUT,
  initialSpeechTimeout = DEFAULT_VIC_INITIAL_SPEECH_TIMEOUT,
  showVersionInfo = true, 
  textDisplayClassName,
  interimTranscriptClassName, 
  recordButtonClassName, 
  className = "w-full max-w-2xl"
}) => {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [finalTranscript, setFinalTranscript] = useState<string>(initialText);
  const [audioDataForWaveform, setAudioDataForWaveform] = useState<Uint8Array | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [currentAudioBlob, setCurrentAudioBlob] = useState<Blob | null>(null);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const speechRecorderRef = useRef<EnhancedSpeechRecorder | null>(null);
  const accumulatedFinalTranscriptRef = useRef<string>("");
  const hasAutoStartedRef = useRef<boolean>(false);

  const recordingStateRef = useRef(recordingState);
  useEffect(() => {
    recordingStateRef.current = recordingState;
  }, [recordingState]);

  const isRecordingOrListening = recordingState === "recording" || recordingState === "listening";

  const handleFinalTranscriptSegment = useCallback((segment: string) => {
    const newSegment = segment.trim();
    if (!newSegment) return;
    let currentText = accumulatedFinalTranscriptRef.current;
    if (!currentText) {
      accumulatedFinalTranscriptRef.current = capitalizeFirstLetter(newSegment);
    } else {
      const lastChar = currentText.slice(-1);
      const endsWithPunctuation = ['.', '!', '?'].includes(lastChar);
      const endsWithSpace = currentText.endsWith(" ");
      if (!endsWithPunctuation && !endsWithSpace) currentText += ". "; 
      else if (endsWithPunctuation && !endsWithSpace) currentText += " "; 
      accumulatedFinalTranscriptRef.current = currentText + capitalizeFirstLetter(newSegment);
    }
    accumulatedFinalTranscriptRef.current = accumulatedFinalTranscriptRef.current.trim();
    if (recordingStateRef.current === "recording") { 
      setFinalTranscript(accumulatedFinalTranscriptRef.current);
      setIsEditing(false); 
    }
  }, []); 

  const handleInterimTranscript = useCallback((transcript: string) => {
    if (showInterimTranscript) {
      setInterimTranscript(capitalizeFirstLetter(transcript.trim()));
    }
  }, [showInterimTranscript]);

  const handleRecordingStart = useCallback(() => {
    console.log("VIC: handleRecordingStart triggered");
    setRecordingState("recording");
    setErrorDetails(null);
    setInterimTranscript("");
    accumulatedFinalTranscriptRef.current = "";
    setCurrentAudioBlob(null);
    setCurrentAudioUrl(prevUrl => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return null;
    });
    setIsEditing(false); 
  }, []); 

  const handleRecordingStop = useCallback(async (audioBlob: Blob | null, audioUrl: string | null) => {
    console.log("VIC: handleRecordingStop triggered. Audio Blob exists:", !!audioBlob, "Audio URL:", audioUrl);
    let textFromSpeechSession = accumulatedFinalTranscriptRef.current.trim();
    
    if (textFromSpeechSession && !['.', '!', '?'].includes(textFromSpeechSession.slice(-1))) {
        textFromSpeechSession += ".";
    }
    
    setRecordingState("idle");
    setInterimTranscript(""); 
    let commandDetected = false;
    let processedAudioBlob = audioBlob;
    let processedAudioUrl = audioUrl;

    if (textFromSpeechSession.toLowerCase().endsWith(STOP_COMMAND + ".") && audioBlob) { 
      const commandTextWithPunc = STOP_COMMAND + ".";
      const commandIndex = textFromSpeechSession.toLowerCase().lastIndexOf(commandTextWithPunc);
      if (commandIndex === 0 || (commandIndex > 0 && textFromSpeechSession[commandIndex - 1] === ' ')) {
        textFromSpeechSession = textFromSpeechSession.substring(0, commandIndex).trim();
        commandDetected = true;
        const decodedInfo = await decodeAudioBlob(audioBlob);
        if (decodedInfo) {
          const soundEndTime = findLastSoundEndTime(decodedInfo.audioBuffer, MIN_TRAILING_SILENCE_FOR_TRIM_S); 
          if (soundEndTime < decodedInfo.duration - (MIN_TRAILING_SILENCE_FOR_TRIM_S / 2)) {
            const trimmedBuffer = trimAudioBuffer(decodedInfo.audioBuffer, soundEndTime);
            if (trimmedBuffer && trimmedBuffer !== decodedInfo.audioBuffer) {
              const trimmedWavBlob = audioBufferToWavBlob(trimmedBuffer);
              if (processedAudioUrl) URL.revokeObjectURL(processedAudioUrl); 
              processedAudioBlob = trimmedWavBlob;
              processedAudioUrl = URL.createObjectURL(trimmedWavBlob);
            }
          }
        }
      }
    }
    
    setFinalTranscript(textFromSpeechSession); 
    setCurrentAudioBlob(processedAudioBlob);
    setCurrentAudioUrl(processedAudioUrl);

    if (textFromSpeechSession || processedAudioBlob) { 
      console.log("VIC: handleRecordingStop, calling onSave with:", { text: textFromSpeechSession, blob: !!processedAudioBlob, url: processedAudioUrl });
      onSave(textFromSpeechSession, processedAudioBlob, processedAudioUrl);
    } else {
      if (!commandDetected) {
        // setFinalTranscript(""); 
      }
      console.log("VIC: handleRecordingStop, NOT calling onSave (no text/audio).");
    }
    setIsEditing(false); 
  }, [onSave]); 

  const handleError = useCallback((error: string) => { 
    console.error("VIC: handleError triggered:", error);
    setRecordingState("error");
    setErrorDetails(error); 
    setInterimTranscript("");
    setAudioDataForWaveform(null);
    toast.error(error || "An unknown recording error occurred.", { duration: 5000 });
    accumulatedFinalTranscriptRef.current = "";
    setIsEditing(false);
  }, []); 

  const handleAudioData = useCallback((dataArray: Uint8Array) => { 
    if (showWaveform) {
      setAudioDataForWaveform(new Uint8Array(dataArray));
    }
  }, [showWaveform]);

  const startRecording = useCallback(async () => {
    console.log("VIC: startRecording called. Current state:", recordingStateRef.current, "Disabled:", disabled);
    if (disabled) return;
    if (!speechRecorderRef.current) {
      toast.error("Recorder not ready. Please try again.");
      console.error("VIC: startRecording - speechRecorderRef is null!");
      return;
    }

    if (recordingStateRef.current !== "idle") return;

    console.log("VIC: startRecording - starting recording.");
    setErrorDetails(null);
    setRecordingState("listening"); 
    accumulatedFinalTranscriptRef.current = ""; 
    try {
      await speechRecorderRef.current.startRecording();
      console.log("VIC: startRecording - startRecording promise resolved.");
    } catch (e) {
      console.error("VIC: startRecording - error calling startRecording:", e);
      handleError((e as Error).message || "Failed to start recording.");
      setRecordingState("idle"); 
    }
  }, [disabled, handleError]);

  useEffect(() => { 
    console.log("VIC: Initializing EnhancedSpeechRecorder with timeouts:", {silenceTimeout, initialSpeechTimeout});
    const recorder = new EnhancedSpeechRecorder({
      onFinalTranscript: handleFinalTranscriptSegment,
      onInterimTranscript: handleInterimTranscript,
      onRecordingStart: handleRecordingStart,
      onRecordingStop: handleRecordingStop,
      onError: handleError,
      onAudioData: handleAudioData,
      silenceTimeout: silenceTimeout, 
      initialSpeechTimeout: initialSpeechTimeout, 
    });
    speechRecorderRef.current = recorder;
    return () => {
      console.log("VIC: Disposing EnhancedSpeechRecorder.");
      recorder.dispose(); 
      speechRecorderRef.current = null; 
    };
  }, [handleFinalTranscriptSegment, handleInterimTranscript, handleRecordingStart, handleRecordingStop, handleError, handleAudioData, silenceTimeout, initialSpeechTimeout]);
  
  // Auto-start recording effect
  useEffect(() => {
    if (autoStartRecording && !disabled && !hasAutoStartedRef.current && speechRecorderRef.current) {
      console.log("VIC: Auto-starting recording due to autoStartRecording prop");
      hasAutoStartedRef.current = true;
      // Small delay to ensure the recorder is fully initialized
      
      const timer = setTimeout(startRecording, 100);
      return () => clearTimeout(timer);
    }
  }, [autoStartRecording, disabled, startRecording]);

  useEffect(() => { 
    if (!isRecordingOrListening && !isEditing) {
      if (finalTranscript !== initialText) { 
         setFinalTranscript(initialText);
      }
    }
  }, [initialText, finalTranscript, isEditing, isRecordingOrListening]); 

  useEffect(() => { 
    const urlToRevoke = currentAudioUrl;
    return () => {
      if (urlToRevoke) {
        URL.revokeObjectURL(urlToRevoke);
      }
    };
  }, [currentAudioUrl]);

  const toggleRecording = async () => { 
    console.log("VIC: toggleRecording called. Current state:", recordingStateRef.current, "Disabled:", disabled);
    if (disabled) return;
    if (!speechRecorderRef.current) {
      toast.error("Recorder not ready. Please try again.");
      console.error("VIC: toggleRecording - speechRecorderRef is null!");
      return;
    }

    if (isRecordingOrListening) {
      console.log("VIC: toggleRecording - stopping recording.");
      speechRecorderRef.current.stopRecording('manual');
    } else {
      await startRecording();
    }
  };

  const handleTextChangeFromEditor = (newText: string) => {
    setFinalTranscript(newText); 
    if (!isEditing) {
      setIsEditing(true); 
    }
  };

  const handleManualSave = () => { 
    console.log("VIC: handleManualSave, calling onSave with:", { text: finalTranscript, blob: !!currentAudioBlob, url: currentAudioUrl });
    onSave(finalTranscript, currentAudioBlob, currentAudioUrl); 
     toast.success("Text saved manually!");
    setIsEditing(false); 
  };

  const handleRetryError = () => { 
    console.log("VIC: handleRetryError called.");
    setErrorDetails(null);
    setRecordingState("idle");
    setIsEditing(false);
  };

    const getButtonIcon = () => { 
    if (recordingState === "error") return <RotateCcw className="w-4 h-4" />;
    if (isRecordingOrListening) return <StopCircle className="w-4 h-4" />;
    return <Mic className="w-4 h-4" />;
  };

  const getButtonText = () => { 
    if (recordingState === "error") return "Retry";
    if (recordingState === "listening") return "Listening...";
    if (recordingState === "recording") return "Stop Recording";
    return "Record";
  };

  const componentVersion = packageJson.version;

  return ( 
    <div className={className}>
      <div className={cn("relative p-3 sm:p-4 border rounded-lg shadow-sm bg-card mx-auto space-y-3", { "opacity-75 cursor-not-allowed": disabled })}>
        {showVersionInfo && componentVersion && (
          <div className="absolute top-2 right-2 flex items-center space-x-1 text-xs text-muted-foreground">
            <Info className="w-3 h-3" />
            <span>v{componentVersion}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
          <div className="flex-grow w-full">
            <EditableTextDisplay
              initialText={finalTranscript} 
              onTextChange={handleTextChangeFromEditor} 
              placeholder={placeholder}
              className="w-full"
              textDisplayClassName={textDisplayClassName}
              isEditing={isEditing} 
              onEditing={() => { 
                setIsEditing(true); 
              }}
            />
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <Button 
            onClick={recordingState === 'error' ? handleRetryError : toggleRecording} 
            disabled={disabled && recordingState !== 'error'}
            className={cn(
              "flex-shrink-0 w-full sm:w-auto",
              recordButtonClassName, 
              recordingState === 'error' ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""
            )}
            aria-label={getButtonText()}
          >
            {getButtonIcon()}
            <span className="ml-2">{getButtonText()}</span>
          </Button>

          {isEditing && ( 
            <Button onClick={handleManualSave} className="flex-shrink-0 w-full sm:w-auto">
              <Save className="w-4 h-4 mr-2" />
              Save Text
            </Button>
          )}
        </div>
      
        {recordingState === "error" && errorDetails && (
          <div className="flex items-center p-2 text-sm text-destructive-foreground bg-destructive rounded-md">
            <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" /> 
            <span>Error: {errorDetails}</span>
          </div>
        )}
        
        {showInterimTranscript && isRecordingOrListening && interimTranscript && (
          <div className={cn(
            "p-2 text-sm text-muted-foreground bg-muted/30 rounded-md min-h-[2.5rem] italic",
            interimTranscriptClassName
          )}>
            Live: {interimTranscript}
          </div>
        )}
        
        {showWaveform && isRecordingOrListening && (
          <WaveformDisplay audioData={audioDataForWaveform} color={customWaveformColor} className="w-full h-16" />
        )}
        
        {showWaveform && recordingState === "idle" && !errorDetails && ( 
          <WaveformDisplay audioData={null} color={customWaveformColor} className="w-full h-16" />
        )}
      </div>
    </div>
  );
};
