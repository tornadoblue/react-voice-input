import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, AlertTriangle, RotateCcw } from 'lucide-react';
import EditableTextDisplay from './EditableTextDisplay';
import WaveformDisplay from './WaveformDisplay';
import EnhancedSpeechRecorder from '@/services/EnhancedSpeechRecorder';
import { VoiceInputCaptureProps, RecordingState } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { decodeAudioBlob, findLastSilenceStartTime, trimAudioBuffer, audioBufferToWavBlob } from '@/utils/audioUtils';

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
    if (segment) {
      accumulatedFinalTranscriptRef.current = (accumulatedFinalTranscriptRef.current.trim() + " " + segment.trim()).trim();
      if (recordingStateRef.current === "recording") {
        setFinalTranscript(accumulatedFinalTranscriptRef.current);
      }
    }
  }, []);

  const handleInterimTranscript = useCallback((transcript: string) => {
    if (showInterimTranscript) setInterimTranscript(transcript);
  }, [showInterimTranscript]);

  const handleRecordingStart = useCallback(() => {
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
    console.log(`VIC: handleRecordingStop. Text: "${textFromSpeechSession}", Blob: ${!!audioBlob}`);
    
    setRecordingState("idle");
    setInterimTranscript("");
    
    let commandDetected = false;
    let processedAudioBlob = audioBlob;
    let processedAudioUrl = audioUrl;

    if (textFromSpeechSession.toLowerCase().endsWith(STOP_COMMAND) && audioBlob) {
      const commandIndex = textFromSpeechSession.toLowerCase().lastIndexOf(STOP_COMMAND);
      if (commandIndex === 0 || (commandIndex > 0 && textFromSpeechSession[commandIndex - 1] === ' ')) {
        console.log("VIC: 'stop recording' command detected. Attempting audio trim.");
        textFromSpeechSession = textFromSpeechSession.substring(0, commandIndex).trim();
        commandDetected = true;

        const decodedInfo = await decodeAudioBlob(audioBlob);
        if (decodedInfo) {
          // Use a slightly longer minSilenceDuration to ensure we capture the pause *before* the command.
          // The 0.5s was for detecting the silence *after* the command.
          const soundEndTime = findLastSilenceStartTime(decodedInfo.audioBuffer, 0.75, 0.01, 0.1); 
          
          if (soundEndTime !== null && soundEndTime > 0 && soundEndTime < decodedInfo.duration) {
            console.log(`VIC: Sound before command estimated to end at ${soundEndTime.toFixed(2)}s. Original duration: ${decodedInfo.duration.toFixed(2)}s.`);
            const trimmedBuffer = trimAudioBuffer(decodedInfo.audioBuffer, soundEndTime);
            if (trimmedBuffer) {
              const trimmedWavBlob = audioBufferToWavBlob(trimmedBuffer);
              if (processedAudioUrl) URL.revokeObjectURL(processedAudioUrl); // Revoke old URL
              processedAudioBlob = trimmedWavBlob;
              processedAudioUrl = URL.createObjectURL(trimmedWavBlob);
              toast.success("Audio trimmed for 'stop recording' command.");
              console.log(`VIC: Audio trimmed. New blob size: ${processedAudioBlob.size}, New URL: ${processedAudioUrl}`);
            } else {
              toast.warn("Audio trimming failed, using original audio.");
            }
          } else {
            toast.warn("Could not determine trim point, using original audio.");
            console.log("VIC: Could not find suitable silence point for trimming or soundEndTime was invalid.");
          }
        } else {
          toast.warn("Audio decoding failed for trimming, using original audio.");
        }
      }
    }
    
    setFinalTranscript(textFromSpeechSession);
    setCurrentAudioBlob(processedAudioBlob);
    setCurrentAudioUrl(processedAudioUrl);

    if (textFromSpeechSession) { 
      onSave(textFromSpeechSession, processedAudioBlob, processedAudioUrl);
    } else {
      if (commandDetected) toast.info("'Stop recording' command processed.");
      else toast.info("No text detected for dictation.");
      setFinalTranscript(""); 
    }
    accumulatedFinalTranscriptRef.current = "";
  }, [onSave]);

  const handleError = useCallback((error: string) => { /* ... same ... */ 
    console.error(`VIC: handleError. Error: ${error}`);
    setRecordingState("error");
    setInterimTranscript("");
    setAudioDataForWaveform(null);
    toast.error(error || "An unknown recording error occurred.", { duration: 5000 });
    accumulatedFinalTranscriptRef.current = "";
  }, []);
  const handleAudioData = useCallback((dataArray: Uint8Array) => { /* ... same ... */ 
    if (showWaveform) {
      setAudioDataForWaveform(new Uint8Array(dataArray));
    }
  }, [showWaveform]);

  useEffect(() => { /* ... same ... */ 
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
  
  useEffect(() => { /* ... same ... */ 
    if (recordingStateRef.current !== 'recording' && recordingStateRef.current !== 'listening') {
      if (initialText !== finalTranscript) {
        setFinalTranscript(initialText);
      }
    }
  }, [initialText, finalTranscript]);
  useEffect(() => { /* ... same ... */ 
    const urlToRevoke = currentAudioUrl;
    return () => {
      if (urlToRevoke) URL.revokeObjectURL(urlToRevoke);
    };
  }, [currentAudioUrl]);
  const toggleRecording = async () => { /* ... same ... */ 
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
  const handleTextDisplaySave = (newText: string) => { /* ... same ... */ 
    setFinalTranscript(newText); 
    onSave(newText, currentAudioBlob, currentAudioUrl); 
    toast.success("Text saved manually!");
  };
  const handleRetryError = () => { /* ... same ... */ 
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