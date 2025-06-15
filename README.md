# react-voice-input

A reusable React voice input component for capturing audio and transcribing speech, designed for easy integration into React applications.

[![npm version](https://badge.fury.io/js/react-voice-input.svg)](https://badge.fury.io/js/react-voice-input)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Version

0.1.65

## Installation

You can install `react-voice-input` using npm, yarn, or pnpm:

```bash
npm install react-voice-input
# or
yarn add react-voice-input
# or
pnpm add react-voice-input
```

Ensure you have the necessary peer dependencies installed:
```bash
npm install react react-dom lucide-react sonner @radix-ui/react-slot
# or
yarn add react react-dom lucide-react sonner @radix-ui/react-slot
# or
pnpm add react react-dom lucide-react sonner @radix-ui/react-slot
```

This component library is designed to work within a Tailwind CSS environment. Ensure your project is set up with Tailwind CSS.

## Basic Usage

Import the `VoiceInputCapture` component and use it in your React application:

```tsx
import React, { useState } from 'react';
import { VoiceInputCapture, VoiceInputCaptureProps } from 'react-voice-input';
// Make sure your project has Tailwind CSS set up and Sonner's Toaster for notifications.
// import { Toaster as SonnerToaster } from 'sonner'; // Or your existing Sonner setup

interface MyRecording {
  id: string;
  text: string;
  audioUrl?: string | null;
}

function App() {
  const [myRecordings, setMyRecordings] = useState<MyRecording[]>([]);

  const handleSave: VoiceInputCaptureProps['onSave'] = (text, audioBlob, audioUrl) => {
    console.log('Text:', text);
    console.log('Audio Blob:', audioBlob);
    console.log('Audio URL:', audioUrl);
    const newRecording: MyRecording = {
      id: crypto.randomUUID(),
      text,
      audioUrl,
    };
    setMyRecordings(prev => [newRecording, ...prev]);
    // You might want to show a toast notification here using Sonner
  };

  return (
    <div>
      {/* <SonnerToaster /> Needed for toast notifications from the component */}
      <h1>My Voice Notes App</h1>
      <VoiceInputCapture
        onSave={handleSave}
        initialText=""
        // placeholder defaults to "Press Record button to start the dictation, or type here..."
        silenceTimeout={3000}      // Optional: milliseconds of silence before auto-stopping
        initialSpeechTimeout={5000} // Optional: milliseconds to wait for speech before timing out
        textDisplayClassName="text-xl font-serif" // Example: Make text area larger and serif
        interimTranscriptClassName="text-lg text-purple-600" // Example: Style interim text
        recordButtonClassName="bg-green-500 hover:bg-green-600 text-white" // Example: Style record button
      />
      <h2>My Recordings:</h2>
      <ul>
        {myRecordings.map(rec => (
          <li key={rec.id}>
            <p>{rec.text}</p>
            {rec.audioUrl && <audio controls src={rec.audioUrl} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

## Props

The `VoiceInputCapture` component accepts the following props:

| Prop                         | Type                                                              | Default                        | Description                                                                                                |
| ---------------------------- | ----------------------------------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `onSave`                     | `(text: string, audioBlob: Blob \| null, audioUrl: string \| null) => void` | **Required**                   | Callback function triggered when recording stops (due to silence, manual stop, or error with content).     |
| `initialText`                | `string`                                                          | `""`                           | Initial text to display in the text area.                                                                  |
| `placeholder`                | `string`                                                          | `"Press Record button to start the dictation, or type here..."`      | Placeholder text for the text area.                                                                        |
| `showWaveform`               | `boolean`                                                         | `true`                         | Whether to display the audio waveform during recording.                                                    |
| `showInterimTranscript`      | `boolean`                                                         | `true`                         | Whether to display the interim (real-time) speech-to-text transcript.                                      |
| `customWaveformColor`        | `string`                                                          | `"#3b82f6"` (Tailwind blue-500) | Custom color for the waveform.                                                                             |
| `textDisplayClassName`       | `string`                                                          | `""` (Defaults to `text-lg`)   | Custom Tailwind CSS classes for the main text input area.                                                  |
| `interimTranscriptClassName` | `string`                                                          | `""` (Defaults to `text-sm italic text-muted-foreground`) | Custom Tailwind CSS classes for the interim transcript display area.                                     |
| `recordButtonClassName`      | `string`                                                          | `""`                           | Custom Tailwind CSS classes for the main record/stop/retry button.                                         |
| `disabled`                   | `boolean`                                                         | `false`                        | If true, disables the recording button and text input.                                                     |
| `silenceTimeout`             | `number`                                                          | `3000` (ms)                    | Duration of silence (in milliseconds) after speech before recording automatically stops.                   |
| `initialSpeechTimeout`       | `number`                                                          | `5000` (ms)                    | Duration (in milliseconds) to wait for initial speech before the recording times out if no speech is detected. |
| `showVersionInfo`            | `boolean`                                                         | `true`                         | Whether to display the component's version number.                                                         |


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### v0.1.0 (Initial Release)
*   Initial setup of the `react-voice-input` library.
*   Core `VoiceInputCapture` component with speech-to-text, audio recording, waveform display, and text editing.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details (though a LICENSE.md file is not created by default, you can add one).

---

Repository: [https://github.com/tornadoblue/react-voice-input](https://github.com/tornadoblue/react-voice-input)