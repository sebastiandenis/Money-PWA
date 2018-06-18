import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import * as fromBudgetApp from '../../store/reducers/index';
import * as BudgetLinesActions from '../../store/actions/budget-lines.actions';
import * as ExpenseActions from '../../store/actions/expense.actions';
import { BudgetLine } from '../../models/budget-line.model';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Budget } from '../../models/budget.model';

@Component({
  selector: 'app-add-expense-dlg',
  templateUrl: './add-expense-dlg.component.html',
  styleUrls: ['./add-expense-dlg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddExpenseDlgComponent implements OnInit, OnDestroy {
  selectedBudgetLine$: Observable<BudgetLine>;
  selectedBudgetLineSubscription: Subscription;
  currentBudgetSubscription: Subscription;
  selectedBudgetLine: BudgetLine;
  currentBudgetId: string;
  currentBudget: Budget;

  @Output() emitAddExpense = new EventEmitter<any>();

  constructor(
    private dialogRef: MatDialogRef<AddExpenseDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private store: Store<fromRoot.AppState>
  ) {
    this.selectedBudgetLine$ = this.store.select(
      fromBudgetApp.selectCurrentBudgetLine
    );
  }

  ngOnInit() {
    this.currentBudgetSubscription = this.store
      .select(fromBudgetApp.selectCurrentBudget)
      .subscribe((budget: Budget) => {
        // console.log('addExpenseDlgComp.constructor.budget: ', budget);
        this.currentBudgetId = budget.id;
        this.currentBudget = budget;
      });
    this.selectedBudgetLineSubscription = this.selectedBudgetLine$.subscribe(
      selectedBudgetLine => {
        this.selectedBudgetLine = selectedBudgetLine;
      }
    );
  }

  ngOnDestroy() {
    if (this.selectedBudgetLineSubscription) {
      this.selectedBudgetLineSubscription.unsubscribe();
    }
    if (this.currentBudgetSubscription) {
      this.currentBudgetSubscription.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    const amount = form.value.expenseAmount;
    if (amount && amount !== 0) {
      const newBudgetLineCashLeft = this.selectedBudgetLine.cashLeft - amount;
      const newBudgetCashLeft = this.currentBudget.cashLeft - amount;

      let expenseDate = Date.now();
      if (form.value.expenseDate) {
        expenseDate = form.value.expenseDate.getTime();
      }

      const expense = {
        id: null,
        amount: amount,
        when: expenseDate
      };

      if (form.value.expenseDesc) {
        Object.assign(expense, { description: form.value.expenseDesc });
      }

      this.dialogRef.close({ expense: expense, budgetLineId: this.data });
    } else {
      this.dialogRef.close();
    }
  }
}
