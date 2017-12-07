import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class TrySignup implements Action {
    readonly type: string = TRY_SIGNUP;
    constructor(public payload?: { username: string, password: string }) {

    }
}

export class TrySignin implements Action {
    readonly type: string = TRY_SIGNIN;
    constructor(public payload?: { username: string, password: string }) {

    }
}

export class Signup implements Action {
    readonly type: string = SIGNUP;
    constructor(public payload?: { username: string, password: string }) {

    }
}

export class Signin implements Action {
    readonly type: string = SIGNIN;
    constructor(public payload?: { username: string, password: string }) {

    }
}

export class Logout implements Action {
    readonly type: string = LOGOUT;
}

export class SetToken implements Action {
    readonly type: string = SET_TOKEN;
    constructor(public payload?: string) {
    }
}

export type All =
    Signin | Signup | TrySignin | TrySignup | SetToken;

