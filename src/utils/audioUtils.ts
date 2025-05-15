export interface DecodedAudioInfo {
  audioBuffer: AudioBuffer;
  duration: number;
}

export async function decodeAudioBlob(audioBlob: Blob): Promise<DecodedAudioInfo | null> {
  try {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    await audioContext.close(); 
    return { audioBuffer, duration: audioBuffer.duration };
  } catch (error) {
    console.error("Error decoding audio blob:", error);
    return null;
  }
}

/**
 * Finds the time where the last significant sound ends, before a trailing silence.
 * @param audioBuffer The AudioBuffer to analyze.
 * @param minTrailingSilenceDuration Minimum duration (in seconds) of silence at the end to consider for trimming.
 * @param silenceThreshold Amplitude threshold (0-1) below which audio is considered silent.
 * @param analysisChunkDuration Duration (in seconds) of chunks to analyze for silence.
 * @returns The time (in seconds) where the last significant sound ends, or the original duration if no qualifying trailing silence is found.
 */
export function findLastSoundEndTime(
  audioBuffer: AudioBuffer,
  minTrailingSilenceDuration: number = 0.5, // Minimum silence at the very end to consider it "trailing"
  silenceThreshold: number = 0.01, 
  analysisChunkDuration: number = 0.05 // Analyze in 50ms chunks
): number {
  const { sampleRate, length } = audioBuffer;
  if (length === 0) return 0;

  const samplesPerChunk = Math.floor(sampleRate * analysisChunkDuration);
  const minSilentChunksForTrailingSilence = Math.ceil(minTrailingSilenceDuration / analysisChunkDuration);
  
  const pcmData = audioBuffer.getChannelData(0); 
  let lastSoundChunkIndex = Math.floor(length / samplesPerChunk) - 1; // Assume sound until the last chunk
  let consecutiveSilentChunksAtEnd = 0;

  // Scan backwards from the end to find the last non-silent chunk
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
      if (i === Math.floor(length / samplesPerChunk) - 1 - consecutiveSilentChunksAtEnd) {
        // This silent chunk is part of a sequence at the very end
        consecutiveSilentChunksAtEnd++;
      } else {
        // This silent chunk is not at the very end, or the sequence was broken
        // For this function, we only care about the block of sound before a final silence.
      }
    } else {
      // This chunk has sound. This is the last chunk with sound.
      lastSoundChunkIndex = i;
      break; // Found the last sound chunk, no need to go further back
    }
  }

  // Calculate the time where the sound in the lastSoundChunkIndex ends
  let lastSoundTime = ((lastSoundChunkIndex + 1) * samplesPerChunk) / sampleRate;
  lastSoundTime = Math.min(lastSoundTime, audioBuffer.duration); // Cap at buffer duration

  console.log(`AudioUtils: Initial lastSoundTime: ${lastSoundTime.toFixed(2)}s. Consecutive silent chunks at end: ${consecutiveSilentChunksAtEnd}`);

  // If there's enough trailing silence, we confirm the lastSoundTime.
  // Otherwise, it means the audio ended with sound or very short silence, so no trimming based on this.
  if (consecutiveSilentChunksAtEnd >= minSilentChunksForTrailingSilence) {
    // The sound truly ended before this trailing silence block
    const endOfSoundBeforeTrailingSilence = (length / sampleRate) - (consecutiveSilentChunksAtEnd * analysisChunkDuration);
    console.log(`AudioUtils: Sufficient trailing silence detected. Sound considered to end at: ${endOfSoundBeforeTrailingSilence.toFixed(2)}s`);
    return endOfSoundBeforeTrailingSilence;
  } else {
    console.log(`AudioUtils: Not enough trailing silence (found ${consecutiveSilentChunksAtEnd * analysisChunkDuration}s, need ${minTrailingSilenceDuration}s). Returning original duration or end of last detected sound.`);
    // If not enough trailing silence, return the original duration, implying no trim based on this logic.
    // Or, return `lastSoundTime` if we want to trim any tiny bit of silence even if not meeting `minTrailingSilenceDuration`.
    // For safety, let's return original duration if no *significant* trailing silence.
    return audioBuffer.duration; 
  }
}


export function trimAudioBuffer(originalBuffer: AudioBuffer, newDurationInSeconds: number): AudioBuffer | null {
  const { sampleRate, numberOfChannels, length } = originalBuffer;
  // Ensure newDurationInSeconds is not negative and not excessively small
  const newDuration = Math.max(0.01, newDurationInSeconds); // Ensure at least 10ms or positive
  const newLengthInSamples = Math.floor(newDuration * sampleRate);

  if (newLengthInSamples <= 0 || newLengthInSamples > length) {
    console.error("AudioUtils: Invalid new duration for trimming.", newDuration, "Original:", originalBuffer.duration, "Attempted samples:", newLengthInSamples, "Original samples:", length);
    // Return original buffer if trimming makes no sense or is erroneous
    return originalBuffer; 
  }
  if (Math.abs(originalBuffer.duration - newDuration) < 0.01) { // If difference is less than 10ms
    console.log("AudioUtils: Trim duration very close to original. Returning original buffer.");
    return originalBuffer; // No significant change
  }

  try {
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
    tempAudioContext.close();
    console.log(`AudioUtils: Trimmed AudioBuffer from ${originalBuffer.duration.toFixed(2)}s to ${newBuffer.duration.toFixed(2)}s`);
    return newBuffer;
  } catch (error) {
    console.error("AudioUtils: Error trimming AudioBuffer:", error);
    return null; // Return null on error
  }
}

export function audioBufferToWavBlob(buffer: AudioBuffer): Blob {
  // ... (WAV encoding logic remains the same)
  const numOfChan = buffer.numberOfChannels;
  const C = numOfChan; 
  const L = buffer.length * numOfChan * 2 + 44;
  const bufferWav = new ArrayBuffer(L);
  const view = new DataView(bufferWav);
  const channels = [];
  let i = 0;
  let sample = 0;
  let offset = 0;

  function setUint16(data: number) {
    view.setUint16(offset, data, true);
    offset += 2;
  }
  function setUint32(data: number) {
    view.setUint32(offset, data, true);
    offset += 4;
  }

  setUint32(0x46464952); 
  setUint32(L - 8); 
  setUint32(0x45564157); 
  setUint32(0x20746d66); 
  setUint32(16); 
  setUint16(1); 
  setUint16(C); 
  setUint32(buffer.sampleRate); 
  setUint32(buffer.sampleRate * 2 * C); 
  setUint16(C * 2); 
  setUint16(16); 
  setUint32(0x61746164); 
  setUint32(L - offset - 4); // Corrected data chunk size calculation

  for (i = 0; i < C; i++) {
    channels.push(buffer.getChannelData(i));
  }

  // Re-write data part with simpler logic for clarity and correctness
  // The offset should be correctly at the start of the data chunk here.
  for (let k = 0; k < buffer.length; k++) { 
    for (let chan = 0; chan < numOfChan; chan++) { 
      sample = Math.max(-1, Math.min(1, channels[chan][k]));
      view.setInt16(offset, sample * 0x7fff, true);
      offset += 2;
    }
  }
  console.log("AudioUtils: Encoded AudioBuffer to WAV Blob.");
  return new Blob([view], { type: "audio/wav" });
}