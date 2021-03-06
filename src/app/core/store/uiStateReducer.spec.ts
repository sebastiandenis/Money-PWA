import { State } from './uiStateReducer';
import * as fromUiStateReducer from './uiStateReducer';
import {
  UiStateActions,
  ShowUndoSnackbar,
  CloseUndoSnackbar
} from './uiState.actions';
import {
  UndoPayload,
  UndoPayloadMessages
} from '../../core/components/undo-snackbar/undo-snackbar.component';

describe('UiStateReducer', () => {
  let myState: State;
  beforeEach(() => {
    myState = {
      currentTitle: 'Title test',
      locale: 'pl-PL',
      mainMenuBtnVisible: true,
      sideMenuBtnVisible: true,
      mainToolbarFixed: true,
      showSidenav: true,
      showUndoSnackbar: true,
      lastUndo: null,
      mainToolbarCloseBtnVisible: false
    };
  });

  it('undefined action should return the default state', () => {
    const { initialState } = fromUiStateReducer;
    const action: UiStateActions = {
      type: undefined
    };
    const state = fromUiStateReducer.uiState(undefined, action);
    expect(state).toBe(initialState);
  });

  it('ShowUndoSnackbar action should update the state', () => {
    const actionPayload: UndoPayload = {
      message: UndoPayloadMessages.ExpenseAdded,
      action: 'test'
    };
    const action: ShowUndoSnackbar = new ShowUndoSnackbar(actionPayload);
    const { initialState } = fromUiStateReducer;
    const state = fromUiStateReducer.uiState(initialState, action);

    expect(state.currentTitle).toEqual(initialState.currentTitle);
    expect(state.locale).toEqual(initialState.locale);
    expect(state.mainMenuBtnVisible).toEqual(initialState.mainMenuBtnVisible);
    expect(state.sideMenuBtnVisible).toEqual(initialState.sideMenuBtnVisible);
    expect(state.mainToolbarFixed).toEqual(initialState.mainToolbarFixed);
    expect(state.showSidenav).toEqual(initialState.showSidenav);
    expect(state.showUndoSnackbar).toBeTruthy();
    expect(state.lastUndo).toBeDefined();
    expect(state.lastUndo.action).toEqual(action.payload.action);
    expect(state.mainToolbarCloseBtnVisible).toEqual(
      initialState.mainToolbarCloseBtnVisible
    );
  });

  it('CloseUndoSnackbar action should only set showUndoSnackbar property to false and lastUndo to null', () => {
    const action: CloseUndoSnackbar = new CloseUndoSnackbar();
    const { initialState } = fromUiStateReducer;
    const state = fromUiStateReducer.uiState(myState, action);
    myState.lastUndo = 'test';
    expect(state.currentTitle).toEqual(myState.currentTitle);
    expect(state.locale).toEqual(myState.locale);
    expect(state.mainMenuBtnVisible).toEqual(myState.mainMenuBtnVisible);
    expect(state.sideMenuBtnVisible).toEqual(myState.sideMenuBtnVisible);
    expect(state.mainToolbarFixed).toEqual(myState.mainToolbarFixed);
    expect(state.showSidenav).toEqual(myState.showSidenav);
    expect(state.showUndoSnackbar).toBeFalsy();
    expect(state.lastUndo).toBeNull();
  });
});
