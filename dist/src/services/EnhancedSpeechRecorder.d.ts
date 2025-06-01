interface EnhancedSpeechRecorderOptions {
    onFinalTranscript: (transcript: string) => void;
    onInterimTranscript: (transcript: string) => void;
    onRecordingStart: () => void;
    onRecordingStop: (audioBlob: Blob | null, audioUrl: string | null) => void;
    onError: (error: string) => void;
    onAudioData: (dataArray: Uint8Array) => void;
    silenceTimeout?: number;
    initialSpeechTimeout?: number;
    continuous?: boolean;
    interimResults?: boolean;
}
declare class EnhancedSpeechRecorder {
    private mediaRecorder;
    private audioChunks;
    private speechRecognition;
    private audioContext;
    private analyserNode;
    private sourceNode;
    private dataArray;
    private animationFrameId;
    private drawWaveformCallCount;
    private silenceTimeoutId;
    private initialSpeechTimeoutId;
    private hasDetectedSpeech;
    private isManuallyStopping;
    private stopReason;
    private recognitionServiceTrulyActive;
    private options;
    constructor(options: EnhancedSpeechRecorderOptions);
    private initializeSpeechRecognition;
    private startInitialSpeechTimer;
    private clearInitialSpeechTimer;
    private resetSilenceTimer;
    private clearSilenceTimer;
    private setupMediaRecorder;
    private drawWaveform;
    private cleanupAudioProcessing;
    startRecording(): Promise<void>;
    stopRecording(manualReason?: 'manual' | 'error'): void;
    private stopRecordingInternal;
    dispose(): void;
}
export default EnhancedSpeechRecorder;
//# sourceMappingURL=EnhancedSpeechRecorder.d.ts.map