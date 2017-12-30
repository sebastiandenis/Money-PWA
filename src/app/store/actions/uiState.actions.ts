import { Action } from '@ngrx/store';

export const CHANGE_TITLE_ACTION = 'CHANGE_TITLE_ACTION';
export const CHANGE_MAIN_MENU_BTN_VISIBLE_ACTION = 'CHANGE_MAIN_MENU_BTN_VISIBLE_ACTION';
export const CHANGE_MAIN_TOOLBAR_FIXED_ACTION = 'CHANGE_MAIN_TOOLBAR_FIXED_ACTION';

export const OPEN_SIDENAV_ACTION = 'OPEN_SIDENAV_ACTION';
export const CLOSE_SIDENAV_ACTION = 'CLOSE_SIDENAV_ACTION';
export const SWITCH_SIDENAV_ACTION = 'SWITCH_SIDENAV_ACTION';


export class SwitchSidenavAction implements Action {
    readonly type: string = SWITCH_SIDENAV_ACTION;
}

export class OpenSidenavAction implements Action {
    readonly type: string = OPEN_SIDENAV_ACTION;
}

export class CloseSidenavAction implements Action {
    readonly type: string = CLOSE_SIDENAV_ACTION;
}


export class ChangeTitleAction implements Action {
    readonly type: string = CHANGE_TITLE_ACTION;
    constructor(public payload?: string) {
    }
}

export class ChangeMainMenuBtnVisibleAction implements Action {
    readonly type: string = CHANGE_MAIN_MENU_BTN_VISIBLE_ACTION;
    constructor(public payload?: boolean) {
    }
}

export class ChangeMainToolbarFixedAction implements Action {
    readonly type: string = CHANGE_MAIN_TOOLBAR_FIXED_ACTION;
    constructor(public payload?: boolean) {
    }
}

export type All =
    OpenSidenavAction | CloseSidenavAction | SwitchSidenavAction |
    ChangeTitleAction | ChangeMainMenuBtnVisibleAction | ChangeMainToolbarFixedAction;

