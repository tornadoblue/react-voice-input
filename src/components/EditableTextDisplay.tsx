import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit3, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditableTextDisplayProps {
  initialText: string;
  onTextChange: (newText: string) => void;
  isEditingInitially?: boolean;
  placeholder?: string;
  className?: string;
  textAreaClassName?: string;
}

const EditableTextDisplay: React.FC<EditableTextDisplayProps> = ({
  initialText,
  onTextChange,
  isEditingInitially = false,
  placeholder = "Enter text...",
  className,
  textAreaClassName,
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
      // Move cursor to the end of the text
      textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
      autoResizeTextarea();
    }
  }, [isEditing]);

  const handleCurrentTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
  
  useEffect(() => {
    if (isEditing) {
      autoResizeTextarea();
    }
  }, [currentText, isEditing]);


  if (isEditing) {
    return (
      <div className={cn("w-full space-y-2", className)}>
        <Textarea
          ref={textareaRef}
          value={currentText}
          onChange={handleCurrentTextChange}
          placeholder={placeholder}
          className={cn("w-full p-2 border rounded-md resize-none min-h-[60px] leading-relaxed", textAreaClassName)}
          rows={1} 
        />
        <div className="flex justify-end space-x-2">
          <Button onClick={handleSave} size="sm">
            <Check className="w-4 h-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Save</span>
          </Button>
          <Button onClick={handleCancel} size="sm" variant="outline">
            <X className="w-4 h-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Cancel</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn("w-full p-2.5 border border-transparent rounded-md group min-h-[60px] hover:border-gray-300 dark:hover:border-gray-700 relative cursor-text whitespace-pre-wrap break-words leading-relaxed", className)} 
      onClick={() => setIsEditing(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsEditing(true);}}
    >
      {currentText || <span className="text-muted-foreground">{placeholder}</span>}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
        onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
        aria-label="Edit text"
      >
        <Edit3 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default EditableTextDisplay;