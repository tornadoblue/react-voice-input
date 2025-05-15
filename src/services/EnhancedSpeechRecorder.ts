import { EnhancedSpeechRecorderOptions } from "@/types";

const DEFAULT_SILENCE_TIMEOUT = 2000; // 2 seconds

class EnhancedSpeechRecorder {
  private recognition: SpeechRecognition | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioStream: MediaStream | null = null;
  private options: EnhancedSpeechRecorderOptions & { silenceTimeout?: number };
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private dataArray: Uint8Array | null = null;
  private animationFrameId: number | null = null;
  private silenceTimer: NodeJS.Timeout | null = null;
  private isManuallyStopping: boolean = false;

  constructor(options: EnhancedSpeechRecorderOptions & { silenceTimeout?: number }) {
    this.options = {
      ...options,
      silenceTimeout: options.silenceTimeout === undefined ? DEFAULT_SILENCE_TIMEOUT : options.silenceTimeout,
    };

    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognitionImpl = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionImpl();
      this.recognition.continuous = true; // Important for managing our own end-of-speech
      this.recognition.interimResults = true;

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        this.clearSilenceTimer(); // Activity detected, clear timer

        let interimTranscript = "";
        let finalTranscriptSegment = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscriptSegment += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (interimTranscript && this.options.onInterimTranscript) {
          this.options.onInterimTranscript(interimTranscript);
        }
        if (finalTranscriptSegment && this.options.onFinalTranscript) {
          this.options.onFinalTranscript(finalTranscriptSegment.trim());
        }
        // After processing results, (re)start the silence timer
        this.startSilenceTimer();
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        this.clearSilenceTimer();
        let errorMessage = event.error;
        if (event.error === 'network') {
          errorMessage = "Network error during speech recognition.";
        } else if (event.error === 'no-speech' && !this.isManuallyStopping) {
          // 'no-speech' can occur if continuous is false and user pauses.
          // If continuous is true, this might mean mic issues or prolonged silence.
          // We handle prolonged silence with our timer. If this fires, it might be an actual issue.
          // However, if we are using our own silence timer, 'no-speech' might be redundant or conflicting.
          // For now, we'll report it if it's not due to a manual stop.
           console.warn("SpeechRecognition 'no-speech' error. Our silence timer should handle this.");
           // We might not want to call options.onError for this if our timer is active.
           // Let's let our timer handle stopping.
           this.startSilenceTimer(); // Restart timer if it was a brief 'no-speech'
           return; // Avoid generic error message if it's just a pause
        } else if (event.error === 'audio-capture') {
          errorMessage = "Audio capture error. Check microphone.";
        } else if (event.error === 'not-allowed') {
          errorMessage = "Microphone access not allowed.";
        }
        this.options.onError(errorMessage);
        this.stopAudioAnalysis();
      };

      this.recognition.onstart = () => {
        this.isManuallyStopping = false;
        if (this.options.onRecordingStart) this.options.onRecordingStart();
        this.startSilenceTimer(); // Start silence timer when recording officially starts
      };
      
      this.recognition.onend = () => {
        this.clearSilenceTimer();
        // onend can be called for various reasons, including after stop() or errors.
        // If it wasn't a manual stop and mediaRecorder is still active, it might be an unexpected stop.
        if (!this.isManuallyStopping && this.mediaRecorder?.state === "recording") {
            console.warn("Speech recognition ended unexpectedly. Stopping media recorder.");
            this.stopRecordingInternal(false); // Ensure everything stops
        }
        console.log("Speech recognition service ended.");
      };

