import type { WithCode, WithLink, WithTextModifications } from '../features';
import type { BaseText } from 'slate';

export type CustomLeaf = BaseText & WithCode & WithTextModifications & WithLink;
