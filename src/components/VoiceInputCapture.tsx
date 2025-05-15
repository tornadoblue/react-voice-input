import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, AlertTriangle, Edit3, Save } from 'lucide-react';
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
  // To accumulate final transcript segments during a single recording session
  const currentRecordingFinalTranscriptRef = useRef<string>("");


  const handleFinalTranscript = useCallback((transcript: string) => {
    console.log("Final transcript segment:", transcript);
    currentRecordingFinalTranscriptRef.current += (currentRecordingFinalTranscriptRef.current.length > 0 ? " " : "") + transcript;
    // Update the main finalTranscript state only when recording stops or explicitly saved
    // This allows interim to show live updates without overwriting the editable area constantly
  }, []);

  const handleInterimTranscript = useCallback((transcript: string) => {
    if (showInterimTranscript) {
      setInterimTranscript(transcript);
    }
  }, [showInterimTranscript]);

  const handleRecordingStart = useCallback(() => {
    console.log("Recording started callback");
    setRecordingState("recording");
    setErrorDetails(null);
    setInterimTranscript("");
    currentRecordingFinalTranscriptRef.current = ""; // Reset for new recording
  }, []);

  const handleRecordingStop = useCallback((audioBlob: Blob | null, audioUrl: string | null) => {
    console.log("Recording stopped callback. Audio Blob:", audioBlob, "Audio URL:", audioUrl);
    setRecordingState("idle"); // Or 'processing' if we add that state
    setInterimTranscript(""); // Clear interim transcript
    setAudioDataForWaveform(null); // Clear waveform
    
    // Set the accumulated final transcript to the main state
    setFinalTranscript(prev => {
      // If there was previous text and new speech, append. Otherwise, replace.
      // This logic might need refinement based on desired UX.
      // For now, if initialText was present and user spoke, it appends.
      // If user clears text and speaks, it sets.
      // If user speaks multiple times, it appends.
      const newText = currentRecordingFinalTranscriptRef.current.trim();
      if (newText) {
        return (prev.trim() ? prev.trim() + " " : "") + newText;
      }
      return prev; // No new speech, keep existing
    });

    if (audioBlob) setCurrentAudioBlob(audioBlob);
    if (audioUrl) setCurrentAudioUrl(audioUrl);
    
    // Automatically save if there's new transcript
    // if (currentRecordingFinalTranscriptRef.current.trim()) {
    //   onSave(currentRecordingFinalTranscriptRef.current.trim(), audioBlob, audioUrl);
    // }
    // For now, let's require explicit save via EditableTextDisplay or a dedicated save button
  }, [onSave]);

  const handleError = useCallback((error: string) => {
    console.error("Speech recognition error:", error);
    setErrorDetails(error);
    setRecordingState("error");
    setInterimTranscript("");
    setAudioDataForWaveform(null);
    toast.error(error || "An unknown recording error occurred.");
  }, []);

  const handleAudioData = useCallback((dataArray: Uint8Array) => {
    if (showWaveform) {
      // Create a copy of the Uint8Array to ensure React detects changes
      setAudioDataForWaveform(new Uint8Array(dataArray));
    }
  }, [showWaveform]);

  useEffect(() => {
    speechRecorderRef.current = new EnhancedSpeechRecorder({
      onFinalTranscript: handleFinalTranscript,
      onInterimTranscript: handleInterimTranscript,
      onRecordingStart: handleRecordingStart,
      onRecordingStop: handleRecordingStop,
      onError: handleError,
      onAudioData: handleAudioData,
    });

    return () => {
      speechRecorderRef.current?.stopRecording(); // Ensure cleanup
    };
  }, [handleFinalTranscript, handleInterimTranscript, handleRecordingStart, handleRecordingStop, handleError, handleAudioData]);
  
  useEffect(() => {
    setFinalTranscript(initialText); // Sync with initialText prop
  }, [initialText]);

  const toggleRecording = async () => {
    if (disabled) return;

    if (recordingState === "recording" || recordingState === "listening") {
      speechRecorderRef.current?.stopRecording();
    } else {
      setErrorDetails(null);
      setRecordingState("listening"); // Transition to listening state
      // Reset transcripts for a new session if user explicitly starts recording
      setInterimTranscript("");
      // currentRecordingFinalTranscriptRef.current = ""; // Decided to append by default
      try {
        await speechRecorderRef.current?.startRecording();
      } catch (e) {
        // Error is handled by the onError callback in EnhancedSpeechRecorder
      }
    }
  };

  const handleTextDisplaySave = (newText: string) => {
    setFinalTranscript(newText);
    onSave(newText, currentAudioBlob, currentAudioUrl); // Save text and any associated audio
    toast.success("Text saved!");
  };
  
  const getButtonIcon = () => {
    if (recordingState === "recording" || recordingState === "listening") {
      return <StopCircle className="w-5 h-5" />;
    }
    return <Mic className="w-5 h-5" />;
  };

  const getButtonText = () => {
    if (recordingState === "recording") return "Stop Recording";
    if (recordingState === "listening") return "Listening...";
    return "Start Recording";
  };

  return (
    <div className={cn("p-4 border rounded-lg shadow-sm bg-card w-full max-w-2xl mx-auto space-y-3", { "opacity-75 cursor-not-allowed": disabled })}>
      <div className="flex items-center space-x-2">
        <Button onClick={toggleRecording} disabled={disabled || recordingState === "error"} className="flex-shrink-0">
          {getButtonIcon()}
          <span className="ml-2 hidden sm:inline">{getButtonText()}</span>
        </Button>
        <div className="flex-grow">
          <EditableTextDisplay
            initialText={finalTranscript}
            onTextChange={handleTextDisplaySave}
            placeholder={placeholder}
          />
        </div>
      </div>

      {recordingState === "error" && errorDetails && (
        <div className="flex items-center p-2 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md">
          <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{errorDetails}</span>
        </div>
      )}

      {showInterimTranscript && (recordingState === "recording" || recordingState === "listening") && interimTranscript && (
        <div className="p-2 text-sm text-muted-foreground bg-muted/50 rounded-md min-h-[2.5rem]">
          <em>{interimTranscript}</em>
        </div>
      )}
      
      {showWaveform && (recordingState === "recording" || recordingState === "listening") && (
         <WaveformDisplay 
            audioData={audioDataForWaveform} 
            color={customWaveformColor}
            width={300} // Default or make configurable
            height={60}  // Default or make configurable
            className="w-full"
        />
      )}
    </div>
  );
};

export default VoiceInputCapture;