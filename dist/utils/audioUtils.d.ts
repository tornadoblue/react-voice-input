export interface DecodedAudioInfo {
    audioBuffer: AudioBuffer;
    duration: number;
}
export declare function decodeAudioBlob(audioBlob: Blob): Promise<DecodedAudioInfo | null>;
/**
 * Finds the time where the last significant sound ends, before a trailing silence.
 * @param audioBuffer The AudioBuffer to analyze.
 * @param minTrailingSilenceDuration Minimum duration (in seconds) of silence at the end to consider for trimming.
 * @param silenceThreshold Amplitude threshold (0-1) below which audio is considered silent.
 * @param analysisChunkDuration Duration (in seconds) of chunks to analyze for silence.
 * @returns The time (in seconds) where the last significant sound ends, or the original duration if no qualifying trailing silence is found.
 */
export declare function findLastSoundEndTime(audioBuffer: AudioBuffer, minTrailingSilenceDuration?: number, // Minimum silence at the very end to consider it "trailing"
silenceThreshold?: number, analysisChunkDuration?: number): number;
export declare function trimAudioBuffer(originalBuffer: AudioBuffer, newDurationInSeconds: number): AudioBuffer | null;
export declare function audioBufferToWavBlob(buffer: AudioBuffer): Blob;
//# sourceMappingURL=audioUtils.d.ts.map