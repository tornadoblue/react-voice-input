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
  initialSpeechTimeout, // New prop
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
  const recordingStateRef = useRef(recordingState);

  useEffect(() => {
    recordingStateRef.current = recordingState;
  }, [recordingState]);

  const handleFinalTranscriptSegment = useCallback((segment: string) => {
    console.log("VIC: Final segment:", segment);
    if (segment) {
      accumulatedFinalTranscriptRef.current = (accumulatedFinalTranscriptRef.current.trim() + " " + segment.trim()).trim();
      // Live update the editor only if recording
      if (recordingStateRef.current === "recording") {
        setFinalTranscript(prev => (prev.trim() + " " + segment.trim()).trim());
      }
    }
  }, []);

  const handleInterimTranscript = useCallback((transcript: string) => {
    if (showInterimTranscript) setInterimTranscript(transcript);
  }, [showInterimTranscript]);

  const handleRecordingStart = useCallback(() => {
    console.log("VIC: Recording actually started (onstart event).");
    setRecordingState("recording");
    setErrorDetails(null);
    setInterimTranscript("");
    accumulatedFinalTranscriptRef.current = ""; 
    setFinalTranscript(""); // Clear editor for new recording
    setCurrentAudioBlob(null);
    setCurrentAudioUrl(prevUrl => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return null;
    });
  }, []);

  const handleRecordingStop = useCallback((audioBlob: Blob | null, audioUrl: string | null) => {
    console.log(`VIC: Recording stopped. Accumulated: "${accumulatedFinalTranscriptRef.current}". Blob: ${!!audioBlob}`);
    setRecordingState("idle");
    setInterimTranscript("");
    
    const textFromSpeech = accumulatedFinalTranscriptRef.current.trim();
    // finalTranscript might have been edited manually, so we prioritize it if it has content,
    // otherwise, we use textFromSpeech.
    let textToSave = finalTranscript.trim();
    if (!textToSave && textFromSpeech) { // If editor is empty but speech was captured
        textToSave = textFromSpeech;
        setFinalTranscript(textToSave); // Update editor to show what was captured
    } else if (textToSave && textFromSpeech && !textToSave.includes(textFromSpeech)) {
        // If editor has text and speech has different/additional text, append speech
        textToSave = (textToSave + " " + textFromSpeech).trim();
        setFinalTranscript(textToSave);
    }


    setCurrentAudioBlob(audioBlob);
    setCurrentAudioUrl(audioUrl);

    if (textToSave) {
      console.log("VIC: Calling onSave with text:", textToSave);
      onSave(textToSave, audioBlob, audioUrl);
    } else {
      console.log("VIC: No text detected to save.");
      toast.info("No text detected for dictation.");
      // If onSave is not called, parent won't reset captureKey.
      // We might want to clear finalTranscript here if no save occurs.
      setFinalTranscript(""); // Clear editor if nothing was saved
    }
    accumulatedFinalTranscriptRef.current = "";
  }, [finalTranscript, onSave]);

  const handleError = useCallback((error: string) => {
    console.error(`VIC: Error: ${error}`);
    setRecordingState("error");
    setInterimTranscript("");
    setAudioDataForWaveform(null);
    toast.error(error || "Recording error.", { duration: 5000 });
  }, []);

  const handleAudioData = useCallback((dataArray: Uint8Array) => {
    if (showWaveform) setAudioDataForWaveform(new Uint8Array(dataArray));
  }, [showWaveform]);

  useEffect(() => {
    console.log("VIC: Initializing/Re-initializing EnhancedSpeechRecorder.");
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
      console.log("VIC: Cleanup: Stopping EnhancedSpeechRecorder.");
      speechRecorderRef.current?.stopRecording();
    };
  }, [handleFinalTranscriptSegment, handleInterimTranscript, handleRecordingStart, handleRecordingStop, handleError, handleAudioData, silenceTimeout, initialSpeechTimeout]);
  
  useEffect(() => {
    if (recordingStateRef.current !== 'recording' && recordingStateRef.current !== 'listening') {
      if (initialText !== finalTranscript) setFinalTranscript(initialText);
    }
  }, [initialText, finalTranscript]);

  useEffect(() => {
    return () => { if (currentAudioUrl) URL.revokeObjectURL(currentAudioUrl); };
  }, [currentAudioUrl]);

  const toggleRecording = async () => {
    console.log(`VIC: toggleRecording. Current state: ${recordingStateRef.current}`);
    if (disabled) return;
    if (recordingStateRef.current === "recording" || recordingStateRef.current === "listening") {
      speechRecorderRef.current?.stopRecording();
    } else {
      setErrorDetails(null);
      setRecordingState("listening"); // Indicate attempt to listen
      await speechRecorderRef.current?.startRecording();
    }
  };

  const handleTextDisplaySave = (newText: string) => {
    setFinalTranscript(newText);
    onSave(newText, currentAudioBlob, currentAudioUrl);
    toast.success("Text saved manually!");
  };

  const handleRetryError = () => {
    setRecordingState("idle");
    setErrorDetails(null);
  };
  
  const getButtonIcon = () => { /* ... (same) ... */ 
    if (recordingState === "error") return <RotateCcw className="w-5 h-5" />;
    if (recordingState === "recording" || recordingState === "listening") return <StopCircle className="w-5 h-5 text-red-500" />;
    return <Mic className="w-5 h-5" />;
  };
  const getButtonText = () => { /* ... (same) ... */ 
    if (recordingState === "error") return "Retry";
    if (recordingState === "recording") return "Stop Recording";
    if (recordingState === "listening") return "Listening...";
    return "Start Recording";
  };
  const isRecordingOrListening = recordingState === "recording" || recordingState === "listening";

  return ( /* ... (JSX same as before, ensure WaveformDisplay conditions are correct) ... */ 
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