import { Budget } from '../../../models/budget.model';
import { Action } from '@ngrx/store';
import * as BudgetActions from '../actions/budget.actions';
import { BudgetEffects } from '../effects/budget.effects';
import { BudgetLine } from '../../../models/budget-line.model';

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

        case BudgetActions.LOAD_DEFAULT_BUDGET_ACTION:
            return {
                ...state
            };

        case BudgetActions.DEFAULT_BUDGET_LOADED_ACTION:
            return handleDefaultBudgetLoadedAction(state, <any>action);
        case BudgetActions.LOAD_DEFAULT_BUDGETLINES_ACTION:
            return {
                ...state
            };

        case BudgetActions.DEFAULT_BUDGETLINES_LOADED_ACTION:
            return handleDefaultBudgetLinesLoadedAction(state, <any>action);



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

function handleDefaultBudgetLinesLoadedAction(state: State, action: BudgetActions.DefaultBudgetLinesLoadedAction): State {
    return {
        ...state,
        budgetLines: action.payload
    };
}
