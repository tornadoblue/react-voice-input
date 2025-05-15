import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, AlertTriangle, RotateCcw } from 'lucide-react';
import EditableTextDisplay from './EditableTextDisplay';
import WaveformDisplay from './WaveformDisplay';
import EnhancedSpeechRecorder from '@/services/EnhancedSpeechRecorder';
import { VoiceInputCaptureProps, RecordingState } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from "sonner";

const VoiceInputCapture: React.FC<VoiceInputCaptureProps & { silenceTimeout?: number; initialSpeechTimeout?: number }> = ({
  onSave,
  initialText = "",
  showWaveform = true,
  showInterimTranscript = true,
  customWaveformColor,
  placeholder = "Speak or type here...",
  disabled = false,
  silenceTimeout,
  initialSpeechTimeout,
}) => {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [finalTranscript, setFinalTranscript] = useState<string>(initialText); // Text in the editor
  const [audioDataForWaveform, setAudioDataForWaveform] = useState<Uint8Array | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [currentAudioBlob, setCurrentAudioBlob] = useState<Blob | null>(null);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  
  const speechRecorderRef = useRef<EnhancedSpeechRecorder | null>(null);
  const accumulatedFinalTranscriptRef = useRef<string>(""); // Re-introduced for reliable accumulation

  const recordingStateRef = useRef(recordingState);
  useEffect(() => {
    recordingStateRef.current = recordingState;
  }, [recordingState]);

  const handleFinalTranscriptSegment = useCallback((segment: string) => {
    console.log("VIC: Final segment received:", segment);
    if (segment) {
      // Append to the ref
      accumulatedFinalTranscriptRef.current = (accumulatedFinalTranscriptRef.current.trim() + " " + segment.trim()).trim();
      console.log("VIC: accumulatedFinalTranscriptRef.current is now:", accumulatedFinalTranscriptRef.current);
      
      // Update the displayed text (finalTranscript state) if recording
      if (recordingStateRef.current === "recording") {
        setFinalTranscript(accumulatedFinalTranscriptRef.current);
      }
    }
  }, []); // Stable

  const handleInterimTranscript = useCallback((transcript: string) => {
    if (showInterimTranscript) {
      setInterimTranscript(transcript);
    }
  }, [showInterimTranscript]);

  const handleRecordingStart = useCallback(() => {
    console.log("VIC: handleRecordingStart - Setting state to 'recording'.");
    setRecordingState("recording");
    setErrorDetails(null);
    setInterimTranscript("");
    accumulatedFinalTranscriptRef.current = ""; // Clear accumulator
    setFinalTranscript(""); // Clear editor for new recording session
    
    setCurrentAudioBlob(null);
    setCurrentAudioUrl(prevUrl => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return null;
    });
  }, []); 

  const handleRecordingStop = useCallback((audioBlob: Blob | null, audioUrl: string | null) => {
    // Use the accumulated text from the ref as the primary source from the speech session
    const textFromSpeechSession = accumulatedFinalTranscriptRef.current.trim();
    console.log(`VIC: handleRecordingStop. Text from speech session: "${textFromSpeechSession}"`);
    
    setRecordingState("idle");
    setInterimTranscript("");
    
    // finalTranscript state should already reflect textFromSpeechSession due to live updates
    // but we use textFromSpeechSession to be certain about what was captured during this recording.
    // If user manually edited finalTranscript, that's a separate concern handled by EditableTextDisplay's onSave.
    
    setCurrentAudioBlob(audioBlob);
    setCurrentAudioUrl(audioUrl);

    if (textFromSpeechSession) { 
      console.log("VIC: Calling onSave with text:", textFromSpeechSession);
      // Ensure finalTranscript state is also set to this, in case it wasn't perfectly synced
      setFinalTranscript(textFromSpeechSession); 
      onSave(textFromSpeechSession, audioBlob, audioUrl);
    } else {
      console.log("VIC: No text detected from speech session to save.");
      toast.info("No text detected for dictation.");
      setFinalTranscript(""); // Ensure editor is clear if nothing was saved
    }
    accumulatedFinalTranscriptRef.current = ""; // Reset for next session
  }, [onSave]); // onSave is the main dependency from props

  const handleError = useCallback((error: string) => {
    console.error(`VIC: handleError. Error: ${error}`);
    setRecordingState("error");
    setInterimTranscript("");
    setAudioDataForWaveform(null);
    toast.error(error || "An unknown recording error occurred.", { duration: 5000 });
    accumulatedFinalTranscriptRef.current = ""; // Clear accumulator on error too
  }, []);

  const handleAudioData = useCallback((dataArray: Uint8Array) => {
    if (showWaveform) {
      setAudioDataForWaveform(new Uint8Array(dataArray));
    }
  }, [showWaveform]);

  useEffect(() => {
    console.log("VIC: useEffect for EnhancedSpeechRecorder setup. Silence:", silenceTimeout, "Initial:", initialSpeechTimeout);
    speechRecorderRef.current = new EnhancedSpeechRecorder({
      onFinalTranscript: handleFinalTranscriptSegment,
      onInterimTranscript: handleInterimTranscript,
      onRecordingStart: handleRecordingStart,
      onRecordingStop: handleRecordingStop,
      onError: handleError,
      onAudioData: handleAudioData,
      silenceTimeout: silenceTimeout,
      initialSpeechTimeout: initialSpeechTimeout,
    });
    return () => {
      console.log("VIC: Cleanup useEffect - Stopping recorder.");
      speechRecorderRef.current?.stopRecording();
    };
  }, [handleFinalTranscriptSegment, handleInterimTranscript, handleRecordingStart, handleRecordingStop, handleError, handleAudioData, silenceTimeout, initialSpeechTimeout]);
  
  useEffect(() => {
    // Sync with initialText prop if not recording/listening
    if (recordingStateRef.current !== 'recording' && recordingStateRef.current !== 'listening') {
      if (initialText !== finalTranscript) {
        setFinalTranscript(initialText);
      }
    }
  }, [initialText, finalTranscript]);

  useEffect(() => {
    const urlToRevoke = currentAudioUrl;
    return () => {
      if (urlToRevoke) URL.revokeObjectURL(urlToRevoke);
    };
  }, [currentAudioUrl]);

  const toggleRecording = async () => {
    console.log(`VIC: toggleRecording. Current state: ${recordingStateRef.current}`);
    if (disabled) return;

    if (recordingStateRef.current === "recording" || recordingStateRef.current === "listening") {
      speechRecorderRef.current?.stopRecording();
    } else {
      setErrorDetails(null);
      setRecordingState("listening"); 
      await speechRecorderRef.current?.startRecording();
    }
  };

  const handleTextDisplaySave = (newText: string) => {
    // This is when user manually edits and saves the EditableTextDisplay
    setFinalTranscript(newText); 
    // If there was a prior recording session's audio, it's still associated here.
    // If user types something new and saves, it uses the old audio. This might be desired or not.
    // For now, it preserves the audio from the last recording session.
    onSave(newText, currentAudioBlob, currentAudioUrl); 
    toast.success("Text saved manually!");
  };

  const handleRetryError = () => {
    setErrorDetails(null);
    setRecordingState("idle");
  };
  
  const getButtonIcon = () => { /* ... same ... */ 
    if (recordingState === "error") return <RotateCcw className="w-5 h-5" />;
    if (recordingState === "recording" || recordingState === "listening") return <StopCircle className="w-5 h-5 text-red-500" />;
    return <Mic className="w-5 h-5" />;
  };
  const getButtonText = () => { /* ... same ... */ 
    if (recordingState === "error") return "Retry";
    if (recordingState === "recording") return "Stop Recording";
    if (recordingState === "listening") return "Listening...";
    return "Start Recording";
  };
  const isRecordingOrListening = recordingState === "recording" || recordingState === "listening";

  return ( /* ... JSX same ... */ 
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
      {showWaveform && isRecordingOrListening && (
         <WaveformDisplay audioData={audioDataForWaveform} color={customWaveformColor} className="w-full h-16" />
      )}
      {showWaveform && recordingState === "idle" && !errorDetails && (
         <WaveformDisplay audioData={null} color={customWaveformColor} className="w-full h-16" />
      )}
    </div>
  );
};

export default VoiceInputCapture;