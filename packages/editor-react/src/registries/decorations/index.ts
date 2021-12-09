/*
 * It goes in 'decorate' prop of Editable
 * 'decorate' is used on nodes between 'renderElement' and 'renderLeaf'
 *
 * This is a good instrument for splitting the text on render stage
 * (for example, code highlighting)
 */
import { createDecorationController } from '@cardbox-editor/core';
import type { Editor } from 'slate';

export const decorations = createDecorationController<Editor>();
