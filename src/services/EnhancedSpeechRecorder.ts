import { RecordingState, EnhancedSpeechRecorderOptions } from "@/types";

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export class EnhancedSpeechRecorder {
  private recognition: SpeechRecognition | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private animationFrameId: number | null = null;

  private options: EnhancedSpeechRecorderOptions;
  private currentRecordingState: RecordingState = "idle";

  constructor(options: EnhancedSpeechRecorderOptions) {
    this.options = options;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = "en-US"; // Default language, can be made configurable

      this.recognition.onresult = this.handleRecognitionResult.bind(this);
      this.recognition.onerror = this.handleRecognitionError.bind(this);
      this.recognition.onstart = () => this.updateState("listening");
      this.recognition.onaudiostart = () => this.updateState("recording");
      this.recognition.onaudioend = () => {
        // Don't stop immediately, wait for final result or explicit stop
        if (this.currentRecordingState === "recording") {
            // This might transition to 'processing' or back to 'listening' if continuous
        }
      };
      this.recognition.onend = this.handleRecognitionEnd.bind(this);
    } else {
      console.error("Speech Recognition API not supported.");
      this.options.onError?.("Speech Recognition API not supported.");
      this.updateState("error");
    }
  }

  private updateState(newState: RecordingState) {
    this.currentRecordingState = newState;
    this.options.onRecordingStateChange?.(newState);
    console.log("Recorder state:", newState);
  }

  private handleRecognitionResult(event: SpeechRecognitionEvent) {
    let interimTranscript = "";
    let finalTranscriptSegment = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcriptPart = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscriptSegment += transcriptPart;
      } else {
        interimTranscript += transcriptPart;
      }
    }

    if (interimTranscript) {
      this.options.onInterimTranscript(interimTranscript);
    }
    if (finalTranscriptSegment) {
      // For continuous mode, final segments are reported as they come.
      // The main component will accumulate these.
      this.options.onFinalTranscript(finalTranscriptSegment);
    }
  }

  private handleRecognitionError(event: SpeechRecognitionErrorEvent) {
    console.error("Speech recognition error:", event.error);
    let errorMessage = event.error;
    if (event.error === 'no-speech') {
        errorMessage = "No speech detected. Please try again.";
    } else if (event.error === 'audio-capture') {
        errorMessage = "Audio capture failed. Please check microphone permissions.";
    } else if (event.error === 'not-allowed') {
        errorMessage = "Microphone access denied. Please allow microphone access.";
    }
    this.options.onError?.(errorMessage);
    this.updateState("error");
    this.stopAudioAnalysis();
  }

  private handleRecognitionEnd() {
    // This is called when recognition service disconnects,
    // not necessarily when user stops speaking in continuous mode.
    // If we are in 'recording' or 'listening' state, it might be an unexpected stop.
    if (this.currentRecordingState === "recording" || this.currentRecordingState === "listening") {
        console.log("Recognition service ended. Current state:", this.currentRecordingState);
        // If mediaRecorder is active, stop it.
        if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
            this.mediaRecorder.stop(); // This will trigger onstop for mediaRecorder
        } else {
             // If no media recorder or it's already stopped, transition to idle.
            this.updateState("idle");
        }
    }
    this.stopAudioAnalysis();
  }

  public async start(): Promise<void> {
    if (!this.recognition) {
      this.options.onError?.("Speech recognition not initialized.");
      this.updateState("error");
      return;
    }
    if (this.currentRecordingState !== "idle" && this.currentRecordingState !== "error") {
      console.warn("Recording already in progress or starting.");
      return;
    }

    this.updateState("listening"); // Initial state before mic access
    this.audioChunks = [];

    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.updateState("listening"); // Mic access granted

      if (this.options.onAudioData) {
        this.startAudioAnalysis(this.audioStream);
      }
      
      this.mediaRecorder = new MediaRecorder(this.audioStream);
      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/webm" }); // Or appropriate type
        const audioUrl = URL.createObjectURL(audioBlob);
        this.options.onStop?.(audioBlob, audioUrl);
        this.audioStream?.getTracks().forEach(track => track.stop()); // Release microphone
        this.audioStream = null;
        this.updateState("idle");
        this.stopAudioAnalysis();
      };
      
      this.mediaRecorder.start();
      this.recognition.start(); // This will trigger onstart, then onaudiostart

    } catch (err) {
      console.error("Error starting recording:", err);
      let errorMessage = "Failed to start recording.";
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            errorMessage = "Microphone access denied. Please allow microphone access.";
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
            errorMessage = "No microphone found. Please connect a microphone.";
        }
      }
      this.options.onError?.(errorMessage);
      this.updateState("error");
      this.stopAudioAnalysis();
    }
  }

  public stop(): void {
    if (this.currentRecordingState === "idle" || this.currentRecordingState === "processing") {
        console.log("Recorder not active or already stopping.");
        return;
    }
    this.updateState("processing");
    if (this.recognition) {
      this.recognition.stop(); // This will eventually trigger recognition.onend
    }
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      this.mediaRecorder.stop(); // This triggers its onstop, which handles state update to idle
    } else {
        // If media recorder wasn't recording or doesn't exist, clean up stream and go to idle
        this.audioStream?.getTracks().forEach(track => track.stop());
        this.audioStream = null;
        this.updateState("idle");
    }
    this.stopAudioAnalysis();
  }

  private startAudioAnalysis(stream: MediaStream): void {
    if (!this.options.onAudioData) return;

    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.source = this.audioContext.createMediaStreamSource(stream);
    this.source.connect(this.analyser);

    const processAudio = () => {
      if (!this.analyser || !this.options.onAudioData || this.currentRecordingState !== 'recording') {
        this.stopAudioAnalysis(); // Ensure loop stops if conditions change
        return;
      }
      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      this.analyser.getByteTimeDomainData(dataArray); // For waveform
      this.options.onAudioData(dataArray);
      this.animationFrameId = requestAnimationFrame(processAudio);
    };
    this.animationFrameId = requestAnimationFrame(processAudio);
  }

  private stopAudioAnalysis(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.source?.disconnect();
    this.analyser?.disconnect();
    // Do not close audioContext here if you might reuse it quickly,
    // but for a full stop, it's good practice.
    // if (this.audioContext && this.audioContext.state !== 'closed') {
    //   this.audioContext.close();
    // }
    this.source = null;
    this.analyser = null;
    // this.audioContext = null; // Keep context if planning to restart analysis soon
  }

  public getRecordingState(): RecordingState {
    return this.currentRecordingState;
  }
}