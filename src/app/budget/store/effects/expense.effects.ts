import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFirestore } from 'angularfire2/firestore';
import { BudgetService } from '../../services/budget.service';
import { Store, Action } from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import { Observable } from 'rxjs';
import {
  ExpenseActionTypes,
  Query,
  AddExpense,
  DeleteExpense
} from '../actions/expense.actions';
import { switchMap, mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { DocumentReference } from '@firebase/firestore-types';
// import { BudgetLinesActionTypes, UpdateBudgetLineAction, ExpenseAdded } from '../actions/budget-lines.actions';
import * as fromBudgetLinesActions from '../actions/budget-lines.actions';
import * as fromBudgetActions from '../actions/budget.actions';
import * as fromUiStateActions from '../../../core/store/uiState.actions';
import { UndoPayloadMessages } from '../../../core/components/undo-snackbar/undo-snackbar.component';
import { BudgetLine } from '../../models/budget-line.model';
import { Budget } from '../../models/budget.model';
import { State } from '@ngrx/store/src/state';

@Injectable()
export class ExpenseEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.FeatureState>,
    private afs: AngularFirestore,
    private budgetService: BudgetService
  ) {}

  @Effect()
  query$: Observable<Action> = this.actions$
    .ofType(ExpenseActionTypes.QUERY)
    .pipe(
      switchMap((action: Query) => {
        return this.budgetService.queryAllExpenses(
          action.payload.budgetId,
          action.payload.budgetLineId
        );
      }),
      mergeMap(actions => actions),
      map(action => {
        return {
          type: `[Expense] ${action.type}`,
          payload: {
            ...action.payload.doc.data(),
            id: action.payload.doc.id
          }
        };
      })
    );

  @Effect()
  deleteExpense$ = this.actions$.ofType(ExpenseActionTypes.DeleteExpense).pipe(
    map((action: DeleteExpense) => action.payload),
    withLatestFrom(this.store$.select(fromRoot.getBudgetModuleState)),
    switchMap(([payload, state]) => {
      return this.budgetService
        .deleteExpense(
          payload.expense.id,
          payload.budgetLineId,
          payload.budgetId
        )
        .pipe(
          mergeMap(() => {
            const newBudgetLineCashLeft: number =
              state.budgetLines.entities[payload.budgetLineId].cashLeft +
              payload.expense.amount;
            const newBudgetCashLeft: number =
              state.budgets.entities[payload.budgetId].cashLeft +
              payload.expense.amount;
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
                  message: UndoPayloadMessages.ExpenseRemoved,
                  action: new AddExpense({
                    expense: payload.expense,
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
  addExpense$ = this.actions$.ofType(ExpenseActionTypes.AddExpense).pipe(
    map((action: AddExpense) => action.payload),
    withLatestFrom(this.store$.select(fromRoot.getBudgetModuleState)),
    switchMap(([payload, state]) => {
      return this.budgetService
        .addExpense(payload.expense, payload.budgetId, payload.budgetLineId)
        .pipe(
          mergeMap(() => {
            const newBudgetLineCashLeft: number =
              state.budgetLines.entities[payload.budgetLineId].cashLeft -
              payload.expense.amount;
            const newBudgetCashLeft: number =
              state.budgets.entities[payload.budgetId].cashLeft -
              payload.expense.amount;
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
                  message: UndoPayloadMessages.ExpenseAdded,
                  action: new DeleteExpense({
                    expense: payload.expense,
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
}
