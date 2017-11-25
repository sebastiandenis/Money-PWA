import { Action } from '@ngrx/store';
import * as storeActions from '../actions';
import * as _ from 'lodash';
import { Quote } from '../../../models/quote.model';

export interface State {
    currentBudgetId: string;
    currentSavingsId: string;
    currentQuote: Quote;

}

export const INITIAL_UI_STATE: State = {
    currentBudgetId: undefined,
    currentSavingsId: undefined,
    currentQuote: undefined

};

export function uiState(state: State = INITIAL_UI_STATE, action: Action): State {
    switch (action.type) {
        //      case (storeActions.SET_TOKEN):
        //          return {
        //              ...state
        //         };
        default:
            return state;
    }
}