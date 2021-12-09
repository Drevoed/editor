import { GlobalQueries } from '@cardbox-editor/core';
import { deleteBackward } from './delete-backward';
import { indent } from './indent';
import { indentParagraph } from './indent-paragraph';
import { insertExitBreak } from './insert-exit-break';
import { outdent } from './outdent';
import { ActionsRegistry } from '../../../registries/actions';
function list({ editor }) {
    return GlobalQueries.isInBlock(editor, ['ordered-list', 'unordered-list']);
}
ActionsRegistry.override('delete-backward', deleteBackward, { match: list });
ActionsRegistry.override('insert-exit-break', insertExitBreak, { match: list });
ActionsRegistry.override('indent', indent, { match: list });
ActionsRegistry.override('outdent', outdent, { match: list });
function paragraph({ editor }) {
    return GlobalQueries.isInBlock(editor, ['ordered-list', 'unordered-list']);
}
ActionsRegistry.override('indent', indentParagraph, { match: paragraph });
//# sourceMappingURL=index.js.map