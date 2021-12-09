import { Editor, Range, Transforms } from 'slate';
import {
  createListElement,
  createListItemElement,
  GlobalQueries,
} from '@cardbox-editor/core';
import { GlobalMatchers } from '../../../lib/global-matchers';
import { mergeSiblings } from './merge-siblings';
import type { ListElement } from '../elements/types';
import type { ElementByType } from '../../../shared/types';

export function indentParagraph(editor: Editor) {
  if (!editor.selection) return;
  if (Range.isExpanded(editor.selection)) return;

  const paragraphEntry = GlobalQueries.getAbove<ElementByType<'paragraph'>>(
    editor,
    {
      type: 'block',
      mode: 'lowest',
      match: GlobalMatchers.block(editor, 'paragraph'),
    },
  );
  if (!paragraphEntry) return;
  const [, paragraphPath] = paragraphEntry;

  const getNearestListType = (): ListElement['type'] => {
    const beforeEntry = Editor.previous(editor, { at: paragraphPath });
    const afterEntry = Editor.next(editor, { at: paragraphPath });

    const isList = GlobalMatchers.block(editor, [
      'ordered-list',
      'unordered-list',
    ]);

    if (beforeEntry) {
      const element = beforeEntry[0];
      if (isList(element)) return element.type as ListElement['type'];
    }

    if (afterEntry) {
      const element = afterEntry[0];
      if (isList(element)) return element.type as ListElement['type'];
    }

    return 'unordered-list';
  };

  Transforms.wrapNodes(editor, createListItemElement([]), {
    at: paragraphPath,
  });

  const type = getNearestListType();
  Transforms.wrapNodes(editor, createListElement(type, []), {
    at: paragraphPath,
  });

  mergeSiblings(editor);
}
