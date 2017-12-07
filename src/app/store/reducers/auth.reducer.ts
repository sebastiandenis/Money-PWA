import { Action } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';


export interface State {
    token: string;
    authenticated: boolean;
}

export const INITIAL_STORE_DATA: State = {
    token: undefined,
    authenticated: false
};

export function reducer(state = INITIAL_STORE_DATA, action: AuthActions.All): State {
    switch (action.type) {
        case AuthActions.SIGNUP:
        case AuthActions.SIGNIN:
            return {
                ...state,
                authenticated: true
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                token: null,
                authenticated: false
            };
        case AuthActions.SET_TOKEN:
            return handleSetToken(state, <any>action);
        default:
            return state;
    }
}

function handleSetToken(state: State, action: AuthActions.SetToken): State {
    return {
        ...state,
        token: action.payload
    };
}

