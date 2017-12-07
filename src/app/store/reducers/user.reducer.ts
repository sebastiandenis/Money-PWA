import { Action } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { User } from '../../models/user.model';

export interface State {
    user: User;
}

export const INITIAL_STORE_DATA: State = {
    user: {
        id: undefined,
        email: undefined,
        name: undefined,
        userId: undefined,
        config: {
            id: undefined,
            lang: undefined,
            currentBudgetId: undefined,
            currentSavingsId: undefined
        }
    }
};

export function reducer(state = INITIAL_STORE_DATA, action: UserActions.All): State {
    switch (action.type) {
        case UserActions.LOAD_USER_DATA_ACTION:
            return {
                ...state
            };

        case UserActions.USER_DATA_LOADED_ACTION:
            return handleUserDataLoadedAction(state, <any>action);
        default:
            return state;
    }
}

function handleUserDataLoadedAction(state: State, action: UserActions.UserDataLoadedAction): State {
    return {
        ...state,
        user: action.payload
    };
}
