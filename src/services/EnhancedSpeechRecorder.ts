import { EnhancedSpeechRecorderOptions } from "@/types";

class EnhancedSpeechRecorder {
  private recognition: SpeechRecognition | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioStream: MediaStream | null = null;
  private options: EnhancedSpeechRecorderOptions;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private dataArray: Uint8Array | null = null;
  private animationFrameId: number | null = null;

  constructor(options: EnhancedSpeechRecorderOptions) {
    this.options = options;
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognitionImpl = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionImpl();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
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
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        let errorMessage = event.error;
        if (event.error === 'network') {
          errorMessage = "Network error during speech recognition.";
        } else if (event.error === 'no-speech') {
          errorMessage = "No speech detected.";
        } else if (event.error === 'audio-capture') {
          errorMessage = "Audio capture error. Check microphone.";
        } else if (event.error === 'not-allowed') {
          errorMessage = "Microphone access not allowed.";
        }
        this.options.onError(errorMessage);
        this.stopAudioAnalysis();
      };

      this.recognition.onstart = () => {
        if (this.options.onRecordingStart) this.options.onRecordingStart();
      };
      
      this.recognition.onend = () => {
        // This event fires when recognition service disconnects,
        // which can be after stop() or due to other reasons.
        // Actual stop logic is in stopRecording().
        console.log("Speech recognition service ended.");
      };

    } else {
      this.options.onError("Speech recognition not supported in this browser.");
    }
  }

  private async setupMediaRecorder(stream: MediaStream) {
    this.audioStream = stream; // Store the stream to stop tracks later
    try {
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
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
        // Do not stop audio analysis here, it's tied to the stream lifecycle
      };
    } catch (error) {
      console.error("Error setting up MediaRecorder:", error);
      this.options.onError("Failed to set up audio recording.");
    }
  }

  private startAudioAnalysis(stream: MediaStream) {
    if (!this.options.onAudioData || this.audioContext) return; // Already started or no callback

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
          // If any of these are null, stop the loop
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
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    // Analyser is connected to source, so it's implicitly disconnected.
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

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      await this.setupMediaRecorder(stream); // Sets up this.audioStream
      
      if (this.mediaRecorder) {
        this.mediaRecorder.start();
      }
      this.recognition.start();
      if (this.audioStream) { // Ensure audioStream is set by setupMediaRecorder
        this.startAudioAnalysis(this.audioStream);
      }
      console.log("Speech recognition and media recorder started.");
    } catch (err) {
      console.error("Error starting recording:", err);
      let message = "Could not start recording.";
      if (err instanceof Error) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          message = "Microphone permission denied. Please enable it in your browser settings.";
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          message = "No microphone found. Please connect a microphone.";
        } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
          message = "Microphone is already in use or not readable.";
        }
      }
      this.options.onError(message);
      this.cleanupStreamAndAnalysis(); // Clean up if start failed
    }
  }

  stopRecording(): void {
    if (this.recognition) {
      this.recognition.stop();
      console.log("Speech recognition stop requested.");
    }
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      this.mediaRecorder.stop(); // This will trigger onstop for MediaRecorder
      console.log("Media recorder stop requested.");
    }
    
    // The onRecordingStop callback is triggered by mediaRecorder.onstop
    // Waveform and stream cleanup should happen after MediaRecorder is done.
    this.cleanupStreamAndAnalysis();
  }
  
  private cleanupStreamAndAnalysis() {
    // Stop audio analysis first
    this.stopAudioAnalysis();

    // Then stop all tracks on the stream and nullify it
    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop());
      this.audioStream = null;
      console.log("Audio stream tracks stopped.");
    }
  }

  isRecording(): boolean {
    // Check MediaRecorder state first as it's more definitive for audio capture
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      return true;
    }
    // Fallback to recognition state if MediaRecorder isn't active (e.g., during setup or if only STT is used)
    // This part might need refinement based on how SpeechRecognition's active state is determined reliably.
    // For now, we assume if mediaRecorder is not 'recording', we are not fully 'recording'.
    return false;
  }
}

export default EnhancedSpeechRecorder;