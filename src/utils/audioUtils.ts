export interface DecodedAudioInfo {
  audioBuffer: AudioBuffer;
  duration: number;
}

export async function decodeAudioBlob(audioBlob: Blob): Promise<DecodedAudioInfo | null> {
  try {
    const arrayBuffer = await audioBlob.arrayBuffer();
    // Create a new AudioContext for each decoding operation to avoid issues with closed contexts
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    // It's good practice to close the context when done if it's not going to be reused immediately.
    // However, for repeated calls, managing a single context might be more efficient.
    // For simplicity here, we'll close it.
    await audioContext.close(); 
    return { audioBuffer, duration: audioBuffer.duration };
  } catch (error) {
    console.error("Error decoding audio blob:", error);
    return null;
  }
}

export function findLastSilenceStartTime(
  audioBuffer: AudioBuffer,
  minSilenceDuration: number = 1.0,
  silenceThreshold: number = 0.01,
  analysisChunkDuration: number = 0.1
): number | null {
  const { sampleRate, length, numberOfChannels } = audioBuffer;
  if (length === 0) return null;

  const samplesPerChunk = Math.floor(sampleRate * analysisChunkDuration);
  const minSilentChunks = Math.ceil(minSilenceDuration / analysisChunkDuration);
  const pcmData = audioBuffer.getChannelData(0); // Analyze first channel
  let consecutiveSilentChunks = 0;

  for (let i = Math.floor(length / samplesPerChunk) - 1; i >= 0; i--) {
    const chunkStartSample = i * samplesPerChunk;
    const chunkEndSample = Math.min(chunkStartSample + samplesPerChunk, length);
    let maxAmplitudeInChunk = 0;
    for (let j = chunkStartSample; j < chunkEndSample; j++) {
      const sampleAmplitude = Math.abs(pcmData[j]);
      if (sampleAmplitude > maxAmplitudeInChunk) {
        maxAmplitudeInChunk = sampleAmplitude;
      }
    }
    if (maxAmplitudeInChunk < silenceThreshold) {
      consecutiveSilentChunks++;
    } else {
      consecutiveSilentChunks = 0;
    }
    if (consecutiveSilentChunks >= minSilentChunks) {
      const silenceEffectivelyStartsAtSample = (i + consecutiveSilentChunks) * samplesPerChunk;
      // We want the time *before* this silence block starts
      const soundEndsAtSample = i * samplesPerChunk;
      const soundEndsAtTime = soundEndsAtSample / sampleRate;
      console.log(`AudioUtils: Found final silence. Effective silence start sample: ${silenceEffectivelyStartsAtSample}. Sound ends around: ${soundEndsAtTime.toFixed(2)}s`);
      return soundEndsAtTime; // This is the point where sound ends and detected silence begins
    }
  }
  console.log(`AudioUtils: No significant trailing silence found matching criteria.`);
  return null;
}

/**
 * Trims an AudioBuffer to a new duration.
 * @param originalBuffer The AudioBuffer to trim.
 * @param newDurationInSeconds The desired new duration.
 * @returns A new AudioBuffer containing the trimmed audio, or null if an error occurs.
 */
export function trimAudioBuffer(originalBuffer: AudioBuffer, newDurationInSeconds: number): AudioBuffer | null {
  const { sampleRate, numberOfChannels, length } = originalBuffer;
  const newLengthInSamples = Math.floor(newDurationInSeconds * sampleRate);

  if (newLengthInSamples <= 0 || newLengthInSamples > length) {
    console.error("AudioUtils: Invalid new duration for trimming.", newDurationInSeconds, "Original:", originalBuffer.duration);
    return null; 
  }

  try {
    // Create a new AudioContext to create the new AudioBuffer
    // This is necessary because an AudioBuffer cannot be created without an AudioContext,
    // and the original context might have been closed or be inaccessible.
    const tempAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const newBuffer = tempAudioContext.createBuffer(
      numberOfChannels,
      newLengthInSamples,
      sampleRate
    );

    for (let i = 0; i < numberOfChannels; i++) {
      const channelData = originalBuffer.getChannelData(i);
      const newChannelData = newBuffer.getChannelData(i);
      newChannelData.set(channelData.subarray(0, newLengthInSamples));
    }
    tempAudioContext.close(); // Close the temporary context
    console.log(`AudioUtils: Trimmed AudioBuffer from ${originalBuffer.duration.toFixed(2)}s to ${newBuffer.duration.toFixed(2)}s`);
    return newBuffer;
  } catch (error) {
    console.error("AudioUtils: Error trimming AudioBuffer:", error);
    return null;
  }
}

