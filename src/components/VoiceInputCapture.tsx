import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, AlertTriangle, RotateCcw, Info } from 'lucide-react'; // Info icon is kept
import EditableTextDisplay from './EditableTextDisplay';
import WaveformDisplay from './WaveformDisplay';
import EnhancedSpeechRecorder from '@/services/EnhancedSpeechRecorder';
import { VoiceInputCaptureProps, RecordingState } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { decodeAudioBlob, findLastSoundEndTime, trimAudioBuffer, audioBufferToWavBlob } from '@/utils/audioUtils';
// import packageJson from '../../package.json'; // REMOVED for this test

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
  
  const speechRecorderRef = useRef<EnhancedSpeechRecorder | null>(null);
  const accumulatedFinalTranscriptRef = useRef<string>("");

  const recordingStateRef = useRef(recordingState);
  useEffect(() => {
    recordingStateRef.current = recordingState;
  }, [recordingState]);

  // Callbacks remain the same
  const handleFinalTranscriptSegment = useCallback((segment: string) => { /* ... */ }, []); 
  const handleInterimTranscript = useCallback((transcript: string) => { /* ... */ }, [showInterimTranscript]);
  const handleRecordingStart = useCallback(() => { /* ... */ }, []); 
  const handleRecordingStop = useCallback(async (audioBlob: Blob | null, audioUrl: string | null) => { /* ... */ }, [onSave]); 
  const handleError = useCallback((error: string) => { /* ... */ }, []); 
  const handleAudioData = useCallback((dataArray: Uint8Array) => { /* ... */ }, [showWaveform]);

  useEffect(() => { /* Main ESR setup effect - no changes */ }, [handleFinalTranscriptSegment, handleInterimTranscript, handleRecordingStart, handleRecordingStop, handleError, handleAudioData, silenceTimeout, initialSpeechTimeout]);
  useEffect(() => { /* initialText effect - no changes */ }, [initialText, finalTranscript]); 
  useEffect(() => { /* currentAudioUrl cleanup - no changes */ }, [currentAudioUrl]);

  const toggleRecording = async () => { /* ...no change... */ };
  const handleTextDisplaySave = (newText: string) => { /* ...no change... */ };
  const handleRetryError = () => { /* ...no change... */ };
  const isRecordingOrListening = recordingState === "recording" || recordingState === "listening";
  const getButtonIcon = () => { /* ...no change... */ };
  const getButtonText = () => { /* ...no change... */ };

  // const componentVersion = packageJson.version; // REMOVED for this test
  const componentVersion = "0.1.X (test)"; // Hardcoded for this test

  return ( 
    <div className={cn("relative p-3 sm:p-4 border rounded-lg shadow-sm bg-card w-full max-w-2xl mx-auto space-y-3", { "opacity-75 cursor-not-allowed": disabled })}>
      {showVersionInfo && componentVersion && ( // componentVersion is now the hardcoded string
        <div className="absolute top-2 right-2 flex items-center space-x-1 text-xs text-muted-foreground">
          <Info className="w-3 h-3" />
          <span>v{componentVersion}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
        <Button 
          onClick={recordingState === 'error' ? handleRetryError : toggleRecording} 
          disabled={disabled && recordingState !== 'error'}
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
      
      {/* Rest of the JSX remains unchanged */}
      {recordingState === "error" && errorDetails && ( /* ... */ )}
      {showInterimTranscript && isRecordingOrListening && interimTranscript && ( /* ... */ )}
      {showWaveform && isRecordingOrListening && ( /* ... */ )}
      {showWaveform && recordingState === "idle" && !errorDetails && ( /* ... */ )}
    </div>
  );
};