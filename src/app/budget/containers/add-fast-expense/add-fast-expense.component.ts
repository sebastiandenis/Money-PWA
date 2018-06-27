import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import * as fromBudgetApp from '../../store/reducers/index';
import * as UiStateActions from '../../../core/store/uiState.actions';
import * as BudgetLinesActions from '../../store/actions/budget-lines.actions';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AddExpenseDlgComponent } from '../../containers/add-expense-dlg/add-expense-dlg.component';
import * as ExpenseActions from '../../store/actions/expense.actions';
import { BudgetLine } from '../../models/budget-line.model';
import { Budget } from '../../models/budget.model';
import { SortingLinesTypes } from '../../components/lines-sort/lines-sort.component';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-add-fast-expense',
  templateUrl: './add-fast-expense.component.html',
  styleUrls: ['./add-fast-expense.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFastExpenseComponent implements OnInit, OnDestroy {
  lines$: Observable<any>;
  lines: BudgetLine[] = [];
  linesSubscription: Subscription;
  addExpenseDlgRef: MatDialogRef<AddExpenseDlgComponent>;
  beforeAddDlgCloseSubscription: Subscription;
  selectedBudgetLine: BudgetLine;
  selectedBudgetLine$: Observable<BudgetLine>;
  selectedBudgetLineSubscription: Subscription;
  budget$: Observable<Budget>;
  budgetSubscription: Subscription;
  budgetId: string;
  budgetCashLeft = 0;

  constructor(
    private store: Store<fromRoot.AppState>,
    private budgetService: BudgetService,
    private changeDetectionRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.budget$ = this.store.pipe(select(fromBudgetApp.selectCurrentBudget));
    this.lines$ = this.store.pipe(select(fromBudgetApp.selectAllBudgetLines));
    this.selectedBudgetLine$ = this.store.pipe(
      select(fromBudgetApp.selectCurrentBudgetLine)
    );
  }

  ngOnInit() {
    this.store.dispatch(new UiStateActions.ChangeTitleAction('addexpense'));
    this.store.dispatch(
      new UiStateActions.ChangeMainMenuBtnVisibleAction(false)
    );
    this.store.dispatch(
      new UiStateActions.ChangeSideMenuBtnVisibleAction(false)
    );
    this.store.dispatch(
      new UiStateActions.ChangeMainToolbarCloseBtnVisibleAction(true)
    );
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

    this.linesSubscription = this.lines$.subscribe((lines: BudgetLine[]) => {
      this.lines = lines.slice();
      this.changeDetectionRef.markForCheck();
    });
  }

  getSortLinesBy(): SortingLinesTypes {
    return this.budgetService.sortingLinesBySubject;
  }

  onSortLines(sortBy: SortingLinesTypes) {
    this.budgetService.sortingLinesBySubject = sortBy;
  }

  getLines(): BudgetLine[] {
    return this.budgetService.sortLinesBy(this.getSortLinesBy(), this.lines);
  }

  onSelectBudgetLine(budgetLineId: string) {
    this.store.dispatch(
      new BudgetLinesActions.SelectBudgetLineAction({
        budgetLineId: budgetLineId
      })
    );
    this.openAndSubscribeAddDlg(budgetLineId);
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

  ngOnDestroy() {
    this.store.dispatch(
      new UiStateActions.ChangeMainToolbarCloseBtnVisibleAction(false)
    );
    this.store.dispatch(
      new UiStateActions.ChangeSideMenuBtnVisibleAction(true)
    );
    if (this.budgetSubscription) {
      this.budgetSubscription.unsubscribe();
    }
    if (this.beforeAddDlgCloseSubscription) {
      this.beforeAddDlgCloseSubscription.unsubscribe();
    }
    if (this.selectedBudgetLineSubscription) {
      this.selectedBudgetLineSubscription.unsubscribe();
    }
    if (this.linesSubscription) {
      this.linesSubscription.unsubscribe();
    }
  }
}
