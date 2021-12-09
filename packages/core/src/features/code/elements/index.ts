import type { CodeElement, CodeLineElement } from './types';
import type { Text } from 'slate';

export * from './types';

export const createCodeLineElement = (
  children: Text[] = [{ text: '' }],
): CodeLineElement => ({
  type: 'code-line',
  children,
});

export const createCodeElement = (
  language = 'tsx',
  children: CodeLineElement[] = [createCodeLineElement()],
): CodeElement => ({
  type: 'code',
  children,
  language,
});
