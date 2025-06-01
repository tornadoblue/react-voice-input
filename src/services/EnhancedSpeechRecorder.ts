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
      // Defer error to startRecording if API is totally missing, to allow component to mount.
      console.warn("ESR: Speech Recognition API not supported. Error will be thrown on startRecording.");
      return;
    }
    try {
      this.speechRecognition = new SpeechRecognitionAPI();
      this.speechRecognition.continuous = this.options.continuous!;
      this.speechRecognition.interimResults = this.options.interimResults!;
      this.speechRecognition.lang = navigator.language || 'en-US';

      this.speechRecognition.onresult = (event: any) => {
        if (!this.recognitionServiceTrulyActive && this.mediaRecorder?.state !== 'recording') {
          console.warn("ESR: onresult fired but recognitionServiceTrulyActive is false. Latent result?");
        }
        this.clearInitialSpeechTimer();
        this.hasDetectedSpeech = true;
        this.resetSilenceTimer();

        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            this.options.onFinalTranscript(transcriptPart.trim());
          } else {
            interimTranscript += transcriptPart;
          }
        }
        if (interimTranscript) {
          this.options.onInterimTranscript(interimTranscript.trim());
        }
      };

      this.speechRecognition.onerror = (event: any) => {
        console.error("ESR: Speech recognition error", event.error, event.message);
        const oldState = this.recognitionServiceTrulyActive;
        this.recognitionServiceTrulyActive = false; 
        let errorMessage = event.error;
        // Specific error handling...
        if (event.error === 'no-speech') { errorMessage = "No speech detected."; this.stopReason = 'initial_timeout'; }
        else if (event.error === 'audio-capture') { errorMessage = "Audio capture error."; }
        else if (event.error === 'not-allowed') { errorMessage = "Microphone access denied."; }
        else if (event.error === 'aborted') { errorMessage = "Speech recognition aborted."; }
        else if (event.error === 'network') { errorMessage = "Network error during speech recognition."; }
        else { errorMessage = event.message || "Unknown speech recognition error."; }

        if (event.error === 'aborted' && (this.isManuallyStopping || this.stopReason === 'dispose')) {
          console.log("ESR: Speech recognition aborted due to explicit stop/dispose, this is expected.");
        } else if (oldState) { // Only call onError if it was previously active and not an expected abort
          this.options.onError(errorMessage);
        }
        this.stopRecordingInternal(this.stopReason || 'error');
      };

      this.speechRecognition.onstart = () => {
        console.log("ESR: speechRecognition.onstart fired.");
        if (this.stopReason === 'dispose') { // If dispose was called before onstart managed to fire
            console.warn("ESR: speechRecognition.onstart fired after dispose. Attempting to stop immediately.");
            this.speechRecognition.stop(); // Try to stop it again
            this.recognitionServiceTrulyActive = false;
            return;
        }
        this.recognitionServiceTrulyActive = true;
        this.options.onRecordingStart(); 
        this.startInitialSpeechTimer();
      };

      this.speechRecognition.onend = () => {
        console.log("ESR: speechRecognition.onend fired. Current stopReason:", this.stopReason);
        this.recognitionServiceTrulyActive = false;
        if (this.stopReason !== 'dispose') { // If not disposing, ensure media recorder also stops
            if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
                console.log("ESR: speechRecognition.onend: MediaRecorder still active, stopping it now.");
                this.stopRecordingInternal(this.stopReason || 'manual'); 
            } else if (!this.mediaRecorder || this.mediaRecorder.state === "inactive") {
                if (this.audioChunks.length === 0 && this.stopReason !== 'initial_timeout' && this.stopReason !== 'error') {
                    // If no audio and not already an error/timeout, ensure onRecordingStop is called.
                    // this.options.onRecordingStop(null, null); // mediaRecorder.onstop should handle this
                }
            }
        }
        // If stopReason is 'dispose', mediaRecorder.onstop will handle its part of onRecordingStop
      };

      this.speechRecognition.onspeechend = () => {
          console.log("ESR: onspeechend fired (user stopped talking).");
          this.resetSilenceTimer();
      };
    } catch (e) {
        console.error("ESR: Failed to initialize SpeechRecognitionAPI:", e);
        this.speechRecognition = null; // Ensure it's null if construction failed
    }
  }

  private startInitialSpeechTimer() {
    this.clearInitialSpeechTimer();
    this.hasDetectedSpeech = false;
    // console.log("ESR: Starting initial speech timer for ms:", this.options.initialSpeechTimeout);
    this.initialSpeechTimeoutId = setTimeout(() => {
      if (!this.hasDetectedSpeech && this.recognitionServiceTrulyActive) { 
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
    if (this.recognitionServiceTrulyActive) {
      // console.log("ESR: Resetting silence timer for ms:", this.options.silenceTimeout);
      this.silenceTimeoutId = setTimeout(() => {
        if (this.recognitionServiceTrulyActive) { 
          console.log("ESR: Silence (pause) detected by custom timer, stopping recording.");
          this.stopReason = 'silence';
          this.stopRecordingInternal('silence');
        }
      }, this.options.silenceTimeout);
    }
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
        // this.isManuallyStopping = false; // Moved to startRecording
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
        console.log("ESR: Web Audio API setup complete for waveform. Starting drawWaveform loop.");
        this.drawWaveform(); 
    } catch (error) {
        console.error("ESR: Error setting up Web Audio API for waveform:", error);
    }
  }
  
  private drawWaveform = () => {
    if (this.analyserNode && this.dataArray && this.mediaRecorder?.state === 'recording') {
      this.analyserNode.getByteTimeDomainData(this.dataArray);
      this.options.onAudioData(new Uint8Array(this.dataArray)); 
      this.animationFrameId = requestAnimationFrame(this.drawWaveform);
    } else {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
  };
  
  private cleanupAudioProcessing = () => {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
        if (this.sourceNode) {
            try { this.sourceNode.disconnect(); } catch(e) { console.warn("ESR: Error disconnecting sourceNode", e); }
        }
    }
    this.sourceNode = null; 
    this.analyserNode = null; 

    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close().catch(e => console.warn("ESR: Error closing audio context", e));
    }
    this.audioContext = null;
    this.dataArray = null;
  };

  async startRecording(): Promise<void> {
    console.log("ESR: Public startRecording called.");
    if (!this.speechRecognition) {
      this.options.onError("Speech Recognition API not supported or not initialized.");
      return;
    }

    if (this.recognitionServiceTrulyActive) {
      console.warn("ESR: startRecording called but recognitionServiceTrulyActive is true. Aborting start.");
      this.options.onError("Recognition service is already active."); 
      return;
    }
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      console.warn("ESR: startRecording called but MediaRecorder is already recording. Aborting start.");
      this.options.onError("Media recorder is already active."); 
      return;
    }

    this.isManuallyStopping = false;
    this.stopReason = null;
    this.hasDetectedSpeech = false;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.setupMediaRecorder(stream); 

      if (this.mediaRecorder) {
        this.mediaRecorder.start(); 
      }
      if (this.recognitionServiceTrulyActive) {
          console.warn("ESR: Speech recognition became active before explicit start. Aborting.");
          if (this.mediaRecorder?.state === 'recording') this.mediaRecorder.stop();
          stream.getTracks().forEach(track => track.stop());
          return;
      }
      this.speechRecognition.start(); 

    } catch (err) {
      console.error("ESR: Error starting recording:", err);
      this.recognitionServiceTrulyActive = false; 
      let errorMessage = "Error starting recording.";
      if (err instanceof Error) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") { errorMessage = "Microphone access denied."; }
        else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") { errorMessage = "No microphone found."; }
        else if (err.name === "InvalidStateError") { errorMessage = "Cannot start recording: service is busy or in an invalid state."; }
        else { errorMessage = err.message || "Could not access microphone."; }
      }
      this.options.onError(errorMessage);
      this.cleanupAudioProcessing();
      if (this.mediaRecorder && this.mediaRecorder.stream) {
        this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
      } else if ((err as any)?.stream) { 
        (err as any).stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }
    }
  }

  stopRecording(manualReason: 'manual' | 'error' = 'manual'): void {
    console.log("ESR: Public stopRecording (" + manualReason + ") called.");
    if (this.stopReason === 'dispose') {
        console.log("ESR: stopRecording called during/after dispose. Ignoring.");
        return;
    }
    this.isManuallyStopping = true; 
    this.stopReason = manualReason;
    this.stopRecordingInternal(manualReason);
  }

  private stopRecordingInternal(reason: 'silence' | 'initial_timeout' | 'manual' | 'error' | 'dispose'): void {
    console.log(`ESR: stopRecordingInternal. Reason: ${reason}. recognitionServiceTrulyActive: ${this.recognitionServiceTrulyActive}`);
    this.clearInitialSpeechTimer();
    this.clearSilenceTimer();

    if (this.speechRecognition) {
        if (this.recognitionServiceTrulyActive || reason === 'dispose') {
            try {
                console.log("ESR: Calling speechRecognition.stop()");
                this.speechRecognition.stop(); 
            } catch (e) {
                console.warn("ESR: Error stopping speech recognition (might be already stopped or in wrong state):", e);
                this.recognitionServiceTrulyActive = false; 
            }
        } else {
            console.log("ESR: stopRecordingInternal: speechRecognition service already marked as inactive or not told to stop for this reason.");
        }
    }

    if (this.mediaRecorder) {
        if (this.mediaRecorder.state === "recording") {
            console.log("ESR: Calling mediaRecorder.stop()");
            this.mediaRecorder.stop(); 
        } else if (reason === 'dispose' && this.mediaRecorder.state === "inactive" && this.audioChunks.length > 0) {
            console.log("ESR: Disposing with pending audio chunks. Firing onRecordingStop.");
            const audioBlob = new Blob(this.audioChunks, { type: this.audioChunks[0]?.type || 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            this.options.onRecordingStop(audioBlob, audioUrl); 
            this.audioChunks = [];
        } else if (this.mediaRecorder.state === "inactive") {
             console.log("ESR: stopRecordingInternal: MediaRecorder already inactive.");
        }
    }
    
    if (reason === 'dispose') {
        this.cleanupAudioProcessing(); 
    } else if (this.mediaRecorder && this.mediaRecorder.state === "inactive") {
        this.cleanupAudioProcessing();
    }
  }

  public dispose(): void {
    console.log("ESR: dispose() called.");
    this.stopReason = 'dispose'; 
    this.isManuallyStopping = true; 

    this.clearInitialSpeechTimer();
    this.clearSilenceTimer();

    if (this.speechRecognition) {
        try {
            console.log("ESR: Dispose - Calling speechRecognition.stop()");
            this.speechRecognition.stop();
        } catch (e) {
            console.warn("ESR: Dispose - Error stopping speech recognition:", e);
        }
        this.speechRecognition.onresult = null;
        this.speechRecognition.onerror = null;
        this.speechRecognition.onstart = null;
        this.speechRecognition.onend = null;
        this.speechRecognition.onspeechend = null;
    }
    this.recognitionServiceTrulyActive = false; 

    if (this.mediaRecorder) {
        if (this.mediaRecorder.state === 'recording') {
            console.log("ESR: Dispose - Calling mediaRecorder.stop()");
            this.mediaRecorder.stop(); 
        } else if (this.mediaRecorder.stream) {
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
        this.mediaRecorder.ondataavailable = null;
        this.mediaRecorder.onstop = null;
        this.mediaRecorder.onerror = null;
    }
    
    this.cleanupAudioProcessing(); 
    
    this.audioChunks = []; 
    this.speechRecognition = null; 
    this.mediaRecorder = null; 
    console.log("ESR: Dispose completed.");
  }
}

export default EnhancedSpeechRecorder;