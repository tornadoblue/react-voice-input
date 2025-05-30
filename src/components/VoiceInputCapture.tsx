import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, AlertTriangle, RotateCcw } from 'lucide-react';
import EditableTextDisplay from './EditableTextDisplay';
import WaveformDisplay from './WaveformDisplay';
import EnhancedSpeechRecorder from '@/services/EnhancedSpeechRecorder';
import { VoiceInputCaptureProps, RecordingState } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { decodeAudioBlob, findLastSoundEndTime, trimAudioBuffer, audioBufferToWavBlob } from '@/utils/audioUtils';

const STOP_COMMAND = "stop recording";
const MIN_TRAILING_SILENCE_FOR_TRIM_S = 0.75;

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const VoiceInputCapture: React.FC<VoiceInputCaptureProps> = ({
  onSave,
  initialText = "",
  showWaveform = true,
  showInterimTranscript = true,
  customWaveformColor,
  placeholder = "Speak or type here...",
  disabled = false,
  silenceTimeout, // This comes from VoiceInputCaptureProps now
  initialSpeechTimeout, // This comes from VoiceInputCaptureProps now
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
    const newSegment = segment.trim();
    if (!newSegment) return; // Ignore empty segments

    let currentText = accumulatedFinalTranscriptRef.current;

    if (!currentText) {
      // This is the very first segment of the dictation
      accumulatedFinalTranscriptRef.current = capitalizeFirstLetter(newSegment);
    } else {
      // There's existing text. Check if it needs a period.
      const lastChar = currentText.slice(-1);
      const endsWithPunctuation = ['.', '!', '?'].includes(lastChar);
      const endsWithSpace = currentText.endsWith(" ");

      if (!endsWithPunctuation && !endsWithSpace) {
        currentText += ". "; // Add period and space
      } else if (endsWithPunctuation && !endsWithSpace) {
        currentText += " "; // Add space if punctuation exists but no space
      }
      // If it ends with space already (e.g. after ". "), no need to add another.
      
      accumulatedFinalTranscriptRef.current = currentText + capitalizeFirstLetter(newSegment);
    }
    
    // Ensure no leading/trailing spaces in the final accumulated string for display consistency
    accumulatedFinalTranscriptRef.current = accumulatedFinalTranscriptRef.current.trim();

    if (recordingStateRef.current === "recording") {
      setFinalTranscript(accumulatedFinalTranscriptRef.current);
    }
  }, []);

  const handleInterimTranscript = useCallback((transcript: string) => {
    if (showInterimTranscript) setInterimTranscript(transcript);
  }, [showInterimTranscript]);

  const handleRecordingStart = useCallback(() => {
    setRecordingState("recording");
    setErrorDetails(null);
    setInterimTranscript("");
    // Reset accumulated transcript for the new recording session
    accumulatedFinalTranscriptRef.current = ""; 
    setFinalTranscript(""); // Clear the display for the new recording
    setCurrentAudioBlob(null);
    setCurrentAudioUrl(prevUrl => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return null;
    });
  }, []); 

  const handleRecordingStop = useCallback(async (audioBlob: Blob | null, audioUrl: string | null) => {
    let textFromSpeechSession = accumulatedFinalTranscriptRef.current.trim();
    console.log(`VIC: handleRecordingStop. Text: "${textFromSpeechSession}", Blob: ${!!audioBlob}`);
    
    // Add a final period if the text doesn't end with one and is not empty
    if (textFromSpeechSession && !['.', '!', '?'].includes(textFromSpeechSession.slice(-1))) {
        textFromSpeechSession += ".";
    }

    setRecordingState("idle");
    setInterimTranscript("");
    
    let commandDetected = false;
    let processedAudioBlob = audioBlob;
    let processedAudioUrl = audioUrl;

    if (textFromSpeechSession.toLowerCase().endsWith(STOP_COMMAND + ".") && audioBlob) { // Check with period
      const commandTextWithPunc = STOP_COMMAND + ".";
      const commandIndex = textFromSpeechSession.toLowerCase().lastIndexOf(commandTextWithPunc);
      
      if (commandIndex === 0 || (commandIndex > 0 && textFromSpeechSession[commandIndex - 1] === ' ')) {
        console.log("VIC: 'stop recording.' command detected in text. Attempting audio trim.");
        textFromSpeechSession = textFromSpeechSession.substring(0, commandIndex).trim();
        commandDetected = true;

        const decodedInfo = await decodeAudioBlob(audioBlob);
        if (decodedInfo) {
          const soundEndTime = findLastSoundEndTime(decodedInfo.audioBuffer, MIN_TRAILING_SILENCE_FOR_TRIM_S); 
          
          if (soundEndTime < decodedInfo.duration - (MIN_TRAILING_SILENCE_FOR_TRIM_S / 2)) {
            console.log(`VIC: Sound before command/trailing silence estimated to end at ${soundEndTime.toFixed(2)}s. Original duration: ${decodedInfo.duration.toFixed(2)}s.`);
            const trimmedBuffer = trimAudioBuffer(decodedInfo.audioBuffer, soundEndTime);
            if (trimmedBuffer && trimmedBuffer !== decodedInfo.audioBuffer) {
              const trimmedWavBlob = audioBufferToWavBlob(trimmedBuffer);
              if (processedAudioUrl) URL.revokeObjectURL(processedAudioUrl); 
              processedAudioBlob = trimmedWavBlob;
              processedAudioUrl = URL.createObjectURL(trimmedWavBlob);
              toast.success("Audio trimmed for 'stop recording' command.");
              console.log(`VIC: Audio trimmed. New blob size: ${processedAudioBlob.size}, New URL: ${processedAudioUrl}`);
            } else if (trimmedBuffer === decodedInfo.audioBuffer) {
              toast.info("Audio trim resulted in no change, using original audio.");
            } else { 
              toast.warn("Audio trimming failed, using original audio.");
            }
          } else {
            toast.info("No significant trailing silence to trim, using original audio.");
          }
        } else {
          toast.warn("Audio decoding failed for trimming, using original audio.");
        }
      }
    }
    
    setFinalTranscript(textFromSpeechSession);
    setCurrentAudioBlob(processedAudioBlob);
    setCurrentAudioUrl(processedAudioUrl);

    if (textFromSpeechSession || processedAudioBlob) { // Save if there's text OR an audio blob
      onSave(textFromSpeechSession, processedAudioBlob, processedAudioUrl);
    } else {
      if (commandDetected) toast.info("'Stop recording' command processed, no other content.");
      else toast.info("No text or audio detected for dictation.");
      setFinalTranscript(""); 
    }
    // accumulatedFinalTranscriptRef.current = ""; // Already reset in handleRecordingStart for next session
  }, [onSave]);

  const handleError = useCallback((error: string) => { 
    console.error(`VIC: handleError. Error: ${error}`);
    setRecordingState("error");
    setErrorDetails(error); // Set error details to display
    setInterimTranscript("");
    setAudioDataForWaveform(null);
    toast.error(error || "An unknown recording error occurred.", { duration: 5000 });
    accumulatedFinalTranscriptRef.current = "";
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
      speechRecorderRef.current?.stopRecording('manual'); // Ensure stop on unmount
    };
  }, [handleFinalTranscriptSegment, handleInterimTranscript, handleRecordingStart, handleRecordingStop, handleError, handleAudioData, silenceTimeout, initialSpeechTimeout]);
  
  useEffect(() => { 
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
      speechRecorderRef.current?.stopRecording('manual');
    } else {
      setErrorDetails(null);
      setRecordingState("listening"); 
      await speechRecorderRef.current?.startRecording();
    }
  };

  const handleTextDisplaySave = (newText: string) => { 
    setFinalTranscript(newText); 
    onSave(newText, currentAudioBlob, currentAudioUrl); 
    toast.success("Text saved manually!");
  };

  const handleRetryError = () => { 
    setErrorDetails(null);
    setRecordingState("idle");
    // Optionally, immediately try to start recording again or let user click "Start Recording"
    // For now, just resets to idle.
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
          disabled={disabled && recordingState !== 'error'} // Allow retry even if main component is disabled
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
            // Pass disabled state to EditableTextDisplay if it should also be disabled
            // disabled={disabled || isRecordingOrListening} 
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
      {showWaveform && recordingState === "idle" && !errorDetails && ( // Show empty waveform when idle and no error
         <WaveformDisplay audioData={null} color={customWaveformColor} className="w-full h-16" />
      )}
    </div>
  );
};