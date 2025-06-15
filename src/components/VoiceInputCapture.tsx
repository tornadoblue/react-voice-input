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
  showWaveform = true,
  showInterimTranscript = true,
  customWaveformColor,
  placeholder = "Speak or type here...",
  disabled = false,
  silenceTimeout = DEFAULT_VIC_SILENCE_TIMEOUT,
  initialSpeechTimeout = DEFAULT_VIC_INITIAL_SPEECH_TIMEOUT,
  showVersionInfo = true, 
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

  const recordingStateRef = useRef(recordingState);
  useEffect(() => {
    recordingStateRef.current = recordingState;
  }, [recordingState]);

  const handleFinalTranscriptSegment = useCallback((segment: string) => {
    const newSegment = segment.trim();

    console.log("*** Segment: " + newSegment);

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
    if (recordingStateRef.current !== "error") { 
      setFinalTranscript(accumulatedFinalTranscriptRef.current);
      setIsEditing(false); 
    }
  }, []); 

  const handleInterimTranscript = useCallback((transcript: string) => {
    if (showInterimTranscript) {
      setInterimTranscript(transcript);
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
        // setFinalTranscript(""); // Consider if initialText should be restored if nothing was captured
      }
      console.log("VIC: handleRecordingStop, NOT calling onSave (no text/audio).");
    }
    setIsEditing(false); 
  }, [onSave]); 

  const handleError = useCallback((error: string) => { 

    // silence is golden
    if (error == 'silence') return;

    console.error("VIC: handleError triggered:", error);
    setRecordingState("error");
    setErrorDetails(error); 
    // setInterimTranscript("");
    setAudioDataForWaveform(null);
    toast.error(error || "An unknown recording error occurred.", { duration: 5000 });
    // accumulatedFinalTranscriptRef.current = "";
    setIsEditing(false);
  }, []); 

  const handleAudioData = useCallback((dataArray: Uint8Array) => { 
    // console.log("VIC: handleAudioData received. Data length:", dataArray?.length); // Can be very noisy
    if (showWaveform) {
      setAudioDataForWaveform(new Uint8Array(dataArray));
    }
  }, [showWaveform]);

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
  
  useEffect(() => { 
    if (!isRecordingOrListening && !isEditing) {
      // console.log("VIC: initialText effect. Current finalTranscript:", finalTranscript, "New initialText:", initialText);
      if (finalTranscript !== initialText) { // Only update if different to avoid potential loops
         setFinalTranscript(initialText);
      }
    }
  }, [initialText, finalTranscript, isEditing, recordingState]); // Added finalTranscript, isEditing, recordingState to deps for correctness

  const isRecordingOrListening = recordingState === "recording" || recordingState === "listening";

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
      console.log("VIC: toggleRecording - starting recording.");
      setErrorDetails(null);
      setRecordingState("listening"); 
      // Reset accumulated transcript for the new session.
      // finalTranscript is preserved for the EditableTextDisplay until speech starts updating it.
      accumulatedFinalTranscriptRef.current = ""; 
      try {
        await speechRecorderRef.current.startRecording();
        console.log("VIC: toggleRecording - startRecording promise resolved.");
      } catch (e) {
        console.error("VIC: toggleRecording - error calling startRecording:", e);
        handleError((e as Error).message || "Failed to start recording.");
        setRecordingState("idle"); 
      }
    }
  };

  const handleTextChangeFromEditor = (newText: string) => {
    // console.log("VIC: handleTextChangeFromEditor. New text:", newText, "Current isEditing:", isEditing);
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

  const getButtonIcon = () => { /* ... (no changes) ... */ 
    if (recordingState === "error") return <RotateCcw className="w-4 h-4" />;
    if (isRecordingOrListening) return <StopCircle className="w-4 h-4" />;
    return <Mic className="w-4 h-4" />;
  };

  const getButtonText = () => { /* ... (no changes) ... */ 
    if (recordingState === "error") return "Retry";
    if (recordingState === "listening") return "Listening...";
    if (recordingState === "recording") return "Stop Recording";
    return "Record";
  };

  const componentVersion = packageJson.version;

  return ( 
    <div className={cn("relative p-3 sm:p-4 border rounded-lg shadow-sm bg-card w-full max-w-2xl mx-auto space-y-3", { "opacity-75 cursor-not-allowed": disabled })}>
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
            isEditing={isEditing} 
            onEditing={() => { 
              // console.log("VIC: EditableTextDisplay onEditing triggered"); 
              setIsEditing(true); 
            }}
          />
        </div>
      </div>

       <div className="flex flex-row items-center justify-between">
          <Button 
          onClick={recordingState === 'error' ? handleRetryError : toggleRecording} 
          disabled={disabled && recordingState !== 'error'}
          className={cn("flex-shrink-0 w-full sm:w-auto", recordingState === 'error' ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "")}
          aria-label={getButtonText()}
        >
          {getButtonIcon()}
          <span className="ml-2">{getButtonText()}</span>
        </Button>

        {isEditing && ( 
         <Button onClick={handleManualSave} className="flex-shrink-0 w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            Save Text
        </Button>)}
        </div>
      
      {recordingState === "error" && errorDetails && (
        <div className="flex items-center p-2 text-sm text-destructive-foreground bg-destructive rounded-md">
          <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" /> <span>Error: {errorDetails}</span>
        </div>
      )}
      {showInterimTranscript && isRecordingOrListening && interimTranscript && (
        <div className="p-2 text-sm text-muted-foreground bg-muted/30 rounded-md min-h-[2.5rem] italic">
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
  );
};