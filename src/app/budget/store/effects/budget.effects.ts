import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import * as BudgetActions from '../actions/budget.actions';
import * as BudgetLinesActions from '../actions/budget-lines.actions';
import { Effect } from '@ngrx/effects';
import { BudgetService } from '../../../services/budget.service';
import * as fromRoot from '../../../store/app.reducers';
// import 'rxjs/add/operator/withLatestFrom';
import { Observable } from 'rxjs/Observable';
import { BudgetActionTypes } from '../actions/budget.actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';



@Injectable()
export class BudgetEffects {

    constructor(private actions$: Actions,
        private store: Store<fromRoot.AppState>,
        private budgetService: BudgetService) { }


    @Effect()
    budgetFetch = this.actions$
        .ofType(BudgetActions.BudgetActionTypes.LoadDefaultBudget)
        .map((action: BudgetActions.LoadDefaultBudgetAction) => action.payload)
        .switchMap(budgetId => {
            return this.budgetService.loadDefaultBudget(budgetId);
        })
        .map(results => new BudgetActions.DefaultBudgetLoadedAction(results));




}
