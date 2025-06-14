export interface VoiceInputCaptureProps {
  onSave: (
    text: string,
    audioBlob: Blob | null,
    audioUrl: string | null
  ) => void;
  initialText?: string;
  showWaveform?: boolean;
  showInterimTranscript?: boolean;
  customWaveformColor?: string;
  placeholder?: string;
  disabled?: boolean;
  silenceTimeout?: number;
  initialSpeechTimeout?: number;
  showVersionInfo?: boolean; // New prop
}

export type RecordingState = "idle" | "listening" | "recording" | "error";