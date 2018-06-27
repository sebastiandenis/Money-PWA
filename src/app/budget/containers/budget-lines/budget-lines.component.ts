import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import { OnDestroy } from '@angular/core';
import { Subscription, Observable, Subject } from 'rxjs';
import * as BudgetLinesActions from '../../store/actions/budget-lines.actions';
import * as fromBudgetApp from '../../store/reducers/index';
import { Budget } from '../../models/budget.model';
import * as ExpenseActions from '../../store/actions/expense.actions';
import * as ShiftActions from '../../store/actions/shift.actions';
import {
  MatDialogRef,
  MatDialog,
  MatBottomSheet,
  MatBottomSheetRef
} from '@angular/material';
import { AddExpenseDlgComponent } from '../../containers/add-expense-dlg/add-expense-dlg.component';
import { BudgetLine } from '../../models/budget-line.model';
import { LineMenuComponent } from '../../components/line-menu/line-menu.component';
import { LineMenuService } from '../../components/line-menu/line-menu.service';
import { AddCashDlgComponent } from '../add-cash-dlg/add-cash-dlg.component';
import { ShiftActionTypes } from '../../store/actions/shift.actions';
import { NewShiftData } from '../../models/shift.model';
import { SortingLinesTypes } from '../../components/lines-sort/lines-sort.component';
import { BudgetService } from '../../services/budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-lines',
  templateUrl: './budget-lines.component.html',
  styleUrls: ['./budget-lines.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetLinesComponent implements OnInit, OnDestroy {
  lines$: Observable<any>;
  lines: BudgetLine[] = [];
  linesSubscription: Subscription;
  budget$: Observable<Budget>;
  budgetSubscription: Subscription;
  budgetId: string;
  budgetCashLeft = 0;

  lineMenuDlgSubscription: Subscription;
  lineMenuAddExpenseSubscription: Subscription;
  lineMenuAddCashSubscription: Subscription;
  lineMenuMoreSubscription: Subscription;
  addExpenseDlgRef: MatDialogRef<AddExpenseDlgComponent>;
  addCashDlgRef: MatDialogRef<AddCashDlgComponent>;
  beforeAddExpenseDlgCloseSubscription: Subscription;
  beforeAddCashDlgCloseSubscription: Subscription;
  selectedBudgetLine: BudgetLine;
  selectedBudgetLine$: Observable<BudgetLine>;
  selectedBudgetLineSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.AppState>,
    private budgetService: BudgetService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private lineMenuService: LineMenuService,
    private changeDetectionRef: ChangeDetectorRef,
    private router: Router
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

    this.lineMenuAddExpenseSubscription = this.lineMenuService.addExpense$.subscribe(
      data => {
        // console.log('lineMenuSubscription.data=', data);
        this.openAndSubscribeAddExpenseDlg(data);
      }
    );

    this.lineMenuAddCashSubscription = this.lineMenuService.addCash$.subscribe(
      data => {
        this.openAndSubscribeAddCashDlg(data);
      }
    );

    this.lineMenuMoreSubscription = this.lineMenuService.more$.subscribe(
      (budgetLineId: string) => {
        this.router.navigate(['line'], {
          queryParams: { id: budgetLineId }
        });
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

  getLines(): BudgetLine[] {
    return this.budgetService.sortLinesBy(this.getSortLinesBy(), this.lines);
  }

  onSelectLine(budgetLineId: string) {
    this.store.dispatch(
      new BudgetLinesActions.SelectBudgetLineAction({
        budgetLineId: budgetLineId
      })
    );
    this.bottomSheet.open(LineMenuComponent, { data: budgetLineId });
  }

  onSortLines(sortBy: SortingLinesTypes) {
    this.budgetService.sortingLinesBySubject = sortBy;
  }

  private openAndSubscribeAddExpenseDlg(budgetLineId: string) {
    this.addExpenseDlgRef = this.dialog.open(AddExpenseDlgComponent, {
      data: budgetLineId
    });
    this.beforeAddExpenseDlgCloseSubscription = this.addExpenseDlgRef
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

  private openAndSubscribeAddCashDlg(fromBudgetLineId: string) {
    this.addCashDlgRef = this.dialog.open(AddCashDlgComponent, {
      data: fromBudgetLineId
    });
    this.beforeAddCashDlgCloseSubscription = this.addCashDlgRef
      .beforeClose()
      .subscribe((newShiftData: NewShiftData) => {
        // jeżeli zamknięcie to dodaj linię wydatku
        if (newShiftData) {
          this.addCash(newShiftData);
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

  addCash(data: NewShiftData) {
    this.store.dispatch(
      new ShiftActions.AddNewShifts({
        newShiftData: data,
        showUndo: true
      })
    );
  }

  ngOnDestroy() {
    if (this.budgetSubscription) {
      this.budgetSubscription.unsubscribe();
    }
    if (this.beforeAddExpenseDlgCloseSubscription) {
      this.beforeAddExpenseDlgCloseSubscription.unsubscribe();
    }
    if (this.beforeAddCashDlgCloseSubscription) {
      this.beforeAddCashDlgCloseSubscription.unsubscribe();
    }

    if (this.selectedBudgetLineSubscription) {
      this.selectedBudgetLineSubscription.unsubscribe();
    }

    if (this.lineMenuDlgSubscription) {
      this.lineMenuDlgSubscription.unsubscribe();
    }

    if (this.lineMenuAddExpenseSubscription) {
      this.lineMenuAddExpenseSubscription.unsubscribe();
    }

    if (this.lineMenuAddCashSubscription) {
      this.lineMenuAddCashSubscription.unsubscribe();
    }

    if (this.lineMenuMoreSubscription) {
      this.lineMenuMoreSubscription.unsubscribe();
    }
  }
}
