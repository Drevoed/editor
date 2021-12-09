import type {
  Heading1Element,
  Heading2Element,
  Heading3Element,
} from './types';
import type { Text } from 'slate';

export * from './types';

export const createHeading1Element = (
  children: Text[] = [{ text: '' }],
): Heading1Element => ({
  type: 'heading-1',
  children,
});

export const createHeading2Element = (
  children: Text[] = [{ text: '' }],
): Heading2Element => ({
  type: 'heading-2',
  children,
});

export const createHeading3Element = (
  children: Text[] = [{ text: '' }],
): Heading3Element => ({
  type: 'heading-3',
  children,
});
