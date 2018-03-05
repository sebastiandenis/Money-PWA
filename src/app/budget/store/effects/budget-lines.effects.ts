import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as fromRoot from '../../../store/app.reducers';
import { BudgetService } from '../../../services/budget.service';
import { Store, Action } from '@ngrx/store';
import {
    BudgetLinesActionTypes,
    LoadDefaultBudgetLinesAction, Query,
    DefaultBudgetLinesLoadedAction,
    UpdateBudgetLineAction,
    BudgetLineUpdatedAction,
    ExpenseAdded
} from '../actions/budget-lines.actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { BudgetLine } from '../../../models/budget-line.model';
import { Budget } from '../../../models/budget.model';
import { BudgetActionTypes } from '../actions/budget.actions';



@Injectable()
export class BudgetLinesEffects {

    constructor(private actions$: Actions,
        private store: Store<fromRoot.AppState>,
        private afs: AngularFirestore,
        private budgetService: BudgetService
    ) { }

    @Effect()
    query$: Observable<Action> = this.actions$
        .ofType(BudgetLinesActionTypes.QUERY)
        .pipe(
        switchMap((action: Query) => {
            return this.budgetService.queryAllBudgetLines(action.payload.budgetId);
        }),
        mergeMap(actions => actions),
        map(action => {
            return {
                type: `[BudgetLine] ${action.type}`,
                payload: {
                    ...action.payload.doc.data(),
                    id: action.payload.doc.id
                }
            };
        })
        );

    @Effect()
    expenseAdded$: Observable<Action> = this.actions$
        .ofType(BudgetLinesActionTypes.ExpenseAdded)
        .pipe(
        map((action: ExpenseAdded) => action.payload),
        mergeMap((data) => {
            return [new UpdateBudgetLineAction({
                budgetId: data.budgetId,
                id: data.budgetLineId,
                changes: { cashLeft: data.newCashLeft }
            })];
        })
        );

    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(BudgetLinesActionTypes.UpdateBudgetLine)
        .pipe(
        map((action: UpdateBudgetLineAction) => action.payload),
        switchMap(data => {
            console.log('Effect.updateBudgetLine.budgetId: ', data.budgetId);
            const ref = this.afs.doc<Budget>(`budgets/${data.budgetId}/budgetLines/${data.id}`);
            return Observable.fromPromise(ref.update(data.changes));
        }),
        map(() => new BudgetLineUpdatedAction)
        );


    @Effect()
    budgetLinesFetch$ = this.actions$
        .ofType(BudgetLinesActionTypes.LoadDefaultBudgetLines)
        .map((action: LoadDefaultBudgetLinesAction) => action.payload)
        .switchMap(budgetId => {
            return this.budgetService.loadBudgetLines(budgetId.budgetId);
        })
        .map(results => new DefaultBudgetLinesLoadedAction(results));



}
