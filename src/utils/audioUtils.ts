export interface DecodedAudioInfo {
  audioBuffer: AudioBuffer;
  duration: number;
}

export async function decodeAudioBlob(audioBlob: Blob): Promise<DecodedAudioInfo | null> {
  try {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    await audioContext.close(); // Close context after decoding
    return { audioBuffer, duration: audioBuffer.duration };
  } catch (error) {
    console.error("Error decoding audio blob:", error);
    return null;
  }
}

/**
 * Finds the start time of the last significant silence period at the end of an audio buffer.
 * This is a simplified approach.
 * @param audioBuffer The AudioBuffer to analyze.
 * @param minSilenceDuration Minimum duration (in seconds) to be considered a significant silence.
 * @param silenceThreshold Amplitude threshold (0-1) below which audio is considered silent.
 * @param analysisChunkDuration Duration (in seconds) of chunks to analyze for silence.
 * @returns The time (in seconds) where the final significant silence begins, or null if not found.
 */
export function findLastSilenceStartTime(
  audioBuffer: AudioBuffer,
  minSilenceDuration: number = 1.0, // Default: 1 second of silence
  silenceThreshold: number = 0.01, // Very low amplitude
  analysisChunkDuration: number = 0.1 // Analyze in 100ms chunks
): number | null {
  const { sampleRate, length, numberOfChannels } = audioBuffer;
  const samplesPerChunk = Math.floor(sampleRate * analysisChunkDuration);
  const minSilentChunks = Math.ceil(minSilenceDuration / analysisChunkDuration);

  if (length === 0) return null;

  // For simplicity, we'll use the first channel's data.
  // A more robust solution might average or check all channels.
  const pcmData = audioBuffer.getChannelData(0); 
  let consecutiveSilentChunks = 0;
  let lastSoundTime = audioBuffer.duration; // Assume sound until the end initially

  // Iterate backwards from the end of the audio buffer
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
      // Sound detected, this is the end of the sound before potential final silence
      lastSoundTime = (chunkEndSample / sampleRate);
      consecutiveSilentChunks = 0; // Reset counter
    }

    if (consecutiveSilentChunks >= minSilentChunks) {
      // Found enough consecutive silent chunks. The silence started after the last sound.
      // The silence effectively starts at the beginning of these silent chunks.
      const silenceStartTime = ((i * samplesPerChunk) / sampleRate);
      console.log(`AudioUtils: Found final silence. Last sound at: ${lastSoundTime.toFixed(2)}s. Silence starts around: ${silenceStartTime.toFixed(2)}s`);
      return silenceStartTime;
    }
  }
  
  // If loop finishes and not enough silent chunks were found at the very end,
  // but there was some sound, lastSoundTime would be its end.
  // If the whole thing was "sound" by this logic, it means no trailing silence was detected.
  if (consecutiveSilentChunks > 0 && consecutiveSilentChunks < minSilentChunks) {
     console.log(`AudioUtils: Some trailing silence found, but less than minSilenceDuration (${(consecutiveSilentChunks * analysisChunkDuration).toFixed(2)}s). Last sound at ${lastSoundTime.toFixed(2)}s`);
  } else if (consecutiveSilentChunks === 0) {
     console.log(`AudioUtils: No significant trailing silence found. Audio seems to end with sound. Last sound at ${lastSoundTime.toFixed(2)}s`);
  }


  return null; // No significant silence found at the end matching criteria
}