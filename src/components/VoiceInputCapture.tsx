import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, AlertTriangle, RotateCcw } from 'lucide-react';
import EditableTextDisplay from './EditableTextDisplay';
import WaveformDisplay from './WaveformDisplay';
import EnhancedSpeechRecorder from '@/services/EnhancedSpeechRecorder';
import { VoiceInputCaptureProps, RecordingState } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from "sonner";

const VoiceInputCapture: React.FC<VoiceInputCaptureProps> = ({
  onSave,
  initialText = "",
  showWaveform = true,
  showInterimTranscript = true,
  customWaveformColor,
  placeholder = "Speak or type here...",
  disabled = false,
}) => {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [finalTranscript, setFinalTranscript] = useState<string>(initialText);
  const [audioDataForWaveform, setAudioDataForWaveform] = useState<Uint8Array | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [currentAudioBlob, setCurrentAudioBlob] = useState<Blob | null>(null);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  
  const speechRecorderRef = useRef<EnhancedSpeechRecorder | null>(null);
  const accumulatedFinalTranscriptRef = useRef<string>(""); // Accumulates during one recording session

  const handleFinalTranscriptSegment = useCallback((segment: string) => {
    console.log("Final transcript segment:", segment);
    if (segment) {
      accumulatedFinalTranscriptRef.current += (accumulatedFinalTranscriptRef.current.length > 0 ? " " : "") + segment;
    }
    // The final transcript is set to EditableTextDisplay upon recording stop.
  }, []);

  const handleInterimTranscript = useCallback((transcript: string) => {
    if (showInterimTranscript) {
      setInterimTranscript(transcript);
    }
  }, [showInterimTranscript]);

  const handleRecordingStart = useCallback(() => {
    console.log("Event: Recording started");
    setRecordingState("recording");
    setErrorDetails(null);
    setInterimTranscript("");
    accumulatedFinalTranscriptRef.current = ""; // Reset for new recording session
    setCurrentAudioBlob(null); // Clear previous audio
    if (currentAudioUrl) URL.revokeObjectURL(currentAudioUrl); // Revoke old URL
    setCurrentAudioUrl(null);
  }, [currentAudioUrl]);

  const handleRecordingStop = useCallback((audioBlob: Blob | null, audioUrl: string | null) => {
    console.log("Event: Recording stopped. Audio Blob:", audioBlob, "Audio URL:", audioUrl);
    setRecordingState("idle");
    setInterimTranscript(""); // Clear interim transcript
    // Waveform data is cleared by onAudioData not being called anymore
    
    const newFinalText = accumulatedFinalTranscriptRef.current.trim();
    if (newFinalText) {
      setFinalTranscript(prev => (prev.trim() ? prev.trim() + " " : "") + newFinalText);
    }
    
    if (audioBlob) setCurrentAudioBlob(audioBlob);
    if (audioUrl) setCurrentAudioUrl(audioUrl);
    
    // The text is now in finalTranscript, user can edit then save via EditableTextDisplay
    // Or, if auto-save is desired on stop, call onSave here:
    // if (newFinalText) {
    //   onSave((finalTranscript.trim() ? finalTranscript.trim() + " " : "") + newFinalText, audioBlob, audioUrl);
    // } else if (finalTranscript.trim()) { // Save existing text if no new speech but audio was recorded
    //   onSave(finalTranscript, audioBlob, audioUrl);
    // }

  }, []);

  const handleError = useCallback((error: string) => {
    console.error("Speech recognition error:", error);
    setErrorDetails(error);
    setRecordingState("error");
    setInterimTranscript("");
    setAudioDataForWaveform(null); // Clear waveform on error
    toast.error(error || "An unknown recording error occurred.", { duration: 5000 });
  }, []);

  const handleAudioData = useCallback((dataArray: Uint8Array) => {
    if (showWaveform) {
      setAudioDataForWaveform(new Uint8Array(dataArray)); // Create a copy
    }
  }, [showWaveform]);

  useEffect(() => {
    speechRecorderRef.current = new EnhancedSpeechRecorder({
      onFinalTranscript: handleFinalTranscriptSegment,
      onInterimTranscript: handleInterimTranscript,
      onRecordingStart: handleRecordingStart,
      onRecordingStop: handleRecordingStop,
      onError: handleError,
      onAudioData: handleAudioData,
    });

    return () => {
      speechRecorderRef.current?.stopRecording();
      if (currentAudioUrl) {
        URL.revokeObjectURL(currentAudioUrl);
      }
    };
  }, [handleFinalTranscriptSegment, handleInterimTranscript, handleRecordingStart, handleRecordingStop, handleError, handleAudioData, currentAudioUrl]);
  
  useEffect(() => {
    // Sync with initialText prop, but only if not actively recording or if initialText truly changes
    // This prevents overwriting user's speech if initialText prop re-renders without actual change
    if (recordingState !== 'recording' && recordingState !== 'listening') {
        setFinalTranscript(initialText);
        accumulatedFinalTranscriptRef.current = ""; // Reset if initial text changes
    }
  }, [initialText, recordingState]);

  const toggleRecording = async () => {
    if (disabled) return;

    if (recordingState === "recording" || recordingState === "listening") {
      speechRecorderRef.current?.stopRecording();
    } else {
      setErrorDetails(null); // Clear previous errors
      setRecordingState("listening"); 
      try {
        await speechRecorderRef.current?.startRecording();
      } catch (e) {
        // Error should be handled by the onError callback in EnhancedSpeechRecorder
        // but if startRecording itself throws synchronously before async ops, catch here.
        if (e instanceof Error) handleError(e.message);
        else handleError("Failed to start recording.");
      }
    }
  };

  const handleTextDisplaySave = (newText: string) => {
    setFinalTranscript(newText); // Update local state
    onSave(newText, currentAudioBlob, currentAudioUrl); // Propagate save
    toast.success("Text saved!");
  };

  const handleRetryError = () => {
    setErrorDetails(null);
    setRecordingState("idle");
  }
  
  const getButtonIcon = () => {
    if (recordingState === "error") return <RotateCcw className="w-5 h-5" />;
    if (recordingState === "recording" || recordingState === "listening") {
      return <StopCircle className="w-5 h-5 text-red-500" />;
    }
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
          <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Error: {errorDetails}</span>
        </div>
      )}

      {showInterimTranscript && isRecordingOrListening && interimTranscript && (
        <div className="p-2 text-sm text-muted-foreground bg-muted/30 rounded-md min-h-[2.5rem] italic">
          {interimTranscript}
        </div>
      )}
      
      {showWaveform && isRecordingOrListening && (
         <WaveformDisplay 
            audioData={audioDataForWaveform} 
            color={customWaveformColor}
            className="w-full h-16" // Example fixed height for waveform
        />
      )}
      {showWaveform && recordingState === "idle" && !errorDetails && ( // Show a placeholder flat line when idle
         <WaveformDisplay 
            audioData={null} // Pass null to render flat line
            color={customWaveformColor}
            className="w-full h-16"
        />
      )}
    </div>
  );
};

export default VoiceInputCapture;