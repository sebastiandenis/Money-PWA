import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BudgetLine } from '../../models/budget-line.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import * as fromBudgetApp from '../../store/reducers/index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-line-edit-dlg',
  templateUrl: './line-edit-dlg.component.html',
  styleUrls: ['./line-edit-dlg.component.scss']
})
export class LineEditDlgComponent implements OnInit, OnDestroy {
  selectedBudgetLine$: Observable<BudgetLine>;
  selectedBudgetLineSubscription: Subscription;
  line: BudgetLine;

  constructor(
    private dialogRef: MatDialogRef<LineEditDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public budgetLine: BudgetLine,
    private store: Store<fromRoot.AppState>
  ) {
    this.selectedBudgetLine$ = this.store.select(
      fromBudgetApp.selectCurrentBudgetLine
    );
  }

  ngOnInit() {
    this.selectedBudgetLineSubscription = this.selectedBudgetLine$.subscribe(
      (line: BudgetLine) => {
        this.line = { ...line };
      }
    );
  }

  onSubmit(form: NgForm) {
    this.dialogRef.close(this.line);
  }

  ngOnDestroy() {
    if (this.selectedBudgetLineSubscription) {
      this.selectedBudgetLineSubscription.unsubscribe();
    }
  }
}
