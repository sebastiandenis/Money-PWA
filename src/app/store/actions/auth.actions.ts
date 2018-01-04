import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    TrySignup = '[Auth] Try Signup',
    SignupCompleted = '[Auth] Signup Completed',
    TrySignin = '[Auth] Try Signin',
    SigninCompleted = '[Auth] Signin Completed',
    Logout = '[Auth] Logout',
    LogoutCompleted = '[Auth] Logout Completed',
    AuthError = '[Auth] Error',
    AuthErrorClear = '[Auth] Error Clear'
}



export class AuthUserPayload {
    constructor(public user: any) { }
}

export class TrySignup implements Action {
    readonly type: string = AuthActionTypes.TrySignup;
    constructor(public payload?: AuthUserPayload) {
        // console.log('Action->TrySignup: ', payload);
    }
}

export class SignupCompleted implements Action {
    readonly type: string = AuthActionTypes.SignupCompleted;
    constructor(public payload?: AuthUserPayload) {

    }
}


export class TrySignin implements Action {
    readonly type: string = AuthActionTypes.TrySignin;
    constructor(public payload?: AuthUserPayload) {

    }
}

export class SigninCompleted implements Action {
    readonly type: string = AuthActionTypes.SigninCompleted;
    constructor(public payload?: AuthUserPayload) {

    }
}

export class AuthErrorAction implements Action {
    readonly type: string = AuthActionTypes.AuthError;
    constructor(public payload: any) {
    }
}

export class AuthErrorClearAction implements Action {
    readonly type: string = AuthActionTypes.AuthErrorClear;
}


export class Logout implements Action {
    readonly type: string = AuthActionTypes.Logout;
    constructor(public payload = null) {
    }

}

export class LogoutCompleted implements Action {
    readonly type: string = AuthActionTypes.LogoutCompleted;
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
    SigninCompleted | SignupCompleted | TrySignin | TrySignup | Logout | LogoutCompleted |
    AuthErrorClearAction;

