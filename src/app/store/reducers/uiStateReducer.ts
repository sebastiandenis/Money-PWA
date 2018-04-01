import { Action } from '@ngrx/store';
import * as UiStateActions from '../actions/uiState.actions';

export interface State {
    currentTitle: string;
    mainMenuBtnVisible: boolean;
    showSidenav: boolean;
    mainToolbarFixed: boolean;
    locale: string;
    lastUndo: any;
    showUndoSnackbar: boolean;

}

export const initialState: State = {
    currentTitle: 'appname',
    mainMenuBtnVisible: false,
    showSidenav: false,
    mainToolbarFixed: true,
    locale: 'pl-PL',
    lastUndo: null,
    showUndoSnackbar: false

};

export function uiState(state: State = initialState, action: Action): State {
    switch (action.type) {
        case UiStateActions.UiStateActionTypes.ShowUndoSnackbar:
            return handleShowUndoSnackbarAction(state, <any>action);
        case UiStateActions.UiStateActionTypes.CloseUndoSnackbar:
            return {
                ...state,
                lastUndo: null,
                showUndoSnackbar: false
            };
        case UiStateActions.UiStateActionTypes.SwitchSidenav:
            return handleSwitchSidenavAction(state, <any>action);
        case UiStateActions.UiStateActionTypes.OpenSidenav:
            return {
                ...state,
                showSidenav: true
            };
        case UiStateActions.UiStateActionTypes.CloseSidenav:
            return {
                ...state,
                showSidenav: false
            };
        case (UiStateActions.UiStateActionTypes.ChangeTitle):
            return handleChangeTitleAction(state, <any>action);
        case (UiStateActions.UiStateActionTypes.MainMenuBtnVisible):
            return handleChangeMainMenuBtnVisibleAction(state, <any>action);
        case (UiStateActions.UiStateActionTypes.MainToolbarVisible):
            return handleChangeMainToolbarFixedAction(state, <any>action);
        default:
            return state;
    }

}

function handleShowUndoSnackbarAction(state: State, action: UiStateActions.ShowUndoSnackbar): State {
    return {
        ...state,
        lastUndo: action.payload,
        showUndoSnackbar: true
    };
}

function handleSwitchSidenavAction(state: State, action: UiStateActions.SwitchSidenavAction): State {
    return {
        ...state,
        showSidenav: !state.showSidenav
    };
}


function handleChangeTitleAction(state: State, action: UiStateActions.ChangeTitleAction): State {
    return {
        ...state,
        currentTitle: action.payload
    };
}

function handleChangeMainMenuBtnVisibleAction(state: State, action: UiStateActions.ChangeMainMenuBtnVisibleAction): State {
    return {
        ...state,
        mainMenuBtnVisible: action.payload
    };
}

function handleChangeMainToolbarFixedAction(state: State, action: UiStateActions.ChangeMainToolbarVisibleAction): State {
    return {
        ...state,
        mainToolbarFixed: action.payload
    };
}
