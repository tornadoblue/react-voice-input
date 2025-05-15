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
const SILENCE_TIMEOUT_MS = 3000; // 3 seconds for pause detection
const INITIAL_SPEECH_TIMEOUT_MS = 5000; // 5 seconds to wait for initial speech

const Index = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [captureKey, setCaptureKey] = useState<number>(0); // Used to reset VoiceInputCapture

  useEffect(() => {
    try {
      const storedRecordings = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedRecordings) setRecordings(JSON.parse(storedRecordings));
    } catch (error) { console.error("Failed to load recordings:", error); toast.error("Could not load recordings."); }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recordings));
    } catch (error) { console.error("Failed to save recordings:", error); toast.error("Could not save recordings."); }
  }, [recordings]);

  const handleSaveNewRecording = (finalText: string, audioBlob?: Blob | null, audioUrl?: string | null) => {
    console.log("Index: Saving new recording. Text:", finalText, "Audio URL:", audioUrl, "Blob exists:", !!audioBlob);
    
    if (!finalText.trim() && !audioBlob) { 
      console.log("Index: Attempted to save empty recording (no text, no audio). Skipping.");
      setCaptureKey(prevKey => prevKey + 1); 
      return;
    }

    const newRecording: Recording = {
      id: crypto.randomUUID(),
      text: finalText,
      audioUrl: audioUrl || null, // audioUrl is already an object URL from VIC
      timestamp: Date.now(),
    };
    setRecordings(prevRecordings => [newRecording, ...prevRecordings]); // Add to the beginning for chronological order
    toast.success("Recording added!");
    setCaptureKey(prevKey => prevKey + 1); // Reset VoiceInputCapture for a fresh state
  };

  const handleDeleteRecording = (idToDelete: string) => {
    const recToDelete = recordings.find(r => r.id === idToDelete);
    if (recToDelete?.audioUrl) {
      // Object URLs are managed by VoiceInputCapture's cleanup or when a new one is created for the same instance.
      // However, if we delete the entry here, and that URL is not used by an active VIC instance,
      // it's good practice to revoke it if we are sure it's no longer needed.
      // For simplicity, we'll assume VIC handles its current URL, and Index handles stored ones.
      // URL.revokeObjectURL(recToDelete.audioUrl); // This might be problematic if VIC is still using it.
      // Let's rely on VIC's internal cleanup for its *current* audio.
      // The URLs stored in `recordings` are for playback and should be valid.
    }
    setRecordings(prev => prev.filter(rec => rec.id !== idToDelete));
    toast.info("Recording deleted.");
  };

  const handleResetAll = () => {
    // For URLs stored in the recordings list that are object URLs, they should ideally be revoked
    // if they are not being actively used. However, since they are for playback,
    // they should remain valid as long as the recording entry exists.
    // When clearing all, we can iterate and revoke, but this assumes they are all object URLs
    // and not remote URLs if the app were to change.
    recordings.forEach(rec => { 
      if (rec.audioUrl && rec.audioUrl.startsWith("blob:")) {
        URL.revokeObjectURL(rec.audioUrl); 
      }
    });
    setRecordings([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setCaptureKey(prevKey => prevKey + 1);
    toast.info("All recordings cleared.");
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Voice Journal</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Record your thoughts. Pauses or "stop recording" will save the entry.
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
            key={captureKey} // Changing key will re-mount the component
            onSave={handleSaveNewRecording}
            initialText="" 
            placeholder="Start speaking or type your entry..."
            silenceTimeout={SILENCE_TIMEOUT_MS}
            initialSpeechTimeout={INITIAL_SPEECH_TIMEOUT_MS}
          />
        </CardContent>
      </Card>

      {recordings.length > 0 && (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Entries</CardTitle>
              <CardDescription>Your recorded entries are listed below.</CardDescription>
            </div>
            <Button onClick={handleResetAll} variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-1" /> Clear All
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {/* Recordings are already added to the beginning, so no need to sort again unless timestamp is edited */}
              {recordings.map((rec) => (
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
                    <Trash2 className="w-4 h-4 mr-1" /> Delete Entry
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;