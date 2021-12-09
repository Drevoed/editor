import type { EditorValue, OptionalActionKeybinds, PublicAction } from '@cardbox-editor/core';
import type { Editor } from "slate";
interface Common {
    value: EditorValue;
    customKeybinds?: OptionalActionKeybinds<PublicAction>;
    editor: Editor;
    readOnly?: boolean;
}
interface WithReadOnly {
    readOnly: true;
}
interface WithoutReadOnly {
    readOnly?: false;
    onChange: (value: EditorValue) => void;
}
interface WithNormalized {
    customKeybinds: OptionalActionKeybinds<PublicAction>;
}
export declare type EditorProps = Common & (WithReadOnly | WithoutReadOnly);
export declare type NormalizedEditorProps = EditorProps & WithNormalized;
export declare type ReadonlyEditorProps = NormalizedEditorProps & WithReadOnly;
export declare type EditableEditorProps = NormalizedEditorProps & WithoutReadOnly;
export {};
