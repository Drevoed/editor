import type { Element } from 'slate';
export interface ElementSettings {
    readonly type: Element['type'];
    readonly name: string;
    readonly code: string;
    readonly aliases?: string[];
    readonly canBeAdded?: boolean;
    readonly allowedModifications: Array<'bold' | 'italic' | 'underlined' | 'inlineCode' | 'href' | 'prismToken'>;
    readonly allowedTransformations: Element['type'][];
    readonly create: () => Element;
}
