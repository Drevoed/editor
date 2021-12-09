import { Element } from 'slate';
interface ControlsProps {
    element: Element;
    render: () => JSX.Element | JSX.Element[];
}
export declare const Controls: ({ element, render }: ControlsProps) => import("solid-js").JSX.Element;
export {};
