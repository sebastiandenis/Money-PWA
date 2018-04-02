import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducers';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as BudgetLinesActions from '../store/actions/budget-lines.actions';
import * as fromBudgetApp from '../store/reducers/index';
import { Observable } from 'rxjs/Observable';
import { Budget } from '../../models/budget.model';
import * as ExpenseActions from '../store/actions/expense.actions';

@Component({
  selector: 'app-budget-lines',
  templateUrl: './budget-lines.component.html',
  styleUrls: ['./budget-lines.component.css']
})
export class BudgetLinesComponent implements OnInit, OnDestroy {

  lines$: Observable<any>;
  budget$: Observable<Budget>;
  budgetSubscription: Subscription;
  budgetId: string;
  budgetCashLeft = 0;

  constructor(private store: Store<fromRoot.AppState>) {
    this.budget$ = this.store.select(fromBudgetApp.selectCurrentBudget);
    this.lines$ = this.store.select(fromBudgetApp.selectAllBudgetLines);
  }


  ngOnInit() {
    this.budgetSubscription = this.budget$.subscribe(
      (budget) => {
       // console.log('LinesListComp.ngOnInit.budget: ', budget);
        if (budget) {
          this.budgetId = budget.id;
          this.budgetCashLeft = budget.cashLeft;
          this.store.dispatch(new BudgetLinesActions.Query({ budgetId: budget.id }));
        }

      }
    );
  }

  ngOnDestroy() {
    if (this.budgetSubscription) {
      this.budgetSubscription.unsubscribe();
    }
  }

  onAddExpense(data: any) {
      this.store.dispatch(new ExpenseActions.AddExpense({
        expense: data.expense,
        budgetId: this.budgetId,
        budgetLineId: data.budgetLineId,
        showUndo: true
      }));

  }



}
