import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface WaveformDisplayProps {
  audioData: Uint8Array | null;
  width?: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
  className?: string;
}

const WaveformDisplay: React.FC<WaveformDisplayProps> = ({
  audioData,
  width = 300, // Default width, will be overridden by className="w-full"
  height = 60,
  color, // Defaults to CSS variable below
  backgroundColor = "hsl(var(--muted)/0.5)",
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resolvedColor = color || 'hsl(var(--primary))';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas actual drawing dimensions based on its displayed size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (!audioData || audioData.length === 0) {
        // Draw a flat line if no audio data
        context.lineWidth = 1;
        context.strokeStyle = resolvedColor;
        context.beginPath();
        context.moveTo(0, canvas.height / 2);
        context.lineTo(canvas.width, canvas.height / 2);
        context.stroke();
        return;
    }

    const dataLength = audioData.length;
    context.lineWidth = 2;
    context.strokeStyle = resolvedColor;
    context.beginPath();

    const sliceWidth = (canvas.width * 1.0) / dataLength;
    let x = 0;

    for (let i = 0; i < dataLength; i++) {
      const v = audioData[i] / 128.0; // Normalize to 0-2 range (0 is silence, 1 is midpoint, 2 is max amplitude)
      const y = (v * canvas.height) / 2; // Scale to canvas height and center

      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
      x += sliceWidth;
    }

    // Ensure the line reaches the end of the canvas
    // context.lineTo(canvas.width, canvas.height / 2); // This might draw an unwanted line if data is short
    context.stroke();

  }, [audioData, resolvedColor, backgroundColor, width, height]); // Rerun when these change. Width/height props are for aspect ratio if not w-full.

  return (
    <canvas
      ref={canvasRef}
      // Width and height attributes are for the canvas coordinate system.
      // CSS will determine the display size.
      // We pass props width/height here to ensure canvas is redrawn if these specific props change,
      // though typically CSS classes like w-full and a fixed height class would be used.
      width={width} 
      height={height}
      className={cn("rounded-md", className)} // className will typically set w-full and a specific height e.g. h-16
      aria-label="Audio waveform"
    />
  );
};

export default WaveformDisplay;