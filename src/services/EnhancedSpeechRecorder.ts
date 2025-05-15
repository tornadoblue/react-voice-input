import { EnhancedSpeechRecorderOptions } from "@/types";

const DEFAULT_SILENCE_TIMEOUT = 3000; // 3 seconds for pause after speech
const DEFAULT_INITIAL_SPEECH_TIMEOUT = 5000; // 5 seconds to wait for first word

type StopReason = 'manual' | 'silence' | 'no_initial_speech' | 'error';

class EnhancedSpeechRecorder {
  private recognition: SpeechRecognition | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioStream: MediaStream | null = null;
  private options: EnhancedSpeechRecorderOptions & { silenceTimeout?: number; initialSpeechTimeout?: number };
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private dataArray: Uint8Array | null = null;
  private animationFrameId: number | null = null;
  
  private silenceTimer: NodeJS.Timeout | null = null;
  private initialSpeechTimer: NodeJS.Timeout | null = null;
  private hasDetectedSpeechInSession: boolean = false;
  private currentStopReason: StopReason = 'manual';

  constructor(options: EnhancedSpeechRecorderOptions & { silenceTimeout?: number; initialSpeechTimeout?: number }) {
    this.options = {
      ...options,
      silenceTimeout: options.silenceTimeout === undefined ? DEFAULT_SILENCE_TIMEOUT : options.silenceTimeout,
      initialSpeechTimeout: options.initialSpeechTimeout === undefined ? DEFAULT_INITIAL_SPEECH_TIMEOUT : options.initialSpeechTimeout,
    };
    console.log("ESR: Constructor. Silence Timeout:", this.options.silenceTimeout, "Initial Speech Timeout:", this.options.initialSpeechTimeout);

    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognitionImpl = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionImpl();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        console.log("ESR: onresult fired.");
        this.clearInitialSpeechTimer(); // Speech detected, clear initial timer
        this.hasDetectedSpeechInSession = true;
        this.clearSilenceTimer(); // Clear pause timer

        let interimTranscript = "";
        let finalTranscriptSegment = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) finalTranscriptSegment += event.results[i][0].transcript;
          else interimTranscript += event.results[i][0].transcript;
        }

        if (interimTranscript && this.options.onInterimTranscript) this.options.onInterimTranscript(interimTranscript);
        if (finalTranscriptSegment && this.options.onFinalTranscript) this.options.onFinalTranscript(finalTranscriptSegment.trim());
        
        this.startSilenceTimer(); // Restart pause timer after speech result
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("ESR: onerror. Error:", event.error);
        this.clearAllTimers();
        this.currentStopReason = 'error';
        // Error mapping logic...
        this.options.onError(event.error); // Pass raw error for now
        this.stopAudioAnalysis();
      };

      this.recognition.onstart = () => {
        console.log("ESR: onstart fired.");
        this.hasDetectedSpeechInSession = false;
        this.currentStopReason = 'manual'; // Default, can be overridden
        this.clearAllTimers();
        this.startInitialSpeechTimer();
        if (this.options.onRecordingStart) this.options.onRecordingStart();
      };
      
      this.recognition.onend = () => {
        console.log("ESR: onend fired. Reason for stop (if known before onstop):", this.currentStopReason);
        this.clearAllTimers();
        // If onend is called and it wasn't a controlled stop (manual, silence, no_initial_speech),
        // it might be an unexpected stop from the browser or an error not caught by onerror.
        // The onRecordingStop callback in VoiceInputCapture will handle UI state.
      };

      this.recognition.onspeechend = () => {
        console.log("ESR: onspeechend fired.");
        // Speech has ended, start the silence timer to detect a pause.
        // If onresult comes quickly, it will reset this timer.
        this.startSilenceTimer(); 
      };

    } else {
      this.options.onError("Speech recognition not supported.");
    }
  }

  private clearAllTimers() {
    this.clearInitialSpeechTimer();
    this.clearSilenceTimer();
  }

  private startInitialSpeechTimer() {
    this.clearInitialSpeechTimer();
    console.log("ESR: Starting initial speech timer for ms:", this.options.initialSpeechTimeout);
    this.initialSpeechTimer = setTimeout(() => {
      console.log("ESR: Initial speech timeout detected.");
      if (!this.hasDetectedSpeechInSession) {
        this.currentStopReason = 'no_initial_speech';
        this.stopRecordingInternal(); 
      }
    }, this.options.initialSpeechTimeout);
  }

  private clearInitialSpeechTimer() {
    if (this.initialSpeechTimer) {
      console.log("ESR: Clearing initial speech timer.");
      clearTimeout(this.initialSpeechTimer);
      this.initialSpeechTimer = null;
    }
  }

  private startSilenceTimer() {
    this.clearSilenceTimer();
    if (this.hasDetectedSpeechInSession && this.options.silenceTimeout && this.options.silenceTimeout > 0) {
      console.log("ESR: Starting silence (pause) timer for ms:", this.options.silenceTimeout);
      this.silenceTimer = setTimeout(() => {
        console.log("ESR: Silence (pause) detected, stopping recording.");
        this.currentStopReason = 'silence';
        this.stopRecordingInternal(); 
      }, this.options.silenceTimeout);
    }
  }

  private clearSilenceTimer() {
    if (this.silenceTimer) {
      console.log("ESR: Clearing silence (pause) timer.");
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
  }

  private async setupMediaRecorder(stream: MediaStream) {
    // ... (same as before)
    this.audioStream = stream;
    try {
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) this.audioChunks.push(event.data);
      };
      this.mediaRecorder.onstop = () => { // This is the main trigger for onRecordingStop
        console.log("ESR: mediaRecorder.onstop. Reason for stop:", this.currentStopReason);
        let audioBlob: Blob | null = null;
        let audioUrl: string | null = null;
        if (this.audioChunks.length > 0) {
          audioBlob = new Blob(this.audioChunks, { type: this.mediaRecorder?.mimeType || "audio/webm" });
          audioUrl = URL.createObjectURL(audioBlob);
        }
        // Pass the stop reason along if needed, or handle it internally
        this.options.onRecordingStop?.(audioBlob, audioUrl /*, this.currentStopReason */);
        this.audioChunks = [];
      };
    } catch (error) { this.options.onError("Failed to set up audio recording."); }
  }

  private startAudioAnalysis(stream: MediaStream) { /* ... (same as before) ... */ 
    if (!this.options.onAudioData || this.audioContext) return;
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.source = this.audioContext.createMediaStreamSource(stream);
      this.source.connect(this.analyser);
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      const draw = () => {
        if (!this.analyser || !this.dataArray || !this.options.onAudioData || !this.source) {
          if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
          return;
        }
        this.analyser.getByteTimeDomainData(this.dataArray);
        this.options.onAudioData(this.dataArray);
        this.animationFrameId = requestAnimationFrame(draw);
      };
      draw();
    } catch (error) {
      console.error("ESR: Error starting audio analysis:", error);
      this.options.onError("Failed to start audio visualization.");
    }
  }
  private stopAudioAnalysis() { /* ... (same as before) ... */ 
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
    if (this.source) this.source.disconnect();
    this.source = null;
    this.analyser = null;
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close().catch(e => console.error("ESR: Error closing audio context:", e));
    }
    this.audioContext = null;
    this.dataArray = null;
  }

  async startRecording(): Promise<void> {
    console.log("ESR: Public startRecording called.");
    if (!this.recognition) return this.options.onError("Speech recognition not initialized.");
    if (this.mediaRecorder?.state === "recording") return console.log("ESR: Already recording.");

    this.hasDetectedSpeechInSession = false; // Reset for new session
    this.currentStopReason = 'manual'; // Default until changed by timers or error

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      await this.setupMediaRecorder(stream);
      if (this.mediaRecorder) this.mediaRecorder.start();
      this.recognition.start(); // onstart will trigger initialSpeechTimer
      if (this.audioStream) this.startAudioAnalysis(this.audioStream);
    } catch (err) { /* ... (error handling same as before) ... */ 
        console.error("ESR: Error starting recording:", err);
        let message = "Could not start recording.";
        if (err instanceof Error) {
            if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") message = "Microphone permission denied.";
            else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") message = "No microphone found.";
            else if (err.name === "NotReadableError" || err.name === "TrackStartError") message = "Microphone is already in use or not readable.";
        }
        this.options.onError(message);
        this.cleanupStreamAndAnalysis();
    }
  }
  
  // Public stop, implies manual stop
  stopRecording(): void {
    console.log("ESR: Public stopRecording (manual) called.");
    this.currentStopReason = 'manual';
    this.stopRecordingInternal();
  }
  
  private stopRecordingInternal(): void {
    console.log(`ESR: stopRecordingInternal. Reason: ${this.currentStopReason}`);
    this.clearAllTimers();

    if (this.recognition) {
      try { this.recognition.stop(); } 
      catch (e) { console.warn("ESR: Error calling recognition.stop():", e); }
    }
    // MediaRecorder stop is crucial. It triggers its onstop, which then calls options.onRecordingStop.
    if (this.mediaRecorder?.state === "recording") {
      this.mediaRecorder.stop(); 
    } else if (this.mediaRecorder?.state === "inactive" && this.currentStopReason !== 'manual') {
      // If not recording but an auto-stop event occurred (e.g. no_initial_speech)
      // and mediaRecorder never started or already stopped, we still need to signal parent.
      console.log("ESR: MediaRecorder inactive, but auto-stop occurred. Calling onRecordingStop with nulls.");
      this.options.onRecordingStop?.(null, null /*, this.currentStopReason */);
    } else if (!this.mediaRecorder && this.currentStopReason !== 'manual') {
        // If mediaRecorder was never even set up (e.g. getUserMedia failed but an error path led here)
        console.log("ESR: No MediaRecorder, but auto-stop occurred. Calling onRecordingStop with nulls.");
        this.options.onRecordingStop?.(null, null /*, this.currentStopReason */);
    }
    
    this.cleanupStreamAndAnalysis();
  }
  
  private cleanupStreamAndAnalysis() { /* ... (same as before) ... */ 
    this.stopAudioAnalysis();
    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop());
      this.audioStream = null;
    }
  }

  isRecording(): boolean { return this.mediaRecorder?.state === "recording"; }
}

export default EnhancedSpeechRecorder;