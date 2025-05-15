export type RecordingState =
  | "idle"
  | "listening" // Mic active, waiting for speech
  | "recording" // Actively recording and transcribing
  | "processing" // Optional: after recording stops, before final transcript
  | "editing" // When text is being manually edited
  | "error";

export interface VoiceInputCaptureProps {
  onSave: (finalText: string, audioBlob?: Blob, audioUrl?: string) => void;
  initialText?: string;
  showWaveform?: boolean; // Default: true
  showInterimTranscript?: boolean; // Default: true
  customWaveformColor?: string;
  customMicIcon?: React.ReactNode;
  placeholder?: string; // Text to show in the editable area
  disabled?: boolean;
}

export interface EnhancedSpeechRecorderOptions {
  onInterimTranscript?: (transcript: string) => void;
  onFinalTranscript: (transcript: string) => void;
  onRecordingStart?: () => void;
  onRecordingStop?: (audioBlob: Blob | null, audioUrl: string | null) => void;
  onError: (error: string) => void;
  onAudioData?: (dataArray: Uint8Array) => void; // For waveform
}