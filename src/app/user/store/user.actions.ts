import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export enum UserActionTypes {
    LoadUserData = '[User] Load User Data',
    UserDataLoaded = '[User] User Data Loaded'
}

export class LoadUserDataAction implements Action {
    readonly type: string = UserActionTypes.LoadUserData;
    constructor(public payload?: string) {
        //  console.log('Inside LoadUserDataAction.payload: ', payload);
    }
}

export class UserDataLoadedAction implements Action {
    readonly type: string = UserActionTypes.UserDataLoaded;
    constructor(public payload?: User) {
        // console.log('Inside UserDataLoadedAction->payload: ', payload);
    }
}

export type All =
    LoadUserDataAction |
    UserDataLoadedAction;
