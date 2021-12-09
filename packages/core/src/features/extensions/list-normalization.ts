import { GlobalMatchers } from '../../lib/global-matchers';

export function listNormalization<T extends import('slate').BaseEditor>(
  editor: T,
): T {
  const { normalizeNode } = editor;

  const isList = GlobalMatchers.block(editor, [
    'ordered-list',
    'unordered-list',
  ]);

  const isItem = GlobalMatchers.block(editor, 'list-item');

  function normalizeList() {}
  function normalizeItem() {}

  editor.normalizeNode = (entry) => {
    const [node] = entry;

    if (isItem(node)) normalizeItem();
    if (isList(node)) normalizeList();

    return normalizeNode(entry);
  };

  return editor;
}
