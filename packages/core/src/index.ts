import type { BaseRange } from 'slate';
import type { CustomElement, CustomLeaf } from './slate-types';
import type { WithCode } from './features';

export { isEmpty as isEditorEmpty } from './lib/slate-util';
export * from './slate-types';

// Shared
export * from './shared/types';
export * from './shared/constants';

// Actions
export { registerActions } from './actions';

// Lib
export * from './lib/global-transforms';
export * from './lib/global-queries';
export * from './lib/global-matchers';
export * from './lib/util';
export * from './lib/action-controller';
export * from './lib/decoration-controller';
export * from './lib/keybind-controller';
export * from './lib/listeners';
export * from './lib/registry';
export * from './lib/slate-util';
export * from './lib/extensions';

// Features
export * from './features';

export interface CustomTypesEditor {
  Element: CustomElement;
  Text: CustomLeaf;
  Range: BaseRange & WithCode;
}

declare module 'slate' {
  interface CustomTypes extends CustomTypesEditor {}
}
