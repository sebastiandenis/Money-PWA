import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { LinesActionsOverlayRef } from './lines-actions-overlay-ref';
// import { LINES_ACTIONS_DIALOG_DATA } from './lines-actions-overlay.tokens';
import { TranslateService } from '@ngx-translate/core';
import { AddExpenseDlgComponent } from '../add-expense-dlg.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { trigger, state, transition, animate, style, AnimationEvent } from '@angular/animations';
// import { Subscription } from 'rxjs/Subscription';
import { BudgetLine } from '../../../models/budget-line.model';
import { ChangeDetectionStrategy } from '@angular/core';

// Reusable animation timings
const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'app-lines-actions',
  templateUrl: './lines-actions.component.html',
  styleUrls: ['./lines-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideContent', [
      state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
      state('enter', style({ transform: 'none', opacity: 1 })),
      state('leave', style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
      transition('* => *', animate(ANIMATION_TIMINGS)),
    ])
  ]
})
export class LinesActionsComponent implements OnInit {

  // addExpenseDlgRef: MatDialogRef<AddExpenseDlgComponent>;
  // beforeAddDlgCloseSubscription: Subscription;
  animationState: 'void' | 'enter' | 'leave' = 'enter';
  animationStateChanged = new EventEmitter<AnimationEvent>();

  @Output()
  addExpenseEmitter = new EventEmitter<any>();


  constructor(public actionsDialogRef: LinesActionsOverlayRef) {}

  ngOnInit() {
  }

  onAnimationStart(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  startExitAnimation() {
    this.animationState = 'leave';
  }

  onAddExpense() {
    this.addExpenseEmitter.emit({ action: 'addExpense' });
    this.actionsDialogRef.close();
    // this.openAddExpenseDlg();
    // this.beforeAddDlgCloseSubscription = this.addExpenseDlgRef.beforeClose().subscribe(_ => {
    //   //  this.actionsDialogRef.close();
    // });
  }

  // openAddExpenseDlg() {
  //   this.addExpenseDlgRef = this.dialog.open(AddExpenseDlgComponent, { data: 'bl001' });
  //   this.actionsDialogRef.close();
  // }

  // ngOnDestroy() {
  //   if (this.beforeAddDlgCloseSubscription) {
  //     this.beforeAddDlgCloseSubscription.unsubscribe();
  //   }
  // }

}
