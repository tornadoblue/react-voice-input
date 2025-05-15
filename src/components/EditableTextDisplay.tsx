import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit3, Save, XCircle } from 'lucide-react';

interface EditableTextDisplayProps {
  initialText: string;
  onTextChange: (newText: string) => void;
  isInitiallyEditing?: boolean;
  placeholder?: string;
  showControls?: boolean;
}

const EditableTextDisplay: React.FC<EditableTextDisplayProps> = ({
  initialText,
  onTextChange,
  isInitiallyEditing = false,
  placeholder = "Editable text...",
  showControls = true,
}) => {
  const [isEditing, setIsEditing] = useState(isInitiallyEditing);
  const [currentText, setCurrentText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCurrentText(initialText);
  }, [initialText]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
    }
  }, [isEditing, currentText]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentText(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSave = () => {
    onTextChange(currentText);
    if (showControls) setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentText(initialText); // Revert to original text
    if (showControls) setIsEditing(false);
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      // If currently editing, consider it a save action if controls are hidden
      if (!showControls) {
        handleSave();
      }
      // If controls are shown, toggleEdit from editing to non-editing means cancel or save is handled by buttons
    }
    setIsEditing(!isEditing);
  };
  
  // Expose save function if needed by parent when showControls is false
  // This might be useful if an external event should trigger save.
  // React.useImperativeHandle(ref, () => ({
  //   save: handleSave,
  // }));


  if (isEditing) {
    return (
      <div className="w-full space-y-2">
        <Textarea
          ref={textareaRef}
          value={currentText}
          onChange={handleTextChange}
          placeholder={placeholder}
          className="w-full p-2 border rounded-md resize-none overflow-hidden min-h-[60px]"
          rows={1} // Start with 1 row, auto-sizing will adjust
        />
        {showControls && (
          <div className="flex space-x-2">
            <Button onClick={handleSave} size="sm" variant="outline">
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
            <Button onClick={handleCancel} size="sm" variant="ghost">
              <XCircle className="mr-2 h-4 w-4" /> Cancel
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full group relative">
      <div 
        className="p-2 border border-transparent rounded-md min-h-[60px] whitespace-pre-wrap break-words"
        onClick={showControls ? handleToggleEdit : undefined} // Only allow click to edit if controls are shown
      >
        {currentText || <span className="text-muted-foreground">{placeholder}</span>}
      </div>
      {showControls && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleToggleEdit}
        >
          <Edit3 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default EditableTextDisplay;