      // This event fires when the speech recognition service has detected that speech has stopped.
      this.recognition.onspeechend = () => {
        console.log("Speech has ended (onspeechend). Silence timer should take over if continuous.");
        // If continuous is true, the service might restart listening.
        // Our silence timer, reset by onresult, will handle the actual timeout.
        // We can potentially use this to make the silence timer more aggressive if needed,
        // but for now, relying on onresult to reset the timer is simpler.
        this.startSilenceTimer(); // Ensure timer is running if speech just ended
      };

    } else {
      this.options.onError("Speech recognition not supported in this browser.");
    }
  }

  private startSilenceTimer() {
    this.clearSilenceTimer();
    if (this.options.silenceTimeout && this.options.silenceTimeout > 0) {
      this.silenceTimer = setTimeout(() => {
        console.log("Silence detected, stopping recording.");
        this.stopRecordingInternal(true); // Indicate it's an auto-stop due to silence
      }, this.options.silenceTimeout);
    }
  }

  private clearSilenceTimer() {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
  }

  private async setupMediaRecorder(stream: MediaStream) {
    this.audioStream = stream;
    try {
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) this.audioChunks.push(event.data);
      };
      this.mediaRecorder.onstop = () => {
        let audioBlob: Blob | null = null;
        let audioUrl: string | null = null;
        if (this.audioChunks.length > 0) {
          audioBlob = new Blob(this.audioChunks, { type: this.mediaRecorder?.mimeType || "audio/webm" });
          audioUrl = URL.createObjectURL(audioBlob);
        }
        this.options.onRecordingStop?.(audioBlob, audioUrl);
        this.audioChunks = [];
      };
    } catch (error) {
      console.error("Error setting up MediaRecorder:", error);
      this.options.onError("Failed to set up audio recording.");
    }
  }

  private startAudioAnalysis(stream: MediaStream) {
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
      console.error("Error starting audio analysis:", error);
      this.options.onError("Failed to start audio visualization.");
    }
  }

  private stopAudioAnalysis() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
    if (this.source) this.source.disconnect();
    this.source = null;
    this.analyser = null;
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close().catch(e => console.error("Error closing audio context:", e));
    }
    this.audioContext = null;
    this.dataArray = null;
  }

  async startRecording(): Promise<void> {
    if (!this.recognition) {
      this.options.onError("Speech recognition not initialized.");
      return;
    }
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      console.log("Already recording.");
      return;
    }
    this.isManuallyStopping = false;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      await this.setupMediaRecorder(stream);
      if (this.mediaRecorder) this.mediaRecorder.start();
      this.recognition.start();
      if (this.audioStream) this.startAudioAnalysis(this.audioStream);
      console.log("Speech recognition and media recorder started.");
    } catch (err) {
      console.error("Error starting recording:", err);
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

  // Public stopRecording method, typically called by user action
  stopRecording(): void {
    this.stopRecordingInternal(false);
  }
  
  // Internal method to handle stopping, can distinguish between manual and auto-stop
  private stopRecordingInternal(isAutoStop: boolean): void {
    this.isManuallyStopping = !isAutoStop;
    console.log(`Stopping recording. Manual: ${this.isManuallyStopping}, Auto: ${isAutoStop}`);
    this.clearSilenceTimer();

    if (this.recognition) {
      this.recognition.stop();
    }
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      this.mediaRecorder.stop(); // Triggers onstop for MediaRecorder
    } else if (this.mediaRecorder && this.mediaRecorder.state === "inactive" && this.audioChunks.length > 0) {
      // If mediaRecorder stopped before recognition (e.g. error), but we have chunks, process them.
      this.options.onRecordingStop?.(new Blob(this.audioChunks, { type: "audio/webm" }), URL.createObjectURL(new Blob(this.audioChunks)));
      this.audioChunks = [];
    } else if (!this.mediaRecorder || this.mediaRecorder.state === "inactive") {
      // If media recorder never started or already stopped and no chunks, call onRecordingStop with null
      // This ensures onRecordingStop is called even if mediaRecorder failed or stopped early.
      this.options.onRecordingStop?.(null, null);
    }
    
    this.cleanupStreamAndAnalysis();
  }
  
  private cleanupStreamAndAnalysis() {
    this.stopAudioAnalysis();
    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop());
      this.audioStream = null;
    }
  }

  isRecording(): boolean {
    return this.mediaRecorder?.state === "recording";
  }
}

export default EnhancedSpeechRecorder;