import { GlobalQueries } from '@cardbox-editor/core';
import { ActionsRegistry } from '../../../registries/actions';
import { copyAll } from './copy-all';
import { exitBlock } from './exit-block';
import { indent } from './indent';
import { insertExitBreak } from './insert-exit-break';
import { insertSoftBreak } from './insert-soft-break';
import { outdent } from './outdent';
function match({ editor }) {
    return GlobalQueries.isInBlock(editor, 'code');
}
ActionsRegistry.override('insert-exit-break', insertExitBreak, { match });
ActionsRegistry.override('insert-soft-break', insertSoftBreak, { match });
ActionsRegistry.override('copy-all', copyAll, { match });
ActionsRegistry.override('indent', indent, { match });
ActionsRegistry.override('outdent', outdent, { match });
ActionsRegistry.override('exit-block', exitBlock, { match });
//# sourceMappingURL=index.js.map