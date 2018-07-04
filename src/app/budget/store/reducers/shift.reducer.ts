import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import { Shift } from '../../models/shift.model';
import { ShiftActions, ShiftActionTypes } from '../actions/shift.actions';

export interface FeatureState extends fromApp.AppState {
  Shifts: State;
}

export const adapter = createEntityAdapter<Shift>();

export interface State extends EntityState<Shift> {
  // additional entity state properties
  selectedShiftId: string | null;
}

export const initialState: State = adapter.getInitialState({
  selectedShiftId: null
});

export function shiftReducer(
  state = initialState,
  action: ShiftActions
): State {
  switch (action.type) {
    case ShiftActionTypes.QUERY:
      return adapter.removeAll(state);
    case ShiftActionTypes.AddShift:
      return { ...state };
    case ShiftActionTypes.AddNewShifts:
      return { ...state };
    case ShiftActionTypes.UndoNewShifts:
      return { ...state };
    case ShiftActionTypes.ADDED:
      return adapter.addOne(action.payload, state);
    case ShiftActionTypes.MODIFIED:
      return adapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        state
      );
    case ShiftActionTypes.REMOVED:
      return adapter.removeOne(action.payload.id, state);
    case ShiftActionTypes.DeleteShift:
      return { ...state };
    default: {
      return state;
    }
  }
}

export const getSelectedShiftId = (state: State) => {
  return state.selectedShiftId;
};

export const {
  // select the array of Shift ids
  selectIds: selectShiftIds,

  // select the dictionary of Shift entities
  selectEntities: selectShiftEntities,

  // select the array of Shift
  selectAll: selectAllShifts,

  // select the total Shift count
  selectTotal: selectShiftTotal
} = adapter.getSelectors();
