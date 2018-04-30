import { Action } from '@ngrx/store';
import { UndoPayload } from '../../core/components/undo-snackbar/undo-snackbar.component';

export enum UiStateActionTypes {
    ChangeTitle = '[UiState] Change Title',
    MainMenuBtnVisible = '[UiState] Main Menu Button Visible',
    ChangeSideMenuBtnVisible = '[UiState] Side Menu Button Visible Change',
    MainToolbarVisible = '[UiState] Main Toolbar Visible',
    MainToolbarCloseBtnVisible = '[UiState] Main Toolbar Close Button Visible',
    OpenSidenav = '[UiState] Open Sidenav (on)',
    CloseSidenav = '[UiState] Close Sidenav (off)',
    SwitchSidenav = '[UiState] Switch Sidenav (on/off)',
    ShowUndoSnackbar = '[UiState] Show Undo Snackbar',
    CloseUndoSnackbar = '[UiState] Close Undo Snackbar',
}



export class ShowUndoSnackbar implements Action {
    readonly type: string = UiStateActionTypes.ShowUndoSnackbar;
    constructor(public payload?: UndoPayload) {
    }
}

export class CloseUndoSnackbar implements Action {
    readonly type: string = UiStateActionTypes.CloseUndoSnackbar;
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

export class ChangeMainToolbarCloseBtnVisibleAction implements Action {
    readonly type: string = UiStateActionTypes.MainToolbarCloseBtnVisible;
    constructor(public payload?: boolean) {
    }
}

export class ChangeMainMenuBtnVisibleAction implements Action {
    readonly type: string = UiStateActionTypes.MainMenuBtnVisible;
    constructor(public payload?: boolean) {
    }
}

export class ChangeSideMenuBtnVisibleAction implements Action {
  readonly type: string = UiStateActionTypes.ChangeSideMenuBtnVisible;
  constructor(public payload?: boolean) {
  }
}

export class ChangeMainToolbarVisibleAction implements Action {
    readonly type: string = UiStateActionTypes.MainToolbarVisible;
    constructor(public payload?: boolean) {
    }
}

export type UiStateActions =
    OpenSidenavAction
    | CloseSidenavAction
    | SwitchSidenavAction
    | ChangeSideMenuBtnVisibleAction
    | ChangeTitleAction
    | ChangeMainMenuBtnVisibleAction
    | ChangeMainToolbarVisibleAction
    | ShowUndoSnackbar
    | CloseUndoSnackbar
    | ChangeMainToolbarCloseBtnVisibleAction;

