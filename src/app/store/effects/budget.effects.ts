import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as BudgetActions from '../actions/budget.actions';
import { Effect } from '@ngrx/effects';
import { BudgetService } from '../../services/budget.service';
import * as fromRoot from '../app.reducers';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

@Injectable()
export class BudgetEffects {

    constructor(private actions$: Actions,
        private store: Store<fromRoot.AppState>,
        private budgetService: BudgetService) { }


    @Effect()
    budgetFetch = this.actions$
        .ofType(BudgetActions.LOAD_DEFAULT_BUDGET_ACTION)
        .map((action: BudgetActions.LoadDefaultBudgetAction) => action.payload)
        .switchMap(budgetId => {
            return this.budgetService.loadDefaultBudget(budgetId);
        })
        .map(results => new BudgetActions.DefaultBudgetLoadedAction(results));


    @Effect()
    budgetLinesFetch = this.actions$
        .ofType(BudgetActions.LOAD_DEFAULT_BUDGETLINES_ACTION)
        .map((action: BudgetActions.LoadDefaultBudgetLinesAction) => action.payload)
        .switchMap(budgetId => {
            return this.budgetService.loadBudgetLines(budgetId);
        })
        .map(results => new BudgetActions.DefaultBudgetLinesLoadedAction(results));



}
