// import { VoiceInputCaptureProps, RecordingState } from '@/types'; // Unused import

interface EnhancedSpeechRecorderOptions {
  onFinalTranscript: (transcript: string) => void;
  onInterimTranscript: (transcript: string) => void;
  onRecordingStart: () => void; // Called when speech recognition service actually starts
  onRecordingStop: (audioBlob: Blob | null, audioUrl: string | null) => void;
  onError: (error: string) => void;
  onAudioData: (dataArray: Uint8Array) => void;
  silenceTimeout?: number;
  initialSpeechTimeout?: number;
  continuous?: boolean;
  interimResults?: boolean;
}

const DEFAULT_ESR_SILENCE_TIMEOUT = 3000;
const DEFAULT_ESR_INITIAL_SPEECH_TIMEOUT = 5000;

class EnhancedSpeechRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private speechRecognition: any | null = null; 
  private audioContext: AudioContext | null = null;
  private analyserNode: AnalyserNode | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;
  private dataArray: Uint8Array | null = null;
  private animationFrameId: number | null = null;

  private silenceTimeoutId: NodeJS.Timeout | null = null;
  private initialSpeechTimeoutId: NodeJS.Timeout | null = null;
  private hasDetectedSpeech: boolean = false;
  private isManuallyStopping: boolean = false;
  private stopReason: 'silence' | 'initial_timeout' | 'manual' | 'error' | 'dispose' | null = null;

  private recognitionServiceTrulyActive: boolean = false; 

  private options: EnhancedSpeechRecorderOptions;

  constructor(options: EnhancedSpeechRecorderOptions) {
    this.options = {
      ...options, // Spread incoming options first
      // Then ensure defaults are applied if the specific timeout options are undefined or null
      silenceTimeout: options.silenceTimeout ?? DEFAULT_ESR_SILENCE_TIMEOUT, 
      initialSpeechTimeout: options.initialSpeechTimeout ?? DEFAULT_ESR_INITIAL_SPEECH_TIMEOUT,
      continuous: options.continuous ?? true,
      interimResults: options.interimResults ?? true,
    };
    // Log the effective timeouts being used by ESR
    console.log("ESR: Constructor - Effective Silence Timeout:", this.options.silenceTimeout, "Effective Initial Speech Timeout:", this.options.initialSpeechTimeout);
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition() { /* ... no change ... */ }
  private startInitialSpeechTimer() {
    this.clearInitialSpeechTimer();
    this.hasDetectedSpeech = false;
    // Use the effective timeout from this.options
    const timeoutDuration = this.options.initialSpeechTimeout; 
    console.log("ESR: Starting initial speech timer for ms:", timeoutDuration);
    this.initialSpeechTimeoutId = setTimeout(() => {
      if (!this.hasDetectedSpeech && this.recognitionServiceTrulyActive) { 
        console.log("ESR: Initial speech timeout, stopping recording.");
        this.options.onError("No speech detected within the initial timeout.");
        this.stopReason = 'initial_timeout';
        this.stopRecordingInternal('initial_timeout');
      }
    }, timeoutDuration); // Pass the effective duration
  }

  private clearInitialSpeechTimer() { /* ... no change ... */ }

  private resetSilenceTimer() {
    this.clearSilenceTimer();
    if (this.recognitionServiceTrulyActive) {
      const timeoutDuration = this.options.silenceTimeout;
      // console.log("ESR: Resetting silence timer for ms:", timeoutDuration);
      this.silenceTimeoutId = setTimeout(() => {
        if (this.recognitionServiceTrulyActive) { 
          console.log("ESR: Silence (pause) detected by custom timer, stopping recording.");
          this.stopReason = 'silence';
          this.stopRecordingInternal('silence');
        }
      }, timeoutDuration);
    }
  }
  private clearSilenceTimer() { /* ... no change ... */ }
  private setupMediaRecorder(stream: MediaStream) { /* ... no change ... */ }
  private drawWaveform = () => { /* ... no change ... */ };
  private cleanupAudioProcessing = () => { /* ... no change ... */ };
  async startRecording(): Promise<void> { /* ... no change ... */ }
  stopRecording(manualReason: 'manual' | 'error' = 'manual'): void { /* ... no change ... */ }
  private stopRecordingInternal(reason: 'silence' | 'initial_timeout' | 'manual' | 'error' | 'dispose'): void { /* ... no change ... */ }
  public dispose(): void { /* ... no change ... */ }
}

export default EnhancedSpeechRecorder;