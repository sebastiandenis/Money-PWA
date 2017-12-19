import { Action } from '@ngrx/store';
import * as UiStateActions from '../actions/uiState.actions';

export interface State {
    currentTitle: string;
    mainMenuBtnVisible: boolean;
    showSidenav: boolean;

}

export const INITIAL_UI_STATE: State = {
    currentTitle: 'appname',
    mainMenuBtnVisible: false,
    showSidenav: false

};

export function uiState(state: State = INITIAL_UI_STATE, action: Action): State {
    switch (action.type) {
        case UiStateActions.SWITCH_SIDENAV_ACTION:
            return handleSwitchSidenavAction(state, <any>action);
        case UiStateActions.OPEN_SIDENAV_ACTION:
            return {
                ...state,
                showSidenav: true
            };
        case UiStateActions.CLOSE_SIDENAV_ACTION:
            return {
                ...state,
                showSidenav: false
            };
        case (UiStateActions.CHANGE_TITLE_ACTION):
            return handleChangeTitleAction(state, <any>action);
        case (UiStateActions.CHANGE_MAIN_MENU_BTN_VISIBLE_ACTION):
            return handleChangeMainMenuBtnVisibleAction(state, <any>action);
        default:
            return state;
    }

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
