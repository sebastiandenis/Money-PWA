import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducers';
import * as fromBudgetLines from '../../store/reducers/budget-lines.reducer';
import * as BudgetLinesActions from '../../store/actions/budget-lines.actions';
import { BudgetLine } from '../../models/budget-line.model';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-add-expense-dlg',
  template: `
  <form fxLayout="column" fxLayoutAlign="center center" #f="ngForm" (ngSubmit)="onSubmit(f)" fxLayoutGap="5px">
  <mat-dialog-content>
  <h5>Cash left: {{selectedBudgetLine?.cashLeft}}</h5>
    <mat-form-field>
      <input type="number" matInput placeholder="{{'amount' | translate}}" 
      ngModel name="expenseAmount" id="expenseAmount" required #amountInput="ngModel">
      <mat-error>{{ 'typeanumber' | translate }}</mat-error>
    </mat-form-field>
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
  selectedBudgetLine: BudgetLine;

  constructor(private dialogRef: MatDialogRef<AddExpenseDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private store: Store<fromRoot.AppState>) {
    console.log('Inside AddExpenseDlg');
    this.selectedBudgetLine$ = this.store.select(fromRoot.selectCurrentBudgetLine);

  }

  ngOnInit() {
    this.selectedBudgetLineSubscription = this.selectedBudgetLine$.subscribe((selectedBudgetLine) => {
      this.selectedBudgetLine = selectedBudgetLine;
    });
  }

  ngOnDestroy() {
    if (this.selectedBudgetLineSubscription) {
      this.selectedBudgetLineSubscription.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    const amount = form.value.expenseAmount;
    if (amount && amount !== 0) {
      this.selectedBudgetLine.cashLeft -= amount;
      this.store.dispatch(new BudgetLinesActions.UpdateBudgetLineAction({
        budgetId: this.data, id: this.selectedBudgetLine.id, changes: { cashLeft: this.selectedBudgetLine.cashLeft }
      }));
    }

    this.dialogRef.close();
  }



}
