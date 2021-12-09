import type { Text } from 'slate';
import type { ParagraphElement } from '..';

export * from './types';

export const createParagraphElement = (
  children: Text[] = [{ text: '' }],
): ParagraphElement => ({
  type: 'paragraph',
  children,
});
