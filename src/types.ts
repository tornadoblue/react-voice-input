export type RecordingState = "idle" | "listening" | "recording" | "error";

export interface VoiceInputCaptureProps {
  onSave: (text: string, audioBlob?: Blob | null, audioUrl?: string | null) => void;
  initialText?: string;
  showWaveform?: boolean;
  showInterimTranscript?: boolean;
  customWaveformColor?: string;
  placeholder?: string;
  disabled?: boolean;
  // These are passed from Index to VoiceInputCapture, then to EnhancedSpeechRecorder
  silenceTimeout?: number;
  initialSpeechTimeout?: number;
}