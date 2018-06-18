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
import { Shift, NewShiftData } from '../../models/shift.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-cash-dlg',
  templateUrl: './add-cash-dlg.component.html',
  styleUrls: ['./add-cash-dlg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCashDlgComponent implements OnInit, OnDestroy {
  selectedBudgetLine$: Observable<BudgetLine>;
  selectedBudgetLineSubscription: Subscription;
  currentBudgetSubscription: Subscription;
  selectedBudgetLine: BudgetLine;
  currentBudgetId: string;
  currentBudget: Budget;
  lines$: Observable<BudgetLine[]>;
  selectedLine: BudgetLine;
  cashAmount: number;

  constructor(
    private dialogRef: MatDialogRef<AddCashDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public toBudgetLineId: string,
    private store: Store<fromRoot.AppState>
  ) {
    this.selectedBudgetLine$ = this.store.select(
      fromBudgetApp.selectCurrentBudgetLine
    );

    this.lines$ = this.store
      .select(fromBudgetApp.selectAllBudgetLines)
      .pipe(
        map((lines: BudgetLine[]) =>
          lines.filter(line => line.id !== this.selectedBudgetLine.id)
        )
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

  onSubmit(form: NgForm) {
    const amount = form.value.addCashAmount;
    const fromBudgetLineId = form.value.addCashFromLine.id;
    if (amount && amount !== 0) {
      // const newBudgetLineCashLeft = this.selectedBudgetLine.cashLeft - amount;
      // const newBudgetCashLeft = this.currentBudget.cashLeft - amount;

      const newShiftData: NewShiftData = {
        amount: amount,
        cameFrom: fromBudgetLineId,
        wentTo: this.toBudgetLineId
      };

      if (form.value.addCashDesc) {
        Object.assign(newShiftData, { description: form.value.addCashDesc });
      }

      this.dialogRef.close(newShiftData);
    } else {
      this.dialogRef.close();
    }
  }

  ngOnDestroy() {
    if (this.selectedBudgetLineSubscription) {
      this.selectedBudgetLineSubscription.unsubscribe();
    }
    if (this.currentBudgetSubscription) {
      this.currentBudgetSubscription.unsubscribe();
    }
  }

  getLineColor(cashAmount: number, lineCashLeft: number) {
    if (cashAmount) {
      if (cashAmount >= lineCashLeft) {
        return { 'line-red': true };
      } else {
        return { 'line-green': true };
      }
    } else {
      return {};
    }
  }
}
