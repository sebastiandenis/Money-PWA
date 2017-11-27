import { Action } from '@ngrx/store';
import * as storeActions from '../actions';
import { Savings } from '../../../models/savings.model';
import { Budget } from '../../../models/budget.model';
import { User } from '../../../models/user.model';
import * as _ from 'lodash';


export interface State {
    savings: Savings;
    user: User;

}


export const INITIAL_STORE_DATA: State = {
    savings: {
        id: undefined,
        name: undefined,
        totalCash: 0
    },
    user: {
        id: undefined,
        email: undefined,
        name: undefined,
        config: undefined
    }
};

export function storeData(state = INITIAL_STORE_DATA, action: Action): State {
    switch (action.type) {
        case storeActions.LOAD_DEFAULT_SAVINGS_ACTION:
            return {
                ...state
            };

        case storeActions.DEFAULT_SAVINGS_LOADED_ACTION:
            return handleDefaultSavingsLoadedAction(state, <any>action);



        default:
            return state;
    }
}



function handleDefaultSavingsLoadedAction(state: State, action: storeActions.DefaultSavingsLoadedAction): State {
    const newState: State = _.cloneDeep(state);
    newState.savings = action.payload;
    return newState;
}
