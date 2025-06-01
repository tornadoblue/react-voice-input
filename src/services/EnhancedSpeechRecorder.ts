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

  private recognitionServiceTrulyActive: boolean = false; // Tracks actual SpeechRecognition state

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
      if (!this.recognitionServiceTrulyActive && this.mediaRecorder?.state !== 'recording') {
        // If onresult fires but we think recognition isn't active (e.g., after an error or quick stop/start)
        // and media recorder isn't active, it might be a latent result. Log and potentially ignore.
        console.warn("ESR: onresult fired but recognitionServiceTrulyActive is false. Latent result?");
        // return; // Or handle as needed
      }
      this.clearInitialSpeechTimer();
      this.hasDetectedSpeech = true;
      this.resetSilenceTimer();

      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          console.log("ESR: Final segment received from speech engine:", transcriptPart);
          this.options.onFinalTranscript(transcriptPart.trim());
        } else {
          interimTranscript += transcriptPart;
        }
      }
      if (interimTranscript) {
        this.options.onInterimTranscript(interimTranscript.trim());
      }
    };

    this.speechRecognition.onerror = (event: any) => { // Changed event type to any
      console.error("ESR: Speech recognition error", event.error, event.message);
      this.recognitionServiceTrulyActive = false; // Recognition definitely stops on error
      let errorMessage = event.error;
      if (event.error === 'no-speech') {
        errorMessage = "No speech detected. Please try again.";
        this.stopReason = 'initial_timeout';
      } else if (event.error === 'audio-capture') {
        errorMessage = "Audio capture error. Check microphone permissions.";
      } else if (event.error === 'not-allowed') {
        errorMessage = "Microphone access denied. Please allow microphone access.";
      } else if (event.error === 'aborted') {
        errorMessage = "Speech recognition aborted."; // Often due to stop() being called
      } else if (event.error === 'network') {
        errorMessage = "Network error during speech recognition.";
      } else {
        errorMessage = event.message || "An unknown speech recognition error occurred.";
      }
      // Avoid calling stopRecordingInternal if error is 'aborted' and we initiated the stop
      if (event.error === 'aborted' && this.isManuallyStopping) {
        console.log("ESR: Speech recognition aborted due to manual stop, this is expected.");
      } else {
        this.options.onError(errorMessage);
      }
      // Ensure media recorder also stops if it was running
      this.stopRecordingInternal(this.stopReason || 'error');
    };

    this.speechRecognition.onstart = () => {
      console.log("ESR: speechRecognition.onstart fired.");
      this.recognitionServiceTrulyActive = true;
      this.options.onRecordingStart(); // Notify VIC that service has truly started
      this.startInitialSpeechTimer();
    };

    this.speechRecognition.onend = () => {
      console.log("ESR: speechRecognition.onend fired. Reason for stop (if known before onstop):", this.stopReason);
      this.recognitionServiceTrulyActive = false;
      // This is a critical point. If mediaRecorder is still recording, it means speechRecognition ended
      // but mediaRecorder didn't (e.g. silence timeout in speechRec but not mediaRec).
      // Or, if we called stopRecordingInternal, mediaRecorder.stop() would have been called.
      // The onRecordingStop callback to VIC is tied to mediaRecorder.onstop.
      // We need to ensure that if speechRecognition ends, the whole process is considered stopped.
      if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
         console.log("ESR: speechRecognition.onend: MediaRecorder still active, stopping it now.");
         this.stopRecordingInternal(this.stopReason || 'manual'); // Ensure media recorder also stops
      } else if (!this.mediaRecorder || this.mediaRecorder.state === "inactive") {
        // If media recorder is already stopped or never started, but onend fires,
        // ensure cleanup and onRecordingStop is called if it hasn't been.
        // This case might be redundant if stopRecordingInternal handles it.
        console.log("ESR: speechRecognition.onend: MediaRecorder inactive or null.");
        this.options.onRecordingStop(null, null); // Ensure stop callback if no audio
        this.cleanupAudioProcessing();
      }
    };

    this.speechRecognition.onspeechend = () => {
        console.log("ESR: onspeechend fired (user stopped talking).");
        // This is where silence detection by the API itself happens.
        // We reset our own silence timer here because speech has ended,
        // and we want our timer to catch prolonged silence *after* this.
        this.resetSilenceTimer();
    };
  }

  private startInitialSpeechTimer() {
    this.clearInitialSpeechTimer();
    this.hasDetectedSpeech = false;
    console.log("ESR: Starting initial speech timer for ms:", this.options.initialSpeechTimeout);
    this.initialSpeechTimeoutId = setTimeout(() => {
      if (!this.hasDetectedSpeech && this.recognitionServiceTrulyActive) { // Check if still active
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
    // Only start silence timer if recognition is supposed to be active
    if (this.recognitionServiceTrulyActive) {
      console.log("ESR: Resetting silence timer for ms:", this.options.silenceTimeout);
      this.silenceTimeoutId = setTimeout(() => {
        if (this.recognitionServiceTrulyActive) { // Double check before stopping
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
        
        // This is where VIC gets its audio.
        // Ensure recognitionServiceTrulyActive is false before VIC considers itself fully "idle".
        // The onRecordingStop callback might lead VIC to set its state to "idle".
        this.options.onRecordingStop(audioBlob, audioUrl);
        
        this.cleanupAudioProcessing(); // Clean up audio visualization
        this.audioChunks = [];
        this.isManuallyStopping = false;
        // this.stopReason = null; // Keep stopReason until next start attempt for logging
      };

      this.mediaRecorder.onerror = (event) => {
        console.error("ESR: MediaRecorder error", event);
        this.options.onError("MediaRecorder error.");
        this.stopRecordingInternal('error'); // This will also stop speechRecognition
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
    if (this.analyserNode && this.dataArray && this.mediaRecorder?.state === 'recording') {
      this.analyserNode.getByteTimeDomainData(this.dataArray);
      this.options.onAudioData(this.dataArray);
      this.animationFrameId = requestAnimationFrame(this.drawWaveform);
    } else {
      if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
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

    if (this.recognitionServiceTrulyActive) {
      console.warn("ESR: startRecording called but recognitionServiceTrulyActive is true. Aborting start.");
      // Optionally, call onError or just log. For now, log and prevent double start.
      // this.options.onError("Recording is already in progress or service is busy.");
      return;
    }
    // Also check media recorder state, though recognitionServiceTrulyActive should be the primary guard
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      console.warn("ESR: startRecording called but MediaRecorder is already recording. Aborting start.");
      return;
    }

    this.isManuallyStopping = false;
    this.stopReason = null;
    this.hasDetectedSpeech = false;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.setupMediaRecorder(stream); // Sets up mediaRecorder and audio visualization

      if (this.mediaRecorder) {
        this.mediaRecorder.start(); // Start media recorder
      }
      // speechRecognition.start() will trigger onstart, which then calls options.onRecordingStart
      this.speechRecognition.start(); // Start speech recognition

    } catch (err) {
      console.error("ESR: Error starting recording:", err);
      this.recognitionServiceTrulyActive = false; // Ensure state is correct on error
      let errorMessage = "Error starting recording.";
      if (err instanceof Error) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          errorMessage = "Microphone access denied. Please allow microphone access.";
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          errorMessage = "No microphone found. Please connect a microphone.";
        } else if (err.name === "InvalidStateError") { // Catch it here too
            errorMessage = "Cannot start recording: service is busy or in an invalid state. Please try again.";
        } else {
            errorMessage = err.message || "Could not access microphone.";
        }
      }
      this.options.onError(errorMessage);
      // Ensure cleanup if start failed
      this.cleanupAudioProcessing();
      if (this.mediaRecorder && this.mediaRecorder.stream) {
        this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    }
  }

  stopRecording(manualReason: 'manual' | 'error' = 'manual'): void {
    console.log("ESR: Public stopRecording (" + manualReason + ") called.");
    this.isManuallyStopping = true; // Mark that this stop was initiated by the library/user
    this.stopReason = manualReason;
    this.stopRecordingInternal(manualReason);
  }

  private stopRecordingInternal(reason: 'silence' | 'initial_timeout' | 'manual' | 'error'): void {
    console.log(`ESR: stopRecordingInternal. Reason: ${reason}. recognitionServiceTrulyActive: ${this.recognitionServiceTrulyActive}`);
    this.clearInitialSpeechTimer();
    this.clearSilenceTimer();

    // Stop speech recognition if it's active or thought to be active
    if (this.speechRecognition && this.recognitionServiceTrulyActive) {
      try {
        console.log("ESR: Calling speechRecognition.stop()");
        this.speechRecognition.stop();
        // recognitionServiceTrulyActive will be set to false in speechRecognition.onend
      } catch (e) {
        console.warn("ESR: Error stopping speech recognition (might be already stopped or in wrong state):", e);
        this.recognitionServiceTrulyActive = false; // Force state if stop() throws
      }
    } else if (this.speechRecognition && !this.recognitionServiceTrulyActive) {
        console.log("ESR: stopRecordingInternal: speechRecognition service already marked as inactive.");
    }


    // Stop media recorder if it's recording
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      console.log("ESR: Calling mediaRecorder.stop()");
      this.mediaRecorder.stop(); // This will trigger mediaRecorder.onstop where audio is processed
    } else if (this.mediaRecorder && this.mediaRecorder.state === "inactive") {
      console.log("ESR: stopRecordingInternal: MediaRecorder already inactive.");
      // If media recorder is already stopped, but we are in a stop flow,
      // ensure the onRecordingStop callback is fired if it hasn't been, especially if no audio was captured.
      // This path might be hit if speechRecognition stops first (e.g. error) before mediaRecorder.
      // The mediaRecorder.onstop should handle the primary onRecordingStop call with audio.
      // If no audio, this ensures a stop signal.
      if (this.audioChunks.length === 0) {
         // this.options.onRecordingStop(null, null); // Potentially redundant if mediaRecorder.onstop always fires
      }
      this.cleanupAudioProcessing();
    } else {
      // No media recorder or it was never started
      console.log("ESR: stopRecordingInternal: MediaRecorder not active or not initialized.");
      this.cleanupAudioProcessing(); // Still cleanup audio visualization
      // If there was no media recorder, we still need to signal that recording has stopped.
      // This is important if speech recognition was attempted but media recording failed to start.
      if (!this.mediaRecorder) {
        // this.options.onRecordingStop(null, null); // Potentially redundant
      }
    }

    // Clean up media stream tracks (microphone)
    // This should ideally happen after both speech recognition and media recorder are confirmed stopped.
    // speechRecognition.onend and mediaRecorder.onstop are the places.
    // For now, let's ensure tracks are stopped if we are in a stop flow.
    if (this.mediaRecorder && this.mediaRecorder.stream) {
        this.mediaRecorder.stream.getTracks().forEach(track => {
            if (track.readyState === 'live') track.stop();
        });
    }
  }
}

export default EnhancedSpeechRecorder;