import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, AlertTriangle, RotateCcw, Info, Save } from 'lucide-react';
import EditableTextDisplay from './EditableTextDisplay';
import WaveformDisplay from './WaveformDisplay';
import EnhancedSpeechRecorder from '@/services/EnhancedSpeechRecorder';
import { VoiceInputCaptureProps, RecordingState } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { decodeAudioBlob, findLastSoundEndTime, trimAudioBuffer, audioBufferToWavBlob } from '@/utils/audioUtils';
import packageJson from '../../package.json'; 

const STOP_COMMAND = "stop recording";
const MIN_TRAILING_SILENCE_FOR_TRIM_S = 0.75;
const DEFAULT_VIC_SILENCE_TIMEOUT = 3000;
const DEFAULT_VIC_INITIAL_SPEECH_TIMEOUT = 5000;

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
  silenceTimeout = DEFAULT_VIC_SILENCE_TIMEOUT,
  initialSpeechTimeout = DEFAULT_VIC_INITIAL_SPEECH_TIMEOUT,
  showVersionInfo = true, 
}) => {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [finalTranscript, setFinalTranscript] = useState<string>(initialText);
  const [audioDataForWaveform, setAudioDataForWaveform] = useState<Uint8Array | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [currentAudioBlob, setCurrentAudioBlob] = useState<Blob | null>(null);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const speechRecorderRef = useRef<EnhancedSpeechRecorder | null>(null);
  const accumulatedFinalTranscriptRef = useRef<string>("");

  const recordingStateRef = useRef(recordingState);
  useEffect(() => {
    recordingStateRef.current = recordingState;
  }, [recordingState]);

  const handleFinalTranscriptSegment = useCallback((segment: string) => {
    const newSegment = segment.trim();
    if (!newSegment) return;
    let currentText = accumulatedFinalTranscriptRef.current;
    if (!currentText) {
      accumulatedFinalTranscriptRef.current = capitalizeFirstLetter(newSegment);
    } else {
      const lastChar = currentText.slice(-1);
      const endsWithPunctuation = ['.', '!', '?'].includes(lastChar);
      const endsWithSpace = currentText.endsWith(" ");
      if (!endsWithPunctuation && !endsWithSpace) currentText += ". "; 
      else if (endsWithPunctuation && !endsWithSpace) currentText += " "; 
      accumulatedFinalTranscriptRef.current = currentText + capitalizeFirstLetter(newSegment);
    }
    accumulatedFinalTranscriptRef.current = accumulatedFinalTranscriptRef.current.trim();
    if (recordingStateRef.current === "recording") { 
      setFinalTranscript(accumulatedFinalTranscriptRef.current);
      // If actively recording and editing, update isEditing to false as speech takes over.
      // This is a choice: speech input overrides manual edits during active recording.
      setIsEditing(false); 
    }
  }, []); 

  const handleInterimTranscript = useCallback((transcript: string) => {
    if (showInterimTranscript) {
      setInterimTranscript(transcript);
      // If user was editing, interim results might make them stop.
      // Or, we can let them type over interim results. For now, just display.
    }
  }, [showInterimTranscript]);

  const handleRecordingStart = useCallback(() => {
    setRecordingState("recording");
    setErrorDetails(null);
    setInterimTranscript("");
    // Decide if `finalTranscript` (and thus `accumulatedFinalTranscriptRef.current`) should be cleared
    // If we want to append to existing text, don't clear `finalTranscript` here.
    // If new recording always starts fresh, then clear:
    // accumulatedFinalTranscriptRef.current = ""; 
    // setFinalTranscript(""); // This would clear text on new recording start.
    // For now, let's assume new recording might append or start fresh based on `initialText` prop behavior.
    // The current behavior is that `finalTranscript` is NOT cleared here, allowing append.
    // `accumulatedFinalTranscriptRef` is for the current speech session.
    accumulatedFinalTranscriptRef.current = "";


    setCurrentAudioBlob(null);
    setCurrentAudioUrl(prevUrl => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return null;
    });
    setIsEditing(false); // Not editing when recording starts
  }, []); 

  const handleRecordingStop = useCallback(async (audioBlob: Blob | null, audioUrl: string | null) => {
    let textFromSpeechSession = accumulatedFinalTranscriptRef.current.trim();
    
    // If there's speech text, ensure it ends with punctuation.
    if (textFromSpeechSession && !['.', '!', '?'].includes(textFromSpeechSession.slice(-1))) {
        textFromSpeechSession += ".";
    }

    // Combine with any pre-existing finalTranscript if it wasn't cleared at recording start
    // This logic depends on whether we want to append or overwrite.
    // For now, let's assume textFromSpeechSession is the primary result of this session.
    // If finalTranscript held prior edits, we need a strategy to merge or choose.
    // The current `setFinalTranscript(textFromSpeechSession)` overwrites.
    
    setRecordingState("idle");
    setInterimTranscript(""); // Clear interim
    let commandDetected = false;
    let processedAudioBlob = audioBlob;
    let processedAudioUrl = audioUrl;

    if (textFromSpeechSession.toLowerCase().endsWith(STOP_COMMAND + ".") && audioBlob) { 
      const commandTextWithPunc = STOP_COMMAND + ".";
      const commandIndex = textFromSpeechSession.toLowerCase().lastIndexOf(commandTextWithPunc);
      if (commandIndex === 0 || (commandIndex > 0 && textFromSpeechSession[commandIndex - 1] === ' ')) {
        textFromSpeechSession = textFromSpeechSession.substring(0, commandIndex).trim();
        commandDetected = true;
        const decodedInfo = await decodeAudioBlob(audioBlob);
        if (decodedInfo) {
          const soundEndTime = findLastSoundEndTime(decodedInfo.audioBuffer, MIN_TRAILING_SILENCE_FOR_TRIM_S); 
          if (soundEndTime < decodedInfo.duration - (MIN_TRAILING_SILENCE_FOR_TRIM_S / 2)) {
            const trimmedBuffer = trimAudioBuffer(decodedInfo.audioBuffer, soundEndTime);
            if (trimmedBuffer && trimmedBuffer !== decodedInfo.audioBuffer) {
              const trimmedWavBlob = audioBufferToWavBlob(trimmedBuffer);
              if (processedAudioUrl) URL.revokeObjectURL(processedAudioUrl); 
              processedAudioBlob = trimmedWavBlob;
              processedAudioUrl = URL.createObjectURL(trimmedWavBlob);
            }
          }
        }
      }
    }
    
    // Update finalTranscript state with the result of the speech session
    setFinalTranscript(textFromSpeechSession); 
    setCurrentAudioBlob(processedAudioBlob);
    setCurrentAudioUrl(processedAudioUrl);

    // Call onSave if there's text OR audio
    if (textFromSpeechSession || processedAudioBlob) { 
      console.log("VIC: handleRecordingStop, calling onSave with:", { text: textFromSpeechSession, blob: !!processedAudioBlob, url: processedAudioUrl });
      onSave(textFromSpeechSession, processedAudioBlob, processedAudioUrl);
    } else {
      // If no text and no audio (e.g., silent recording or immediate stop),
      // and no "stop recording" command was detected, clear finalTranscript.
      if (!commandDetected) {
        // setFinalTranscript(""); // Or revert to initialText if that's desired
      }
      console.log("VIC: handleRecordingStop, NOT calling onSave (no text/audio).");
    }
    setIsEditing(false); // Reset editing state
  }, [onSave, MIN_TRAILING_SILENCE_FOR_TRIM_S]); // Added dependencies

  const handleError = useCallback((error: string) => { 
    setRecordingState("error");
    setErrorDetails(error); 
    setInterimTranscript("");
    setAudioDataForWaveform(null);
    toast.error(error || "An unknown recording error occurred.", { duration: 5000 });
    accumulatedFinalTranscriptRef.current = "";
    setIsEditing(false);
  }, []); 

  const handleAudioData = useCallback((dataArray: Uint8Array) => { 
    if (showWaveform) {
      setAudioDataForWaveform(new Uint8Array(dataArray));
    }
  }, [showWaveform]);

  useEffect(() => { 
    const recorder = new EnhancedSpeechRecorder({
      onFinalTranscript: handleFinalTranscriptSegment,
      onInterimTranscript: handleInterimTranscript,
      onRecordingStart: handleRecordingStart,
      onRecordingStop: handleRecordingStop,
      onError: handleError,
      onAudioData: handleAudioData,
      silenceTimeout: silenceTimeout, 
      initialSpeechTimeout: initialSpeechTimeout, 
    });
    speechRecorderRef.current = recorder;
    return () => {
      recorder.dispose(); 
      speechRecorderRef.current = null; 
    };
  }, [handleFinalTranscriptSegment, handleInterimTranscript, handleRecordingStart, handleRecordingStop, handleError, handleAudioData, silenceTimeout, initialSpeechTimeout]);
  
  // Sync finalTranscript with initialText prop if component is reset (e.g. by key change)
  // or if initialText changes externally and we are not recording/editing.
  useEffect(() => { 
    if (!isRecordingOrListening && !isEditing) {
      setFinalTranscript(initialText);
    }
  }, [initialText]); // Removed finalTranscript, isRecordingOrListening, isEditing from deps to avoid loops, focus on initialText changes

  useEffect(() => { 
    const urlToRevoke = currentAudioUrl;
    return () => {
      if (urlToRevoke) {
        URL.revokeObjectURL(urlToRevoke);
      }
    };
  }, [currentAudioUrl]);

  const toggleRecording = async () => { 
    if (disabled) return;
    if (!speechRecorderRef.current) {
      toast.error("Recorder not ready. Please try again.");
      return;
    }
    if (isRecordingOrListening) {
      speechRecorderRef.current.stopRecording('manual');
    } else {
      setErrorDetails(null);
      setRecordingState("listening"); 
      // When starting to record, current finalTranscript becomes the base for accumulated text.
      // accumulatedFinalTranscriptRef.current = finalTranscript; // If we want to append to existing text.
      // For now, speech session starts its own accumulation.
      try {
        await speechRecorderRef.current.startRecording();
      } catch (e) {
        handleError((e as Error).message || "Failed to start recording.");
        setRecordingState("idle"); 
      }
    }
  };

  // This function is called when the text in EditableTextDisplay changes
  const handleTextChangeFromEditor = (newText: string) => {
    setFinalTranscript(newText); // Update the master text state
    if (!isEditing) {
      setIsEditing(true); // Mark that manual editing has begun
    }
  };

  // This function is called when the "Save Text" button is clicked
  const handleManualSave = () => { 
    // finalTranscript already holds the latest text from EditableTextDisplay
    console.log("VIC: handleManualSave, calling onSave with:", { text: finalTranscript, blob: !!currentAudioBlob, url: currentAudioUrl });
    onSave(finalTranscript, currentAudioBlob, currentAudioUrl); 
    toast.success("Text saved manually!");
    setIsEditing(false); // Reset editing state after save
  };

  const handleRetryError = () => { 
    setErrorDetails(null);
    setRecordingState("idle");
    setIsEditing(false);
  };

  const isRecordingOrListening = recordingState === "recording" || recordingState === "listening";

  const getButtonIcon = () => {
    if (recordingState === "error") return <RotateCcw className="w-4 h-4" />;
    if (isRecordingOrListening) return <StopCircle className="w-4 h-4" />;
    return <Mic className="w-4 h-4" />;
  };

  const getButtonText = () => {
    if (recordingState === "error") return "Retry";
    if (recordingState === "listening") return "Listening...";
    if (recordingState === "recording") return "Stop Recording";
    return "Record";
  };

  const componentVersion = packageJson.version;

  // Determine text to display: if recording, show live updates; otherwise, show finalTranscript.
  const displayedText = isRecordingOrListening 
    ? (accumulatedFinalTranscriptRef.current ? accumulatedFinalTranscriptRef.current + (interimTranscript ? " " + interimTranscript : "") : interimTranscript)
    : finalTranscript;

  return ( 
    <div className={cn("relative p-3 sm:p-4 border rounded-lg shadow-sm bg-card w-full max-w-2xl mx-auto space-y-3", { "opacity-75 cursor-not-allowed": disabled })}>
      {showVersionInfo && componentVersion && (
        <div className="absolute top-2 right-2 flex items-center space-x-1 text-xs text-muted-foreground">
          <Info className="w-3 h-3" />
          <span>v{componentVersion}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
        <div className="flex-grow w-full">
          <EditableTextDisplay
            // Keying EditableTextDisplay on displayedText might cause focus loss if not careful.
            // Better to pass displayedText as `initialText` and let EditableTextDisplay manage its own state
            // if it needs to, or make it fully controlled.
            // For now, let EditableTextDisplay take `finalTranscript` and update it.
            // During recording, the text area will show `finalTranscript` which is updated by speech.
            initialText={finalTranscript} // Text area shows current final transcript
            onTextChange={handleTextChangeFromEditor} // Updates finalTranscript and sets isEditing
            placeholder={placeholder}
            className="w-full"
            isEditing={isEditing} // Pass isEditing state
            onEditing={() => setIsEditing(true)} // EditableTextDisplay can call this if it starts editing internally
          />
        </div>
      </div>

       <div className="flex flex-row items-center justify-between">
          <Button 
          onClick={recordingState === 'error' ? handleRetryError : toggleRecording} 
          disabled={disabled && recordingState !== 'error'}
          className={cn("flex-shrink-0 w-full sm:w-auto", recordingState === 'error' ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "")}
          aria-label={getButtonText()}
        >
          {getButtonIcon()}
          <span className="ml-2">{getButtonText()}</span>
        </Button>

        {isEditing && ( // Show save button only if actively editing manually
         <Button onClick={handleManualSave} className="flex-shrink-0 w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            Save Text
        </Button>)}
        </div>
      
      {recordingState === "error" && errorDetails && (
        <div className="flex items-center p-2 text-sm text-destructive-foreground bg-destructive rounded-md">
          <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" /> <span>Error: {errorDetails}</span>
        </div>
      )}
      {/* Display for interim transcript during recording, separate from main text area */}
      {showInterimTranscript && isRecordingOrListening && interimTranscript && (
        <div className="p-2 text-sm text-muted-foreground bg-muted/30 rounded-md min-h-[2.5rem] italic">
          Live: {interimTranscript}
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