import { Component, OnInit, Input } from '@angular/core';
import { BudgetLine } from '../../../models/budget-line.model';
import { MatDialogRef, MatDialog } from '@angular/material';
import { LinesActionsComponent } from '../lines-actions/lines-actions.component';
import { LinesActionsOverlayRef } from '../lines-actions/lines-actions-overlay-ref';
import { LinesActionsOverlayService } from '../lines-actions/lines-actions-overlay.service';
import { AddExpenseDlgComponent } from '../add-expense-dlg.component';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import * as fromBudgetApp from '../../store/reducers/index';
import * as BudgetLinesActions from '../../store/actions/budget-lines.actions';
import * as BudgetActions from '../../store/actions/budget.actions';
import { Budget } from '../../../models/budget.model';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.css']
})
export class LinesListComponent implements OnInit, OnDestroy {




  lines$: Observable<any>;
  budget$: Observable<Budget>;
  budgetSubscription: Subscription;
  actionsDlgRef: MatDialogRef<LinesActionsComponent>;
  budgetId: string;


  constructor(private dialog: MatDialog,
    private actionsDialogService: LinesActionsOverlayService,
    private store: Store<fromRoot.AppState>) {
    this.budget$ = this.store.select(fromBudgetApp.selectBudgetHeader);
    this.lines$ = this.store.select(fromBudgetApp.selectAllBudgetLines);

  }

  ngOnInit() {

    this.budgetSubscription = this.budget$.subscribe(
      (budget) => {
        console.log('LinesListComp.ngOnInit.budget: ', budget);
        if (budget) {
          this.budgetId = budget.id;
          this.store.dispatch(new BudgetLinesActions.Query({ budgetId: budget.id }));
        }

      }
    );



  }

  ngOnDestroy() {
    if (this.budgetSubscription) {
      this.budgetSubscription.unsubscribe();
    }
  }

  onSelectLine() {
    this.openActionsDialog();
  }



  private openActionsDialog() {
    //   this.actionsDlgRef = this.dialog.open(LinesActionsComponent);
    const dialogRef: LinesActionsOverlayRef = this.actionsDialogService.open({
      dane: this.budgetId
    });
  }

}
