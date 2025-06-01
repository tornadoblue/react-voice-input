import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface EditableTextDisplayProps {
  initialText: string;
  onTextChange: (newText: string) => void;
  onEditing: () => void;
  isEditing: boolean;
  placeholder?: string;
  className?: string;
}

const EditableTextDisplay: React.FC<EditableTextDisplayProps> = ({
  initialText,
  onTextChange,
  onEditing,
  isEditing,
  placeholder = "Type here...",
  className,
}) => {
  const [text, setText] = useState(initialText);
 

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

    const text = event.target.value
    setText(text);
    onTextChange(text)
    if (!isEditing) {
        onEditing()
        //setIsEditing(true); // Start editing on first change
    }
  };

  useEffect(() => {
      // Update text if initialText prop changes and not currently editing
      // This is important if the parent component updates the text (e.g., after speech recognition)
      if (!isEditing) {
        setText(initialText);
      }
    }, [initialText, isEditing]);
  

  
  // Automatically save if text changes due to prop update while not focused (e.g. speech update)
  // and also allow manual save.
  // The onTextChange is the primary way to communicate back.

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <Textarea
        value={text}
        onChange={handleInputChange}
        // onBlur={handleInputChange} // Save when focus is lost
        placeholder={placeholder}
        className="w-full min-h-[60px] text-base"
        rows={3}
      />
    </div>
  );
};

export default EditableTextDisplay;