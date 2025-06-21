import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { VoiceInputCapture } from "./components/VoiceInputCapture";

const App = () => {
  const queryClient = new QueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAutoRecordingSave = (text: string, audioBlob: Blob | null, audioUrl: string | null) => {
    console.log("Auto-recording saved:", { text, audioBlob: !!audioBlob, audioUrl });
    setIsModalOpen(false); // Close modal after saving
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <div className="fixed top-4 right-4 z-50">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Test Auto-Start Recording
          </Button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Auto-Start Recording Test</h2>
                <Button 
                  onClick={() => setIsModalOpen(false)}
                  variant="outline"
                  size="sm"
                >
                  ✕
                </Button>
              </div>
              <p className="text-gray-600 mb-4">
                This will automatically start recording when opened. Start speaking immediately!
              </p>
              <VoiceInputCapture
                onSave={handleAutoRecordingSave}
                autoStartRecording={true}
                initialText=""
                placeholder="Recording will start automatically... speak now!"
                showVersionInfo={false}
              />
            </div>
          </div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
