export type RecordingState =
  | "idle"
  | "listening"
  | "recording"
  | "processing"
  | "error";

export interface EnhancedSpeechRecorderOptions {
  onInterimTranscript: (transcript: string) => void;
  onFinalTranscript: (transcript: string) => void;
  onAudioData?: (dataArray: Uint8Array) => void; // For waveform
  onRecordingStateChange?: (state: RecordingState) => void;
  onError?: (error: string) => void;
  onStop?: (audioBlob?: Blob, audioUrl?: string) => void;
}

export interface VoiceInputCaptureProps {
  onSave: (finalText: string, audioBlob?: Blob, audioUrl?: string) => void;
  initialText?: string;
  showWaveform?: boolean;
  showInterimTranscript?: boolean;
  customWaveformColor?: string;
  customMicIcon?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
}