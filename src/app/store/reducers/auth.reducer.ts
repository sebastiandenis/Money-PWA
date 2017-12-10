import { Action } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';


export interface State {
    userData: any; // firebase user model
    isLoggedIn: boolean;
    error: any;
}

export const INITIAL_STORE_DATA: State = {
    userData: null,
    isLoggedIn: false,
    error: null
};

export function reducer(state = INITIAL_STORE_DATA, action: AuthActions.All): State {
    switch (action.type) {
        case AuthActions.SIGNUP_COMPLETED:
            return handleSignupCompleted(state, <any>action);
        case AuthActions.SIGNIN_COMPLETED:
            return handleSigninCompleted(state, <any>action);
        case AuthActions.LOGOUT:
            return {
                ...state,
                userData: null,
                isLoggedIn: false
            };
        case AuthActions.AUTH_ERROR:
            return handleAuthError(state, <any>action);
        default:
            return state;
    }
}

function handleAuthError(state: State, action: AuthActions.AuthErrorAction): State {
    return {
        ...state,
        error: action.payload
    };
}

function handleSigninCompleted(state: State, action: AuthActions.SigninCompleted): State {
    return {
        ...state,
        userData: action.payload.user,
        isLoggedIn: action.payload.user != null,
        error: null
    };
}

function handleSignupCompleted(state: State, action: AuthActions.SignupCompleted): State {
    return {
        ...state,
        userData: action.payload.user,
        isLoggedIn: action.payload.user != null,
        error: null
    };
}


