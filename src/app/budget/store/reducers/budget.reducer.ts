import { Budget } from '../../../models/budget.model';
import { Action, createSelector, createFeatureSelector } from '@ngrx/store';
import { BudgetActions, DefaultBudgetLoadedAction, BudgetActionTypes } from '../actions/budget.actions';
import { BudgetEffects } from '../effects/budget.effects';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as fromApp from '../../../store/app.reducers';



export interface FeatureState extends fromApp.AppState {
    currentBudget: State;
}

// tslint:disable-next-line:no-empty-interface
export interface State extends Budget {
}



export const INITIAL_STORE_DATA: State = {
    //   budgetHeader2: {
    id: undefined,
    name: undefined,
    dateStart: undefined,
    dateEnd: undefined,
    totalCash: 0,
    cashLeft: 0
    //   }
};

export function budgetReducer(state = INITIAL_STORE_DATA, action: BudgetActions): State {
    switch (action.type) {
        case BudgetActionTypes.LoadDefaultBudget:
            return {
                ...state
            };
        case BudgetActionTypes.DefaultBudgetLoaded:
            return handleDefaultBudgetLoadedAction(state, <any>action);
        default:
            return state;
    }
}



function handleDefaultBudgetLoadedAction(state: State, action: DefaultBudgetLoadedAction): State {
    return {
        ...action.payload
    };
}




export const selectBudgetState = createFeatureSelector<State>('budgetHeader');

export function getBudget(state: State) {
    return state;
}
