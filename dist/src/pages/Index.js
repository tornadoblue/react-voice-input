import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { VoiceInputCapture } from "react-voice-input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Trash2, Settings } from "lucide-react";
const LOCAL_STORAGE_KEY = "voiceRecordings";
const DEFAULT_SILENCE_TIMEOUT_MS = 3000;
const DEFAULT_INITIAL_SPEECH_TIMEOUT_MS = 5000;
const DEFAULT_WAVEFORM_COLOR = "#3b82f6"; // blue-500
const DEFAULT_RECORD_BUTTON_STYLE = "bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800 dark:text-red-50";
const DEFAULT_INTERIM_TEXT_STYLE = "text-xl text-blue-700";
const NEW_DEFAULT_PLACEHOLDER = "Press Record button to start the dictation, or type here...";
const Index = () => {
    const [recordings, setRecordings] = useState([]);
    const [captureKey, setCaptureKey] = useState(0);
    // State for controllable props
    const [waveformColor, setWaveformColor] = useState(DEFAULT_WAVEFORM_COLOR);
    const [textStyle, setTextStyle] = useState('text-lg');
    const [interimTextStyle, setInterimTextStyle] = useState(DEFAULT_INTERIM_TEXT_STYLE);
    const [recordButtonStyle, setRecordButtonStyle] = useState(DEFAULT_RECORD_BUTTON_STYLE);
    const [silenceTime, setSilenceTime] = useState(DEFAULT_SILENCE_TIMEOUT_MS);
    const [initialTime, setInitialTime] = useState(DEFAULT_INITIAL_SPEECH_TIMEOUT_MS);
    const [doShowWaveform, setDoShowWaveform] = useState(true);
    const [doShowInterim, setDoShowInterim] = useState(true);
    const [doShowVersion, setDoShowVersion] = useState(true);
    // Removed unused sharedTextStyleOptions
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
            if (storedRecordings)
                setRecordings(JSON.parse(storedRecordings));
        }
        catch (error) {
            console.error("Failed to load recordings:", error);
            toast.error("Could not load recordings.");
        }
    }, []);
    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recordings));
        }
        catch (error) {
            console.error("Failed to save recordings:", error);
            toast.error("Could not save recordings.");
        }
    }, [recordings]);
    const handleSaveNewRecording = (finalText, audioBlob, audioUrl) => {
        console.log("Index: handleSaveNewRecording called. Text:", finalText, "Audio URL:", audioUrl, "Blob exists:", !!audioBlob);
        if (!finalText.trim() && !audioBlob) {
            console.log("Index: Attempted to save empty recording (no text, no audio). Skipping.");
            setCaptureKey(prevKey => prevKey + 1);
            return;
        }
        const newRecording = {
            id: crypto.randomUUID(),
            text: finalText,
            audioUrl: audioUrl || null,
            timestamp: Date.now(),
        };
        setRecordings(prevRecordings => [newRecording, ...prevRecordings]);
        toast.success("Recording added!");
        setCaptureKey(prevKey => prevKey + 1);
    };
    const handleDeleteRecording = (idToDelete) => {
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
    return (_jsxs("div", { className: "container mx-auto p-4 sm:p-6 md:p-8 space-y-8", children: [_jsxs("header", { className: "text-center", children: [_jsx("h1", { className: "text-2xl sm:text-3xl font-bold mb-2", children: "Notes Journal" }), _jsx("p", { className: "text-muted-foreground text-sm sm:text-base", children: "Record your thoughts. Pauses or \"stop recording\" will save the entry." })] }), _jsxs(Card, { className: "w-full max-w-2xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Settings, { className: "w-5 h-5 mr-2" }), " Component Settings"] }), _jsx(CardDescription, { children: "Adjust the properties of the VoiceInputCapture component below." })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 items-end", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "waveformColor", children: "Waveform Color" }), _jsx(Input, { id: "waveformColor", value: waveformColor, onChange: (e) => setWaveformColor(e.target.value), placeholder: DEFAULT_WAVEFORM_COLOR })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "textStyle", children: "Main Text Style" }), _jsxs(Select, { onValueChange: setTextStyle, defaultValue: textStyle, children: [_jsx(SelectTrigger, { id: "textStyle", children: _jsx(SelectValue, { placeholder: "Select style" }) }), _jsx(SelectContent, { children: mainTextStyleOptions.map(opt => (_jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value))) })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 items-end", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "interimTextStyle", children: "Interim Text Style" }), _jsxs(Select, { onValueChange: setInterimTextStyle, defaultValue: interimTextStyle, children: [_jsx(SelectTrigger, { id: "interimTextStyle", children: _jsx(SelectValue, { placeholder: "Select style" }) }), _jsx(SelectContent, { children: interimStyleOptions.map(opt => (_jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value))) })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "recordButtonStyle", children: "Record Button Style (Tailwind)" }), _jsx(Input, { id: "recordButtonStyle", value: recordButtonStyle, onChange: (e) => setRecordButtonStyle(e.target.value), placeholder: "e.g., text-red-500 bg-blue-100" })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 items-end", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "silenceTimeout", children: "Silence Timeout (ms)" }), _jsx(Input, { id: "silenceTimeout", type: "number", value: silenceTime, onChange: (e) => setSilenceTime(Number(e.target.value)), step: 100, placeholder: String(DEFAULT_SILENCE_TIMEOUT_MS) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "initialSpeechTimeout", children: "Initial Speech Timeout (ms)" }), _jsx(Input, { id: "initialSpeechTimeout", type: "number", value: initialTime, onChange: (e) => setInitialTime(Number(e.target.value)), step: 100, placeholder: String(DEFAULT_INITIAL_SPEECH_TIMEOUT_MS) })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "showWaveform", checked: doShowWaveform, onCheckedChange: setDoShowWaveform }), _jsx(Label, { htmlFor: "showWaveform", children: "Show Waveform" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "showInterimTranscript", checked: doShowInterim, onCheckedChange: setDoShowInterim }), _jsx(Label, { htmlFor: "showInterimTranscript", children: "Show Interim Transcript" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "showVersionInfo", checked: doShowVersion, onCheckedChange: setDoShowVersion }), _jsx(Label, { htmlFor: "showVersionInfo", children: "Show Version Info" })] })] })] })] }), _jsxs(Card, { className: "w-full max-w-2xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "New Entry" }), _jsx(CardDescription, { children: "Click record, speak your mind, then edit and save." })] }), _jsx(CardContent, { children: _jsx(VoiceInputCapture, { onSave: handleSaveNewRecording, initialText: "", placeholder: NEW_DEFAULT_PLACEHOLDER, customWaveformColor: waveformColor, textDisplayClassName: textStyle, interimTranscriptClassName: interimTextStyle, recordButtonClassName: recordButtonStyle, silenceTimeout: silenceTime, initialSpeechTimeout: initialTime, showWaveform: doShowWaveform, showInterimTranscript: doShowInterim, showVersionInfo: doShowVersion }, captureKey) })] }), recordings.length > 0 && (_jsxs(Card, { className: "w-full max-w-2xl mx-auto", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "My Entries" }), _jsx(CardDescription, { children: "Your recorded entries are listed below." })] }), _jsxs(Button, { onClick: handleResetAll, variant: "outline", size: "sm", children: [_jsx(Trash2, { className: "w-4 h-4 mr-1" }), " Clear All"] })] }), _jsx(CardContent, { children: _jsx("ul", { className: "space-y-4", children: recordings.map((rec) => (_jsxs("li", { className: "p-3 border rounded-md shadow-sm bg-background", children: [_jsx("p", { className: "text-sm text-muted-foreground mb-1", children: new Date(rec.timestamp).toLocaleString() }), _jsx("p", { className: "whitespace-pre-wrap mb-2", children: rec.text }), rec.audioUrl && (_jsx("audio", { controls: true, src: rec.audioUrl, className: "w-full mb-2", children: "Your browser does not support the audio element." })), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleDeleteRecording(rec.id), className: "text-destructive hover:text-destructive-foreground hover:bg-destructive", children: [_jsx(Trash2, { className: "w-4 h-4 mr-1" }), " Delete Entry"] })] }, rec.id))) }) })] }))] }));
};
export default Index;
