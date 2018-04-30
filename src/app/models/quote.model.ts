import { Translation } from '../core/models/translation.model';

export interface Quote {
    id: string;
    author: string;
    translations: Translation;
}
