import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface WaveformDisplayProps {
  audioData: Uint8Array | null;
  color?: string;
  className?: string;
  backgroundColor?: string;
}

const WaveformDisplay: React.FC<WaveformDisplayProps> = ({
  audioData,
  color = '#3b82f6', // Default blue-500
  className,
  backgroundColor = 'transparent', // Default transparent
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const { width, height } = canvas;
    context.clearRect(0, 0, width, height);
    
    // Draw background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, width, height);

    if (!audioData || audioData.length === 0) {
      // Draw a flat line if no audio data
      context.beginPath();
      context.moveTo(0, height / 2);
      context.lineTo(width, height / 2);
      context.strokeStyle = color;
      context.lineWidth = 1;
      context.stroke();
      return;
    }

    context.lineWidth = 2;
    context.strokeStyle = color;
    context.beginPath();

    const sliceWidth = (width * 1.0) / audioData.length;
    let x = 0;

    for (let i = 0; i < audioData.length; i++) {
      const v = audioData[i] / 128.0; // Normalize data (assuming 0-255 range for Uint8Array from AnalyserNode)
      const y = (v * height) / 2;

      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
      x += sliceWidth;
    }

    context.lineTo(width, height / 2); // End waveform at middle right
    context.stroke();

  }, [audioData, color, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-16 rounded-md", className)}
      // Set initial canvas dimensions via props or fixed values, then scale with CSS
      // This helps with HiDPI displays. Actual drawing resolution.
      width={300} // Intrinsic width
      height={64} // Intrinsic height
    />
  );
};

export default WaveformDisplay;