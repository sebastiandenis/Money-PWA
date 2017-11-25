import { Translation } from './translation.model';

export interface Quote {
    id: string;
    author: string;
    translations: Translation;
}
