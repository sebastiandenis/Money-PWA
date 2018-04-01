import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as AuthActions from '../../../store/actions/auth.actions';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import * as fromRoot from '../../../store/app.reducers';
import { CloseUndoSnackbar } from '../../../store/actions/uiState.actions';

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
    styleUrls: ['./undo-snackbar.component.css'],
    template: `<span >{{ data | translate }}</span>
    <button
    mat-button class="mat-simple-snackbar-action"
    (click)="action()">{{'undo' | translate}}</button>`
})
export class UndoSnackbarComponent implements OnInit, OnDestroy {


    lastUndo$: Observable<UndoPayload>;
    lastUndoSubscription: Subscription;
    lastUndoAction: any;



    constructor(public snackBarRef: MatSnackBarRef<UndoSnackbarComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: string,
        private store: Store<fromApp.AppState>) {
        this.lastUndo$ = this.store.select(fromRoot.selectUiLastUndo);
    }

    action() {
        // console.log('Uruchamiam akcję z undo snackbar!');
        this.store.dispatch(this.lastUndoAction);
        this.snackBarRef.dismissWithAction();
    }


    ngOnInit() {
        this.lastUndoSubscription = this.lastUndo$.subscribe((lastUndo: UndoPayload) => {
            if (lastUndo) {
                this.data = lastUndo.message;
                this.lastUndoAction = lastUndo.action;
            }
        });
    }

    ngOnDestroy() {
        if (this.lastUndoSubscription) {
            this.lastUndoSubscription.unsubscribe();
        }
    }
}

