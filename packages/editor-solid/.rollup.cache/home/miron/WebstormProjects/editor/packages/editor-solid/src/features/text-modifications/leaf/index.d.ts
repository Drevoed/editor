import { TextModification } from '../../../shared/types';
export declare type WithTextModifications = {
    [Modification in TextModification]?: boolean;
};
