import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface WaveformDisplayProps {
  audioData: Uint8Array | null;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const WaveformDisplay: React.FC<WaveformDisplayProps> = ({
  audioData,
  width = 300,
  height = 100,
  color = "hsl(var(--primary))",
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !audioData) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const dataLength = audioData.length;
    context.clearRect(0, 0, width, height);
    context.lineWidth = 2;
    context.strokeStyle = color;
    context.beginPath();

    const sliceWidth = (width * 1.0) / dataLength;
    let x = 0;

    for (let i = 0; i < dataLength; i++) {
      const v = audioData[i] / 128.0; // Normalize to 0-2 range
      const y = (v * height) / 2;

      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
      x += sliceWidth;
    }

    context.lineTo(canvas.width, canvas.height / 2);
    context.stroke();

  }, [audioData, width, height, color]);

  if (!audioData) {
    // Render a flat line or nothing when no audio data
    return (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={cn("bg-muted/50 rounded-md", className)}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={cn("bg-muted/50 rounded-md", className)}
    />
  );
};

export default WaveformDisplay;