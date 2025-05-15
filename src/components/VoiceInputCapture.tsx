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
  silenceTimeout, // Pass this to EnhancedSpeechRecorder
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

  const handleFinalTranscriptSegment = useCallback((segment: string) => {
    if (segment) {
      accumulatedFinalTranscriptRef.current += (accumulatedFinalTranscriptRef.current.length > 0 ? " " : "") + segment;
      // Update the visual display of finalTranscript in real-time if recording
      // This makes the EditableTextDisplay feel more live.
      if (recordingState === "recording") {
        // Append new segment to what's currently in finalTranscript state
        // This allows manual edits to be preserved if user types then speaks more.
        setFinalTranscript(prev => (prev.trim() ? prev.trim() + " " : "") + segment.trim());
      }
    }
  }, [recordingState]);

  const handleInterimTranscript = useCallback((transcript: string) => {
    if (showInterimTranscript) {
      setInterimTranscript(transcript);
    }
  }, [showInterimTranscript]);

  const handleRecordingStart = useCallback(() => {
    setRecordingState("recording");
    setErrorDetails(null);
    setInterimTranscript("");
    accumulatedFinalTranscriptRef.current = ""; // Reset for new speech session
    
    // If there's existing text in finalTranscript (e.g. from initialText or previous edits),
    // and the user starts recording, new speech will be appended.
    // If we want to clear the text field on new recording start, uncomment:
    // setFinalTranscript(""); 

    setCurrentAudioBlob(null);
    if (currentAudioUrl) {
      URL.revokeObjectURL(currentAudioUrl);
      setCurrentAudioUrl(null);
    }
  }, [currentAudioUrl]);

  const handleRecordingStop = useCallback((audioBlob: Blob | null, audioUrl: string | null) => {
    setRecordingState("idle");
    setInterimTranscript("");
    
    // The final text from the speech session is in accumulatedFinalTranscriptRef.current
    // The finalTranscript state already reflects live updates from handleFinalTranscriptSegment.
    const textFromThisSession = accumulatedFinalTranscriptRef.current.trim();
    const currentEditorText = finalTranscript.trim(); // Text currently in the editor

    let textToSave = currentEditorText;

    // If new speech was recorded, textToSave is already up-to-date via handleFinalTranscriptSegment.
    // If user edited the text while speech was also coming in, finalTranscript should reflect that.
    // If no new speech, but editor has text (e.g. typed), that's textToSave.

    setCurrentAudioBlob(audioBlob);
    setCurrentAudioUrl(audioUrl);

    // Auto-save if there's any text to save (from speech or typing)
    // or if there's an audio blob (even if transcription was empty).
    if (textToSave || audioBlob) {
      onSave(textToSave, audioBlob, audioUrl);
    } else {
      console.log("Recording stopped with no text and no audio. Not auto-saving.");
      // If onSave is not called, the parent (Index.tsx) won't reset the captureKey,
      // so the VoiceInputCapture component won't reset its internal finalTranscript.
      // This is generally fine, as the user might want to type something.
      // If a reset is desired even on empty auto-stop, onSave should be called with empty values.
    }
    
    // Reset accumulator for the next potential recording session.
    // finalTranscript (editor content) is preserved until a new recording starts and clears it,
    // or until the parent component re-mounts VoiceInputCapture (e.g. via captureKey).
    accumulatedFinalTranscriptRef.current = "";

  }, [finalTranscript, onSave]);

  const handleError = useCallback((error: string) => {
    setErrorDetails(error);
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
    speechRecorderRef.current = new EnhancedSpeechRecorder({
      onFinalTranscript: handleFinalTranscriptSegment,
      onInterimTranscript: handleInterimTranscript,
      onRecordingStart: handleRecordingStart,
      onRecordingStop: handleRecordingStop,
      onError: handleError,
      onAudioData: handleAudioData,
      silenceTimeout: silenceTimeout, // Pass the timeout
    });
    return () => {
      speechRecorderRef.current?.stopRecording();
      if (currentAudioUrl) URL.revokeObjectURL(currentAudioUrl);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleFinalTranscriptSegment, handleInterimTranscript, handleRecordingStart, handleRecordingStop, handleError, handleAudioData, silenceTimeout]); 
  // currentAudioUrl removed from deps to prevent re-creating recorder when it changes. It's cleaned up in return.
  
  useEffect(() => {
    // Sync with initialText prop, but only if not actively recording or if initialText truly changes
    if (recordingState !== 'recording' && recordingState !== 'listening') {
        setFinalTranscript(initialText);
    }
  }, [initialText, recordingState]);

  const toggleRecording = async () => {
    if (disabled) return;
    if (recordingState === "recording" || recordingState === "listening") {
      speechRecorderRef.current?.stopRecording(); // This will trigger handleRecordingStop, which then calls onSave
    } else {
      setErrorDetails(null);
      setRecordingState("listening"); 
      // When starting a new recording, `handleRecordingStart` will clear `accumulatedFinalTranscriptRef`.
      // `finalTranscript` (editor content) is preserved unless `handleRecordingStart` explicitly clears it.
      await speechRecorderRef.current?.startRecording();
    }
  };

  const handleTextDisplaySave = (newText: string) => {
    // This save is manual, from EditableTextDisplay after user edits
    setFinalTranscript(newText); // Update internal state to reflect edit
    onSave(newText, currentAudioBlob, currentAudioUrl); // Propagate save with current audio
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