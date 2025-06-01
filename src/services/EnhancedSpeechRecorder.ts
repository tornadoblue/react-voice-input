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
  private drawWaveformCallCount = 0; 

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
    // console.log("ESR: Constructor - Effective Silence Timeout:", this.options.silenceTimeout, "Effective Initial Speech Timeout:", this.options.initialSpeechTimeout);
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition() { /* ... no changes from previous valid step ... */ 
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      console.warn("ESR: Speech Recognition API not supported.");
      return; 
    }
    try {
      this.speechRecognition = new SpeechRecognitionAPI();
      this.speechRecognition.continuous = this.options.continuous!;
      this.speechRecognition.interimResults = this.options.interimResults!;
      this.speechRecognition.lang = navigator.language || 'en-US';
      this.speechRecognition.onresult = (event: any) => { 
        this.clearInitialSpeechTimer(); this.hasDetectedSpeech = true; this.resetSilenceTimer();
        let interim = ""; let final = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const part = event.results[i][0].transcript;
          if (event.results[i].isFinal) { final += part; } else { interim += part; }
        }
        if (final) this.options.onFinalTranscript(final.trim());
        if (interim) this.options.onInterimTranscript(interim.trim());
      };
      this.speechRecognition.onerror = (event: any) => { 
        const oldActive = this.recognitionServiceTrulyActive; this.recognitionServiceTrulyActive = false; 
        let msg = event.error || "Unknown speech error.";
        if (event.error === 'no-speech') { msg = "No speech detected."; this.stopReason = 'initial_timeout'; }
        else if (event.error === 'not-allowed') { msg = "Microphone access denied."; }
        if (event.error === 'aborted' && (this.isManuallyStopping || this.stopReason === 'dispose')) { /* expected */ } 
        else if (oldActive) { this.options.onError(msg); }
        this.stopRecordingInternal(this.stopReason || 'error');
      };
      this.speechRecognition.onstart = () => { 
        if (this.stopReason === 'dispose') { /* handle dispose */ return; }
        this.recognitionServiceTrulyActive = true; this.options.onRecordingStart(); this.startInitialSpeechTimer();
      };
      this.speechRecognition.onend = () => { 
        this.recognitionServiceTrulyActive = false; 
        // If not disposing, and SR ends unexpectedly, ensure recording stops.
        if (this.stopReason !== 'dispose' && this.mediaRecorder?.state === 'recording') {
             this.stopRecordingInternal(this.stopReason || 'manual'); // Or 'error' if SR ended due to error
        }
      };
      this.speechRecognition.onspeechend = () => { this.resetSilenceTimer(); };
    } catch (e) { this.speechRecognition = null; console.error("ESR: Init SR failed", e); }
  }
  private startInitialSpeechTimer() { /* ... no changes from previous valid step ... */ 
    this.clearInitialSpeechTimer(); this.hasDetectedSpeech = false;
    const timeout = this.options.initialSpeechTimeout; 
    if (typeof timeout !== 'number' || timeout <= 0) return;
    this.initialSpeechTimeoutId = setTimeout(() => {
      if (!this.hasDetectedSpeech && this.recognitionServiceTrulyActive) { 
        this.options.onError("No speech detected."); this.stopReason = 'initial_timeout';
        this.stopRecordingInternal('initial_timeout');
      }
    }, timeout);
  }
  private clearInitialSpeechTimer() { if (this.initialSpeechTimeoutId) clearTimeout(this.initialSpeechTimeoutId); this.initialSpeechTimeoutId = null; }
  private resetSilenceTimer() { /* ... no changes from previous valid step ... */ 
    this.clearSilenceTimer();
    if (this.recognitionServiceTrulyActive) {
      const timeout = this.options.silenceTimeout;
      if (typeof timeout !== 'number' || timeout <= 0) return;
      this.silenceTimeoutId = setTimeout(() => {
        if (this.recognitionServiceTrulyActive) { 
          this.options.onError("Silence detected, stopping."); this.stopReason = 'silence';
          this.stopRecordingInternal('silence');
        }
      }, timeout);
    }
  }
  private clearSilenceTimer() { if (this.silenceTimeoutId) clearTimeout(this.silenceTimeoutId); this.silenceTimeoutId = null; }

  private setupMediaRecorder(stream: MediaStream) { 
    this.drawWaveformCallCount = 0; 
    try {
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];
      this.mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) this.audioChunks.push(e.data); };
      this.mediaRecorder.onstop = () => {
        const blob = this.audioChunks.length > 0 ? new Blob(this.audioChunks, { type: this.audioChunks[0]?.type }) : null;
        const url = blob ? URL.createObjectURL(blob) : null;
        this.options.onRecordingStop(blob, url);
        this.cleanupAudioProcessing(); 
        this.audioChunks = [];
      };
      this.mediaRecorder.onerror = (e) => { this.options.onError("MediaRecorder error."); this.stopRecordingInternal('error'); };
      
      // Start MediaRecorder and immediately log its state
      this.mediaRecorder.start();
      console.log(`ESR: MediaRecorder started in setup. State: ${this.mediaRecorder.state}`);

    } catch (error) {
        console.error("ESR: Error setting up MediaRecorder:", error);
        this.options.onError("Failed to set up audio recording component.");
        return; 
    }

    try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.analyserNode = this.audioContext.createAnalyser();
        this.analyserNode.fftSize = 2048; 
        this.dataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
        this.sourceNode = this.audioContext.createMediaStreamSource(stream);
        this.sourceNode.connect(this.analyserNode);
        console.log("ESR: Web Audio API setup for waveform. Initial drawWaveform call.");
        this.drawWaveform(); 
    } catch (error) { console.error("ESR: Error setting up Web Audio API for waveform:", error); }
  }

  private drawWaveform = () => {
    this.drawWaveformCallCount++;
    // Log the state check on each frame, but less frequently to console
    if (this.drawWaveformCallCount % 30 === 0) { // Roughly every half second
        // console.log(`ESR: drawWaveform check #${this.drawWaveformCallCount}. MediaRecorder state: ${this.mediaRecorder?.state}. Analyser: ${!!this.analyserNode}. DataArray: ${!!this.dataArray}`);
    }

    if (this.analyserNode && this.dataArray && this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      if (this.drawWaveformCallCount % 60 === 0) { // Log active state less frequently
        // console.log(`ESR: Waveform loop ACTIVE (call #${this.drawWaveformCallCount}), mediaRecorder.state: ${this.mediaRecorder.state}`);
      }
      this.analyserNode.getByteTimeDomainData(this.dataArray);
      this.options.onAudioData(new Uint8Array(this.dataArray)); 
      this.animationFrameId = requestAnimationFrame(this.drawWaveform);
    } else {
      if (this.drawWaveformCallCount === 1 || this.drawWaveformCallCount % 60 === 0) { // Log if it stops, but not too often
        // console.log(`ESR: drawWaveform loop STOPPING/NOT RUNNING (call #${this.drawWaveformCallCount}). Analyser: ${!!this.analyserNode}, DataArray: ${!!this.dataArray}, MediaRecorder State: ${this.mediaRecorder?.state}`);
      }
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
  };

  private cleanupAudioProcessing = () => { /* ... no changes from previous valid step ... */ 
    if (this.animationFrameId) { cancelAnimationFrame(this.animationFrameId); this.animationFrameId = null; }
    if (this.audioContext && this.audioContext.state !== 'closed') {
        if (this.sourceNode) { try { this.sourceNode.disconnect(); } catch(e) {} }
    }
    this.sourceNode = null; this.analyserNode = null; 
    if (this.audioContext && this.audioContext.state !== 'closed') { this.audioContext.close().catch(e => {}); }
    this.audioContext = null; this.dataArray = null;
  };

  async startRecording(): Promise<void> { 
    // console.log("ESR: Public startRecording.");
    if (!this.speechRecognition) { this.options.onError("SR not init."); return; }
    if (this.recognitionServiceTrulyActive || (this.mediaRecorder && this.mediaRecorder.state === "recording")) {
      // console.warn("ESR: Already recording."); 
      return;
    }
    this.isManuallyStopping = false; this.stopReason = null; this.hasDetectedSpeech = false;
    
    try {
      // console.log("ESR: Getting user media...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // console.log("ESR: Got stream.");
      this.setupMediaRecorder(stream); // This now starts mediaRecorder and logs its state

      if (!this.mediaRecorder || this.mediaRecorder.state !== 'recording') { 
        console.error("ESR: MediaRecorder did not start correctly in setup.");
        stream.getTracks().forEach(track => track.stop()); 
        // options.onError would have been called in setupMediaRecorder
        return;
      }
      
      // console.log("ESR: Starting SpeechRecognition...");
      this.speechRecognition.start(); 
      // console.log("ESR: speechRecognition.start() called.");

    } catch (err) {
      console.error("ESR: Error in startRecording sequence:", err);
      this.recognitionServiceTrulyActive = false; 
      let msg = "Error starting recording.";
      if (err instanceof Error) { /* map common errors to messages */ 
        if (err.name === "NotAllowedError") msg = "Microphone access denied.";
        else if (err.name === "NotFoundError") msg = "No microphone found.";
      }
      this.options.onError(msg);
      this.cleanupAudioProcessing(); 
    }
  }
  stopRecording(manualReason: 'manual' | 'error' = 'manual'): void { /* ... no changes from previous valid step ... */ 
    if (this.stopReason === 'dispose') return;
    if (!this.recognitionServiceTrulyActive && (!this.mediaRecorder || this.mediaRecorder.state === 'inactive')) return;
    this.isManuallyStopping = true; this.stopReason = manualReason;
    this.stopRecordingInternal(manualReason);
  }
  private stopRecordingInternal(reason: 'silence' | 'initial_timeout' | 'manual' | 'error' | 'dispose'): void { /* ... no changes from previous valid step ... */ 
    this.clearInitialSpeechTimer(); this.clearSilenceTimer();
    if (this.speechRecognition && (this.recognitionServiceTrulyActive || reason === 'dispose')) {
        try { this.speechRecognition.stop(); } catch (e) { this.recognitionServiceTrulyActive = false; }
    }
    if (this.mediaRecorder) {
        if (this.mediaRecorder.state === "recording") { this.mediaRecorder.stop(); }
        else if (reason !== 'dispose') { this.cleanupAudioProcessing(); }
    }
    if (reason === 'dispose') { this.cleanupAudioProcessing(); /* + stop stream tracks */ }
  }
  public dispose(): void { /* ... no changes from previous valid step ... */ 
    this.stopReason = 'dispose'; this.isManuallyStopping = true; 
    this.clearInitialSpeechTimer(); this.clearSilenceTimer();
    if (this.speechRecognition) { try { this.speechRecognition.stop(); } catch (e) {} /* nullify handlers */ }
    this.recognitionServiceTrulyActive = false; 
    if (this.mediaRecorder) { /* stop, nullify handlers, stop stream tracks */ }
    this.cleanupAudioProcessing(); 
    this.audioChunks = []; this.speechRecognition = null; this.mediaRecorder = null; 
  }
}

export default EnhancedSpeechRecorder;