import { Component, OnInit, Inject, EventEmitter, Output, OnDestroy } from '@angular/core';
import { LinesActionsOverlayRef } from './lines-actions-overlay-ref';
// import { LINES_ACTIONS_DIALOG_DATA } from './lines-actions-overlay.tokens';
import { TranslateService } from '@ngx-translate/core';
import { AddExpenseDlgComponent } from '../add-expense-dlg.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';
import { BudgetLine } from '../../../models/budget-line.model';
import { ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: 'app-lines-actions',
  templateUrl: './lines-actions.component.html',
  styleUrls: ['./lines-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinesActionsComponent implements OnInit, OnDestroy {

  addExpenseDlgRef: MatDialogRef<AddExpenseDlgComponent>;
  beforeAddDlgCloseSubscription: Subscription;



  constructor(public dialogRef: LinesActionsOverlayRef,
    private dialog: MatDialog
    ) {
  }

  ngOnInit() {

  }

  onAddExpense() {
    this.openAddExpenseDlg();
    this.beforeAddDlgCloseSubscription = this.addExpenseDlgRef.beforeClose().subscribe(_ => {
      this.dialogRef.close();
    });
  }

  openAddExpenseDlg() {
    this.addExpenseDlgRef = this.dialog.open(AddExpenseDlgComponent, {});
  }

  ngOnDestroy() {
    if (this.beforeAddDlgCloseSubscription) {
      this.beforeAddDlgCloseSubscription.unsubscribe();
    }
  }

}
