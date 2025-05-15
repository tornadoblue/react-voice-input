import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface EditableTextDisplayProps {
  initialText: string;
  onTextChange: (newText: string) => void;
  placeholder?: string;
  className?: string;
}

const EditableTextDisplay: React.FC<EditableTextDisplayProps> = ({
  initialText,
  onTextChange,
  placeholder = "Type here...",
  className,
}) => {
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Update text if initialText prop changes and not currently editing
    // This is important if the parent component updates the text (e.g., after speech recognition)
    if (!isEditing) {
      setText(initialText);
    }
  }, [initialText, isEditing]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    if (!isEditing) {
        setIsEditing(true); // Start editing on first change
    }
  };

  const handleSave = () => {
    onTextChange(text);
    setIsEditing(false); 
  };
  
  // Automatically save if text changes due to prop update while not focused (e.g. speech update)
  // and also allow manual save.
  // The onTextChange is the primary way to communicate back.

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <Textarea
        value={text}
        onChange={handleInputChange}
        onBlur={handleSave} // Save when focus is lost
        placeholder={placeholder}
        className="w-full min-h-[60px] text-base"
        rows={3}
      />
      {isEditing && (
         <Button onClick={handleSave} size="sm" className="self-end">
            <Save className="w-4 h-4 mr-2" />
            Save Text
        </Button>
      )}
    </div>
  );
};

export default EditableTextDisplay;