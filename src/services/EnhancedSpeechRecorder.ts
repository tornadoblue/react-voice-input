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

const DEFAULT_SILENCE_TIMEOUT = 3000;
const DEFAULT_INITIAL_SPEECH_TIMEOUT = 5000;

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
      silenceTimeout: options.silenceTimeout ?? DEFAULT_SILENCE_TIMEOUT,
      initialSpeechTimeout: options.initialSpeechTimeout ?? DEFAULT_INITIAL_SPEECH_TIMEOUT,
      continuous: options.continuous ?? true,
      interimResults: options.interimResults ?? true,
      ...options,
    };
    console.log("ESR: Constructor. Silence Timeout:", this.options.silenceTimeout, "Initial Speech Timeout:", this.options.initialSpeechTimeout);
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition() {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      console.warn("ESR: Speech Recognition API not supported. Error will be thrown on startRecording.");
      return;
    }
    try {
      this.speechRecognition = new SpeechRecognitionAPI();
      this.speechRecognition.continuous = this.options.continuous!;
      this.speechRecognition.interimResults = this.options.interimResults!;
      this.speechRecognition.lang = navigator.language || 'en-US';

      this.speechRecognition.onresult = (event: any) => { /* ... no change ... */ };
      this.speechRecognition.onerror = (event: any) => { /* ... no change ... */ };
      this.speechRecognition.onstart = () => { /* ... no change ... */ };
      this.speechRecognition.onend = () => { /* ... no change ... */ };
      this.speechRecognition.onspeechend = () => { /* ... no change ... */ };
    } catch (e) {
        console.error("ESR: Failed to initialize SpeechRecognitionAPI:", e);
        this.speechRecognition = null; 
    }
  }

  private startInitialSpeechTimer() { /* ... no change ... */ }
  private clearInitialSpeechTimer() { /* ... no change ... */ }
  private resetSilenceTimer() { /* ... no change ... */ }
  private clearSilenceTimer() { /* ... no change ... */ }

  private setupMediaRecorder(stream: MediaStream) {
    try {
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => { /* ... no change ... */ };
      this.mediaRecorder.onstop = () => { /* ... no change ... */ };
      this.mediaRecorder.onerror = (event) => { /* ... no change ... */ };

    } catch (error) {
        console.error("ESR: Error setting up MediaRecorder:", error);
        this.options.onError("Failed to set up audio recording.");
        return;
    }

    try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.analyserNode = this.audioContext.createAnalyser();
        this.analyserNode.fftSize = 2048; 
        const bufferLength = this.analyserNode.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);

        this.sourceNode = this.audioContext.createMediaStreamSource(stream);
        this.sourceNode.connect(this.analyserNode);
        console.log("ESR: Web Audio API setup complete for waveform. Starting drawWaveform loop.");
        this.drawWaveform(); 
    } catch (error) {
        console.error("ESR: Error setting up Web Audio API for waveform:", error);
    }
  }
  
  private drawWaveform = () => {
    // console.log("ESR: drawWaveform attempt. MediaRecorder state:", this.mediaRecorder?.state); // Log every attempt

    if (this.analyserNode && this.dataArray && this.mediaRecorder?.state === 'recording') {
      // This block should execute continuously during recording
      // console.log("ESR: drawWaveform INSIDE IF - MediaRecorder state:", this.mediaRecorder?.state);
      
      this.analyserNode.getByteTimeDomainData(this.dataArray);
      
      // Minimal check for non-flat data to reduce console noise if it's working
      // if (this.dataArray.some(val => val !== 128)) {
      //   console.log("ESR: Waveform data is NOT flat:", this.dataArray.slice(0, 10));
      // }

      this.options.onAudioData(new Uint8Array(this.dataArray)); // Pass a copy
      this.animationFrameId = requestAnimationFrame(this.drawWaveform);
    } else {
      // Log why the loop is stopping or not running
      // console.log("ESR: drawWaveform loop stopping/not running. Analyser:", !!this.analyserNode, "DataArray:", !!this.dataArray, "MediaRecorder State:", this.mediaRecorder?.state);
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      // If it stops, send one last flat line to clear the waveform display
      // this.options.onAudioData(new Uint8Array(this.analyserNode?.frequencyBinCount || 256).fill(128));
    }
  };
  
  private cleanupAudioProcessing = () => { /* ... no change ... */ };
  async startRecording(): Promise<void> { /* ... no change ... */ }
  stopRecording(manualReason: 'manual' | 'error' = 'manual'): void { /* ... no change ... */ }
  private stopRecordingInternal(reason: 'silence' | 'initial_timeout' | 'manual' | 'error' | 'dispose'): void { /* ... no change ... */ }
  public dispose(): void { /* ... no change ... */ }
}

export default EnhancedSpeechRecorder;