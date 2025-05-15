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
      // Display accumulated transcript in real-time in the editable area if not actively editing
      // This provides a more "live" feel to the final text area.
      if (recordingState === "recording") {
        setFinalTranscript(prev => (prev.trim() && !accumulatedFinalTranscriptRef.current.startsWith(prev.trim()) ? prev.trim() + " " : "") + accumulatedFinalTranscriptRef.current);
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
    // Reset accumulated transcript only if not appending to existing finalTranscript
    // If finalTranscript is empty, or we want to always start fresh for the accumulator:
    accumulatedFinalTranscriptRef.current = ""; 
    
    // If initialText was present, and user starts recording, decide if we append or replace.
    // Current behavior: accumulated starts fresh, handleRecordingStop appends it to existing finalTranscript.
    // This means if user edits text, then records, new speech is appended.

    setCurrentAudioBlob(null);
    if (currentAudioUrl) {
      URL.revokeObjectURL(currentAudioUrl);
      setCurrentAudioUrl(null);
    }
  }, [currentAudioUrl]);

  const handleRecordingStop = useCallback((audioBlob: Blob | null, audioUrl: string | null) => {
    setRecordingState("idle");
    setInterimTranscript("");
    
    const newFinalTextFromSpeech = accumulatedFinalTranscriptRef.current.trim();
    let textToSave = finalTranscript; // Start with current text in editor

    if (newFinalTextFromSpeech) {
      // If there was new speech, update the finalTranscript state to reflect it.
      // The logic here ensures that if the user edited the text while speech was accumulating,
      // the new speech is appended to the potentially edited version.
      // However, handleFinalTranscriptSegment already updates finalTranscript live.
      // So, by the time we are here, finalTranscript should already contain the latest.
      textToSave = finalTranscript; // finalTranscript is already updated by handleFinalTranscriptSegment
    }
    
    setCurrentAudioBlob(audioBlob);
    setCurrentAudioUrl(audioUrl);

    // Auto-save if there's text (either from speech or typed and then speech stopped)
    // And ensure we don't save an empty string if nothing was said/typed.
    if (textToSave.trim()) {
      onSave(textToSave, audioBlob, audioUrl);
    } else if (audioBlob) {
      // If there's audio but no text (e.g. "no-speech" error led to stop but audio was captured)
      // Optionally save with empty text or handle as per requirements.
      // For now, we only save if there's text.
      console.log("Recording stopped with audio but no transcript. Not auto-saving.");
    }
    
    // Reset for next potential recording, but finalTranscript is preserved until next save or reset
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
  }, [handleFinalTranscriptSegment, handleInterimTranscript, handleRecordingStart, handleRecordingStop, handleError, handleAudioData, silenceTimeout, currentAudioUrl]);
  
  useEffect(() => {
    if (recordingState !== 'recording' && recordingState !== 'listening') {
        setFinalTranscript(initialText);
    }
  }, [initialText, recordingState]);

  const toggleRecording = async () => {
    if (disabled) return;
    if (recordingState === "recording" || recordingState === "listening") {
      speechRecorderRef.current?.stopRecording();
    } else {
      setErrorDetails(null);
      setRecordingState("listening"); 
      // When starting a new recording, ensure finalTranscript reflects what's in the editor
      // or clear it if we want each recording to be "fresh" in the editor.
      // For now, it keeps the current editor content, and new speech appends.
      // If you want to clear editor on new record: setFinalTranscript("");
      await speechRecorderRef.current?.startRecording();
    }
  };

  const handleTextDisplaySave = (newText: string) => {
    // This save is manual, from EditableTextDisplay
    setFinalTranscript(newText);
    onSave(newText, currentAudioBlob, currentAudioUrl);
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
            initialText={finalTranscript} // This will now update more "live"
            onTextChange={handleTextDisplaySave} // Manual save from editor
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