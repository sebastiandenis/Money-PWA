import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP_COMPLETED = 'SIGNUP_COMPLETED';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNIN_COMPLETED = 'SIGNIN_COMPLETED';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_COMPLETED = 'LOGOUT_COMPLETED';
export const AUTH_ERROR = 'AUTH_ERROR';


export class AuthUserPayload {
    constructor(public user: any) { }
}

export class TrySignup implements Action {
    readonly type: string = TRY_SIGNUP;
    constructor(public payload?: AuthUserPayload) {

    }
}

export class SignupCompleted implements Action {
    readonly type: string = SIGNUP_COMPLETED;
    constructor(public payload?: AuthUserPayload) {

    }
}


export class TrySignin implements Action {
    readonly type: string = TRY_SIGNIN;
    constructor(public payload?: AuthUserPayload) {

    }
}

export class SigninCompleted implements Action {
    readonly type: string = SIGNIN_COMPLETED;
    constructor(public payload?: AuthUserPayload) {

    }
}

export class AuthErrorAction implements Action {
    readonly type: string = AUTH_ERROR;
    constructor(public payload: any) {
     }
}


export class Logout implements Action {
    readonly type: string = LOGOUT;
    constructor(public payload = null) {
    }

}

export class LogoutCompleted implements Action {
    readonly type: string = LOGOUT_COMPLETED;
    constructor(public payload = null) {
    }
}

/*
export class SetToken implements Action {
    readonly type: string = SET_TOKEN;
    constructor(public payload?: string) {
    }
}
*/

export type All =
    SigninCompleted | SignupCompleted | TrySignin | TrySignup | Logout | LogoutCompleted;

