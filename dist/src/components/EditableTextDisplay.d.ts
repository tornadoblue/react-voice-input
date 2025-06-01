import { default as React } from 'react';
interface EditableTextDisplayProps {
    initialText: string;
    onTextChange: (newText: string) => void;
    onEditing: () => void;
    isEditing: boolean;
    placeholder?: string;
    className?: string;
}
declare const EditableTextDisplay: React.FC<EditableTextDisplayProps>;
export default EditableTextDisplay;
//# sourceMappingURL=EditableTextDisplay.d.ts.map