import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import * as BudgetActions from '../actions/budget.actions';
import * as BudgetLinesActions from '../actions/budget-lines.actions';
import { Effect } from '@ngrx/effects';
import { BudgetService } from '../../services/budget.service';
import * as fromRoot from '../../../store/app.reducers';
// import 'rxjs/add/operator/withLatestFrom';
import { Observable } from 'rxjs/Observable';
import { BudgetActionTypes, UpdateBudget, Query } from '../actions/budget.actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';


@Injectable()
export class BudgetEffects {

    constructor(private actions$: Actions,
        private store: Store<fromRoot.AppState>,
        private budgetService: BudgetService) { }

    @Effect()
    query$: Observable<Action> = this.actions$
        .ofType(BudgetActionTypes.QUERY)
        .pipe(
        switchMap((action: BudgetActions.Query) => {
            return this.budgetService.queryAllBudgets(action.payload.userId);
        }),
        mergeMap(actions => actions),
        map(action => {
            return {
                type: `[Budget] ${action.type}`,
                payload: {
                    ...action.payload.doc.data(),
                    id: action.payload.doc.id
                }
            };
        })
        );


    @Effect({ dispatch: false })
    updateBudget$: Observable<void> = this.actions$
        .ofType(BudgetActionTypes.UpdateBudget)
        .pipe(
        map((action: UpdateBudget) => action.payload),
        switchMap(data => {
            return this.budgetService.updateBudget(data.budgetId, data.changes);
        }));


}
