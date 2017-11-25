import { ActionReducerMap } from '@ngrx/store';
import * as fromStoreData from './reducers/dataReducer';
import * as fromUiState from './reducers/uiStateReducer';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
    uiState: fromUiState.State;
    storeData: fromStoreData.State;
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
    storeData: fromStoreData.storeData,
    uiState: fromUiState.uiState,
    auth: fromAuth.authReducer
};
