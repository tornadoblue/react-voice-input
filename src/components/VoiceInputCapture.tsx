import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, AlertTriangle, RotateCcw, Info } from 'lucide-react'; // Added Info icon
import EditableTextDisplay from './EditableTextDisplay';
import WaveformDisplay from './WaveformDisplay';
import EnhancedSpeechRecorder from '@/services/EnhancedSpeechRecorder';
import { VoiceInputCaptureProps, RecordingState } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { decodeAudioBlob, findLastSoundEndTime, trimAudioBuffer, audioBufferToWavBlob } from '@/utils/audioUtils';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"; // Added Tooltip
import packageJson from '../../package.json'; // Import version from package.json

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
  showVersionInfo = true, // Default to true
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

  const handleFinalTranscriptSegment = useCallback((segment: string) => { /* ... no changes ... */ }, []);
  const handleInterimTranscript = useCallback((transcript: string) => { /* ... no changes ... */ }, [showInterimTranscript]);
  const handleRecordingStart = useCallback(() => { /* ... no changes ... */ }, []);
  const handleRecordingStop = useCallback(async (audioBlob: Blob | null, audioUrl: string | null) => { /* ... no changes ... */ }, [onSave]);
  const handleError = useCallback((error: string) => { /* ... no changes ... */ }, []);
  const handleAudioData = useCallback((dataArray: Uint8Array) => { /* ... no changes ... */ }, [showWaveform]);

  useEffect(() => { 
    // console.log("VIC: Main useEffect for ESR setup. Silence:", silenceTimeout, "Initial:", initialSpeechTimeout);
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
      // console.log("VIC: Main useEffect cleanup - Disposing recorder.");
      recorder.dispose(); 
      speechRecorderRef.current = null; 
    };
  }, [handleFinalTranscriptSegment, handleInterimTranscript, handleRecordingStart, handleRecordingStop, handleError, handleAudioData, silenceTimeout, initialSpeechTimeout]);
  
  useEffect(() => { /* ... no changes ... */ }, [initialText, finalTranscript]);
  useEffect(() => { /* ... no changes ... */ }, [currentAudioUrl]);

  const toggleRecording = async () => { /* ... no changes ... */ };
  const handleTextDisplaySave = (newText: string) => { /* ... no changes ... */ };
  const handleRetryError = () => { /* ... no changes ... */ };

  const isRecordingOrListening = recordingState === "recording" || recordingState === "listening";
  const getButtonIcon = () => { /* ... no changes ... */ };
  const getButtonText = () => { /* ... no changes ... */ };

  const componentVersion = packageJson.version;

  return ( 
    <div className={cn("relative p-3 sm:p-4 border rounded-lg shadow-sm bg-card w-full max-w-2xl mx-auto space-y-3", { "opacity-75 cursor-not-allowed": disabled })}>
      {showVersionInfo && componentVersion && (
        <div className="absolute top-2 right-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Version: {componentVersion}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pt-4"> {/* Added pt-4 for spacing if version info is present */}
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