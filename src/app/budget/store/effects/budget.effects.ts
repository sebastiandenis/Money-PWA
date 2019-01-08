import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import * as BudgetActions from "../actions/budget.actions";
import { Effect } from "@ngrx/effects";
import { BudgetService } from "../../services/budget.service";
import { Observable } from "rxjs";
import { BudgetActionTypes, UpdateBudget } from "../actions/budget.actions";
import { switchMap, mergeMap, map, tap } from "rxjs/operators";

@Injectable()
export class BudgetEffects {
  constructor(
    private actions$: Actions,
    private budgetService: BudgetService
  ) {}

  @Effect()
  query$: Observable<Action> = this.actions$.pipe(
    ofType(BudgetActionTypes.QUERY),
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
    }),
    tap(() => {
      console.log("budget effect prawie koniec!");
    })
  );

  @Effect({ dispatch: false })
  updateBudget$: Observable<void> = this.actions$.pipe(
    ofType(BudgetActionTypes.UpdateBudget),
    map((action: UpdateBudget) => action.payload),
    switchMap(data => {
      return this.budgetService.updateBudget(data.budgetId, data.changes);
    })
  );
}
