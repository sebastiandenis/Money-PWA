import { Action } from '@ngrx/store';
import { ShowUndoSnackbar, UiStateActionTypes, DoUndo, CloseUndoSnackbar } from './uiState.actions';


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

    describe('DoUndo', () => {
        it('should create an action', () => {
            const action = new DoUndo();
            expect({ ...action }).toEqual({
                type: UiStateActionTypes.DoUndo,
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

