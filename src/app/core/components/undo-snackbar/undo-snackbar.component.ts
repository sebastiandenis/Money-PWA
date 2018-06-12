import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as fromRoot from '../../../store/app.reducers';

export enum UndoPayloadMessages {
  ExpenseAdded = 'expenseadded',
  ExpenseRemoved = 'expenseremoved'
}

export interface UndoPayload {
  message: UndoPayloadMessages;
  action: any;
}


@Component({
  selector: 'app-undo-snackbar',
  templateUrl: './undo-snackbar.component.html',
  styleUrls: ['./undo-snackbar.component.scss']
})
export class UndoSnackbarComponent implements OnInit, OnDestroy {
  lastUndo$: Observable<UndoPayload>;
  lastUndoSubscription: Subscription;
  lastUndoAction: any;

  constructor(
    public snackBarRef: MatSnackBarRef<UndoSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
    private store: Store<fromApp.AppState>
  ) {
    this.lastUndo$ = this.store.select(fromRoot.selectUiLastUndo);
  }

  action() {
    // console.log('Uruchamiam akcję z undo snackbar!');
    this.store.dispatch(this.lastUndoAction);
    this.snackBarRef.dismissWithAction();
  }

  ngOnInit() {
    this.lastUndoSubscription = this.lastUndo$.subscribe(
      (lastUndo: UndoPayload) => {
        if (lastUndo) {
          this.data = lastUndo.message;
          this.lastUndoAction = lastUndo.action;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.lastUndoSubscription) {
      this.lastUndoSubscription.unsubscribe();
    }
  }
}
