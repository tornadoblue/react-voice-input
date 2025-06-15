import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
const EditableTextDisplay = ({ initialText, onTextChange, onEditing, isEditing, placeholder = "Type here...", className, // For the root div
textDisplayClassName, // For the Textarea
 }) => {
    const [text, setText] = useState(initialText);
    const handleInputChange = (event) => {
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
    return (_jsx("div", { className: cn("flex flex-col space-y-2", className), children: _jsx(Textarea, { value: text, onChange: handleInputChange, placeholder: placeholder, className: cn("w-full min-h-[60px] text-lg", // Default text size changed to text-lg
            textDisplayClassName // Apply custom classes for the textarea
            ), rows: 3 }) }));
};
export default EditableTextDisplay;
