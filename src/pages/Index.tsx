import { VoiceInputCapture } from "@/index";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [savedText, setSavedText] = useState<string>("");
  const [savedAudioUrl, setSavedAudioUrl] = useState<string | null>(null);
  const [captureKey, setCaptureKey] = useState<number>(0); // Used to re-mount the component

  const handleSave = (finalText: string, audioBlob?: Blob, audioUrl?: string) => {
    console.log("Text from library:", finalText);
    setSavedText(finalText);
    if (audioBlob) {
      console.log("Audio blob received, size:", audioBlob.size);
      // For demonstration, create a URL to play the audio
      // In a real app, you'd upload this blob.
      if (savedAudioUrl) {
        URL.revokeObjectURL(savedAudioUrl); // Clean up previous URL
      }
      const newAudioUrl = URL.createObjectURL(audioBlob);
      setSavedAudioUrl(newAudioUrl);
      toast.success("Text and audio saved!");
    } else {
      // If no new audio blob, but there was an old one, clear it
      if (savedAudioUrl) {
        URL.revokeObjectURL(savedAudioUrl);
        setSavedAudioUrl(null);
      }
      toast.success("Text saved!");
    }
  };

  const handleReset = () => {
    setSavedText("");
    if (savedAudioUrl) {
      URL.revokeObjectURL(savedAudioUrl);
      setSavedAudioUrl(null);
    }
    setCaptureKey(prevKey => prevKey + 1); // Change key to re-mount VoiceInputCapture with initial state
    toast.info("Demo reset.");
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Voice Input Capture Demo</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Test the VoiceInputCapture component below. Click "Start Recording" and speak.
        </p>
      </header>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Voice Input</CardTitle>
          <CardDescription>
            Use the component below to record your voice and see the transcription.
            The transcribed text can be edited before saving.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VoiceInputCapture
            key={captureKey} // Re-mounts when key changes
            onSave={handleSave}
            initialText="" // Start with empty text for each new session via reset
            placeholder="Click record and start speaking, or type here..."
            showWaveform={true}
            showInterimTranscript={true}
          />
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4">
           <Button onClick={handleReset} variant="outline">Reset Demo</Button>
           {savedAudioUrl && (
            <audio controls src={savedAudioUrl} className="w-full sm:w-auto">
              Your browser does not support the audio element.
            </audio>
          )}
        </CardFooter>
      </Card>

      {savedText && (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Saved Output</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-1">Final Text:</h3>
            <p className="text-muted-foreground whitespace-pre-wrap bg-muted p-3 rounded-md">{savedText || "No text saved yet."}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;