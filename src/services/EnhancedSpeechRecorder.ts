import { VoiceInputCaptureProps, RecordingState } from '@/types'; // Assuming types are defined here

interface EnhancedSpeechRecorderOptions {
  onFinalTranscript: (transcript: string) => void;
  onInterimTranscript: (transcript: string) => void;
  onRecordingStart: () => void;
  onRecordingStop: (audioBlob: Blob | null, audioUrl: string | null) => void;
  onError: (error: string) => void;
  onAudioData: (dataArray: Uint8Array) => void;
  silenceTimeout?: number; // Milliseconds of silence to stop recording
  initialSpeechTimeout?: number; // Milliseconds to wait for initial speech
  continuous?: boolean; // Corresponds to SpeechRecognition.continuous
  interimResults?: boolean; // Corresponds to SpeechRecognition.interimResults
}

const DEFAULT_SILENCE_TIMEOUT = 3000; // 3 seconds
const DEFAULT_INITIAL_SPEECH_TIMEOUT = 5000; // 5 seconds

class EnhancedSpeechRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private speechRecognition: SpeechRecognition | null = null;
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
    this.speechRecognition.lang = navigator.language || 'en-US'; // Default to browser language or US English

    this.speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
      // console.log("ESR: onresult fired.");
      this.clearInitialSpeechTimer();
      this.hasDetectedSpeech = true;
      this.resetSilenceTimer();

      let interimTranscript = "";
      let finalTranscriptSegment = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscriptSegment += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscriptSegment) this.options.onFinalTranscript(finalTranscriptSegment);
      if (interimTranscript) this.options.onInterimTranscript(interimTranscript);
    };

    this.speechRecognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("ESR: Speech recognition error", event.error, event.message);
      let errorMessage = event.error;
      if (event.error === 'no-speech') {
        errorMessage = "No speech detected. Please try again.";
        this.stopReason = 'initial_timeout'; // Or a specific 'no-speech' reason
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
      // This event fires when recognition stops, either manually or due to silence/error.
      // The actual blob processing is handled in mediaRecorder.onstop
      if (!this.isManuallyStopping && this.stopReason !== 'silence' && this.stopReason !== 'initial_timeout') {
        // If not stopped by silence timer or manual stop, it might be an unexpected end.
        // This could be due to 'no-speech' if continuous is false, or other reasons.
      }
      // Ensure recording is fully stopped if speech recognition ends.
      // This is a fallback.
      if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
         this.stopRecordingInternal(this.stopReason || 'manual');
      }
    };

    this.speechRecognition.onspeechend = () => {
        console.log("ESR: onspeechend fired.");
        // This event means the user has stopped speaking.
        // We rely on our silence timer to actually stop the recording if continuous is true.
        // If continuous is false, speechRecognition.onend will fire soon after.
        this.resetSilenceTimer(); // Reset here as well, as speech might resume if continuous
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
      // console.log("ESR: Clearing initial speech timer.");
      clearTimeout(this.initialSpeechTimeoutId);
      this.initialSpeechTimeoutId = null;
    }
  }

  private resetSilenceTimer() {
    this.clearSilenceTimer();
    // console.log("ESR: Starting silence (pause) timer for ms:", this.options.silenceTimeout);
    this.silenceTimeoutId = setTimeout(() => {
      console.log("ESR: Silence (pause) detected, stopping recording.");
      this.stopReason = 'silence';
      this.stopRecordingInternal('silence');
    }, this.options.silenceTimeout);
  }

  private clearSilenceTimer() {
    if (this.silenceTimeoutId) {
      // console.log("ESR: Clearing silence (pause) timer.");
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
        const audioBlob = this.audioChunks.length > 0 ? new Blob(this.audioChunks, { type: this.audioChunks[0].type || 'audio/webm' }) : null;
        const audioUrl = audioBlob ? URL.createObjectURL(audioBlob) : null;
        this.options.onRecordingStop(audioBlob, audioUrl);
        this.cleanupAudioProcessing();
        this.audioChunks = []; // Clear chunks for next recording
        this.isManuallyStopping = false; // Reset manual stop flag
        this.stopReason = null; // Reset stop reason
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


    // Setup Web Audio API for waveform
    try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.analyserNode = this.audioContext.createAnalyser();
        this.analyserNode.fftSize = 2048; // Standard FFT size
        const bufferLength = this.analyserNode.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);

        this.sourceNode = this.audioContext.createMediaStreamSource(stream);
        this.sourceNode.connect(this.analyserNode);
        // We don't connect analyserNode to destination to avoid echo/feedback if speakers are on.
        this.drawWaveform();
    } catch (error) {
        console.error("ESR: Error setting up Web Audio API for waveform:", error);
        // Continue without waveform if this fails
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
        this.analyserNode = null; // No disconnect method, just dereference
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
      this.speechRecognition.start(); // onstart will call options.onRecordingStart
      this.hasDetectedSpeech = false; // Reset for new session
      // Initial speech timer is started in speechRecognition.onstart

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
      // Check state because calling stop on an already stopped recognition can throw an error
      try {
        this.speechRecognition.stop(); // This will trigger speechRecognition.onend
      } catch (e) {
        console.warn("ESR: Error stopping speech recognition (might be already stopped):", e);
      }
    }

    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      this.mediaRecorder.stop(); // This will trigger mediaRecorder.onstop
    } else if (this.mediaRecorder && this.mediaRecorder.state === "inactive") {
      // If mediaRecorder is already inactive but we have chunks (e.g. error case), process them.
      // This ensures onRecordingStop is called.
      if (this.audioChunks.length > 0 && !this.isManuallyStopping) { // Avoid double-processing if manually stopped and onstop already fired
         const audioBlob = new Blob(this.audioChunks, { type: this.audioChunks[0]?.type || 'audio/webm' });
         const audioUrl = URL.createObjectURL(audioBlob);
         this.options.onRecordingStop(audioBlob, audioUrl);
         this.audioChunks = [];
      }
      this.cleanupAudioProcessing();
    } else {
        // If no media recorder or not recording, still ensure cleanup and callback if needed
        this.cleanupAudioProcessing();
        if (!this.isManuallyStopping) { // If not manually stopped, ensure onRecordingStop is called with nulls
            // This case might happen if setup failed before mediaRecorder was active
            // this.options.onRecordingStop(null, null); // Avoid calling if already called by mediaRecorder.onstop
        }
    }
    
    // Stop media stream tracks
    if (this.mediaRecorder && this.mediaRecorder.stream) {
        this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  }
}

export default EnhancedSpeechRecorder;