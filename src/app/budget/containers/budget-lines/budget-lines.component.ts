import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import { OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import * as BudgetLinesActions from '../../store/actions/budget-lines.actions';
import * as fromBudgetApp from '../../store/reducers/index';
import { Budget } from '../../models/budget.model';
import * as ExpenseActions from '../../store/actions/expense.actions';
import {
  MatDialogRef,
  MatDialog,
  MatBottomSheet,
  MatBottomSheetRef
} from '@angular/material';
import { AddExpenseDlgComponent } from '../../containers/budget-lines/add-expense-dlg.component';
import { BudgetLine } from '../../models/budget-line.model';
import { LineMenuComponent } from '../../components/line-menu/line-menu.component';
import { LineMenuService } from '../../components/line-menu/line-menu.service';

@Component({
  selector: 'app-budget-lines',
  templateUrl: './budget-lines.component.html',
  styleUrls: ['./budget-lines.component.scss']
})
export class BudgetLinesComponent implements OnInit, OnDestroy {
  lines$: Observable<any>;
  budget$: Observable<Budget>;
  budgetSubscription: Subscription;
  budgetId: string;
  budgetCashLeft = 0;

  lineMenuDlgSubscription: Subscription;
  lineMenuSubscription: Subscription;
  addExpenseDlgRef: MatDialogRef<AddExpenseDlgComponent>;
  beforeAddDlgCloseSubscription: Subscription;
  selectedBudgetLine: BudgetLine;
  selectedBudgetLine$: Observable<BudgetLine>;
  selectedBudgetLineSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.AppState>,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private lineMenuService: LineMenuService
  ) {
    this.budget$ = this.store.pipe(select(fromBudgetApp.selectCurrentBudget));
    this.lines$ = this.store.pipe(select(fromBudgetApp.selectAllBudgetLines));
    this.selectedBudgetLine$ = this.store.pipe(
      select(fromBudgetApp.selectCurrentBudgetLine)
    );
  }

  ngOnInit() {
    this.budgetSubscription = this.budget$.subscribe(budget => {
      // console.log('LinesListComp.ngOnInit.budget: ', budget);
      if (budget) {
        this.budgetId = budget.id;
        this.budgetCashLeft = budget.cashLeft;
        this.store.dispatch(
          new BudgetLinesActions.Query({ budgetId: budget.id })
        );
      }
    });
    this.selectedBudgetLineSubscription = this.selectedBudgetLine$.subscribe(
      budgetLine => {
        if (budgetLine) {
          this.selectedBudgetLine = budgetLine;
        }
      }
    );

    this.lineMenuSubscription = this.lineMenuService.addExpense$.subscribe(
      data => {
        // console.log('lineMenuSubscription.data=', data);
        this.openAndSubscribeAddDlg(data);
      }
    );
  }

  ngOnDestroy() {
    if (this.budgetSubscription) {
      this.budgetSubscription.unsubscribe();
    }
    if (this.beforeAddDlgCloseSubscription) {
      this.beforeAddDlgCloseSubscription.unsubscribe();
    }
    if (this.selectedBudgetLineSubscription) {
      this.selectedBudgetLineSubscription.unsubscribe();
    }

    if (this.lineMenuDlgSubscription) {
      this.lineMenuDlgSubscription.unsubscribe();
    }

    if (this.lineMenuSubscription) {
      this.lineMenuSubscription.unsubscribe();
    }
  }

  onSelectLine(budgetLineId: string) {
    this.store.dispatch(
      new BudgetLinesActions.SelectBudgetLineAction({
        budgetLineId: budgetLineId
      })
    );
    this.bottomSheet.open(LineMenuComponent, { data: budgetLineId });
  }


  private openAndSubscribeAddDlg(budgetLineId: string) {
    this.addExpenseDlgRef = this.dialog.open(AddExpenseDlgComponent, {
      data: budgetLineId
    });
    this.beforeAddDlgCloseSubscription = this.addExpenseDlgRef
      .beforeClose()
      .subscribe(result => {
        // jeżeli zamknięcie to dodaj linię wydatku
        if (result) {
          this.addExpense({
            expense: result.expense,
            budgetLineId: this.selectedBudgetLine.id,
            newBudgetLineCashLeft:
              this.selectedBudgetLine.cashLeft - result.expense.amount // zaktualizuj cashLeft dla linii wg wzoru
          });
        }
      });
  }

  addExpense(data: any) {
    this.store.dispatch(
      new ExpenseActions.AddExpense({
        expense: data.expense,
        budgetId: this.budgetId,
        budgetLineId: data.budgetLineId,
        showUndo: true
      })
    );
  }
}
