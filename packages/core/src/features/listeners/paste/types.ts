import type {
  BaseListenerParams,
  ChildListener,
} from '../../../lib/listeners/types';
import type { EditorListenerParams } from '../types';

export type ClipboardListenerParams = EditorListenerParams &
  BaseListenerParams<ClipboardEvent>;
export type PasteListener = ChildListener<ClipboardListenerParams>;
