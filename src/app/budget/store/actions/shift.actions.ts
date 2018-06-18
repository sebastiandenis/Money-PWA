import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Shift, NewShiftData } from '../../models/shift.model';

export enum ShiftActionTypes {
  QUERY = '[Shift] query Shift',
  ADDED = '[Shift] added',
  MODIFIED = '[Shift] modified',
  REMOVED = '[Shift] removed',
  LoadShifts = '[Shift] Load Shifts',
  AddShift = '[Shift] Add Shift',
  UpsertShift = '[Shift] Upsert Shift',
  AddShifts = '[Shift] Add Shifts',
  AddNewShifts = '[Shift] Add New Shifts',
  UpsertShifts = '[Shift] Upsert Shifts',
  UpdateShift = '[Shift] Update Shift',
  UpdateShifts = '[Shift] Update Shifts',
  DeleteShift = '[Shift] Delete Shift',
  DeleteShifts = '[Shift] Delete Shifts',
  ClearShifts = '[Shift] Clear Shifts',
  UndoNewShifts = '[Shift] Undo New Shifts'
}

export class Query implements Action {
  readonly type = ShiftActionTypes.QUERY;
  constructor(public payload: { budgetId: string; budgetLineId: string }) {}
}

export class Added implements Action {
  readonly type = ShiftActionTypes.ADDED;
  constructor(public payload: Shift) {}
}

export class Modified implements Action {
  readonly type = ShiftActionTypes.MODIFIED;
  constructor(public payload: Shift) {}
}

export class Removed implements Action {
  readonly type = ShiftActionTypes.REMOVED;
  constructor(public payload: Shift) {}
}

export class LoadShifts implements Action {
  readonly type = ShiftActionTypes.LoadShifts;

  constructor(public payload: { shifts: Shift[] }) {}
}

export class AddShift implements Action {
  readonly type = ShiftActionTypes.AddShift;

  constructor(
    public payload: {
      shift: Shift;
      budgetId: string;
      budgetLineId: string;
      showUndo?: boolean;
    }
  ) {}
}

export class UpsertShift implements Action {
  readonly type = ShiftActionTypes.UpsertShift;

  constructor(public payload: { shift: Shift }) {}
}

export class AddNewShifts implements Action {
  readonly type = ShiftActionTypes.AddNewShifts;

  constructor(
    public payload: { newShiftData: NewShiftData; showUndo?: boolean }
  ) {}
}

export class UndoNewShifts implements Action {
  readonly type = ShiftActionTypes.UndoNewShifts;

  constructor(
    public payload: {
      newShiftData: NewShiftData;
      budgetId: string;
      showUndo?: boolean;
    }
  ) {}
}

export class AddShifts implements Action {
  readonly type = ShiftActionTypes.AddShifts;

  constructor(
    public payload: { shifts: Shift[]; budgetId: string; showUndo?: boolean }
  ) {}
}

export class UpsertShifts implements Action {
  readonly type = ShiftActionTypes.UpsertShifts;

  constructor(public payload: { shifts: Shift[] }) {}
}

export class UpdateShift implements Action {
  readonly type = ShiftActionTypes.UpdateShift;

  constructor(public payload: { shift: Update<Shift> }) {}
}

export class UpdateShifts implements Action {
  readonly type = ShiftActionTypes.UpdateShifts;

  constructor(public payload: { shifts: Update<Shift>[] }) {}
}

export class DeleteShift implements Action {
  readonly type = ShiftActionTypes.DeleteShift;

  constructor(
    public payload: {
      shift: Shift;
      budgetLineId: string;
      budgetId: string;
      showUndo?: boolean;
    }
  ) {}
}

export class DeleteShifts implements Action {
  readonly type = ShiftActionTypes.DeleteShifts;

  constructor(
    public payload: {
      shifts: Shift[];
      budgetId: string;
      showUndo?: boolean;
    }
  ) {}
}

export class ClearShifts implements Action {
  readonly type = ShiftActionTypes.ClearShifts;
}

export type ShiftActions =
  | Query
  | Added
  | Removed
  | Modified
  | LoadShifts
  | AddShift
  | AddNewShifts
  | UpsertShift
  | AddShifts
  | UpsertShifts
  | UpdateShift
  | UpdateShifts
  | DeleteShift
  | DeleteShifts
  | ClearShifts
  | UndoNewShifts;
