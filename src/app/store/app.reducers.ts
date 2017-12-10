import { ActionReducerMap } from '@ngrx/store';
import * as fromBudget from './reducers/budget.reducer';
import * as fromUiState from './reducers/uiStateReducer';
import * as fromAuth from './reducers/auth.reducer';
import * as fromUser from './reducers/user.reducer';

export interface AppState {
    budget: fromBudget.State;
    uiState: fromUiState.State;
    auth: fromAuth.State;
    user: fromUser.State;
}



export const reducers: ActionReducerMap<AppState> = {
    budget: fromBudget.reducer,
    uiState: fromUiState.uiState,
    auth: fromAuth.reducer,
    user: fromUser.reducer
};

export function selectBudget(state: AppState) {
    return state.budget.budget;
}

export function selectBudgetLines(state: AppState) {
    return state.budget.budgetLines;
}

export function selectAuthUserData(state: AppState) {
    return state.auth.userData;
}

export function selectAuthIsUserLoggedIn(state: AppState) {
    return state.auth.isLoggedIn;
}

export function selectUser(state: AppState) {
    return state.user.user;
}

export function selectAuthError(state: AppState) {
    return state.auth.error;
}



