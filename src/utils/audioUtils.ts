export interface DecodedAudioInfo {
  audioBuffer: AudioBuffer;
  duration: number;
}

export async function decodeAudioBlob(audioBlob: Blob): Promise<DecodedAudioInfo | null> {
  try {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    // Not closing context here, as it might be needed by trimAudioBuffer if it's called immediately.
    // trimAudioBuffer will create its own temporary context.
    console.log("AudioUtils: Decoded audio blob successfully.");
    return { audioBuffer, duration: audioBuffer.duration };
  } catch (error) {
    console.error("AudioUtils: Error decoding audio blob:", error);
    return null;
  }
}

/**
 * Finds the time where the main audio content ends, before a final silence period.
 * @returns The time (in seconds) where the desired sound content ends, or null.
 */
export function findLastSilenceStartTime(
  audioBuffer: AudioBuffer,
  minSilenceDurationSec: number = 1.0,
  silenceThreshold: number = 0.01,
  analysisChunkDurationSec: number = 0.1
): number | null {
  const { sampleRate, length } = audioBuffer;
  if (length === 0) {
    console.log("AudioUtils: Audio buffer is empty.");
    return null;
  }

  const samplesPerChunk = Math.floor(sampleRate * analysisChunkDurationSec);
  const numChunks = Math.floor(length / samplesPerChunk);
  const minSilentChunks = Math.ceil(minSilenceDurationSec / analysisChunkDurationSec);

  if (numChunks < minSilentChunks) {
    console.log("AudioUtils: Audio is shorter than minimum silence duration, cannot find trailing silence.");
    return audioBuffer.duration; // Or null, depending on desired behavior for very short audio
  }

  const pcmData = audioBuffer.getChannelData(0); // Analyze first channel
  let silentChunkCounter = 0;

  // Iterate backwards from the second to last chunk
  // (because the very last chunk might be part of the silence we are measuring)
  for (let i = numChunks - 1; i >= 0; i--) {
    const chunkStartSample = i * samplesPerChunk;
    const chunkEndSample = chunkStartSample + samplesPerChunk;
    let maxAmplitudeInChunk = 0;

    for (let j = chunkStartSample; j < chunkEndSample; j++) {
      if (j < pcmData.length) { // Boundary check
        const sampleAmplitude = Math.abs(pcmData[j]);
        if (sampleAmplitude > maxAmplitudeInChunk) {
          maxAmplitudeInChunk = sampleAmplitude;
        }
      }
    }

    if (maxAmplitudeInChunk < silenceThreshold) {
      silentChunkCounter++;
    } else {
      // Found sound. If we had accumulated enough silent chunks before this sound,
      // then this sound is part of the content we want to keep.
      // The silence we were measuring was *after* this point.
      if (silentChunkCounter >= minSilentChunks) {
        // The sound ended at the end of this current chunk (which has sound).
        const soundEndTime = (chunkEndSample / sampleRate);
        console.log(`AudioUtils: Found significant sound ending at ${soundEndTime.toFixed(2)}s after detecting a final silence block of ${silentChunkCounter * analysisChunkDurationSec}s.`);
        return soundEndTime;
      }
      // Reset counter if sound is found and we haven't met minSilentChunks yet
      silentChunkCounter = 0;
    }

    // If iterating from the end, and the first N chunks are silent:
    if (i === 0 && silentChunkCounter >= minSilentChunks) {
        console.log(`AudioUtils: Audio starts with or is entirely silence of at least ${minSilenceDurationSec}s.`);
        return 0; // Entire audio might be considered silence to be trimmed
    }
  }
  
  // If the loop completes and we haven't returned, it means the audio ends with sound
  // or any trailing silence was shorter than minSilenceDurationSec.
  console.log(`AudioUtils: No trailing silence block of at least ${minSilenceDurationSec}s found. Assuming content runs to the end.`);
  return audioBuffer.duration; // Return full duration if no qualifying silence is found to trim
}

