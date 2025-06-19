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
  showVersionInfo?: boolean;
  textDisplayClassName?: string;
  interimTranscriptClassName?: string; // New prop for styling the interim transcript
  recordButtonClassName?: string; // New prop for styling the record button
  className?: string;
}

export type RecordingState = "idle" | "listening" | "recording" | "error";