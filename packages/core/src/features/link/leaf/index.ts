import type { LinkModification } from '../../../shared/types';

export type WithLink = {
  [Modification in LinkModification]?: string;
};
