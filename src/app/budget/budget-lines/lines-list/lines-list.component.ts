import { Component, OnInit, Input } from '@angular/core';
import { BudgetLine } from '../../../models/budget-line.model';
import { MatDialogRef, MatDialog } from '@angular/material';
import { LinesActionsComponent } from '../lines-actions/lines-actions.component';
import { LinesActionsOverlayRef } from '../lines-actions/lines-actions-overlay-ref';
import { LinesActionsOverlayService } from '../lines-actions/lines-actions-overlay.service';
import { AddExpenseDlgComponent } from '../add-expense-dlg.component';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.css']
})
export class LinesListComponent implements OnInit {

  @Input()
  lines: BudgetLine[];
  actionsDlgRef: MatDialogRef<LinesActionsComponent>;

  

  constructor(private dialog: MatDialog,
    private actionsDialogService: LinesActionsOverlayService) { }

  ngOnInit() {
  }

  onSelectLine(lineId: string) {
    this.openActionsDialog(lineId);
  }



  private openActionsDialog(lineId: string) {
    //   this.actionsDlgRef = this.dialog.open(LinesActionsComponent);
    const dialogRef: LinesActionsOverlayRef = this.actionsDialogService.open({
      dane: lineId
    });
  }

}
