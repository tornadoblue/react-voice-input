import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, AlertTriangle, RotateCcw } from 'lucide-react';
import EditableTextDisplay from './EditableTextDisplay';
import WaveformDisplay from './WaveformDisplay';
import EnhancedSpeechRecorder from '@/services/EnhancedSpeechRecorder';
import { VoiceInputCaptureProps, RecordingState } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { decodeAudioBlob, findLastSilenceStartTime } from '@/utils/audioUtils'; // Import new utils

const STOP_COMMAND = "stop recording";

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
    // console.log("VIC: Final segment received:", segment);
    if (segment) {
      accumulatedFinalTranscriptRef.current = (accumulatedFinalTranscriptRef.current.trim() + " " + segment.trim()).trim();
      // console.log("VIC: accumulatedFinalTranscriptRef.current is now:", accumulatedFinalTranscriptRef.current);
      if (recordingStateRef.current === "recording") {
        setFinalTranscript(accumulatedFinalTranscriptRef.current);
      }
    }
  }, []);

  const handleInterimTranscript = useCallback((transcript: string) => {
    if (showInterimTranscript) setInterimTranscript(transcript);
  }, [showInterimTranscript]);

  const handleRecordingStart = useCallback(() => {
    // console.log("VIC: handleRecordingStart - Setting state to 'recording'.");
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
    let textFromSpeechSession = accumulatedFinalTranscriptRef.current.trim();
    console.log(`VIC: handleRecordingStop. Text from speech session: "${textFromSpeechSession}"`);
    
    setRecordingState("idle");
    setInterimTranscript("");
    
    let commandDetected = false;
    let finalAudioBlob = audioBlob; // Use a new variable for potentially trimmed blob
    let finalAudioUrl = audioUrl;   // And new URL

    if (textFromSpeechSession.toLowerCase().endsWith(STOP_COMMAND)) {
      const commandIndex = textFromSpeechSession.toLowerCase().lastIndexOf(STOP_COMMAND);
      if (commandIndex === 0 || (commandIndex > 0 && textFromSpeechSession[commandIndex - 1] === ' ')) {
        console.log("VIC: 'stop recording' command detected in text.");
        textFromSpeechSession = textFromSpeechSession.substring(0, commandIndex).trim();
        commandDetected = true;

        if (audioBlob) {
          console.log("VIC: Attempting to analyze audio for command trimming...");
          const decodedInfo = await decodeAudioBlob(audioBlob);
          if (decodedInfo) {
            console.log(`VIC: Audio decoded. Duration: ${decodedInfo.duration.toFixed(2)}s`);
            // For "stop recording", we want to find silence *before* the command.
            // This is complex. For now, let's just log the end silence.
            // A more robust approach would be to estimate command duration and look for silence before that.
            const silenceStartTime = findLastSilenceStartTime(decodedInfo.audioBuffer, 0.5, 0.01, 0.05); // Shorter silence for command context
            if (silenceStartTime !== null) {
              console.log(`VIC: Last significant silence in audio starts at ${silenceStartTime.toFixed(2)}s. Original duration: ${decodedInfo.duration.toFixed(2)}s.`);
              // TODO: Actual trimming logic would go here.
              // For now, we are NOT trimming the audioBlob.
              // finalAudioBlob = createTrimmedBlob(decodedInfo.audioBuffer, 0, silenceStartTime);
              // if (finalAudioUrl) URL.revokeObjectURL(finalAudioUrl);
              // finalAudioUrl = URL.createObjectURL(finalAudioBlob);
              toast.info("Audio analysis for 'stop recording' command (logging only).");
            } else {
              console.log("VIC: Could not find suitable silence point for command audio trimming.");
            }
          } else {
            console.warn("VIC: Could not decode audio for command analysis.");
          }
        }
      }
    }
    
    setFinalTranscript(textFromSpeechSession); // Update editor with potentially trimmed text
    setCurrentAudioBlob(finalAudioBlob); // Store the (currently untrimmed) blob
    setCurrentAudioUrl(finalAudioUrl);   // And its URL

    if (textFromSpeechSession) { 
      console.log("VIC: Calling onSave with text:", textFromSpeechSession);
      onSave(textFromSpeechSession, finalAudioBlob, finalAudioUrl);
    } else {
      if (commandDetected) {
        toast.info("'Stop recording' command processed.");
      } else {
        toast.info("No text detected for dictation.");
      }
      setFinalTranscript(""); 
    }
    accumulatedFinalTranscriptRef.current = "";
  }, [onSave]);

  const handleError = useCallback((error: string) => {
    // ... (same as before)
    console.error(`VIC: handleError. Error: ${error}`);
    setRecordingState("error");
    setInterimTranscript("");
    setAudioDataForWaveform(null);
    toast.error(error || "An unknown recording error occurred.", { duration: 5000 });
    accumulatedFinalTranscriptRef.current = "";
  }, []);

  const handleAudioData = useCallback((dataArray: Uint8Array) => {
    // ... (same as before)
    if (showWaveform) {
      setAudioDataForWaveform(new Uint8Array(dataArray));
    }
  }, [showWaveform]);

  useEffect(() => {
    // ... (same as before, ensure initialSpeechTimeout is passed)
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
    // ... (same as before)
    if (recordingStateRef.current !== 'recording' && recordingStateRef.current !== 'listening') {
      if (initialText !== finalTranscript) {
        setFinalTranscript(initialText);
      }
    }
  }, [initialText, finalTranscript]);

  useEffect(() => {
    // ... (same as before)
    const urlToRevoke = currentAudioUrl;
    return () => {
      if (urlToRevoke) URL.revokeObjectURL(urlToRevoke);
    };
  }, [currentAudioUrl]);

  const toggleRecording = async () => {
    // ... (same as before)
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
    // ... (same as before)
    setFinalTranscript(newText); 
    onSave(newText, currentAudioBlob, currentAudioUrl); 
    toast.success("Text saved manually!");
  };

  const handleRetryError = () => {
    // ... (same as before)
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