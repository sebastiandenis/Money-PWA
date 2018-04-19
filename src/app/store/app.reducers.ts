import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromBudget from '../budget/store/reducers/budget.reducer';
import * as fromBudgetApp from '../budget/store/reducers/index';
import * as fromUiState from '../core/store/uiStateReducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromUser from '../user/store/user.reducer';


export interface AppState {
    uiState: fromUiState.State;
    auth: fromAuth.State;
    user: fromUser.State;
}



export const reducers: ActionReducerMap<AppState> = {
    uiState: fromUiState.uiState,
    auth: fromAuth.reducer,
    user: fromUser.reducer
};


export function selectUiShowUndoSnackbar(state: AppState) {
    return state.uiState.showUndoSnackbar;
}

export function selectUiLastUndo(state: AppState) {
    return state.uiState.lastUndo;
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

export function selectUiTitle(state: AppState) {
    return state.uiState.currentTitle;
}

export function selectUiMainToolbarCloseBtnVisible(state: AppState) {
    return state.uiState.mainToolbarCloseBtnVisible;
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




