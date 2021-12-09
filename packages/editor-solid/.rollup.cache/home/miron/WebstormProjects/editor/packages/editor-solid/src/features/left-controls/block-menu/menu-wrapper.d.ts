import type { ContentProps, MenuAdditionalProps } from './types';
import React from 'react';
declare type SvgComponent = (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
interface MenuProps {
    svg: SvgComponent;
    iconClassName: string;
    content: (props: ContentProps) => JSX.Element;
}
export declare const MenuWrapper: ({ svg: Svg, iconClassName, content: Content, sections, }: MenuProps & MenuAdditionalProps) => import("solid-js").JSX.Element;
export {};
