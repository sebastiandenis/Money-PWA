import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';



export const LOAD_USER_DATA_ACTION = 'LOAD_USER_DATA_ACTION';
export const USER_DATA_LOADED_ACTION = 'USER_DATA_LOADED_ACTION';

export class LoadUserDataAction implements Action {
    readonly type: string = LOAD_USER_DATA_ACTION;
    constructor(public payload?: string) {
       //  console.log('Inside LoadUserDataAction.payload: ', payload);
    }
}

export class UserDataLoadedAction implements Action {
    readonly type: string = USER_DATA_LOADED_ACTION;
    constructor(public payload?: User) {
        // console.log('Inside UserDataLoadedAction->payload: ', payload);
    }
}

export type All =
    LoadUserDataAction |
    UserDataLoadedAction;
