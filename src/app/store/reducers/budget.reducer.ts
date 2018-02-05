import { Budget } from '../../models/budget.model';
import { Action } from '@ngrx/store';
import * as BudgetActions from '../actions/budget.actions';
import * as AuthActions from '../actions/auth.actions';
import { BudgetEffects } from '../effects/budget.effects';
import { BudgetLine } from '../../models/budget-line.model';


export interface State {
    budget: Budget;
    budgetLines: BudgetLine[];
}




export const INITIAL_STORE_DATA: State = {
    budget: {
        id: undefined,
        name: undefined,
        dateStart: undefined,
        dateEnd: undefined,
        totalCash: 0,
        cashLeft: 0,
    },
    budgetLines: []
};

export function reducer(state = INITIAL_STORE_DATA, action: BudgetActions.All): State {
    switch (action.type) {

        case AuthActions.AuthActionTypes.Logout:
            return INITIAL_STORE_DATA;

        case BudgetActions.BudgetActionTypes.LoadDefaultBudget:
            return {
                ...state
            };

        case BudgetActions.BudgetActionTypes.DefaultBudgetLoaded:
            return handleDefaultBudgetLoadedAction(state, <any>action);

        default:
            return state;
    }
}

function handleDefaultBudgetLoadedAction(state: State, action: BudgetActions.DefaultBudgetLoadedAction): State {
    return {
        ...state,
        budget: action.payload
    };
}


