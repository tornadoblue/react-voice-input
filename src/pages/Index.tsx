import { VoiceInputCapture, VoiceInputCaptureProps } from "react-voice-input"; 
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Trash2, Settings } from "lucide-react";

interface Recording {
  id: string;
  text: string;
  audioUrl?: string | null;
  timestamp: number;
}

const LOCAL_STORAGE_KEY = "voiceRecordings";
const DEFAULT_SILENCE_TIMEOUT_MS = 3000; 
const DEFAULT_INITIAL_SPEECH_TIMEOUT_MS = 5000; 
const DEFAULT_WAVEFORM_COLOR = "#3b82f6"; // blue-500
const DEFAULT_RECORD_BUTTON_STYLE = "bg-white hover:bg-red-50 text-red-600 border-2 border-red-500 dark:bg-gray-950 dark:hover:bg-red-900/20 dark:text-red-500 dark:border-red-700";
const DEFAULT_INTERIM_TEXT_STYLE = "text-xl text-blue-700"; 
const NEW_DEFAULT_PLACEHOLDER = "Press Record button to start the dictation, or type here...";

const Index = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [captureKey, setCaptureKey] = useState<number>(0); 

  // State for controllable props
  const [waveformColor, setWaveformColor] = useState<string>(DEFAULT_WAVEFORM_COLOR);
  const [textStyle, setTextStyle] = useState<string>('text-lg');
  const [interimTextStyle, setInterimTextStyle] = useState<string>(DEFAULT_INTERIM_TEXT_STYLE); 
  const [recordButtonStyle, setRecordButtonStyle] = useState<string>(DEFAULT_RECORD_BUTTON_STYLE);
  const [silenceTime, setSilenceTime] = useState<number>(DEFAULT_SILENCE_TIMEOUT_MS);
  const [initialTime, setInitialTime] = useState<number>(DEFAULT_INITIAL_SPEECH_TIMEOUT_MS);
  const [doShowWaveform, setDoShowWaveform] = useState<boolean>(true);
  const [doShowInterim, setDoShowInterim] = useState<boolean>(true);
  const [doShowVersion, setDoShowVersion] = useState<boolean>(true);

  const sharedTextStyleOptions = [
    { value: 'text-xs', label: 'X-Small (xs)' },
    { value: 'text-sm', label: 'Small (sm)' },
    { value: 'text-base', label: 'Base' },
    { value: 'text-lg', label: 'Large (lg)' },
    { value: 'text-xl', label: 'X-Large (xl)' },
    { value: 'text-2xl', label: '2X-Large (2xl)' },
    { value: 'font-semibold', label: 'Semibold' },
    { value: 'italic', label: 'Italic' },
    { value: 'text-blue-600', label: 'Blue Text' },
    { value: 'text-green-600', label: 'Green Text' },
  ];
  
  const mainTextStyleOptions = [
    { value: 'text-lg', label: 'Default (lg)' },
    { value: 'text-xl', label: 'Large (xl)' },
    { value: 'text-2xl font-semibold', label: 'X-Large (2xl) Semibold' },
    { value: 'text-lg italic', label: 'Default Italic (lg)' },
    { value: 'text-sm', label: 'Small (sm)' },
  ];

  const interimStyleOptions = [
    { value: DEFAULT_INTERIM_TEXT_STYLE, label: 'Default (XL, Dark Blue)' }, 
    { value: 'text-sm italic', label: 'Small, Italic (Old Default)' },
    { value: 'text-xs italic text-gray-500', label: 'X-Small, Italic, Gray' },
    { value: 'text-base font-medium', label: 'Base, Medium Weight' },
    { value: 'text-lg text-purple-500', label: 'Large, Purple' }, 
  ];


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
          <CardTitle className="flex items-center"><Settings className="w-5 h-5 mr-2" /> Component Settings</CardTitle>
          <CardDescription>Adjust the properties of the VoiceInputCapture component below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div>
              <Label htmlFor="waveformColor">Waveform Color</Label>
              <Input 
                id="waveformColor" 
                value={waveformColor} 
                onChange={(e) => setWaveformColor(e.target.value)} 
                placeholder={DEFAULT_WAVEFORM_COLOR} 
              />
            </div>
            <div>
              <Label htmlFor="textStyle">Main Text Style</Label>
              <Select onValueChange={setTextStyle} defaultValue={textStyle}>
                <SelectTrigger id="textStyle">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {mainTextStyleOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div>
              <Label htmlFor="interimTextStyle">Interim Text Style</Label>
              <Select onValueChange={setInterimTextStyle} defaultValue={interimTextStyle}>
                <SelectTrigger id="interimTextStyle">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {interimStyleOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="recordButtonStyle">Record Button Style (Tailwind)</Label>
              <Input 
                id="recordButtonStyle" 
                value={recordButtonStyle} 
                onChange={(e) => setRecordButtonStyle(e.target.value)} 
                placeholder="e.g., text-red-500 bg-blue-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div>
              <Label htmlFor="silenceTimeout">Silence Timeout (ms)</Label>
              <Input 
                id="silenceTimeout" 
                type="number" 
                value={silenceTime} 
                onChange={(e) => setSilenceTime(Number(e.target.value))} 
                step={100}
                placeholder={String(DEFAULT_SILENCE_TIMEOUT_MS)}
              />
            </div>
            <div>
              <Label htmlFor="initialSpeechTimeout">Initial Speech Timeout (ms)</Label>
              <Input 
                id="initialSpeechTimeout" 
                type="number" 
                value={initialTime} 
                onChange={(e) => setInitialTime(Number(e.target.value))} 
                step={100}
                placeholder={String(DEFAULT_INITIAL_SPEECH_TIMEOUT_MS)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="flex items-center space-x-2">
              <Switch id="showWaveform" checked={doShowWaveform} onCheckedChange={setDoShowWaveform} />
              <Label htmlFor="showWaveform">Show Waveform</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="showInterimTranscript" checked={doShowInterim} onCheckedChange={setDoShowInterim} />
              <Label htmlFor="showInterimTranscript">Show Interim Transcript</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="showVersionInfo" checked={doShowVersion} onCheckedChange={setDoShowVersion} />
              <Label htmlFor="showVersionInfo">Show Version Info</Label>
            </div>
          </div>
        </CardContent>
      </Card>

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
            placeholder={NEW_DEFAULT_PLACEHOLDER} // Use the new default placeholder
            customWaveformColor={waveformColor}
            textDisplayClassName={textStyle}
            interimTranscriptClassName={interimTextStyle}
            recordButtonClassName={recordButtonStyle}
            silenceTimeout={silenceTime}
            initialSpeechTimeout={initialTime}
            showWaveform={doShowWaveform}
            showInterimTranscript={doShowInterim}
            showVersionInfo={doShowVersion}
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