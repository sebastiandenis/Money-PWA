import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BudgetLine } from '../../models/budget-line.model';
import { MatDialogRef, MatDialog } from '@angular/material';
import { LinesActionsComponent } from '../lines-actions/lines-actions.component';
import { LinesActionsOverlayRef } from '../lines-actions/lines-actions-overlay-ref';
import { LinesActionsOverlayService } from '../lines-actions/lines-actions-overlay.service';
import { AddExpenseDlgComponent } from '../../containers/budget-lines/add-expense-dlg.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.css']
})
export class LinesListComponent implements OnInit, OnDestroy {


  @Input()
  lines: BudgetLine[] = [];
  actionsDlgRef: MatDialogRef<LinesActionsComponent>;

  @Output()
  addExpenseEmitter = new EventEmitter<any>();

  actionDlgSubscription: Subscription;
  addExpenseDlgRef: MatDialogRef<AddExpenseDlgComponent>;
  beforeAddDlgCloseSubscription: Subscription;

  constructor(private dialog: MatDialog,
    private actionsDialogService: LinesActionsOverlayService) {
  }

  ngOnInit() {

  }

  private onSelectLine(budgetLineId: string) {
    const dialogRef: LinesActionsOverlayRef = this.actionsDialogService.open();
    // subskrybcja na addExpenseEmitter z action dialog
    this.actionDlgSubscription = dialogRef.componentInstance.addExpenseEmitter.subscribe((data) => {
      // otwórz AddExpenseDlgComponent
      this.addExpenseDlgRef = this.dialog.open(AddExpenseDlgComponent, { data: budgetLineId });
      // subskrybcja na close dla AddExpenseDlgComponent
      this.beforeAddDlgCloseSubscription = this.addExpenseDlgRef.beforeClose().subscribe((result) => {
        // jeżeli zamknięcie to znajdź dane linii
        if (result) {
          const bl = this.lines.find(x => x.id === result.budgetLineId); // znajdż linię o ID
          // emituj zdarzenie do budget-lines.component
          this.addExpenseEmitter.emit({
            expense: result.expense,
            budgetLineId: bl.id,
            newBudgetLineCashLeft: bl.cashLeft - result.expense.amount // zaktualizuj cashLeft dla linii wg wzoru
          });
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.actionDlgSubscription) {
      this.actionDlgSubscription.unsubscribe();
    }
    if (this.beforeAddDlgCloseSubscription) {
      this.beforeAddDlgCloseSubscription.unsubscribe();
    }
  }

}
