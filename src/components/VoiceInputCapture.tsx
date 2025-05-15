import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, AlertTriangle, RotateCcw } from 'lucide-react';
import EditableTextDisplay from './EditableTextDisplay';
import WaveformDisplay from './WaveformDisplay';
import EnhancedSpeechRecorder from '@/services/EnhancedSpeechRecorder';
import { VoiceInputCaptureProps, RecordingState } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from "sonner";

const VoiceInputCapture: React.FC<VoiceInputCaptureProps & { silenceTimeout?: number }> = ({
  onSave,
  initialText = "",
  showWaveform = true,
  showInterimTranscript = true,
  customWaveformColor,
  placeholder = "Speak or type here...",
  disabled = false,
  silenceTimeout,
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

  console.log(`VIC Render: State - ${recordingState}, Error - ${errorDetails}, Interim - ${!!interimTranscript}, Waveform Data - ${!!audioDataForWaveform}`);

  const handleFinalTranscriptSegment = useCallback((segment: string) => {
    console.log("VIC: handleFinalTranscriptSegment:", segment);
    if (segment) {
      accumulatedFinalTranscriptRef.current += (accumulatedFinalTranscriptRef.current.length > 0 ? " " : "") + segment;
      if (recordingState === "recording") {
        setFinalTranscript(prev => (prev.trim() ? prev.trim() + " " : "") + segment.trim());
      }
    }
  }, [recordingState]); // Dependency on recordingState is important here

  const handleInterimTranscript = useCallback((transcript: string) => {
    // console.log("VIC: handleInterimTranscript:", transcript); // Can be very noisy
    if (showInterimTranscript) {
      setInterimTranscript(transcript);
    }
  }, [showInterimTranscript]);

  const handleRecordingStart = useCallback(() => {
    console.log("VIC: handleRecordingStart callback triggered. Setting state to 'recording'");
    setRecordingState("recording");
    setErrorDetails(null);
    setInterimTranscript("");
    accumulatedFinalTranscriptRef.current = ""; 
    setCurrentAudioBlob(null);
    setCurrentAudioUrl(prevUrl => {
      if (prevUrl) {
        console.log("VIC: Revoking old audio URL in handleRecordingStart:", prevUrl);
        URL.revokeObjectURL(prevUrl);
      }
      return null;
    });
  }, []); // Made stable

  const handleRecordingStop = useCallback((audioBlob: Blob | null, audioUrl: string | null) => {
    console.log(`VIC: handleRecordingStop callback triggered. Setting state to 'idle'. Blob: ${!!audioBlob}, URL: ${!!audioUrl}`);
    setRecordingState("idle");
    setInterimTranscript("");
    
    const textFromThisSession = accumulatedFinalTranscriptRef.current.trim();
    const currentEditorText = finalTranscript.trim();
    let textToSave = currentEditorText;

    if (textFromThisSession && !currentEditorText.endsWith(textFromThisSession)) {
      // If new speech was recorded and it's not already appended (e.g. due to live updates)
      textToSave = (currentEditorText ? currentEditorText + " " : "") + textFromThisSession;
      setFinalTranscript(textToSave); // Update finalTranscript state if it changed
    }
    
    setCurrentAudioBlob(audioBlob);
    setCurrentAudioUrl(audioUrl);

    if (textToSave.trim() || audioBlob) {
      console.log("VIC: Calling onSave in handleRecordingStop with text:", textToSave);
      onSave(textToSave, audioBlob, audioUrl);
    } else {
      console.log("VIC: handleRecordingStop - No text and no audio to save.");
    }
    accumulatedFinalTranscriptRef.current = "";
  }, [finalTranscript, onSave]);

  const handleError = useCallback((error: string) => {
    console.error(`VIC: handleError callback triggered. Error: ${error}. Setting state to 'error'`);
    setRecordingState("error");
    setInterimTranscript("");
    setAudioDataForWaveform(null);
    toast.error(error || "An unknown recording error occurred.", { duration: 5000 });
  }, []);

  const handleAudioData = useCallback((dataArray: Uint8Array) => {
    // console.log("VIC: handleAudioData received"); // Can be very noisy
    if (showWaveform) {
      setAudioDataForWaveform(new Uint8Array(dataArray));
    }
  }, [showWaveform]);

  useEffect(() => {
    console.log("VIC: useEffect for EnhancedSpeechRecorder setup running. Silence Timeout:", silenceTimeout);
    speechRecorderRef.current = new EnhancedSpeechRecorder({
      onFinalTranscript: handleFinalTranscriptSegment,
      onInterimTranscript: handleInterimTranscript,
      onRecordingStart: handleRecordingStart,
      onRecordingStop: handleRecordingStop,
      onError: handleError,
      onAudioData: handleAudioData,
      silenceTimeout: silenceTimeout,
    });
    console.log("VIC: EnhancedSpeechRecorder instance created/updated.");

    return () => {
      console.log("VIC: Cleanup useEffect - Stopping recorder and revoking URL if any.");
      speechRecorderRef.current?.stopRecording();
      // Access currentAudioUrl via ref or ensure it's cleaned up by its own state logic
      // For now, relying on the component unmount or re-keying to handle this if necessary.
      // The `setCurrentAudioUrl(prevUrl => ...)` in handleRecordingStart handles ongoing revocation.
    };
  }, [handleFinalTranscriptSegment, handleInterimTranscript, handleRecordingStart, handleRecordingStop, handleError, handleAudioData, silenceTimeout]);
  
  useEffect(() => {
    if (recordingState !== 'recording' && recordingState !== 'listening') {
        // console.log("VIC: Syncing finalTranscript with initialText:", initialText);
        setFinalTranscript(initialText);
    }
  }, [initialText, recordingState]);

  const toggleRecording = async () => {
    console.log(`VIC: toggleRecording action. Current state: ${recordingState}`);
    if (disabled) return;
    if (recordingState === "recording" || recordingState === "listening") {
      console.log("VIC: Attempting to stop recording via speechRecorderRef.");
      speechRecorderRef.current?.stopRecording();
    } else {
      setErrorDetails(null);
      console.log("VIC: Setting state to 'listening' and attempting to start recording.");
      setRecordingState("listening"); 
      try {
        await speechRecorderRef.current?.startRecording();
        console.log("VIC: speechRecorderRef.startRecording() promise resolved.");
      } catch (e) {
        console.error("VIC: Error caught directly from startRecording() call:", e);
        if (e instanceof Error) handleError(e.message);
        else handleError("Failed to start recording (unknown error type).");
      }
    }
  };

  const handleTextDisplaySave = (newText: string) => {
    console.log("VIC: handleTextDisplaySave called with text:", newText);
    setFinalTranscript(newText);
    onSave(newText, currentAudioBlob, currentAudioUrl);
    toast.success("Text saved manually!");
  };

  const handleRetryError = () => {
    console.log("VIC: handleRetryError called.");
    setErrorDetails(null);
    setRecordingState("idle");
  };
  
  const getButtonIcon = () => {
    if (recordingState === "error") return <RotateCcw className="w-5 h-5" />;
    if (recordingState === "recording" || recordingState === "listening") return <StopCircle className="w-5 h-5 text-red-500" />;
    return <Mic className="w-5 h-5" />;
  };
  const getButtonText = () => {
    if (recordingState === "error") return "Retry";
    if (recordingState === "recording") return "Stop Recording";
    if (recordingState === "listening") return "Listening...";
    return "Start Recording";
  };
  const isRecordingOrListening = recordingState === "recording" || recordingState === "listening";

  return (
    <div className={cn("p-3 sm:p-4 border rounded-lg shadow-sm bg-card w-full max-w-2xl mx-auto space-y-3", { "opacity-75 cursor-not-allowed": disabled })}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <Button 
          onClick={recordingState === 'error' ? handleRetryError : toggleRecording} 
          disabled={disabled} 
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
      {showWaveform && isRecordingOrListening && ( // Condition for showing active waveform
         <WaveformDisplay audioData={audioDataForWaveform} color={customWaveformColor} className="w-full h-16" />
      )}
      {showWaveform && recordingState === "idle" && !errorDetails && ( // Condition for showing idle waveform
         <WaveformDisplay audioData={null} color={customWaveformColor} className="w-full h-16" />
      )}
    </div>
  );
};

export default VoiceInputCapture;