/**
 * Encodes an AudioBuffer to a WAV Blob.
 * @param buffer The AudioBuffer to encode.
 * @returns A Blob in WAV format.
 */
export function audioBufferToWavBlob(buffer: AudioBuffer): Blob {
  const numOfChan = buffer.numberOfChannels;
  const C = numOfChan; // Alias
  const L = buffer.length * numOfChan * 2 + 44;
  const bufferWav = new ArrayBuffer(L);
  const view = new DataView(bufferWav);
  const channels = [];
  let i = 0;
  let sample = 0;
  let offset = 0;
  const pos = 0; // Alias

  // Utilities
  function setUint16(data: number) {
    view.setUint16(offset, data, true);
    offset += 2;
  }
  function setUint32(data: number) {
    view.setUint32(offset, data, true);
    offset += 4;
  }

  // RIFF header
  setUint32(0x46464952); // "RIFF"
  setUint32(L - 8); // file length - 8
  setUint32(0x45564157); // "WAVE"

  // FMT sub-chunk
  setUint32(0x20746d66); // "fmt "
  setUint32(16); // chunk size
  setUint16(1); // audio format (PCM)
  setUint16(C); // number of channels
  setUint32(buffer.sampleRate); // sample rate
  setUint32(buffer.sampleRate * 2 * C); // byte rate
  setUint16(C * 2); // block align
  setUint16(16); // bits per sample

  // Data sub-chunk
  setUint32(0x61746164); // "data"
  setUint32(L - pos - 44); // chunk size

  // Write interleaved data
  for (i = 0; i < C; i++) {
    channels.push(buffer.getChannelData(i));
  }

  while (offset < L) {
    for (i = 0; i < C; i++) {
      // Interleave channels
      sample = Math.max(-1, Math.min(1, channels[i][pos])); // Clamp
      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // Scale to 16-bit signed int
      view.setInt16(offset, sample, true); // Write 16-bit sample
      offset += 2;
    }
    // Increment sample position for next frame
    // This was the source of the bug. It should be `channels[0].length` not `buffer.length`
    // and the increment should be based on sample frames, not raw offset.
    // The loop condition `offset < L` and incrementing `pos` correctly handles this.
    // The `pos` alias was not used, let's use a direct counter for samples processed.
    // Corrected logic:
    // The `while(offset < L)` loop iterates based on byte offset.
    // We need to advance through the samples of each channel.
    // The `pos` variable should represent the current sample frame index.
    // This part of WAV encoding is tricky. The original code had a subtle bug.
    // A simpler way to write data for PCM:
  }

  // Re-write data part with simpler logic for clarity and correctness
  offset = 44; // Start of data chunk
  for (let k = 0; k < buffer.length; k++) { // Iterate over samples (frames)
    for (let chan = 0; chan < numOfChan; chan++) { // Iterate over channels
      sample = Math.max(-1, Math.min(1, channels[chan][k]));
      view.setInt16(offset, sample * 0x7fff, true);
      offset += 2;
    }
  }
  console.log("AudioUtils: Encoded AudioBuffer to WAV Blob.");
  return new Blob([view], { type: "audio/wav" });
}