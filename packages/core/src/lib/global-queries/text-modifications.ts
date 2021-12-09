import type { TextModification } from '../../shared/types';
import type { Text } from 'slate';

export function textModifications(
  leaf: Text,
  modifications: readonly TextModification[] = [
    'bold',
    'italic',
    'underlined',
    'inlineCode',
  ],
): TextModification[] {
  return modifications.filter((modification) => leaf[modification]);
}
