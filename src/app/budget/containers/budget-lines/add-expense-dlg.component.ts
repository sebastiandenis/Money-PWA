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
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';
import { Budget } from '../../models/budget.model';


@Component({
  selector: 'app-add-expense-dlg',
  template: `
  <h5 matDialogTitle>{{selectedBudgetLine?.name}}</h5>
  <form fxLayout="column" fxLayoutAlign="center center" #f="ngForm" (ngSubmit)="onSubmit(f)">
  <mat-dialog-content   fxLayoutGap="5px" >
    <mat-form-field>
      <input type="number" matInput placeholder="{{'amount' | translate}}"
      ngModel name="expenseAmount" id="expenseAmount" required #amountInput="ngModel" style="font-size: 150%;">
      <mat-error>{{ 'typeanumber' | translate }}</mat-error>
    </mat-form-field>
    <mat-accordion >
    <mat-expansion-panel class="addExpenseExtensionPanel" style="margin-top: 10px;box-shadow: none;">
      <mat-expansion-panel-header style="padding-left: 5px; padding-right: 5px;">
      <mat-panel-title>
       {{'more' | translate}}
      </mat-panel-title>
      </mat-expansion-panel-header>
      <div fxLayout="column">
      <mat-form-field>
      <textarea  matInput placeholder="{{'desc' | translate}}"
    ngModel id="expenseDesc" name="expenseDesc" #expenseDesc="ngModel"></textarea>
    </mat-form-field>
    <mat-form-field>
    <input matInput placeholder="{{'date' | translate}}" [matDatepicker]="picker" ngModel name="expenseDate" readonly="true">
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker ></mat-datepicker>
  </mat-form-field>
      </div>
    </mat-expansion-panel>
    </mat-accordion>
    </mat-dialog-content>
    <mat-dialog-actions>
    <button type="submit" mat-raised-button color="accent" [disabled]="!f.valid">{{'add' | translate}}</button>
    </mat-dialog-actions>
    </form>
  `,
  styles: ['::ng-deep .addExpenseExtensionPanel .mat-expansion-panel-body {padding-left: 0px; padding-right: 0px;}',
    'mat-form-field{max-width: 300px;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddExpenseDlgComponent implements OnInit, OnDestroy {


  selectedBudgetLine$: Observable<BudgetLine>;
  selectedBudgetLineSubscription: Subscription;
  currentBudgetSubscription: Subscription;
  selectedBudgetLine: BudgetLine;
  currentBudgetId: string;
  currentBudget: Budget;

  @Output()
  emitAddExpense = new EventEmitter<any>();

  constructor(private dialogRef: MatDialogRef<AddExpenseDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private store: Store<fromRoot.AppState>) {
    this.selectedBudgetLine$ = this.store.select(fromBudgetApp.selectCurrentBudgetLine);
  }

  ngOnInit() {
    this.currentBudgetSubscription = this.store.select(fromBudgetApp.selectCurrentBudget).subscribe((budget: Budget) => {
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
