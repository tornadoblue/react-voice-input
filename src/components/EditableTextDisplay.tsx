import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface EditableTextDisplayProps {
  initialText: string;
  onTextChange: (newText: string) => void;
  onEditing: () => void;
  isEditing: boolean;
  placeholder?: string;
  className?: string; // For the root div of this component
  textDisplayClassName?: string; // For styling the Textarea itself
}

const EditableTextDisplay: React.FC<EditableTextDisplayProps> = ({
  initialText,
  onTextChange,
  onEditing,
  isEditing,
  placeholder = "Type here...",
  className, // For the root div
  textDisplayClassName, // For the Textarea
}) => {
  const [text, setText] = useState(initialText);
 

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    onTextChange(newText);
    if (!isEditing) {
        onEditing();
    }
  };

  useEffect(() => {
      if (!isEditing) {
        setText(initialText);
      }
    }, [initialText, isEditing]);
  
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <Textarea
        value={text}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={cn(
          "w-full min-h-[60px] text-lg", // Default text size changed to text-lg
          textDisplayClassName // Apply custom classes for the textarea
        )}
        rows={3}
      />
    </div>
  );
};

export default EditableTextDisplay;