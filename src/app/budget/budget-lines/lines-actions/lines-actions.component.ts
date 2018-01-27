import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { LinesActionsOverlayRef } from './lines-actions-overlay-ref';
import { LINES_ACTIONS_DIALOG_DATA } from './lines-actions-overlay.tokens';
import { TranslateService } from '@ngx-translate/core';
import { AddExpenseDlgComponent } from '../add-expense-dlg.component';
import { MatDialogRef, MatDialog } from '@angular/material';


@Component({
  selector: 'app-lines-actions',
  templateUrl: './lines-actions.component.html',
  styleUrls: ['./lines-actions.component.scss']
})
export class LinesActionsComponent implements OnInit {

  addExpenseDlgRef: MatDialogRef<AddExpenseDlgComponent>;

  constructor(public dialogRef: LinesActionsOverlayRef,
    private dialog: MatDialog,
    @Inject(LINES_ACTIONS_DIALOG_DATA) public dane: string) {
  }

  ngOnInit() {
  }

  onAddExpense() {
    console.log('onAddExpense from LinesAcitons: ', this.dane);
    this.openAddExpenseDlg(this.dane);
    this.dialogRef.close();
  }

  openAddExpenseDlg(dane?: string) {
    this.addExpenseDlgRef = this.dialog.open(AddExpenseDlgComponent, {
      data: dane
    });
  }

}
