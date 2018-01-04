import { Action } from '@ngrx/store';

export enum UiStateActionTypes {
    ChangeTitle = '[UiState] Change Title',
    MainMenuBtnVisible = '[UiState] Main Menu Button Visible',
    MainToolbarVisible = '[UiState] Main Toolbar Visible',
    OpenSidenav = '[UiState] Open Sidenav (on)',
    CloseSidenav = '[UiState] Close Sidenav (off)',
    SwitchSidenav = '[UiState] Switch Sidenav (on/off)'
}




export class SwitchSidenavAction implements Action {
    readonly type: string = UiStateActionTypes.SwitchSidenav;
}

export class OpenSidenavAction implements Action {
    readonly type: string = UiStateActionTypes.OpenSidenav;
}

export class CloseSidenavAction implements Action {
    readonly type: string = UiStateActionTypes.CloseSidenav;
}


export class ChangeTitleAction implements Action {
    readonly type: string = UiStateActionTypes.ChangeTitle;
    constructor(public payload?: string) {
    }
}

export class ChangeMainMenuBtnVisibleAction implements Action {
    readonly type: string = UiStateActionTypes.MainMenuBtnVisible;
    constructor(public payload?: boolean) {
    }
}

export class ChangeMainToolbarVisibleAction implements Action {
    readonly type: string = UiStateActionTypes.MainToolbarVisible;
    constructor(public payload?: boolean) {
    }
}

export type All =
    OpenSidenavAction | CloseSidenavAction | SwitchSidenavAction |
    ChangeTitleAction | ChangeMainMenuBtnVisibleAction | ChangeMainToolbarVisibleAction;

