import { Action } from '@ngrx/store';
import { Savings } from '../../models/savings.model';
import { Quote } from '../../models/quote.model';

// STORE-DATA
export const LOAD_DEFAULT_SAVINGS_ACTION = 'LOAD_DEFAULT_SAVINGS_ACTION';
export const DEFAULT_SAVINGS_LOADED_ACTION = 'DEFAULT_SAVINGS_LOADED_ACTION';

// UI
export const LOAD_RANDOM_QUOTE_ACTION = 'LOAD_RANDOM_QUOTE_ACTION';
export const RANDOM_QUOTE_LOADED_ACTION = 'RANDOM_QUOTE_LOADED_ACTION';




// ------------------------------------------------------------------SAVINGS ACTIONS
export class LoadDefaultSavingsAction implements Action {
    readonly type: string = LOAD_DEFAULT_SAVINGS_ACTION;
}

export class DefaultSavingsLoadedAction implements Action {
    readonly type: string = DEFAULT_SAVINGS_LOADED_ACTION;
    constructor(public payload?: Savings) {
    }
}

// ------------------------------------------------------------------END SAVINGS ACTIONS

// ------------------------------------------------------------------QUOTE ACTIONS
export class LoadRandomQuoteAction implements Action {
    readonly type: string = LOAD_RANDOM_QUOTE_ACTION;

}

export class RandomQuoteLoadedAction implements Action {
    readonly type: string = RANDOM_QUOTE_LOADED_ACTION;
    constructor(public payload?: Quote) { }
}

// ------------------------------------------------------------------END QUOTE ACTIONS

export type AppActions =
    DefaultSavingsLoadedAction |
    LoadDefaultSavingsAction |
    LoadRandomQuoteAction |
    RandomQuoteLoadedAction;
