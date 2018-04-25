import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import * as AuthActions from '../../store/auth.actions';
import * as UiStateActions from '../../../core/store/uiState.actions';
import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { passwordMatcher } from '../../../utils/password-matcher';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';
import { ErrorSnackbarComponent } from '../../../core/components/error-snackbar/error-snackbar.component';
import * as FbAuthErrorCodes from '../../../utils/firebase-error-codes';

@Component({
  selector: 'app-signup',
  template: `<app-signup-form (onSignup)="onSignup($event)"></app-signup-form>`
})
export class SignupComponent implements OnInit {
  authError$: Observable<any>;
  authErrorSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.AppState>,
    public snackBar: MatSnackBar
  ) {
    this.authError$ = this.store.select(fromRoot.selectAuthError);
  }

  ngOnInit() {
    this.store.dispatch(new UiStateActions.ChangeTitleAction('signuptitle'));
    this.store.dispatch(
      new UiStateActions.ChangeMainMenuBtnVisibleAction(false)
    );
    this.authErrorSubscription = this.authError$.subscribe(error => {
      if (error) {
        let errorData = 'signuperror';
        // console.log('error.error.code: ', error.error.code);
        if (error.error !== undefined && error.error.code !== undefined) {
          switch (error.error.code) {
            case FbAuthErrorCodes.SIGNUP_ERROR_EMAIL_ALREADY_IN_USE:
              errorData = 'signuperroremailalreadyinuse';
              break;
            case FbAuthErrorCodes.SIGNUP_ERROR_INVALID_EMAIL:
              errorData = 'singuperrorinvalidemail';
              break;
            case FbAuthErrorCodes.SIGNUP_ERROR_OPERATION_NOT_ALLOWED:
              errorData = 'singuperroroperationnotallowed';
              break;
            case FbAuthErrorCodes.SIGNUP_ERROR_WEAK_PASSWORD:
              errorData = 'singuperrorweakpassword';
              break;
            default:
          }
        }
        this.snackBar.openFromComponent(ErrorSnackbarComponent, {
          data: errorData,
          duration: 5000,
          extraClasses: ['error-class']
        });
      }
    });

    /*
                this.signupForm.statusChanges.subscribe(
                    (status) => console.log(status)
                );
        */
  }

  onSignup(data: any) {
    const email = data.email;
    const password = data.password;
    this.store.dispatch(
      new AuthActions.TrySignup({ user: { email, password } })
    );
  }
}
