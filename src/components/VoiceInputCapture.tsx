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

  // console.log(`VIC Render: State - ${recordingState}, Error - ${errorDetails}, Interim - ${!!interimTranscript}, Waveform Data - ${!!audioDataForWaveform}`);

  const handleFinalTranscriptSegment = useCallback((segment: string) => {
    // console.log("VIC: handleFinalTranscriptSegment:", segment);
    if (segment) {
      accumulatedFinalTranscriptRef.current += (accumulatedFinalTranscriptRef.current.length > 0 ? " " : "") + segment;
      // Update finalTranscript state directly if recording, to make editor feel live
      // Note: recordingState is a dependency here.
      setFinalTranscript(prev => {
        const newText = accumulatedFinalTranscriptRef.current.trim();
        // Check if prev already ends with the new segment to avoid duplication from multiple final events
        if (prev.trim().endsWith(newText)) return prev;
        return (prev.trim() ? prev.trim() + " " : "") + segment.trim();
      });
    }
  }, []); // Removed recordingState dependency to stabilize, will rely on accumulatedFinalTranscriptRef in onStop

  const handleInterimTranscript = useCallback((transcript: string) => {
    // console.log("VIC: handleInterimTranscript:", transcript);
    if (showInterimTranscript) {
      setInterimTranscript(transcript);
    }
  }, [showInterimTranscript]); // Stable if showInterimTranscript is stable (prop)

  const handleRecordingStart = useCallback(() => {
    console.log("VIC: handleRecordingStart callback triggered.");
    setRecordingState("recording");
    setErrorDetails(null);
    setInterimTranscript("");
    accumulatedFinalTranscriptRef.current = ""; 
    setCurrentAudioBlob(null);
    setCurrentAudioUrl(prevUrl => {
      if (prevUrl) {
        // console.log("VIC: Revoking old audio URL in handleRecordingStart:", prevUrl);
        URL.revokeObjectURL(prevUrl);
      }
      return null;
    });
  }, []); // Fully stable

  const handleRecordingStop = useCallback((audioBlob: Blob | null, audioUrl: string | null) => {
    console.log(`VIC: handleRecordingStop. Blob: ${!!audioBlob}, URL: ${!!audioUrl}, Accumulated: "${accumulatedFinalTranscriptRef.current}"`);
    setRecordingState("idle");
    setInterimTranscript("");
    
    const newSpeechText = accumulatedFinalTranscriptRef.current.trim();
    let textToSave = finalTranscript; // Start with whatever is in the editor

    if (newSpeechText) {
      // If there was new speech, ensure it's part of what's saved.
      // finalTranscript might have been updated live by handleFinalTranscriptSegment,
      // or user might have edited. We want the most complete version.
      // A simple append might be best if live updates to finalTranscript were disabled.
      // Since finalTranscript IS updated live by handleFinalTranscriptSegment,
      // it should already contain the newSpeechText.
      // However, to be safe, let's ensure the accumulated text is appended if not already there.
      if (!textToSave.trim().endsWith(newSpeechText)) {
         textToSave = (textToSave.trim() ? textToSave.trim() + " " : "") + newSpeechText;
      }
      setFinalTranscript(textToSave); // Ensure UI reflects this final combined text
    }
    
    setCurrentAudioBlob(audioBlob);
    setCurrentAudioUrl(audioUrl);

    if (textToSave.trim() || audioBlob) {
      console.log("VIC: Calling onSave with text:", textToSave);
      onSave(textToSave, audioBlob, audioUrl);
    } else {
      console.log("VIC: No text and no audio to save.");
    }
    accumulatedFinalTranscriptRef.current = ""; // Reset for next session
  }, [finalTranscript, onSave]); // Depends on finalTranscript (state) and onSave (prop)

  const handleError = useCallback((error: string) => {
    console.error(`VIC: handleError. Error: ${error}`);
    setRecordingState("error");
    setInterimTranscript("");
    setAudioDataForWaveform(null);
    toast.error(error || "An unknown recording error occurred.", { duration: 5000 });
  }, []); // Fully stable

  const handleAudioData = useCallback((dataArray: Uint8Array) => {
    if (showWaveform) {
      setAudioDataForWaveform(new Uint8Array(dataArray));
    }
  }, [showWaveform]); // Stable if showWaveform is stable (prop)

  useEffect(() => {
    console.log("VIC: useEffect for EnhancedSpeechRecorder setup/re-setup running.");
    speechRecorderRef.current = new EnhancedSpeechRecorder({
      onFinalTranscript: handleFinalTranscriptSegment,
      onInterimTranscript: handleInterimTranscript,
      onRecordingStart: handleRecordingStart,
      onRecordingStop: handleRecordingStop,
      onError: handleError,
      onAudioData: handleAudioData,
      silenceTimeout: silenceTimeout,
    });
    console.log("VIC: EnhancedSpeechRecorder instance (re)created.");

    return () => {
      console.log("VIC: Cleanup useEffect - Stopping old recorder instance.");
      speechRecorderRef.current?.stopRecording();
      // currentAudioUrl is managed by its own state and revoked in handleRecordingStart or component unmount.
    };
  }, [handleFinalTranscriptSegment, handleInterimTranscript, handleRecordingStart, handleRecordingStop, handleError, handleAudioData, silenceTimeout]);
  
  useEffect(() => {
    // This effect syncs finalTranscript with initialText when the component is not actively recording/listening.
    // It's important if the parent component changes initialText.
    if (recordingState !== 'recording' && recordingState !== 'listening') {
        setFinalTranscript(initialText);
    }
  }, [initialText, recordingState]);

  // Effect for cleaning up currentAudioUrl when the component unmounts
  useEffect(() => {
    return () => {
      if (currentAudioUrl) {
        console.log("VIC: Unmount cleanup - Revoking object URL:", currentAudioUrl);
        URL.revokeObjectURL(currentAudioUrl);
      }
    };
  }, [currentAudioUrl]);


  const toggleRecording = async () => {
    console.log(`VIC: toggleRecording. Current state: ${recordingState}`);
    if (disabled) return;

    if (recordingState === "recording" || recordingState === "listening") {
      console.log("VIC: Attempting to stop recording.");
      speechRecorderRef.current?.stopRecording();
    } else {
      setErrorDetails(null);
      console.log("VIC: Attempting to start recording. Setting state to 'listening'.");
      setRecordingState("listening"); 
      try {
        await speechRecorderRef.current?.startRecording();
        console.log("VIC: speechRecorderRef.startRecording() promise resolved/returned.");
        // Note: actual recording starts when ESR's onstart fires, which calls handleRecordingStart, setting state to "recording"
      } catch (e) {
        console.error("VIC: Error caught from startRecording() call:", e);
        // This catch is for synchronous errors from startRecording itself, if any.
        // Most permission/device errors are handled asynchronously by ESR's onError.
        handleError(e instanceof Error ? e.message : "Failed to start recording (unknown error).");
      }
    }
  };

  const handleTextDisplaySave = (newText: string) => {
    console.log("VIC: handleTextDisplaySave (manual save from editor):", newText);
    setFinalTranscript(newText);
    onSave(newText, currentAudioBlob, currentAudioUrl);
    toast.success("Text saved manually!");
  };

  const handleRetryError = () => {
    console.log("VIC: handleRetryError.");
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