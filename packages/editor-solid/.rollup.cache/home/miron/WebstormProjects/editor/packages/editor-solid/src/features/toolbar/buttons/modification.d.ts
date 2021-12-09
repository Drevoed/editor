import { Action } from '@cardbox-editor/core';
import { CSSProperties, ReactNode } from 'react';
import { Text } from 'slate';
declare type Mark = keyof Omit<Text, 'text'>;
interface Props {
    mark: Mark;
    icon: ReactNode;
    action: Action;
    tooltip?: string;
    style?: CSSProperties;
}
export declare const ToolbarMarkButton: ({ mark, icon, action, tooltip, style, }: Props) => import("solid-js").JSX.Element;
export {};
