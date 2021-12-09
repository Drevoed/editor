import { createActionController } from '../lib/action-controller';
import { deleteBackward } from './delete-backward';
// import { copy } from './copy'
// import { copyAll } from './copy-all'
//import { exitBlock } from './exit-block'
import { getOutTheLeaf } from './get-out-the-leaf';
import { indent } from './indent';
import { insertExitBreak } from './insert-exit-break';
import { insertSoftBreak } from './insert-soft-break';
import { makeBold } from './make-bold';
//import { makeInlineCode } from './make-inline-code'
import { makeItalic } from './make-italic';
//import { makeUnderlined } from './make-underlined'
import { outdent } from './outdent';
import type {
  Action,
  ActionParams,
  KeyboardEventLike,
} from '../lib/action-controller';
//import { paste } from './paste'
//import { setLinkForText } from './set-link-for-text'
import type { BaseEditor, Editor } from 'slate';

class Wrapper<
  T extends BaseEditor = Editor,
  TEvent extends KeyboardEventLike = KeyboardEvent,
> {
  wrapped(_: T) {
    return createActionController<Action, TEvent, ActionParams<T, TEvent>>();
  }
}

export const registerActions = <
  TEditor extends BaseEditor = Editor,
  TEvent extends KeyboardEventLike = KeyboardEvent,
>(
  registry: ReturnType<Wrapper<TEditor, TEvent>['wrapped']>,
) => {
  registry.register('delete-backward', deleteBackward);
  registry.register('insert-soft-break', (params) =>
    insertSoftBreak<TEvent, TEditor, ActionParams<TEditor, TEvent>>(params),
  );
  registry.register('insert-exit-break', (params) =>
    insertExitBreak<TEvent, TEditor, ActionParams<TEditor, TEvent>>(params),
  );
  registry.register('indent', (params) =>
    indent<TEvent, ActionParams<TEditor, TEvent>>(params),
  );
  registry.register('outdent', (params) =>
    outdent<TEvent, ActionParams<TEditor, TEvent>>(params),
  );
  registry.register('get-out-the-leaf', (params) =>
    getOutTheLeaf<TEvent, TEditor, ActionParams<TEditor, TEvent>>(params),
  );
  registry.register('make-bold', (params) =>
    makeBold<TEvent, TEditor, ActionParams<TEditor, TEvent>>(params),
  );
  registry.register('make-italic', (params) =>
    makeItalic<TEvent, TEditor, ActionParams<TEditor, TEvent>>(params),
  );
  // TODO: i'm tired
  // registry.register('make-underlined', makeUnderlined)
  // registry.register('make-inline-code', makeInlineCode)
  // registry.register('set-link-for-text', setLinkForText)
  // registry.register('copy', copy)
  // registry.register('copy-all', copyAll)
  // registry.register('paste', paste)
  // registry.register('exit-block', exitBlock)
};
