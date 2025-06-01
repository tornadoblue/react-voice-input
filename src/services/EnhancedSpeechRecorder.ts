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
      ...options, 
      silenceTimeout: options.silenceTimeout ?? DEFAULT_ESR_SILENCE_TIMEOUT, 
      initialSpeechTimeout: options.initialSpeechTimeout ?? DEFAULT_ESR_INITIAL_SPEECH_TIMEOUT,
      continuous: options.continuous ?? true,
      interimResults: options.interimResults ?? true,
    };
    console.log("ESR: Constructor - Effective Silence Timeout:", this.options.silenceTimeout, "Effective Initial Speech Timeout:", this.options.initialSpeechTimeout);
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition() {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      console.warn("ESR: Speech Recognition API not supported. Error will be reported on startRecording attempt.");
      return; 
    }
    try {
      this.speechRecognition = new SpeechRecognitionAPI();
      this.speechRecognition.continuous = this.options.continuous!;
      this.speechRecognition.interimResults = this.options.interimResults!;
      this.speechRecognition.lang = navigator.language || 'en-US';

      this.speechRecognition.onresult = (event: any) => { 
        if (!this.recognitionServiceTrulyActive && this.mediaRecorder?.state !== 'recording') {
          console.warn("ESR: onresult fired but recognitionServiceTrulyActive is false or mediaRecorder not recording. Latent result?");
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
        console.error("ESR: Speech recognition error event:", event);
        const oldStateWasActive = this.recognitionServiceTrulyActive;
        this.recognitionServiceTrulyActive = false; 
        let errorMessage = event.error || "Unknown speech recognition error.";
        if (event.error === 'no-speech') { errorMessage = "No speech detected."; this.stopReason = 'initial_timeout'; }
        else if (event.error === 'audio-capture') { errorMessage = "Audio capture error. Check microphone."; }
        else if (event.error === 'not-allowed') { errorMessage = "Microphone access denied by user or system."; }
        else if (event.error === 'aborted') { errorMessage = "Speech recognition aborted."; }
        else if (event.error === 'network') { errorMessage = "Network error during speech recognition."; }
        else if (event.message) { errorMessage = event.message; }


        if (event.error === 'aborted' && (this.isManuallyStopping || this.stopReason === 'dispose')) {
          console.log("ESR: Speech recognition aborted due to explicit stop/dispose, this is expected.");
        } else if (oldStateWasActive) { 
          this.options.onError(errorMessage);
        } else {
          console.log("ESR: Speech recognition error but service was not marked active or was an expected abort:", errorMessage)
        }
        this.stopRecordingInternal(this.stopReason || 'error');
      };
      this.speechRecognition.onstart = () => { 
        console.log("ESR: speechRecognition.onstart event fired.");
        if (this.stopReason === 'dispose') { 
            console.warn("ESR: speechRecognition.onstart fired after dispose. Attempting to stop immediately.");
            try { this.speechRecognition.stop(); } catch(e) { console.warn("ESR: Error stopping speechRecognition in onstart after dispose", e); }
            this.recognitionServiceTrulyActive = false;
            return;
        }
        this.recognitionServiceTrulyActive = true;
        this.options.onRecordingStart(); 
        this.startInitialSpeechTimer();
      };
      this.speechRecognition.onend = () => { 
        console.log("ESR: speechRecognition.onend event fired. Current stopReason:", this.stopReason);
        const wasActive = this.recognitionServiceTrulyActive;
        this.recognitionServiceTrulyActive = false;
        if (this.stopReason !== 'dispose' && wasActive) { 
            if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
                console.log("ESR: speechRecognition.onend: MediaRecorder still active, stopping it now.");
                // Don't call stopRecordingInternal again if it was the source of the stop
            }
        }
      };
      this.speechRecognition.onspeechend = () => { 
          console.log("ESR: onspeechend event fired (user stopped talking).");
          this.resetSilenceTimer(); // Reset silence timer as speech has ended, waiting for more or silence timeout
      };
    } catch (e) {
        console.error("ESR: Failed to initialize SpeechRecognitionAPI:", e);
        this.speechRecognition = null; 
    }
  }

  private startInitialSpeechTimer() { 
    this.clearInitialSpeechTimer();
    this.hasDetectedSpeech = false;
    const timeoutDuration = this.options.initialSpeechTimeout; 
    console.log("ESR: Starting initial speech timer for ms:", timeoutDuration);
    if (typeof timeoutDuration !== 'number' || timeoutDuration <= 0) {
        console.warn("ESR: Invalid initialSpeechTimeout value:", timeoutDuration, "Not starting timer.");
        return;
    }
    this.initialSpeechTimeoutId = setTimeout(() => {
      if (!this.hasDetectedSpeech && this.recognitionServiceTrulyActive) { 
        console.log("ESR: Initial speech timeout occurred, stopping recording.");
        this.options.onError("No speech detected within the initial timeout.");
        this.stopReason = 'initial_timeout';
        this.stopRecordingInternal('initial_timeout');
      }
    }, timeoutDuration);
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
      const timeoutDuration = this.options.silenceTimeout;
      // console.log("ESR: Resetting silence timer for ms:", timeoutDuration);
      if (typeof timeoutDuration !== 'number' || timeoutDuration <= 0) {
        console.warn("ESR: Invalid silenceTimeout value:", timeoutDuration, "Not starting timer.");
        return;
      }
      this.silenceTimeoutId = setTimeout(() => {
        if (this.recognitionServiceTrulyActive) { 
          console.log("ESR: Silence (pause) detected by custom timer, stopping recording.");
          this.stopReason = 'silence';
          this.stopRecordingInternal('silence');
        }
      }, timeoutDuration);
    }
  }
  private clearSilenceTimer() { 
    if (this.silenceTimeoutId) {
      clearTimeout(this.silenceTimeoutId);
      this.silenceTimeoutId = null;
    }
  }
  private setupMediaRecorder(stream: MediaStream) { 
    console.log("ESR: setupMediaRecorder called.");
    try {
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];
      this.mediaRecorder.ondataavailable = (event) => { if (event.data.size > 0) this.audioChunks.push(event.data); };
      this.mediaRecorder.onstop = () => {
        console.log("ESR: mediaRecorder.onstop. Reason for stop:", this.stopReason);
        const audioBlob = this.audioChunks.length > 0 ? new Blob(this.audioChunks, { type: this.audioChunks[0]?.type || 'audio/webm' }) : null;
        const audioUrl = audioBlob ? URL.createObjectURL(audioBlob) : null;
        this.options.onRecordingStop(audioBlob, audioUrl);
        this.cleanupAudioProcessing(); 
        this.audioChunks = [];
        console.log("ESR: mediaRecorder.onstop finished processing.");
      };
      this.mediaRecorder.onerror = (event) => {
        console.error("ESR: MediaRecorder error event:", event);
        this.options.onError("MediaRecorder error.");
        this.stopRecordingInternal('error'); 
      };
      console.log("ESR: MediaRecorder event handlers set up.");
    } catch (error) {
        console.error("ESR: Error setting up MediaRecorder:", error);
        this.options.onError("Failed to set up audio recording component.");
        return; // Critical failure
    }

    // Setup Web Audio API for waveform
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
        // Waveform is non-critical, so don't call options.onError or return
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
    console.log("ESR: cleanupAudioProcessing called.");
    if (this.animationFrameId) { cancelAnimationFrame(this.animationFrameId); this.animationFrameId = null; }
    if (this.audioContext && this.audioContext.state !== 'closed') {
        if (this.sourceNode) { 
            try { this.sourceNode.disconnect(); console.log("ESR: sourceNode disconnected."); } 
            catch(e) { console.warn("ESR: Error disconnecting sourceNode", e); } 
        }
        // AnalyserNode is disconnected when sourceNode is disconnected if it's in the chain
    }
    this.sourceNode = null; this.analyserNode = null; 
    if (this.audioContext && this.audioContext.state !== 'closed') { 
        this.audioContext.close()
            .then(() => console.log("ESR: AudioContext closed."))
            .catch(e => console.warn("ESR: Error closing audio context", e));
    }
    this.audioContext = null; this.dataArray = null;
  };

  async startRecording(): Promise<void> {
    console.log("ESR: Public startRecording called.");
    if (!this.speechRecognition) {
      console.error("ESR: Speech recognition not initialized (API not supported or constructor failed).");
      this.options.onError("Speech Recognition API not supported or not initialized.");
      return;
    }

    if (this.recognitionServiceTrulyActive) {
      console.warn("ESR: startRecording called but recognitionServiceTrulyActive is true. Aborting start.");
      return;
    }
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      console.warn("ESR: startRecording called but MediaRecorder is already recording. Aborting start.");
      return;
    }

    this.isManuallyStopping = false;
    this.stopReason = null;
    this.hasDetectedSpeech = false;
    console.log("ESR: Attempting to get user media (microphone)...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("ESR: Got user media stream successfully.");
      this.setupMediaRecorder(stream); 

      if (!this.mediaRecorder) { // Check if setupMediaRecorder failed critically
        console.error("ESR: MediaRecorder is null after setup attempt. Cannot start recording.");
        stream.getTracks().forEach(track => track.stop()); // Release stream
        // options.onError would have been called in setupMediaRecorder if it failed there
        return;
      }

      console.log("ESR: Starting MediaRecorder...");
      this.mediaRecorder.start(); 
      console.log("ESR: MediaRecorder started. State:", this.mediaRecorder.state);
      
      if (this.recognitionServiceTrulyActive) {
          console.warn("ESR: Speech recognition became active before explicit start call. Aborting speechRecognition.start().");
          return;
      }
      console.log("ESR: Starting SpeechRecognition...");
      this.speechRecognition.start(); 
      console.log("ESR: speechRecognition.start() called. Waiting for onstart event.");

    } catch (err) {
      console.error("ESR: Error during startRecording sequence:", err);
      this.recognitionServiceTrulyActive = false; 
      let errorMessage = "Error starting recording.";
      if (err instanceof Error) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") { errorMessage = "Microphone access denied. Please allow microphone access in browser settings."; }
        else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") { errorMessage = "No microphone found. Please connect a microphone."; }
        else if (err.name === "InvalidStateError") { errorMessage = "Cannot start recording: microphone or speech service is busy or in an invalid state."; }
        else { errorMessage = (err as Error).message || "Could not access microphone due to an unknown error."; }
      }
      this.options.onError(errorMessage);
      this.cleanupAudioProcessing(); // Clean up any partial audio setup
      // If stream was obtained but something else failed, ensure tracks are stopped.
      // This is tricky as stream might not be in scope if getUserMedia itself failed.
      // The `setupMediaRecorder` also has stream track stopping logic if it fails.
      // If `getUserMedia` fails, it throws, and stream won't be assigned.
    }
  }

  stopRecording(manualReason: 'manual' | 'error' = 'manual'): void {
    console.log(`ESR: Public stopRecording (Reason: ${manualReason}) called.`);
    if (this.stopReason === 'dispose') {
        console.log("ESR: stopRecording called during/after dispose. Ignoring.");
        return;
    }
    if (!this.recognitionServiceTrulyActive && (!this.mediaRecorder || this.mediaRecorder.state === 'inactive')) {
        console.log("ESR: stopRecording called but nothing seems to be active. Ignoring.");
        return;
    }
    this.isManuallyStopping = true; 
    this.stopReason = manualReason; // Set reason before calling internal stop
    this.stopRecordingInternal(manualReason);
  }

  private stopRecordingInternal(reason: 'silence' | 'initial_timeout' | 'manual' | 'error' | 'dispose'): void {
    console.log(`ESR: stopRecordingInternal. Reason: ${reason}. Current SR active: ${this.recognitionServiceTrulyActive}, MediaRecorder state: ${this.mediaRecorder?.state}`);
    this.clearInitialSpeechTimer();
    this.clearSilenceTimer();

    // Stop Speech Recognition
    if (this.speechRecognition && this.recognitionServiceTrulyActive) {
        try {
            console.log("ESR: Calling speechRecognition.stop()");
            this.speechRecognition.stop(); // onend will set recognitionServiceTrulyActive to false
        } catch (e) {
            console.warn("ESR: Error stopping speech recognition (might be already stopped or in wrong state):", e);
            this.recognitionServiceTrulyActive = false; // Force state if stop() throws
        }
    } else if (this.speechRecognition && reason === 'dispose') { // Ensure stop is attempted on dispose
        try { this.speechRecognition.stop(); } catch(e) { /* ignore */ }
    }


    // Stop Media Recorder
    if (this.mediaRecorder) {
        if (this.mediaRecorder.state === "recording") {
            console.log("ESR: Calling mediaRecorder.stop()");
            this.mediaRecorder.stop(); // This will trigger mediaRecorder.onstop, which calls cleanupAudioProcessing
        } else if (this.mediaRecorder.state === "inactive" && reason !== 'dispose') {
             console.log("ESR: stopRecordingInternal: MediaRecorder already inactive.");
             // If media recorder is already stopped, but we are not disposing, ensure waveform cleanup
             this.cleanupAudioProcessing(); 
        }
    }
    
    // If disposing, ensure full cleanup regardless of states
    if (reason === 'dispose') {
        this.cleanupAudioProcessing(); 
        if (this.mediaRecorder?.stream) { // Ensure stream tracks from mediaRecorder are stopped on dispose
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
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
            console.log("ESR: Dispose - Attempting to stop speechRecognition.");
            this.speechRecognition.stop();
        } catch (e) {
            console.warn("ESR: Dispose - Error stopping speech recognition:", e);
        }
        this.speechRecognition.onresult = null;
        this.speechRecognition.onerror = null;
        this.speechRecognition.onstart = null;
        this.speechRecognition.onend = null;
        this.speechRecognition.onspeechend = null;
        console.log("ESR: Dispose - SpeechRecognition handlers nullified.");
    }
    this.recognitionServiceTrulyActive = false; 

    if (this.mediaRecorder) {
        if (this.mediaRecorder.state === 'recording') {
            console.log("ESR: Dispose - Attempting to stop mediaRecorder.");
            this.mediaRecorder.stop(); // onstop will handle audio chunks & stream track stopping
        } else if (this.mediaRecorder.stream) {
            console.log("ESR: Dispose - MediaRecorder not recording, stopping its stream tracks.");
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
        this.mediaRecorder.ondataavailable = null;
        this.mediaRecorder.onstop = null; // Nullify to prevent calls after dispose
        this.mediaRecorder.onerror = null;
        console.log("ESR: Dispose - MediaRecorder handlers nullified.");
    }
    
    this.cleanupAudioProcessing(); 
    
    this.audioChunks = []; 
    this.speechRecognition = null; 
    this.mediaRecorder = null; 
    console.log("ESR: Dispose completed.");
  }
}

export default EnhancedSpeechRecorder;