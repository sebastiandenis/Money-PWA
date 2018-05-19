import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import { OnDestroy } from '@angular/core';
import { Subscription ,  Observable } from 'rxjs';
import * as BudgetLinesActions from '../../store/actions/budget-lines.actions';
import * as fromBudgetApp from '../../store/reducers/index';
import { Budget } from '../../models/budget.model';
import * as ExpenseActions from '../../store/actions/expense.actions';
import { LinesActionsComponent } from '../../components/lines-actions/lines-actions.component';
import { LinesActionsOverlayRef } from '../../components/lines-actions/lines-actions-overlay-ref';
import { LinesActionsOverlayService } from '../../components/lines-actions/lines-actions-overlay.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AddExpenseDlgComponent } from '../../containers/budget-lines/add-expense-dlg.component';
import { BudgetLine } from '../../models/budget-line.model';

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
  actionsDlgRef: MatDialogRef<LinesActionsComponent>;
  actionDlgSubscription: Subscription;
  addExpenseDlgRef: MatDialogRef<AddExpenseDlgComponent>;
  beforeAddDlgCloseSubscription: Subscription;
  selectedBudgetLine: BudgetLine;
  selectedBudgetLine$: Observable<BudgetLine>;
  selectedBudgetLineSubscription: Subscription;
  actionDialogRef: LinesActionsOverlayRef;

  constructor(
    private store: Store<fromRoot.AppState>,
    private dialog: MatDialog,
    private actionsDialogService: LinesActionsOverlayService
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
  }

  ngOnDestroy() {
    if (this.budgetSubscription) {
      this.budgetSubscription.unsubscribe();
    }
    if (this.actionDlgSubscription) {
      this.actionDlgSubscription.unsubscribe();
    }
    if (this.beforeAddDlgCloseSubscription) {
      this.beforeAddDlgCloseSubscription.unsubscribe();
    }
    if (this.selectedBudgetLineSubscription) {
      this.selectedBudgetLineSubscription.unsubscribe();
    }
  }

  onSelectLine(budgetLineId: string) {
    this.store.dispatch(
      new BudgetLinesActions.SelectBudgetLineAction({
        budgetLineId: budgetLineId
      })
    );
    this.openAndSubscribeActionDlg(budgetLineId);
  }

  private openAndSubscribeActionDlg(budgetLineId: string) {
    this.actionDialogRef = this.actionsDialogService.open();
    this.actionDlgSubscription = this.actionDialogRef.componentInstance.addExpenseEmitter.subscribe(
      data => {
        this.openAndSubscribeAddDlg(budgetLineId);
      }
    );
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
