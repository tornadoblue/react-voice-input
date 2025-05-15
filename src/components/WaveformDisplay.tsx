import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface WaveformDisplayProps {
  audioData: Uint8Array | null;
  width?: number;
  height?: number;
  barColor?: string;
  className?: string;
}

const WaveformDisplay: React.FC<WaveformDisplayProps> = ({
  audioData,
  width = 300,
  height = 100,
  barColor = 'hsl(var(--primary))',
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !audioData) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(dpr, dpr);
    
    context.clearRect(0, 0, width, height);
    context.fillStyle = barColor;

    const bufferLength = audioData.length;
    const barWidth = (width / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (audioData[i] / 255) * height; // Normalize to canvas height

      context.fillRect(
        x,
        height - barHeight / 2, // Center the waveform vertically
        barWidth,
        barHeight / 2 // Draw half height for a centered look
      );
      
      // For a more traditional waveform:
      // const y = (audioData[i] / 255.0) * height;
      // context.lineTo(x, y);
      // Or for bars:
      // context.fillRect(x, height - barHeight, barWidth, barHeight);


      x += barWidth + 1; // +1 for spacing between bars
    }

    // Example for line waveform (alternative to bars)
    // context.lineWidth = 2;
    // context.strokeStyle = barColor;
    // context.beginPath();
    // const sliceWidth = width * 1.0 / bufferLength;
    // let xLine = 0;
    // for(let i = 0; i < bufferLength; i++) {
    //   const v = audioData[i] / 128.0; // dataArray values are 0-255
    //   const yLine = v * height / 2;
    //   if(i === 0) {
    //     context.moveTo(xLine, yLine);
    //   } else {
    //     context.lineTo(xLine, yLine);
    //   }
    //   xLine += sliceWidth;
    // }
    // context.lineTo(canvas.width, canvas.height/2);
    // context.stroke();


  }, [audioData, width, height, barColor]);

  if (!audioData) {
    // Render a placeholder or nothing if no audio data
    return (
      <div style={{ width, height }} className={cn("bg-muted/50 rounded-md flex items-center justify-center", className)}>
        <p className="text-xs text-muted-foreground">Waveform</p>
      </div>
    );
  }

  return <canvas ref={canvasRef} className={cn("rounded-md", className)} />;
};

export default WaveformDisplay;