import { Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';


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
        case AuthActions.AuthActionTypes.SignupCompleted:
            return handleSignupCompleted(state, <any>action);
        case AuthActions.AuthActionTypes.SigninCompleted:
            return handleSigninCompleted(state, <any>action);
        case AuthActions.AuthActionTypes.Logout:
            return INITIAL_STORE_DATA;
        case AuthActions.AuthActionTypes.AuthError:
            return handleAuthError(state, <any>action);
        case AuthActions.AuthActionTypes.AuthErrorClear:
            return {
                ...state,
                error: null
            };
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
    console.log('auth.reducer.handleSignupCompleted.userData: ', action.payload.user);
    return {
        ...state,
        userData: action.payload.user,
        isLoggedIn: action.payload.user != null,
        error: null
    };
}


