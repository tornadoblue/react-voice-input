import React, { useState } from 'react';
import { VoiceInputCapture } from '../components/VoiceInputCapture';
import { VoiceInputCaptureProps } from '../types';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mic, X } from 'lucide-react';
import { toast } from "sonner";

interface Recording {
  id: string;
  text: string;
  audioUrl?: string | null;
  timestamp: Date;
}

export const TestAutoStartRecording: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);

  const handleSave: VoiceInputCaptureProps['onSave'] = (text, audioBlob, audioUrl) => {
    console.log('Auto-recording saved - Text:', text);
    console.log('Audio Blob:', audioBlob);
    console.log('Audio URL:', audioUrl);
    
    const newRecording: Recording = {
      id: crypto.randomUUID(),
      text,
      audioUrl,
      timestamp: new Date(),
    };
    
    setRecordings(prev => [newRecording, ...prev]);
    toast.success("Voice recording saved automatically!");
    
    // Close modal after saving
    setIsModalOpen(false);
  };

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      // Clean up any audio URLs when modal closes
      recordings.forEach(recording => {
        if (recording.audioUrl) {
          URL.revokeObjectURL(recording.audioUrl);
        }
      });
    }
  };

  const clearRecordings = () => {
    // Clean up audio URLs
    recordings.forEach(recording => {
      if (recording.audioUrl) {
        URL.revokeObjectURL(recording.audioUrl);
      }
    });
    setRecordings([]);
    toast.success("All recordings cleared!");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Auto Start Recording Test</h1>
        <p className="text-muted-foreground">
          Click the button below to open a modal that automatically starts voice recording
        </p>
      </div>

      {/* Test Button and Modal */}
      <div className="flex justify-center">
        <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Mic className="w-5 h-5 mr-2" />
              Test Auto Start Recording
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                Auto Voice Recording
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
              <DialogDescription>
                Recording will start automatically. Speak clearly and the recording will save when you stop speaking or say "stop recording".
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4">
              <VoiceInputCapture
                onSave={handleSave}
                autoStartRecording={true}
                initialText=""
                placeholder="Auto-recording started... speak now or type here..."
                showWaveform={true}
                showInterimTranscript={true}
                silenceTimeout={4000}
                initialSpeechTimeout={8000}
                textDisplayClassName="text-lg min-h-[100px]"
                interimTranscriptClassName="bg-blue-50 text-blue-800 border border-blue-200"
                recordButtonClassName="bg-red-500 hover:bg-red-600 text-white"
                className="w-full"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Recordings Display */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recorded Sessions ({recordings.length})</h2>
          {recordings.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearRecordings}
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          )}
        </div>

        {recordings.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Mic className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No recordings yet. Click "Test Auto Start Recording" to begin.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {recordings.map((recording, index) => (
              <div key={recording.id} className="border rounded-lg p-4 bg-card">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Recording #{recordings.length - index}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {recording.timestamp.toLocaleString()}
                  </span>
                </div>
                
                {recording.text && (
                  <div className="mb-3">
                    <p className="text-foreground leading-relaxed">
                      "{recording.text}"
                    </p>
                  </div>
                )}
                
                {recording.audioUrl && (
                  <div className="mt-2">
                    <audio 
                      controls 
                      src={recording.audioUrl} 
                      className="w-full max-w-md"
                      preload="metadata"
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
                
                {!recording.text && !recording.audioUrl && (
                  <p className="text-muted-foreground italic">
                    No content recorded
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <h3 className="font-semibold">How to test:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
          <li>Click "Test Auto Start Recording" button</li>
          <li>A modal will open and recording will start automatically</li>
          <li>Start speaking immediately (you'll see "Listening..." then "Stop Recording")</li>
          <li>Recording will auto-stop after silence or when you say "stop recording"</li>
          <li>The transcribed text and audio will be saved and displayed below</li>
          <li>Modal will close automatically after saving</li>
        </ol>
      </div>
    </div>
  );
};

export default TestAutoStartRecording;