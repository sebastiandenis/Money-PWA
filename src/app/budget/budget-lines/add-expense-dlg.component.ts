import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducers';
import * as fromBudgetApp from '../store/reducers/index';
import * as BudgetLinesActions from '../store/actions/budget-lines.actions';
import * as ExpenseActions from '../store/actions/expense.actions';
import { BudgetLine } from '../../models/budget-line.model';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';
import { Budget } from '../../models/budget.model';

@Component({
  selector: 'app-add-expense-dlg',
  template: `
  <h5 matDialogTitle>{{selectedBudgetLine?.name}}</h5>
  <form fxLayout="column" fxLayoutAlign="center center" #f="ngForm" (ngSubmit)="onSubmit(f)">
  <mat-dialog-content fxLayoutGap="5px">
    <mat-form-field>
      <input type="number" matInput placeholder="{{'amount' | translate}}"
      ngModel name="expenseAmount" id="expenseAmount" required #amountInput="ngModel">
      <mat-error>{{ 'typeanumber' | translate }}</mat-error>
    </mat-form-field>
    <mat-accordion >
    <mat-expansion-panel  style="margin-top: 10px;">
      <mat-expansion-panel-header>
      <mat-panel-title>
       {{'more' | translate}}
      </mat-panel-title>
      </mat-expansion-panel-header>
      <mat-form-field>
      <input matInput placeholder="{{'desc' | translate}}">
      </mat-form-field>
      <mat-form-field>
      <input matInput placeholder="{{'date' | translate}}" [matDatepicker]="picker" ngModel name="birthdate" required>
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>

    </mat-expansion-panel>
    </mat-accordion>
    </mat-dialog-content>
    <mat-dialog-actions>
    <button type="submit" mat-button color="primary">{{'add' | translate}}</button>
    </mat-dialog-actions>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddExpenseDlgComponent implements OnInit, OnDestroy {


  selectedBudgetLine$: Observable<BudgetLine>;
  selectedBudgetLineSubscription: Subscription;
  currentBudgetSubscription: Subscription;
  selectedBudgetLine: BudgetLine;
  currentBudgetId: string;
  currentBudget: Budget;

  constructor(private dialogRef: MatDialogRef<AddExpenseDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private store: Store<fromRoot.AppState>) {
    this.selectedBudgetLine$ = this.store.select(fromBudgetApp.selectCurrentBudgetLine);


  }

  ngOnInit() {
    this.currentBudgetSubscription = this.store.select(fromBudgetApp.selectBudgetHeader).subscribe((budget: Budget) => {
      // console.log('addExpenseDlgComp.constructor.budget: ', budget);
      this.currentBudgetId = budget.id;
      this.currentBudget = budget;
    });
    this.selectedBudgetLineSubscription = this.selectedBudgetLine$.subscribe((selectedBudgetLine) => {
      this.selectedBudgetLine = selectedBudgetLine;
    });
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
      this.store.dispatch(new ExpenseActions.AddExpense({
        expense: {
          id: null,
          amount: amount
        },
        budgetId: this.currentBudgetId,
        budgetLineId: this.selectedBudgetLine.id,
        newBudgetLineCashLeft: newBudgetLineCashLeft,
        newBudgetCashLeft: newBudgetCashLeft
      }));
    }

    this.dialogRef.close();
  }



}
