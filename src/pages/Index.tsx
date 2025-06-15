import { VoiceInputCapture, VoiceInputCaptureProps } from "react-voice-input"; 
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Recording {
  id: string;
  text: string;
  audioUrl?: string | null;
  timestamp: number;
}

const LOCAL_STORAGE_KEY = "voiceRecordings";
const SILENCE_TIMEOUT_MS = 3000; 
const INITIAL_SPEECH_TIMEOUT_MS = 5000; 

const Index = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [captureKey, setCaptureKey] = useState<number>(0); 

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

  const handleSaveNewRecording: VoiceInputCaptureProps['onSave'] = (finalText, audioBlob, audioUrl) => {
    console.log("Index: handleSaveNewRecording called. Text:", finalText, "Audio URL:", audioUrl, "Blob exists:", !!audioBlob);
    
    if (!finalText.trim() && !audioBlob) { 
      console.log("Index: Attempted to save empty recording (no text, no audio). Skipping.");
      setCaptureKey(prevKey => prevKey + 1); 
      return;
    }

    const newRecording: Recording = {
      id: crypto.randomUUID(),
      text: finalText,
      audioUrl: audioUrl || null, 
      timestamp: Date.now(),
    };
    setRecordings(prevRecordings => [newRecording, ...prevRecordings]); 
    toast.success("Recording added!");
    setCaptureKey(prevKey => prevKey + 1); 
  };

  const handleDeleteRecording = (idToDelete: string) => {
    setRecordings(prev => {
      const newRecordings = prev.filter(rec => rec.id !== idToDelete);
      const deletedRecording = prev.find(rec => rec.id === idToDelete);
      if (deletedRecording?.audioUrl && deletedRecording.audioUrl.startsWith("blob:")) {
        URL.revokeObjectURL(deletedRecording.audioUrl);
      }
      return newRecordings;
    });
    toast.info("Recording deleted.");
  };

  const handleResetAll = () => {
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Notes Journal</h1>
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
            key={captureKey} 
            onSave={handleSaveNewRecording}
            initialText="" 
            placeholder="Start speaking or type your entry..."
            silenceTimeout={SILENCE_TIMEOUT_MS}
            initialSpeechTimeout={INITIAL_SPEECH_TIMEOUT_MS}
            showWaveform={true}
            showInterimTranscript={true} // This controls the separate interim display
            showVersionInfo={true} // Assuming you want to keep this
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