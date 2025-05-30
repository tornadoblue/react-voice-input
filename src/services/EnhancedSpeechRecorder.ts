// import { VoiceInputCaptureProps, RecordingState } from '@/types'; // Unused import

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

const DEFAULT_SILENCE_TIMEOUT = 3000; 
const DEFAULT_INITIAL_SPEECH_TIMEOUT = 5000; 

class EnhancedSpeechRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private speechRecognition: any | null = null; // Changed to any to bypass SpeechRecognition type issues
  private audioContext: AudioContext | null = null;
  private analyserNode: AnalyserNode | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;
  private dataArray: Uint8Array | null = null;
  private animationFrameId: number | null = null;

  private silenceTimeoutId: NodeJS.Timeout | null = null;
  private initialSpeechTimeoutId: NodeJS.Timeout | null = null;
  private hasDetectedSpeech: boolean = false;
  private isManuallyStopping: boolean = false;
  private stopReason: 'silence' | 'initial_timeout' | 'manual' | 'error' | null = null;


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
      this.options.onError("Speech Recognition API not supported in this browser.");
      return;
    }
    this.speechRecognition = new SpeechRecognitionAPI();
    this.speechRecognition.continuous = this.options.continuous!;
    this.speechRecognition.interimResults = this.options.interimResults!;
    this.speechRecognition.lang = navigator.language || 'en-US'; 

    this.speechRecognition.onresult = (event: any) => { // Changed event type to any
      this.clearInitialSpeechTimer();
      this.hasDetectedSpeech = true;
      this.resetSilenceTimer();

      let interimTranscript = "";
      // Process each result in the event
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          // Call onFinalTranscript for EACH final segment individually
          console.log("ESR: Final segment received from speech engine:", transcriptPart);
          this.options.onFinalTranscript(transcriptPart.trim()); 
        } else {
          interimTranscript += transcriptPart;
        }
      }
      // Update interim transcript if there is any
      if (interimTranscript) {
        this.options.onInterimTranscript(interimTranscript.trim());
      }
    };

    this.speechRecognition.onerror = (event: any) => { // Changed event type to any
      console.error("ESR: Speech recognition error", event.error, event.message);
      let errorMessage = event.error;
      if (event.error === 'no-speech') {
        errorMessage = "No speech detected. Please try again.";
        this.stopReason = 'initial_timeout'; 
      } else if (event.error === 'audio-capture') {
        errorMessage = "Audio capture error. Check microphone permissions.";
      } else if (event.error === 'not-allowed') {
        errorMessage = "Microphone access denied. Please allow microphone access.";
      } else {
        errorMessage = event.message || "An unknown speech recognition error occurred.";
      }
      this.options.onError(errorMessage);
      this.stopRecordingInternal(this.stopReason || 'error');
    };

    this.speechRecognition.onstart = () => {
      console.log("ESR: onstart fired.");
      this.options.onRecordingStart();
      this.startInitialSpeechTimer();
    };
    
    this.speechRecognition.onend = () => {
      console.log("ESR: onend fired. Reason for stop (if known before onstop):", this.stopReason);
      if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
         this.stopRecordingInternal(this.stopReason || 'manual');
      }
    };

    this.speechRecognition.onspeechend = () => {
        console.log("ESR: onspeechend fired.");
        this.resetSilenceTimer(); 
    };
  }

  private startInitialSpeechTimer() {
    this.clearInitialSpeechTimer();
    this.hasDetectedSpeech = false;
    console.log("ESR: Starting initial speech timer for ms:", this.options.initialSpeechTimeout);
    this.initialSpeechTimeoutId = setTimeout(() => {
      if (!this.hasDetectedSpeech) {
        console.log("ESR: Initial speech timeout, stopping recording.");
        this.options.onError("No speech detected within the initial timeout.");
        this.stopReason = 'initial_timeout';
        this.stopRecordingInternal('initial_timeout');
      }
    }, this.options.initialSpeechTimeout);
  }

  private clearInitialSpeechTimer() {
    if (this.initialSpeechTimeoutId) {
      clearTimeout(this.initialSpeechTimeoutId);
      this.initialSpeechTimeoutId = null;
    }
  }

  private resetSilenceTimer() {
    this.clearSilenceTimer();
    this.silenceTimeoutId = setTimeout(() => {
      console.log("ESR: Silence (pause) detected, stopping recording.");
      this.stopReason = 'silence';
      this.stopRecordingInternal('silence');
    }, this.options.silenceTimeout);
  }

  private clearSilenceTimer() {
    if (this.silenceTimeoutId) {
      clearTimeout(this.silenceTimeoutId);
      this.silenceTimeoutId = null;
    }
  }

  private setupMediaRecorder(stream: MediaStream) {
    try {
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        console.log("ESR: mediaRecorder.onstop. Reason for stop:", this.stopReason);
        const audioBlob = this.audioChunks.length > 0 ? new Blob(this.audioChunks, { type: this.audioChunks[0]?.type || 'audio/webm' }) : null;
        const audioUrl = audioBlob ? URL.createObjectURL(audioBlob) : null;
        this.options.onRecordingStop(audioBlob, audioUrl);
        this.cleanupAudioProcessing();
        this.audioChunks = []; 
        this.isManuallyStopping = false; 
        this.stopReason = null; 
      };
      
      this.mediaRecorder.onerror = (event) => {
        console.error("ESR: MediaRecorder error", event);
        this.options.onError("MediaRecorder error.");
        this.stopRecordingInternal('error');
      };

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
        this.drawWaveform();
    } catch (error) {
        console.error("ESR: Error setting up Web Audio API for waveform:", error);
    }
  }

  private drawWaveform = () => {
    if (this.analyserNode && this.dataArray) {
      this.analyserNode.getByteTimeDomainData(this.dataArray);
      this.options.onAudioData(this.dataArray);
      this.animationFrameId = requestAnimationFrame(this.drawWaveform);
    }
  };

  private cleanupAudioProcessing = () => {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.sourceNode) {
      this.sourceNode.disconnect();
      this.sourceNode = null;
    }
    if (this.analyserNode) {
        this.analyserNode = null; 
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close().catch(e => console.warn("ESR: Error closing audio context", e));
      this.audioContext = null;
    }
    this.dataArray = null;
  };

  async startRecording(): Promise<void> {
    console.log("ESR: Public startRecording called.");
    if (!this.speechRecognition) {
      this.options.onError("Speech recognition not initialized.");
      return;
    }
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      console.warn("ESR: Recording already in progress.");
      return;
    }
    this.isManuallyStopping = false;
    this.stopReason = null;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.setupMediaRecorder(stream);
      
      if (this.mediaRecorder) {
        this.mediaRecorder.start();
      }
      this.speechRecognition.start(); 
      this.hasDetectedSpeech = false; 

    } catch (err) {
      console.error("ESR: Error starting recording:", err);
      let errorMessage = "Error starting recording.";
      if (err instanceof Error) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          errorMessage = "Microphone access denied. Please allow microphone access.";
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          errorMessage = "No microphone found. Please connect a microphone.";
        } else {
            errorMessage = err.message || "Could not access microphone.";
        }
      }
      this.options.onError(errorMessage);
    }
  }

  stopRecording(manualReason: 'manual' | 'error' = 'manual'): void {
    console.log("ESR: Public stopRecording (" + manualReason + ") called.");
    this.isManuallyStopping = true;
    this.stopReason = manualReason;
    this.stopRecordingInternal(manualReason);
  }

  private stopRecordingInternal(reason: 'silence' | 'initial_timeout' | 'manual' | 'error'): void {
    console.log("ESR: stopRecordingInternal. Reason:", reason);
    this.clearInitialSpeechTimer();
    this.clearSilenceTimer();

    if (this.speechRecognition) {
      try {
        this.speechRecognition.stop(); 
      } catch (e) {
        console.warn("ESR: Error stopping speech recognition (might be already stopped):", e);
      }
    }

    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      this.mediaRecorder.stop(); 
    } else if (this.mediaRecorder && this.mediaRecorder.state === "inactive") {
      if (this.audioChunks.length > 0 && !this.isManuallyStopping) { 
         const audioBlob = new Blob(this.audioChunks, { type: this.audioChunks[0]?.type || 'audio/webm' });
         const audioUrl = URL.createObjectURL(audioBlob);
         this.options.onRecordingStop(audioBlob, audioUrl);
         this.audioChunks = [];
      }
      this.cleanupAudioProcessing();
    } else {
        this.cleanupAudioProcessing();
    }
    
    if (this.mediaRecorder && this.mediaRecorder.stream) {
        this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  }
}

export default EnhancedSpeechRecorder;