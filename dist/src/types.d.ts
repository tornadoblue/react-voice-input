export interface VoiceInputCaptureProps {
    onSave: (text: string, audioBlob: Blob | null, audioUrl: string | null) => void;
    initialText?: string;
    autoStartRecording?: boolean;
    showWaveform?: boolean;
    showInterimTranscript?: boolean;
    customWaveformColor?: string;
    placeholder?: string;
    disabled?: boolean;
    silenceTimeout?: number;
    initialSpeechTimeout?: number;
    showVersionInfo?: boolean;
    textDisplayClassName?: string;
    interimTranscriptClassName?: string;
    recordButtonClassName?: string;
    className?: string;
}
export type RecordingState = "idle" | "listening" | "recording" | "error";
//# sourceMappingURL=types.d.ts.map