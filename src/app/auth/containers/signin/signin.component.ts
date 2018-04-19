import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as AuthActions from '../../store/auth.actions';
import * as UiStateActions from '../../../core/store/uiState.actions';
import { Auth } from '../../models/auth.model';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../../store/app.reducers';
import { Subscription } from 'rxjs/Subscription';
import { ErrorSnackbarComponent } from '../../../core/components/error-snackbar/error-snackbar.component';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import * as FbAuthErrorCodes from '../../../utils/firebase-error-codes';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  authError$: Observable<any>;
  authErrorSubscription: Subscription;


  constructor(private store: Store<fromApp.AppState>, public snackBar: MatSnackBar) {
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
          extraClasses: ['error-class']
        });
      }
    });
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignin({ user: { email, password } }));
  }

  ngOnDestroy() {
    if (this.authErrorSubscription) {
      this.authErrorSubscription.unsubscribe();
    }
  }

}

