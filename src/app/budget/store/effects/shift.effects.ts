import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { BudgetService } from "../../services/budget.service";
import { Store, Action } from "@ngrx/store";
import * as fromRoot from "../reducers/index";
import { Observable } from "rxjs";
import {
  ShiftActionTypes,
  Query,
  AddShift,
  DeleteShift,
  AddShifts,
  AddNewShifts,
  DeleteShifts
} from "../actions/shift.actions";
import { switchMap, mergeMap, map, withLatestFrom } from "rxjs/operators";
import * as fromBudgetLinesActions from "../actions/budget-lines.actions";
import * as fromBudgetActions from "../actions/budget.actions";
import * as fromUiStateActions from "../../../core/store/uiState.actions";
import { UndoPayloadMessages } from "../../../core/components/undo-snackbar/undo-snackbar.component";
import { BudgetLine } from "../../models/budget-line.model";
import { Budget } from "../../models/budget.model";
import { Shift } from "../../models/shift.model";

@Injectable()
export class ShiftEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.FeatureState>,
    private budgetService: BudgetService
  ) {}

  @Effect()
  query$: Observable<Action> = this.actions$.pipe(
    ofType(ShiftActionTypes.QUERY),
    switchMap((action: Query) => {
      return this.budgetService.queryAllShifts(
        action.payload.budgetId,
        action.payload.budgetLineId
      );
    }),
    mergeMap(actions => actions),
    map(action => {
      return {
        type: `[Shift] ${action.type}`,
        payload: {
          ...action.payload.doc.data(),
          id: action.payload.doc.id
        }
      };
    })
  );

  @Effect()
  deleteShift$ = this.actions$.pipe(
    ofType(ShiftActionTypes.DeleteShift),
    map((action: DeleteShift) => action.payload),
    withLatestFrom(this.store$.select(fromRoot.getBudgetModuleState)),
    switchMap(([payload, state]) => {
      return this.budgetService
        .deleteShift(payload.shift.id, payload.budgetLineId, payload.budgetId)
        .pipe(
          mergeMap(() => {
            const newBudgetLineCashLeft: number =
              state.budgetLines.entities[payload.budgetLineId].cashLeft +
              payload.shift.amount;
            const newBudgetCashLeft: number =
              state.budgets.entities[payload.budgetId].cashLeft +
              payload.shift.amount;
            const newBudgetLine: Partial<BudgetLine> = {
              id: payload.budgetLineId,
              cashLeft: newBudgetLineCashLeft
            };
            const newBudget: Partial<Budget> = {
              id: payload.budgetId,
              cashLeft: newBudgetCashLeft
            };
            const actions: Action[] = [];
            actions.push(
              new fromBudgetLinesActions.UpdateBudgetLineAction({
                budgetId: payload.budgetId,
                id: payload.budgetLineId,
                changes: newBudgetLine
              })
            );

            actions.push(
              new fromBudgetActions.UpdateBudget({
                budgetId: payload.budgetId,
                changes: newBudget
              })
            );

            if (payload.showUndo) {
              actions.push(
                new fromUiStateActions.ShowUndoSnackbar({
                  message: UndoPayloadMessages.ShiftRemoved,
                  action: new AddShift({
                    shift: payload.shift,
                    budgetLineId: payload.budgetLineId,
                    budgetId: payload.budgetId
                  })
                })
              );
            }

            return actions;
          })
        );
    })
  );

  @Effect()
  addShift$ = this.actions$.pipe(
    ofType(ShiftActionTypes.AddShift),
    map((action: AddShift) => action.payload),
    withLatestFrom(this.store$.select(fromRoot.getBudgetModuleState)),
    switchMap(([payload, state]) => {
      return this.budgetService
        .addShift(payload.shift, payload.budgetId, payload.budgetLineId)
        .pipe(
          mergeMap(() => {
            const newBudgetLineCashLeft: number =
              state.budgetLines.entities[payload.budgetLineId].cashLeft -
              payload.shift.amount;
            const newBudgetCashLeft: number =
              state.budgets.entities[payload.budgetId].cashLeft -
              payload.shift.amount;
            const newBudgetLine: Partial<BudgetLine> = {
              id: payload.budgetLineId,
              cashLeft: newBudgetLineCashLeft
            };
            const newBudget: Partial<Budget> = {
              id: payload.budgetId,
              cashLeft: newBudgetCashLeft
            };
            const actions: Action[] = [];
            actions.push(
              new fromBudgetLinesActions.UpdateBudgetLineAction({
                budgetId: payload.budgetId,
                id: payload.budgetLineId,
                changes: newBudgetLine
              })
            );
            actions.push(
              new fromBudgetActions.UpdateBudget({
                budgetId: payload.budgetId,
                changes: newBudget
              })
            );
            if (payload.showUndo) {
              actions.push(
                new fromUiStateActions.ShowUndoSnackbar({
                  message: UndoPayloadMessages.ShiftAdded,
                  action: new DeleteShift({
                    shift: payload.shift,
                    budgetLineId: payload.budgetLineId,
                    budgetId: payload.budgetId
                  })
                })
              );
            }
            return actions;
          })
        );
    })
  );

  @Effect()
  addNewShifts$ = this.actions$.pipe(
    ofType(ShiftActionTypes.AddNewShifts),
    map((action: AddNewShifts) => action.payload),
    withLatestFrom(this.store$.select(fromRoot.getBudgetModuleState)),
    switchMap(([payload, state]) => {
      const actions: Action[] = [];
      const shiftFrom: Shift = {
        id: null,
        budgetLineId: payload.newShiftData.cameFrom,
        amount: -payload.newShiftData.amount,
        wentTo: payload.newShiftData.wentTo
      };

      const shiftTo: Shift = {
        id: null,
        budgetLineId: payload.newShiftData.wentTo,
        amount: payload.newShiftData.amount,
        cameFrom: payload.newShiftData.cameFrom
      };

      if (payload.newShiftData.description) {
        Object.assign(shiftFrom, {
          description: payload.newShiftData.description
        });
        Object.assign(shiftTo, {
          description: payload.newShiftData.description
        });
      }

      actions.push(
        new AddShifts({
          shifts: [shiftFrom, shiftTo],
          budgetId: state.budgets.currentBudgetId,
          showUndo: true
        })
      );

      return actions;
    })
  );

  @Effect()
  addShifts$ = this.actions$.pipe(
    ofType(ShiftActionTypes.AddShifts),
    map((action: AddShifts) => action.payload),
    withLatestFrom(this.store$.select(fromRoot.getBudgetModuleState)),
    switchMap(([payload, state]) => {
      return this.budgetService
        .addShifts(payload.shifts, state.budgets.currentBudgetId)
        .pipe(
          mergeMap(() => {
            const actions: Action[] = [];
            payload.shifts.forEach((shift: Shift) => {
              // dla każdego Shift wywołaj akcję aktualizacji liniii
              const newBudgetLineCashLeft: number =
                state.budgetLines.entities[shift.budgetLineId].cashLeft +
                shift.amount;
              const updatedBudgetLine: Partial<BudgetLine> = {
                id: shift.budgetLineId,
                cashLeft: newBudgetLineCashLeft
              };

              actions.push(
                new fromBudgetLinesActions.UpdateBudgetLineAction({
                  budgetId: state.budgets.currentBudgetId,
                  id: updatedBudgetLine.id,
                  changes: updatedBudgetLine
                })
              );
            });

            if (payload.showUndo) {
              actions.push(
                new fromUiStateActions.ShowUndoSnackbar({
                  message: UndoPayloadMessages.ShiftAdded,
                  action: new DeleteShifts({
                    shifts: payload.shifts,
                    budgetId: state.budgets.currentBudgetId,
                    showUndo: false
                  })
                })
              );
            }
            return actions;
          })
        );
    })
  );

  @Effect()
  deleteShifts$ = this.actions$.pipe(
    ofType(ShiftActionTypes.DeleteShifts),
    map((action: DeleteShifts) => action.payload),
    withLatestFrom(this.store$.select(fromRoot.getBudgetModuleState)),
    switchMap(([payload, state]) => {
      return this.budgetService
        .deleteShifts(payload.shifts, state.budgets.currentBudgetId)
        .pipe(
          mergeMap(() => {
            const actions: Action[] = [];
            payload.shifts.forEach((shift: Shift) => {
              // dla każdego Shift wywołaj akcję aktualizacji liniii
              const newBudgetLineCashLeft: number =
                state.budgetLines.entities[shift.budgetLineId].cashLeft -
                shift.amount;
              const updatedBudgetLine: Partial<BudgetLine> = {
                id: shift.budgetLineId,
                cashLeft: newBudgetLineCashLeft
              };

              actions.push(
                new fromBudgetLinesActions.UpdateBudgetLineAction({
                  budgetId: state.budgets.currentBudgetId,
                  id: updatedBudgetLine.id,
                  changes: updatedBudgetLine
                })
              );
            });

            if (payload.showUndo) {
              const shiftsIds = payload.shifts.map((shift: Shift) => shift.id);
              actions.push(
                new fromUiStateActions.ShowUndoSnackbar({
                  message: UndoPayloadMessages.ShiftAdded,
                  action: new AddShifts({
                    shifts: payload.shifts,
                    budgetId: state.budgets.currentBudgetId,
                    showUndo: false
                  })
                })
              );
            }
            return actions;
          })
        );
    })
  );
}
