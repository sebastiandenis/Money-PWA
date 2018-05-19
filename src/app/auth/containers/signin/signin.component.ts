import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as AuthActions from '../../store/auth.actions';
import * as UiStateActions from '../../../core/store/uiState.actions';
import { Auth } from '../../models/auth.model';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';
import { Observable ,  Subscription } from 'rxjs';
import * as fromRoot from '../../../store/app.reducers';
import { ErrorSnackbarComponent } from '../../../core/components/error-snackbar/error-snackbar.component';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import * as FbAuthErrorCodes from '../../../utils/firebase-error-codes';



export interface TranslationSiginForm {
  tEmail: string;
  tInvalidEmail: string;
  tPassword: string;
  tSignin: string;
}

@Component({
  selector: 'app-signin',
  template: `<app-signin-form (signIn)="signIn($event)"></app-signin-form>`
})
export class SigninComponent implements OnInit, OnDestroy {

  authError$: Observable<any>;
  authErrorSubscription: Subscription;


  constructor(private store: Store<fromApp.AppState>,
    public snackBar: MatSnackBar) {
    this.authError$ = this.store.select(fromRoot.selectAuthError);
  }

  ngOnInit() {
    this.store.dispatch(new UiStateActions.ChangeTitleAction('signintitle'));
    this.store.dispatch(new UiStateActions.ChangeMainMenuBtnVisibleAction(false));
    this.authErrorSubscription = this.authError$.subscribe(error => {
      if (error) {
        let errorData = 'signinerror';
        // console.log('error.error.code: ', error.error.code);
        if (error.error !== undefined && error.error.code !== undefined
          && (error.error.code === FbAuthErrorCodes.SIGNIN_ERROR_USER_NOT_FOUND
            || error.error.code === FbAuthErrorCodes.SIGNIN_ERROR_WROND_PASSWORD)) {
          errorData = 'wrongemailorpassword';
        }
        this.snackBar.openFromComponent(ErrorSnackbarComponent, {
          data: errorData,
          duration: 5000,
          panelClass: ['error-class']
        });
      }
    });
  }

  signIn(data: any) {
    const email = data.login;
    const password = data.password;
    this.store.dispatch(new AuthActions.TrySignin({ user: { email, password } }));
  }



  ngOnDestroy() {
    if (this.authErrorSubscription) {
      this.authErrorSubscription.unsubscribe();
    }
  }

}

