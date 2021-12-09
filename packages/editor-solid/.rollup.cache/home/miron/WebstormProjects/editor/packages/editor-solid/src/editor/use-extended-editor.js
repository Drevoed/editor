import { useMemo } from 'react';
import { createEditor, Text } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { createCodeElement, createListItemElement, createOrderedListElement, createParagraphElement, createUnorderedListElement, extend, extensions, } from '@cardbox-editor/core';
const defaultExtensions = [
    withReact,
    withHistory,
    extensions.listNormalization,
    extensions.format([
        {
            trigger: ' ',
            keepTrigger: false,
            markupType: 'after',
            markup: ['-'],
            onlyOnBlockStart: true,
            transformType: 'block',
            transform: ({ block }) => {
                const initialLeafs = block.children.filter(Text.isText);
                if (initialLeafs.length === 0)
                    return createUnorderedListElement();
                return createUnorderedListElement([
                    createListItemElement([createParagraphElement(initialLeafs)]),
                ]);
            },
        },
        {
            trigger: ' ',
            keepTrigger: false,
            markupType: 'after',
            markup: ['1.', '1)'],
            onlyOnBlockStart: true,
            transformType: 'block',
            transform: ({ block }) => {
                const initialLeafs = block.children.filter(Text.isText);
                if (initialLeafs.length === 0)
                    return createOrderedListElement();
                return createOrderedListElement([
                    createListItemElement([createParagraphElement(initialLeafs)]),
                ]);
            },
        },
        {
            trigger: ' ',
            keepTrigger: false,
            markupType: 'after',
            markup: ['```'],
            onlyOnBlockStart: true,
            transformType: 'block',
            transform: () => {
                return createCodeElement();
            },
        },
    ]),
];
export function useExtendedEditor(customExtensions = []) {
    return useMemo(() => {
        const finalExtensions = [...defaultExtensions, ...customExtensions];
        const editor = createEditor();
        return extend(editor, finalExtensions);
    }, [extensions]);
}
//# sourceMappingURL=use-extended-editor.js.map