import type { Text } from 'slate';

export interface ParagraphElement {
  type: 'paragraph';
  children: Text[];
}
