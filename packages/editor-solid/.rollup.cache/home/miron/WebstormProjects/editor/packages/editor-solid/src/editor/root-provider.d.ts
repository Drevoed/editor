import type { Editor } from 'slate';
import type { ReactEditor } from 'slate-react';
export declare const RootProvider: ({ children, editor, }: {
    children: JSX.Element | JSX.Element[];
    editor: Editor & ReactEditor;
}) => import("solid-js").JSX.Element;
