import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface WaveformDisplayProps {
  audioData: Uint8Array | null;
  width?: number; // Default width, will be overridden by className="w-full" if w-full is used
  height?: number; // Default height
  color?: string; // Prop for custom line color
  backgroundColor?: string; // Prop for custom background color
  className?: string;
}

const WaveformDisplay: React.FC<WaveformDisplayProps> = ({
  audioData,
  width = 300, 
  height = 60,
  color: colorProp, // Use alias for clarity
  backgroundColor: backgroundColorProp, // Use alias for clarity
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Define default colors here, using hardcoded values for testing
  const actualLineColor = colorProp || "blue"; 
  const actualBackgroundColor = backgroundColorProp || "lightgray";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    const context = canvas.getContext('2d');
    if (!context) return;

    // Clear and fill background
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = actualBackgroundColor; // Use the resolved background color
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (!audioData || audioData.length === 0) {
        // Draw a flat line if no audio data
        context.lineWidth = 1;
        context.strokeStyle = actualLineColor; // Use the resolved line color
        context.beginPath();
        context.moveTo(0, canvas.height / 2);
        context.lineTo(canvas.width, canvas.height / 2);
        context.stroke();
        return;
    }

    // Draw waveform
    const dataLength = audioData.length;
    context.lineWidth = 2;
    context.strokeStyle = actualLineColor; // Use the resolved line color
    context.beginPath();

    const sliceWidth = (canvas.width * 1.0) / dataLength;
    let x = 0;

    for (let i = 0; i < dataLength; i++) {
      const v = audioData[i] / 128.0; 
      const y = (v * canvas.height) / 2; 

      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
      x += sliceWidth;
    }
    context.stroke();

  // Add actualLineColor and actualBackgroundColor to dependencies
  // Also, width and height props are dependencies, though canvas dimensions are set from rect
  }, [audioData, actualLineColor, actualBackgroundColor, width, height]); 

  return (
    <canvas
      ref={canvasRef}
      width={width} // Initial canvas drawing buffer width
      height={height} // Initial canvas drawing buffer height
      className={cn("rounded-md", className)} 
      aria-label="Audio waveform"
    />
  );
};

export default WaveformDisplay;