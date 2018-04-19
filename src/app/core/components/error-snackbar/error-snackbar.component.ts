import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as AuthActions from '../../../auth/store/auth.actions';


@Component({
    selector: 'app-error-snackbar',
    styleUrls: ['./error-snackbar.component.css'],
    template: '<span >{{ data | translate }}</span>'
})
export class ErrorSnackbarComponent implements OnInit {
    constructor( @Inject(MAT_SNACK_BAR_DATA) public data: any,
        private store: Store<fromApp.AppState>) {
    }


    ngOnInit() {
        this.store.dispatch(new AuthActions.AuthErrorClearAction());
    }
}

