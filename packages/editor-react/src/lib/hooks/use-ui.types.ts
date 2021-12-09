import type { BaseRange } from 'slate';
import type { WithCode } from '../../features/code';

export interface UI {
  toolbar: { update: () => void; hide: () => void };
  linkPopup: {
    show: ({
      selection,
      href,
    }: {
      selection: BaseRange & WithCode;
      href?: string | undefined;
    }) => void;
    hide: () => void;
    reset: () => void;
    focus: () => void;
    update: () => void;
  };
}
