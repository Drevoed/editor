import { ButtonHTMLAttributes, ReactNode } from 'react';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    isActive: boolean;
    tooltip?: string;
}
export declare const ToolbarButton: ({ icon, isActive, tooltip, style, ...rest }: Props) => import("solid-js").JSX.Element;
export {};
