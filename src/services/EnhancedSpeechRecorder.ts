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
    console.log("ESR: Constructor called. Silence Timeout:", this.options.silenceTimeout);

    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognitionImpl = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionImpl();
      console.log("ESR: SpeechRecognition object created.");
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        // console.log("ESR: recognition.onresult event fired."); // Can be very noisy
        this.clearSilenceTimer(); 

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
        this.startSilenceTimer();
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("ESR: recognition.onerror event fired. Error:", event.error);
        this.clearSilenceTimer();
        let errorMessage = event.error;
        if (event.error === 'network') {
          errorMessage = "Network error during speech recognition.";
        } else if (event.error === 'no-speech' && !this.isManuallyStopping) {
           console.warn("ESR: SpeechRecognition 'no-speech' error. Our silence timer should handle this.");
           this.startSilenceTimer(); 
           return; 
        } else if (event.error === 'audio-capture') {
          errorMessage = "Audio capture error. Check microphone.";
        } else if (event.error === 'not-allowed') {
          errorMessage = "Microphone access not allowed.";
        }
        this.options.onError(errorMessage);
        this.stopAudioAnalysis();
      };

      this.recognition.onstart = () => {
        console.log("ESR: recognition.onstart event fired.");
        this.isManuallyStopping = false;
        if (this.options.onRecordingStart) this.options.onRecordingStart();
        this.startSilenceTimer();
      };
      
      this.recognition.onend = () => {
        console.log("ESR: recognition.onend event fired.");
        this.clearSilenceTimer();
        if (!this.isManuallyStopping && this.mediaRecorder?.state === "recording") {
            console.warn("ESR: Speech recognition ended unexpectedly. Stopping media recorder.");
            this.stopRecordingInternal(false); 
        }
      };

      this.recognition.onspeechend = () => {
        console.log("ESR: recognition.onspeechend event fired.");
        this.startSilenceTimer(); 
      };

    } else {
      console.error("ESR: Speech recognition not supported.");
      this.options.onError("Speech recognition not supported in this browser.");
    }
  }

  private startSilenceTimer() {
    this.clearSilenceTimer();
    if (this.options.silenceTimeout && this.options.silenceTimeout > 0) {
      // console.log("ESR: Starting silence timer for ms:", this.options.silenceTimeout); // Can be noisy
      this.silenceTimer = setTimeout(() => {
        console.log("ESR: Silence detected by timer, stopping recording.");
        this.stopRecordingInternal(true); 
      }, this.options.silenceTimeout);
    }
  }

  private clearSilenceTimer() {
    if (this.silenceTimer) {
      // console.log("ESR: Clearing silence timer."); // Can be noisy
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
  }

  private async setupMediaRecorder(stream: MediaStream) {
    console.log("ESR: setupMediaRecorder called.");
    this.audioStream = stream;
    try {
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];
      this.mediaRecorder.ondataavailable = (event) => {
        // console.log("ESR: mediaRecorder.ondataavailable"); // Noisy
        if (event.data.size > 0) this.audioChunks.push(event.data);
      };
      this.mediaRecorder.onstop = () => {
        console.log("ESR: mediaRecorder.onstop event fired.");
        let audioBlob: Blob | null = null;
        let audioUrl: string | null = null;
        if (this.audioChunks.length > 0) {
          audioBlob = new Blob(this.audioChunks, { type: this.mediaRecorder?.mimeType || "audio/webm" });
          audioUrl = URL.createObjectURL(audioBlob);
          console.log("ESR: Audio blob created, URL:", audioUrl);
        }
        this.options.onRecordingStop?.(audioBlob, audioUrl);
        this.audioChunks = [];
      };
      console.log("ESR: MediaRecorder setup complete.");
    } catch (error) {
      console.error("ESR: Error setting up MediaRecorder:", error);
      this.options.onError("Failed to set up audio recording.");
    }
  }

  private startAudioAnalysis(stream: MediaStream) {
    // console.log("ESR: startAudioAnalysis called."); // Can be very noisy
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

  private stopAudioAnalysis() {
    // console.log("ESR: stopAudioAnalysis called."); // Can be noisy
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
    console.log("ESR: startRecording called.");
    if (!this.recognition) {
      this.options.onError("Speech recognition not initialized.");
      return;
    }
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      console.log("ESR: Already recording.");
      return;
    }
    this.isManuallyStopping = false;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("ESR: Got user media stream.");
      await this.setupMediaRecorder(stream);
      if (this.mediaRecorder) {
        this.mediaRecorder.start();
        console.log("ESR: MediaRecorder started.");
      }
      this.recognition.start(); // recognition.onstart will handle its own console log
      if (this.audioStream) this.startAudioAnalysis(this.audioStream);
    } catch (err) {
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

  stopRecording(): void {
    console.log("ESR: Public stopRecording called.");
    this.stopRecordingInternal(false);
  }
  
  private stopRecordingInternal(isAutoStop: boolean): void {
    this.isManuallyStopping = !isAutoStop;
    console.log(`ESR: stopRecordingInternal called. Manual: ${this.isManuallyStopping}, Auto: ${isAutoStop}`);
    this.clearSilenceTimer();

    if (this.recognition) {
      try {
        this.recognition.stop(); // recognition.onend will log its end
      } catch (e) {
        console.warn("ESR: Error calling recognition.stop():", e);
      }
    }
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      this.mediaRecorder.stop(); // mediaRecorder.onstop will log its end
    } else if (this.mediaRecorder && this.mediaRecorder.state === "inactive" && this.audioChunks.length > 0) {
      console.log("ESR: MediaRecorder was inactive but had audio chunks. Processing them.");
      this.options.onRecordingStop?.(new Blob(this.audioChunks, { type: "audio/webm" }), URL.createObjectURL(new Blob(this.audioChunks)));
      this.audioChunks = [];
    } else if (!this.mediaRecorder || this.mediaRecorder.state === "inactive") {
      console.log("ESR: MediaRecorder not active or never started. Calling onRecordingStop with null.");
      if (!this.isManuallyStopping || (this.isManuallyStopping && this.audioChunks.length === 0)) {
         if (!this.mediaRecorder) {
            this.options.onRecordingStop?.(null, null);
         }
      }
    }
    
    this.cleanupStreamAndAnalysis();
  }
  
  private cleanupStreamAndAnalysis() {
    console.log("ESR: cleanupStreamAndAnalysis called.");
    this.stopAudioAnalysis();
    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop());
      this.audioStream = null;
      console.log("ESR: Audio stream tracks stopped.");
    }
  }

  isRecording(): boolean {
    const recState = this.mediaRecorder?.state === "recording";
    // console.log("ESR: isRecording check. State:", recState); // Can be noisy
    return recState;
  }
}

export default EnhancedSpeechRecorder;