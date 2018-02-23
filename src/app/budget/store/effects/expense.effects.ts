import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFirestore } from 'angularfire2/firestore';
import { BudgetService } from '../../../services/budget.service';
import { Store, Action } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import { ExpenseActionTypes, Query, AddExpense } from '../actions/expense.actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { DocumentReference } from '@firebase/firestore-types';
// import { BudgetLinesActionTypes, UpdateBudgetLineAction, ExpenseAdded } from '../actions/budget-lines.actions';
import * as fromBudgetLinesActions from '../actions/budget-lines.actions';
import * as fromBudgetActions from '../actions/budget.actions';

@Injectable()
export class ExpenseEffects {

    constructor(private actions$: Actions,
        private store: Store<fromRoot.AppState>,
        private afs: AngularFirestore,
        private budgetService: BudgetService
    ) { }

    @Effect()
    query$: Observable<Action> = this.actions$
        .ofType(ExpenseActionTypes.QUERY)
        .pipe(
        switchMap((action: Query) => {
            return this.budgetService.queryAllExpenses(action.payload.budgetId, action.payload.budgetLineId);
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
    addExpense$ = this.actions$
        .ofType(ExpenseActionTypes.AddExpense)
        .pipe(
        map((action: AddExpense) => action.payload),
        switchMap(payload => {
            return this.budgetService.addExpense(payload.expense, payload.budgetId, payload.budgetLineId)
            .mergeMap((expenseDocRef: DocumentReference) => {
               // console.log('Expense added: ', expenseDocRef);
              //  const budgetId = expenseDocRef.parent.parent.parent.parent.id;
              //  const budgetLineId = expenseDocRef.parent.parent.id;
             //   console.log('Budget id: ', budgetId);
             //   console.log('BudgetLine id: ', budgetLineId);
                return [
                    new fromBudgetLinesActions.ExpenseAdded({
                    budgetId: payload.budgetId,
                    budgetLineId:  payload.budgetLineId,
                    newCashLeft: payload.newBudgetLineCashLeft
                }),
                new fromBudgetActions.ExpenseAdded({
                    budgetId: payload.budgetId,
                    newCashLeft: payload.newBudgetCashLeft
                })
            ];
            });

        }),

        )
        ;
}
