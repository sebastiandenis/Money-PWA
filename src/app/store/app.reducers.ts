import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromBudget from './reducers/budget.reducer';
import * as fromBudgetLines from './reducers/budget-lines.reducer';
import * as fromUiState from './reducers/uiStateReducer';
import * as fromAuth from './reducers/auth.reducer';
import * as fromUser from './reducers/user.reducer';
import { selectBudgetLineEntities } from './reducers/budget-lines.reducer';

export interface AppState {
    budget: fromBudget.State;
    budgetLines: fromBudgetLines.State;
    uiState: fromUiState.State;
    auth: fromAuth.State;
    user: fromUser.State;
}



export const reducers: ActionReducerMap<AppState> = {
    budget: fromBudget.reducer,
    budgetLines: fromBudgetLines.reducer,
    uiState: fromUiState.uiState,
    auth: fromAuth.reducer,
    user: fromUser.reducer
};

export function selectBudget(state: AppState) {
    return state.budget.budget;
}

export const selectBudgetLinesState = createFeatureSelector<fromBudgetLines.State>('budgetLines');

export const selectBudgetLineIds = createSelector(selectBudgetLinesState, fromBudgetLines.selectBudgetLineIds);
export const selectBudgetLines = createSelector(selectBudgetLinesState, fromBudgetLines.selectBudgetLineEntities);
export const selectAllBudgetLines = createSelector(selectBudgetLinesState, fromBudgetLines.selectAllBudgetLines);
export const selectBudgetLineTotal = createSelector(selectBudgetLinesState, fromBudgetLines.selectBudgetLinesTotal);
export const selectCurrentBudgetLineId = createSelector(selectBudgetLinesState, fromBudgetLines.getSelectedBudgetLineId);


export const selectCurrentBudgetLine = createSelector(
    selectBudgetLines,
    selectCurrentBudgetLineId,
    (budgetLineEntities, budgetLineId) => {
        return budgetLineEntities[budgetLineId];
    }
);


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

export function selectUiTitle(state: AppState) {
    return state.uiState.currentTitle;
}

export function selectUiMainMenuBtnVisible(state: AppState) {
    return state.uiState.mainMenuBtnVisible;
}

export function selectShowSidenav(state: AppState) {
    return state.uiState.showSidenav;
}

export function selectMainToolbarFixed(state: AppState) {
    return state.uiState.mainToolbarFixed;
}




