import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit3, Check, X } from 'lucide-react';

interface EditableTextDisplayProps {
  initialText: string;
  onTextChange: (newText: string) => void;
  isEditingInitially?: boolean;
  placeholder?: string;
}

const EditableTextDisplay: React.FC<EditableTextDisplayProps> = ({
  initialText,
  onTextChange,
  isEditingInitially = false,
  placeholder = "Enter text...",
}) => {
  const [isEditing, setIsEditing] = useState(isEditingInitially);
  const [currentText, setCurrentText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCurrentText(initialText);
  }, [initialText]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select(); // Select all text when editing starts
      autoResizeTextarea();
    }
  }, [isEditing]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentText(event.target.value);
    autoResizeTextarea();
  };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSave = () => {
    onTextChange(currentText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentText(initialText); // Revert to original text
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave(); // Save if currently editing
    } else {
      setIsEditing(true);
    }
  };
  
  // Update textarea size when currentText changes (e.g. from speech input)
  useEffect(() => {
    if (isEditing) {
      autoResizeTextarea();
    }
  }, [currentText, isEditing]);


  if (isEditing) {
    return (
      <div className="w-full space-y-2">
        <Textarea
          ref={textareaRef}
          value={currentText}
          onChange={handleTextChange}
          placeholder={placeholder}
          className="w-full p-2 border rounded-md resize-none min-h-[60px]"
          rows={1} // Start with one row, auto-resize will adjust
        />
        <div className="flex justify-end space-x-2">
          <Button onClick={handleSave} size="sm" variant="outline">
            <Check className="w-4 h-4 mr-1" /> Save
          </Button>
          <Button onClick={handleCancel} size="sm" variant="ghost">
            <X className="w-4 h-4 mr-1" /> Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-2 border border-transparent rounded-md group min-h-[60px] hover:border-gray-300 relative cursor-text" onClick={() => setIsEditing(true)}>
      {currentText || <span className="text-gray-400">{placeholder}</span>}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
        aria-label="Edit text"
      >
        <Edit3 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default EditableTextDisplay;