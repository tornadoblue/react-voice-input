import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";

const SpeechRecognitionTest: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech Recognition not supported');
      return;
    }

    try {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        console.log('🎤 Speech recognition started');
        setIsRecording(true);
        setError('');
      };

      recognitionRef.current.onresult = (event: any) => {
        console.log('🎯 Speech recognition result event fired!');
        console.log('Results:', event.results);
        
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          console.log(`Result ${i}:`, result[0].transcript, 'Final:', result.isFinal);
          
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }
        
        setTranscript(finalTranscript + (interimTranscript ? ` [${interimTranscript}]` : ''));
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('❌ Speech recognition error:', event.error);
        setError(`Error: ${event.error}`);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        console.log('🏁 Speech recognition ended');
        setIsRecording(false);
      };

      recognitionRef.current.onspeechstart = () => {
        console.log('🔊 Speech detected!');
      };

      recognitionRef.current.onspeechend = () => {
        console.log('🔇 Speech ended');
      };

      recognitionRef.current.start();
      console.log('Starting speech recognition...');
      
    } catch (err) {
      console.error('Error starting recognition:', err);
      setError(`Error: ${err}`);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div className="p-4 border rounded-lg max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Speech Recognition Test</h2>
      
      <div className="space-y-4">
        <Button 
          onClick={isRecording ? stopRecording : startRecording}
          className={isRecording ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
        
        {error && (
          <div className="p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="p-2 bg-gray-100 rounded min-h-[100px]">
          <strong>Transcript:</strong>
          <div>{transcript || 'No speech detected yet...'}</div>
        </div>
        
        <div className="text-sm text-gray-600">
          <strong>Instructions:</strong> Click "Start Recording", then speak clearly. 
          Check the browser console for detailed logs.
        </div>
      </div>
    </div>
  );
};

export default SpeechRecognitionTest;