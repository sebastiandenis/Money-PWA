import { ActionReducerMap } from '@ngrx/store';
import * as fromBudget from './reducers/budget.reducer';
import * as fromStoreData from './reducers/dataReducer';
import * as fromUiState from './reducers/uiStateReducer';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
    budget: fromBudget.State;
    uiState: fromUiState.State;
    storeData: fromStoreData.State;
    auth: fromAuth.State;
}



export const reducers: ActionReducerMap<AppState> = {
    budget: fromBudget.reducer,
    storeData: fromStoreData.storeData,
    uiState: fromUiState.uiState,
    auth: fromAuth.authReducer
};

export function selectBudget(state: AppState) {
    return state.budget.budget;
}

export function selectBudgetLines(state: AppState) {
    return state.budget.budgetLines;
}

