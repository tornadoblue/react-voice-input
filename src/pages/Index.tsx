import { VoiceInputCapture } from "@/index";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { List, Trash2 } from "lucide-react";

interface Recording {
  id: string;
  text: string;
  audioUrl?: string | null;
  timestamp: number;
}

const LOCAL_STORAGE_KEY = "voiceRecordings";

const Index = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [captureKey, setCaptureKey] = useState<number>(0); // Used to re-mount VoiceInputCapture

  // Load recordings from local storage on initial mount
  useEffect(() => {
    try {
      const storedRecordings = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedRecordings) {
        setRecordings(JSON.parse(storedRecordings));
      }
    } catch (error) {
      console.error("Failed to load recordings from local storage:", error);
      toast.error("Could not load saved recordings.");
    }
  }, []);

  // Save recordings to local storage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recordings));
    } catch (error) {
      console.error("Failed to save recordings to local storage:", error);
      toast.error("Could not save recordings.");
    }
  }, [recordings]);

  const handleSaveNewRecording = (finalText: string, audioBlob?: Blob, audioUrl?: string) => {
    console.log("New recording text:", finalText);
    const newRecording: Recording = {
      id: crypto.randomUUID(), // Modern way to generate unique IDs
      text: finalText,
      audioUrl: audioUrl || null, // audioUrl is already a blob URL from VoiceInputCapture
      timestamp: Date.now(),
    };

    setRecordings(prevRecordings => [...prevRecordings, newRecording]);
    
    // Revoke object URL from previous VoiceInputCapture instance if it existed and wasn't used for a recording
    // This is tricky because the audioUrl in VoiceInputCapture is internal.
    // The current audioUrl from onSave is the one we care about.
    // We don't need to manage VoiceInputCapture's internal blob URLs here, it should manage its own.

    toast.success("Recording added!");
    setCaptureKey(prevKey => prevKey + 1); // Re-mount VoiceInputCapture to reset it
  };

  const handleDeleteRecording = (idToDelete: string) => {
    const recordingToDelete = recordings.find(r => r.id === idToDelete);
    if (recordingToDelete && recordingToDelete.audioUrl) {
      URL.revokeObjectURL(recordingToDelete.audioUrl); // Clean up blob URL
    }
    setRecordings(prevRecordings => prevRecordings.filter(rec => rec.id !== idToDelete));
    toast.info("Recording deleted.");
  };

  const handleResetAll = () => {
    // Revoke all existing blob URLs before clearing
    recordings.forEach(rec => {
      if (rec.audioUrl) {
        URL.revokeObjectURL(rec.audioUrl);
      }
    });
    setRecordings([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear local storage
    setCaptureKey(prevKey => prevKey + 1); // Re-mount VoiceInputCapture
    toast.info("All recordings cleared.");
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Voice Journal</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Record your thoughts. Each recording will be added to the list below.
        </p>
      </header>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>New Entry</CardTitle>
          <CardDescription>
            Click record, speak your mind, then edit and save.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VoiceInputCapture
            key={captureKey}
            onSave={handleSaveNewRecording}
            initialText="" // Always start fresh for a new recording
            placeholder="Start speaking or type your entry..."
          />
        </CardContent>
      </Card>

      {recordings.length > 0 && (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>My Entries</CardTitle>
            <CardDescription>Your recorded entries are listed below.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recordings.sort((a,b) => b.timestamp - a.timestamp) // Display newest first
                .map((rec) => (
                <li key={rec.id} className="p-3 border rounded-md shadow-sm bg-background">
                  <p className="text-sm text-muted-foreground mb-1">
                    {new Date(rec.timestamp).toLocaleString()}
                  </p>
                  <p className="whitespace-pre-wrap mb-2">{rec.text}</p>
                  {rec.audioUrl && (
                    <audio controls src={rec.audioUrl} className="w-full mb-2">
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteRecording(rec.id)}
                    className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="text-center mt-8">
        <Button onClick={handleResetAll} variant="destructive" size="lg">
          <Trash2 className="w-5 h-5 mr-2" /> Clear All Entries & Reset
        </Button>
      </div>
    </div>
  );
};

export default Index;