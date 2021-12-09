import type { CodeModification } from '../../../shared/types';
export declare type WithCode = {
    [Modification in CodeModification]?: string;
};
