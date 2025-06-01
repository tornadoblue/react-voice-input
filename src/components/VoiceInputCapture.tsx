import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, AlertTriangle, RotateCcw } from 'lucide-react';
import EditableTextDisplay from './EditableTextDisplay';
import WaveformDisplay from './WaveformDisplay';
import EnhancedSpeechRecorder from '@/services/EnhancedSpeechRecorder';
import { VoiceInputCaptureProps, RecordingState } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { decodeAudioBlob, findLastSoundEndTime, trimAudioBuffer, audioBufferToWavBlob } from '@/utils/audioUtils';

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
}) => {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [finalTranscript, setFinalTranscript] = useState<string>(initialText);
  const [audioDataForWaveform, setAudioDataForWaveform] = useState<Uint8Array | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [currentAudioBlob, setCurrentAudioBlob] = useState<Blob | null>(null);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  
  const speechRecorderRef = useRef<EnhancedSpeechRecorder | null>(null);
  const accumulatedFinalTranscriptRef = useRef<string>("");

  // This ref helps callbacks use the latest recordingState without causing re-runs of useEffect for recorder setup
  const recordingStateRef = useRef(recordingState);
  useEffect(() => {
    recordingStateRef.current = recordingState;
  }, [recordingState]);

  // Callbacks for EnhancedSpeechRecorder
  // Ensure dependency arrays for useCallback are correct and minimal.
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
    if (recordingStateRef.current === "recording") { // Use ref here
      setFinalTranscript(accumulatedFinalTranscriptRef.current);
    }
  }, []); // No dependencies needed if it only uses refs and capitalizeFirstLetter

  const handleInterimTranscript = useCallback((transcript: string) => {
    if (showInterimTranscript) setInterimTranscript(transcript);
  }, [showInterimTranscript]);

  const handleRecordingStart = useCallback(() => {
    console.log("VIC: handleRecordingStart called by ESR");
    setRecordingState("recording");
    setErrorDetails(null);
    setInterimTranscript("");
    accumulatedFinalTranscriptRef.current = ""; 
    setFinalTranscript(""); 
    setCurrentAudioBlob(null);
    setCurrentAudioUrl(prevUrl => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return null;
    });
  }, []); 

  const handleRecordingStop = useCallback(async (audioBlob: Blob | null, audioUrl: string | null) => {
    console.log("VIC: handleRecordingStop called by ESR");
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
      onSave(textFromSpeechSession, processedAudioBlob, processedAudioUrl);
    } else {
      if (!commandDetected) setFinalTranscript(""); 
    }
  }, [onSave]); // onSave is a dependency

  const handleError = useCallback((error: string) => { 
    console.error(`VIC: handleError called by ESR. Error: ${error}`);
    setRecordingState("error");
    setErrorDetails(error); 
    setInterimTranscript("");
    setAudioDataForWaveform(null);
    toast.error(error || "An unknown recording error occurred.", { duration: 5000 });
    accumulatedFinalTranscriptRef.current = "";
  }, []); // No dependencies if toast is stable

  const handleAudioData = useCallback((dataArray: Uint8Array) => { 
    if (showWaveform) {
      setAudioDataForWaveform(new Uint8Array(dataArray));
    }
  }, [showWaveform]);

  // useEffect for managing EnhancedSpeechRecorder instance
  useEffect(() => { 
    console.log("VIC: Main useEffect for ESR setup. Silence:", silenceTimeout, "Initial:", initialSpeechTimeout);
    
    // Create the recorder instance
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

    // Cleanup function: This is crucial
    return () => {
      console.log("VIC: Main useEffect cleanup - Disposing recorder.");
      recorder.dispose(); 
      speechRecorderRef.current = null; 
    };
  }, [
    handleFinalTranscriptSegment, 
    handleInterimTranscript, 
    handleRecordingStart, 
    handleRecordingStop, 
    handleError, 
    handleAudioData, 
    silenceTimeout, 
    initialSpeechTimeout
  ]); // Dependencies that, if changed, require a new recorder instance
  
  // Effect to update finalTranscript if initialText prop changes (and not recording)
  useEffect(() => { 
    if (recordingStateRef.current !== 'recording' && recordingStateRef.current !== 'listening') {
      if (initialText !== finalTranscript) {
        setFinalTranscript(initialText);
      }
    }
  }, [initialText, finalTranscript]); // finalTranscript is needed here to avoid stale closure issues if we only compare initialText

  // Effect for revoking object URLs
  useEffect(() => { 
    const urlToRevoke = currentAudioUrl;
    return () => {
      if (urlToRevoke) {
        console.log("VIC: Revoking object URL:", urlToRevoke);
        URL.revokeObjectURL(urlToRevoke);
      }
    };
  }, [currentAudioUrl]);

  const toggleRecording = async () => { 
    console.log(`VIC: toggleRecording. Current state: ${recordingStateRef.current}`);
    if (disabled) {
      console.log("VIC: toggleRecording - disabled, returning.");
      return;
    }

    if (!speechRecorderRef.current) {
      console.error("VIC: toggleRecording - speechRecorderRef.current is null. This should not happen if useEffect ran.");
      // Attempt to re-initialize, though this indicates a deeper issue if useEffect didn't set it up.
      // This path should ideally not be hit.
      // For safety, we could re-run the setup logic here, but it's better to ensure useEffect works.
      toast.error("Recorder not ready. Please try again.");
      return;
    }

    if (recordingStateRef.current === "recording" || recordingStateRef.current === "listening") {
      console.log("VIC: toggleRecording - stopping.");
      speechRecorderRef.current.stopRecording('manual');
    } else {
      console.log("VIC: toggleRecording - starting.");
      setErrorDetails(null);
      setRecordingState("listening"); // Optimistically set to listening
      try {
        await speechRecorderRef.current.startRecording();
        // onRecordingStart callback from ESR will set state to "recording"
      } catch (e) {
        // This catch might not be effective if startRecording itself doesn't throw but calls onError
        console.error("VIC: Error caught directly from startRecording call:", e);
        handleError((e as Error).message || "Failed to start recording.");
        setRecordingState("idle"); // Revert if startRecording promise rejects
      }
    }
  };

  const handleTextDisplaySave = (newText: string) => { 
    setFinalTranscript(newText); 
    onSave(newText, currentAudioBlob, currentAudioUrl); 
    toast.success("Text saved manually!");
  };

  const handleRetryError = () => { 
    console.log("VIC: handleRetryError called.");
    setErrorDetails(null);
    setRecordingState("idle");
    // The main useEffect will re-run if its dependencies changed, or if this component remounts.
    // If speechRecorderRef.current became null due to an unrecoverable error,
    // the next toggleRecording might fail if the ref isn't re-populated by useEffect.
    // Forcing a re-init of the recorder might be an option here if errors persist.
    // For now, just resetting state. The main useEffect should handle re-creation if necessary
    // upon dependency changes, or if the component key changes causing a full remount.
  };

  const isRecordingOrListening = recordingState === "recording" || recordingState === "listening";

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

  return ( 
    <div className={cn("p-3 sm:p-4 border rounded-lg shadow-sm bg-card w-full max-w-2xl mx-auto space-y-3", { "opacity-75 cursor-not-allowed": disabled })}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <Button 
          onClick={recordingState === 'error' ? handleRetryError : toggleRecording} 
          disabled={disabled && recordingState !== 'error'}
          className={cn("flex-shrink-0 w-full sm:w-auto", recordingState === 'error' ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "")}
          aria-label={getButtonText()}
        >
          {getButtonIcon()}
          <span className="ml-2">{getButtonText()}</span>
        </Button>
        <div className="flex-grow w-full">
          <EditableTextDisplay
            initialText={finalTranscript} 
            onTextChange={handleTextDisplaySave} 
            placeholder={placeholder}
            className="w-full"
          />
        </div>
      </div>
      {/* ... rest of JSX ... */}
      {recordingState === "error" && errorDetails && (
        <div className="flex items-center p-2 text-sm text-destructive-foreground bg-destructive rounded-md">
          <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" /> <span>Error: {errorDetails}</span>
        </div>
      )}
      {showInterimTranscript && isRecordingOrListening && interimTranscript && (
        <div className="p-2 text-sm text-muted-foreground bg-muted/30 rounded-md min-h-[2.5rem] italic">
          {interimTranscript}
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