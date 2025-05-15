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
    if ("webkitSpeechRecognition" in window) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true; // Keep listening even after a pause
      this.recognition.interimResults = true; // Get interim results

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (interimTranscript && this.options.onInterimTranscript) {
          this.options.onInterimTranscript(interimTranscript);
        }
        if (finalTranscript && this.options.onFinalTranscript) {
          // We'll call onFinalTranscript with accumulated final segments
          // For now, let's send it as it comes.
           this.options.onFinalTranscript(finalTranscript);
        }
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        this.options.onError(event.error);
        this.stopAudioAnalysis();
      };

      this.recognition.onstart = () => {
        if (this.options.onRecordingStart) this.options.onRecordingStart();
      };

      // recognition.onend is called when speech recognition service has disconnected
      // It can happen after stop() is called, or due to other reasons.
      // We handle actual stop logic in stopRecording.
    } else {
      this.options.onError("Speech recognition not supported in this browser.");
    }
  }

  private async setupMediaRecorder(stream: MediaStream) {
    this.audioStream = stream;
    this.mediaRecorder = new MediaRecorder(stream);
    this.audioChunks = [];

    this.mediaRecorder.ondataavailable = (event) => {
      this.audioChunks.push(event.data);
    };

    this.mediaRecorder.onstop = () => {
      if (this.audioChunks.length > 0) {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        this.options.onRecordingStop?.(audioBlob, audioUrl);
      } else {
        this.options.onRecordingStop?.(null, null);
      }
      this.audioChunks = []; // Reset for next recording
      this.stopAudioAnalysis(); // Stop analysis when recording stops
    };
  }

  private startAudioAnalysis(stream: MediaStream) {
    if (!this.options.onAudioData) return;

    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.source = this.audioContext.createMediaStreamSource(stream);
    this.source.connect(this.analyser);

    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!this.analyser || !this.dataArray || !this.options.onAudioData) return;
      this.analyser.getByteTimeDomainData(this.dataArray);
      this.options.onAudioData(this.dataArray);
      this.animationFrameId = requestAnimationFrame(draw);
    };
    draw();
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
    if (this.analyser) {
      this.analyser.disconnect();
      this.analyser = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close().catch(e => console.error("Error closing audio context:", e));
      this.audioContext = null;
    }
    this.dataArray = null;
  }

  async startRecording(): Promise<void> {
    if (!this.recognition) {
      this.options.onError("Speech recognition not initialized.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      await this.setupMediaRecorder(stream);
      this.mediaRecorder?.start();
      this.recognition.start();
      this.startAudioAnalysis(stream); // Start analysis when recording starts
      console.log("Speech recognition and media recorder started.");
    } catch (err) {
      console.error("Error starting recording:", err);
      let message = "Could not start recording.";
      if (err instanceof Error) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          message = "Microphone permission denied.";
        } else if (err.name === "NotFoundError") {
          message = "No microphone found.";
        }
      }
      this.options.onError(message);
      this.stopAudioAnalysis();
    }
  }

  stopRecording(): void {
    if (this.recognition) {
      this.recognition.stop();
      console.log("Speech recognition stopped.");
    }
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
      console.log("Media recorder stopped.");
    }
    // Clean up the audio stream tracks
    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop());
      this.audioStream = null;
    }
    this.stopAudioAnalysis();
  }

  isRecording(): boolean {
    return (this.mediaRecorder?.state === "recording") || (!!this.recognition && (
      (this.recognition as any).recognizing === true // Heuristic for some browsers
    ));
  }
}

export default EnhancedSpeechRecorder;