export function trimAudioBuffer(originalBuffer: AudioBuffer, newDurationInSeconds: number): AudioBuffer | null {
  const { sampleRate, numberOfChannels, length } = originalBuffer;
  // Ensure newDurationInSeconds is not negative and not excessively small
  if (newDurationInSeconds < 0.01 && newDurationInSeconds !== 0) { 
    console.warn(`AudioUtils: Requested trim duration ${newDurationInSeconds}s is very small. Clamping to 0 or allowing if exactly 0.`);
    if (newDurationInSeconds < 0) newDurationInSeconds = 0;
  }


  const newLengthInSamples = Math.floor(newDurationInSeconds * sampleRate);

  if (newLengthInSamples < 0) { // Should be caught above, but as a safeguard
      console.error("AudioUtils: Calculated negative sample length for trimming. Aborting.");
      return null;
  }
  if (newLengthInSamples > length + samplesPerChunk) { // Allow a small margin for floating point issues with duration
    console.error(`AudioUtils: Invalid new duration for trimming. Requested ${newDurationInSeconds.toFixed(2)}s (${newLengthInSamples} samples), Original: ${originalBuffer.duration.toFixed(2)}s (${length} samples).`);
    return null;
  }
  // If newLength is effectively the same as original, no trim needed
  if (Math.abs(length - newLengthInSamples) < samplesPerChunk && newDurationInSeconds >= originalBuffer.duration - analysisChunkDurationSec ) {
      console.log("AudioUtils: Requested trim duration is effectively the same as original. No trim performed.");
      return originalBuffer; // Return original if no significant change
  }


  console.log(`AudioUtils: Attempting to trim original buffer (${originalBuffer.duration.toFixed(2)}s) to ${newDurationInSeconds.toFixed(2)}s.`);

  try {
    // Use a temporary AudioContext for creating the new buffer
    const tempAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    // If newLengthInSamples is 0, createBuffer might error or create a tiny buffer.
    // Let's handle 0-length explicitly if needed, though createBuffer should handle it.
    const newBuffer = tempAudioContext.createBuffer(
      numberOfChannels,
      Math.max(1, newLengthInSamples), // Ensure at least 1 sample if not 0, to avoid errors with createBuffer(0)
      sampleRate
    );

    if (newLengthInSamples > 0) {
        for (let i = 0; i < numberOfChannels; i++) {
          const channelData = originalBuffer.getChannelData(i);
          const newChannelData = newBuffer.getChannelData(i);
          newChannelData.set(channelData.subarray(0, newLengthInSamples));
        }
    }
    
    tempAudioContext.close().catch(e => console.warn("AudioUtils: Error closing temp audio context", e));
    console.log(`AudioUtils: Successfully trimmed AudioBuffer from ${originalBuffer.duration.toFixed(2)}s to ${newBuffer.duration.toFixed(2)}s.`);
    return newBuffer;
  } catch (error) {
    console.error("AudioUtils: Error during trimAudioBuffer:", error);
    return null;
  }
}

export function audioBufferToWavBlob(buffer: AudioBuffer): Blob | null {
  try {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length; // Number of sample frames per channel

    if (length === 0) {
        console.warn("AudioUtils: Attempting to encode an empty AudioBuffer to WAV. Returning empty blob.");
        return new Blob([], { type: "audio/wav" });
    }

    const C = numOfChan;
    const L = length * numOfChan * 2 + 44; // Total length of ArrayBuffer
    const wavBuffer = new ArrayBuffer(L);
    const view = new DataView(wavBuffer);
    
    let offset = 0;

    function setUint16(data: number) { /* ... same ... */ 
      view.setUint16(offset, data, true);
      offset += 2;
    }
    function setUint32(data: number) { /* ... same ... */ 
      view.setUint32(offset, data, true);
      offset += 4;
    }

    setUint32(0x46464952); // "RIFF"
    setUint32(L - 8);      // File length - 8
    setUint32(0x45564157); // "WAVE"
    setUint32(0x20746d66); // "fmt "
    setUint32(16);         // Chunk size (16 for PCM)
    setUint16(1);          // Audio format (1 for PCM)
    setUint16(C);          // Number of channels
    setUint32(buffer.sampleRate); // Sample rate
    setUint32(buffer.sampleRate * C * 2); // Byte rate (SampleRate * NumChannels * BitsPerSample/8)
    setUint16(C * 2);      // Block align (NumChannels * BitsPerSample/8)
    setUint16(16);         // Bits per sample
    setUint32(0x61746164); // "data"
    setUint32(length * C * 2); // Data sub-chunk size (NumSamples * NumChannels * BitsPerSample/8)

    const channels = [];
    for (let i = 0; i < C; i++) {
      channels.push(buffer.getChannelData(i));
    }

    for (let k = 0; k < length; k++) { // Iterate over sample frames
      for (let chan = 0; chan < C; chan++) { // Iterate over channels
        let sample = Math.max(-1, Math.min(1, channels[chan][k])); // Clamp to [-1, 1]
        view.setInt16(offset, sample * 0x7FFF, true); // Convert to 16-bit signed int
        offset += 2;
      }
    }
    console.log("AudioUtils: Encoded AudioBuffer to WAV Blob successfully.");
    return new Blob([view], { type: "audio/wav" });
  } catch (error) {
    console.error("AudioUtils: Error encoding AudioBuffer to WAV:", error);
    return null;
  }
}