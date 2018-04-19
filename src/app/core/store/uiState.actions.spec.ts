import { Action } from '@ngrx/store';
import { ShowUndoSnackbar, UiStateActionTypes, CloseUndoSnackbar } from './uiState.actions';


describe('UiStateActions', () => {
    describe('ShowUndoSnackbar', () => {
        it('should create an action', () => {
            const payload = {message: null, action: {}};
            const action = new ShowUndoSnackbar(payload);
            expect({ ...action }).toEqual({
                type: UiStateActionTypes.ShowUndoSnackbar,
                payload
            });
        });
    });



    describe('CloseUndoSnackbar', () => {
        it('should create an action', () => {
            const action = new CloseUndoSnackbar();
            expect({ ...action }).toEqual({
                type: UiStateActionTypes.CloseUndoSnackbar,
            });
        });
    });
});

