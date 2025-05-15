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
  const [finalTranscript, setFinalTranscript] = useState<string>(initialText); // Text in the editor
  const [audioDataForWaveform, setAudioDataForWaveform] = useState<Uint8Array | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [currentAudioBlob, setCurrentAudioBlob] = useState<Blob | null>(null);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  
  const speechRecorderRef = useRef<EnhancedSpeechRecorder | null>(null);
  const accumulatedFinalTranscriptRef = useRef<string>(""); // Accumulates speech for the current session

  // Ref to hold the latest recordingState for stable callbacks
  const recordingStateRef = useRef(recordingState);
  useEffect(() => {
    recordingStateRef.current = recordingState;
  }, [recordingState]);

  const handleFinalTranscriptSegment = useCallback((segment: string) => {
    console.log("VIC: handleFinalTranscriptSegment received segment:", segment);
    if (segment) {
      // Update the raw accumulator for the current speech session
      const currentAccumulated = accumulatedFinalTranscriptRef.current;
      accumulatedFinalTranscriptRef.current = (currentAccumulated ? currentAccumulated.trim() + " " : "") + segment.trim();
      console.log("VIC: accumulatedFinalTranscriptRef.current is now:", accumulatedFinalTranscriptRef.current);

      // If actively recording, update the visual editor (finalTranscript state)
      // This appends the new segment to whatever is currently in the editor.
      if (recordingStateRef.current === "recording") {
        setFinalTranscript(prevEditorText => (prevEditorText.trim() ? prevEditorText.trim() + " " : "") + segment.trim());
      }
    }
  }, []); // Stable: empty dependency array, uses ref for recordingState

  const handleInterimTranscript = useCallback((transcript: string) => {
    if (showInterimTranscript) {
      setInterimTranscript(transcript);
    }
  }, [showInterimTranscript]);

  const handleRecordingStart = useCallback(() => {
    console.log("VIC: handleRecordingStart callback. Setting state to 'recording'.");
    setRecordingState("recording");
    setErrorDetails(null);
    setInterimTranscript("");
    accumulatedFinalTranscriptRef.current = ""; // Reset accumulator for new speech session
    
    // When a new recording starts, we clear the editor text (finalTranscript)
    // and any previously captured audio for this instance of VoiceInputCapture.
    setFinalTranscript(""); // Clear editor for new recording
    
    setCurrentAudioBlob(null);
    if (currentAudioUrl) {
      URL.revokeObjectURL(currentAudioUrl);
      setCurrentAudioUrl(null);
    }
  }, [currentAudioUrl]); // currentAudioUrl is a dependency for cleanup

  const handleRecordingStop = useCallback((audioBlob: Blob | null, audioUrl: string | null) => {
    console.log(`VIC: handleRecordingStop. Accumulated speech: "${accumulatedFinalTranscriptRef.current}"`);
    setRecordingState("idle");
    setInterimTranscript("");
    
    // The text from the entire speech session is in accumulatedFinalTranscriptRef.current
    // The finalTranscript state should reflect this due to live updates in handleFinalTranscriptSegment.
    // We use finalTranscript as the source of truth for text to save, as user might have edited it.
    const textToSave = finalTranscript.trim();

    setCurrentAudioBlob(audioBlob);
    setCurrentAudioUrl(audioUrl);

    if (textToSave) { // Only save if there's actual text
      console.log("VIC: Calling onSave with text:", textToSave);
      onSave(textToSave, audioBlob, audioUrl);
    } else {
      console.log("VIC: No text detected to save.");
      toast.info("No text detected for dictation.");
      // If onSave is not called, Index.tsx won't create a new entry or reset captureKey.
      // This means VoiceInputCapture retains its current (empty) finalTranscript.
      // If a reset of VoiceInputCapture is desired even on empty, onSave would need to be called.
      // For now, we don't call onSave, so the user can try typing or recording again.
    }
    // Reset accumulator for the next potential recording session.
    // finalTranscript (editor content) is now set. It will be cleared by handleRecordingStart on next record.
    accumulatedFinalTranscriptRef.current = "";
  }, [finalTranscript, onSave]);

  const handleError = useCallback((error: string) => {
    console.error(`VIC: handleError. Error: ${error}`);
    setRecordingState("error");
    setInterimTranscript("");
    setAudioDataForWaveform(null);
    toast.error(error || "An unknown recording error occurred.", { duration: 5000 });
  }, []);

  const handleAudioData = useCallback((dataArray: Uint8Array) => {
    if (showWaveform) {
      setAudioDataForWaveform(new Uint8Array(dataArray));
    }
  }, [showWaveform]);

  useEffect(() => {
    console.log("VIC: useEffect for EnhancedSpeechRecorder setup. Current recordingState:", recordingStateRef.current);
    speechRecorderRef.current = new EnhancedSpeechRecorder({
      onFinalTranscript: handleFinalTranscriptSegment,
      onInterimTranscript: handleInterimTranscript,
      onRecordingStart: handleRecordingStart,
      onRecordingStop: handleRecordingStop,
      onError: handleError,
      onAudioData: handleAudioData,
      silenceTimeout: silenceTimeout,
    });
    return () => {
      console.log("VIC: Cleanup useEffect - Stopping recorder.");
      speechRecorderRef.current?.stopRecording();
    };
  }, [handleFinalTranscriptSegment, handleInterimTranscript, handleRecordingStart, handleRecordingStop, handleError, handleAudioData, silenceTimeout]);
  
  useEffect(() => {
    // Sync with initialText prop, but only if not actively recording/listening
    // and if initialText is different from current finalTranscript.
    // This is mainly for when the component is controlled externally.
    if (recordingStateRef.current !== 'recording' && recordingStateRef.current !== 'listening') {
      if (initialText !== finalTranscript) {
        setFinalTranscript(initialText);
      }
    }
  }, [initialText, finalTranscript]); // Rerun if initialText or finalTranscript changes

  useEffect(() => {
    // Cleanup for currentAudioUrl when component unmounts or URL changes and needs revoking
    const urlToRevoke = currentAudioUrl;
    return () => {
      if (urlToRevoke) {
        // console.log("VIC: Unmount/cleanup - Revoking object URL:", urlToRevoke);
        URL.revokeObjectURL(urlToRevoke);
      }
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
    // Manual save from EditableTextDisplay
    setFinalTranscript(newText); // Update internal state
    onSave(newText, currentAudioBlob, currentAudioUrl); // Propagate save
    toast.success("Text saved manually!");
  };

  const handleRetryError = () => {
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
      {/* ... (rest of the JSX remains the same) ... */}
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