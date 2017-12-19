import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducers';
import * as AuthActions from '../../store/actions/auth.actions';
import * as UiStateActions from '../../store/actions/uiState.actions';
import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { passwordMatcher } from '../../utils/password-matcher';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';
import { ErrorSnackbarComponent } from '../../utils/error-snackbar.component';
import * as FbAuthErrorCodes from '../../utils/firebase-error-codes';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    param = { value: 6 };
    authError$: Observable<any>;
    authErrorSubscription: Subscription;

    signupForm: FormGroup;
    userData: FormGroup;
    forbiddenUsernames = ['Sebek', 'Kamila'];

    constructor(private store: Store<fromRoot.AppState>, public snackBar: MatSnackBar) {
        this.authError$ = this.store.select(fromRoot.selectAuthError);
    }

    ngOnInit() {
        this.store.dispatch(new UiStateActions.ChangeTitleAction('signuptitle'));
        this.store.dispatch(new UiStateActions.ChangeMainMenuBtnVisibleAction(false));
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
        this.signupForm = new FormGroup({
            'userData': new FormGroup({
                'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
                'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
            }),
            'passwords': new FormGroup({
                'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
                'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(6)])
            }, passwordMatcher)
        });

        /*
                this.signupForm.statusChanges.subscribe(
                    (status) => console.log(status)
                );
        */
    }

    onSignup() {
        // console.log(this.signupForm);
        const email = this.signupForm.get('userData.email').value;
        const password = this.signupForm.get('passwords.password').value;
        // this.signupForm.reset();
        // console.log('onSignup.user: ', email);
        //  console.log('onSignup.password: ', password);
        this.store.dispatch(new AuthActions.TrySignup({ user: { email, password } }));
    }

    forbiddenNames(control: FormControl): { [s: string]: boolean } {
        if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
            return { 'nameIsForbidden': true };
        }
        return null;
    }



    theSamePasswords(control: AbstractControl, control2?: AbstractControl) {
        // console.log('control.value: ' + control.value + ', control2.value: ' + control2.value);
        return null;
    }

    forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'test@test.com') {
                    resolve({ 'emailIsForbidden': true });
                } else {
                    resolve(null);
                }
            }, 1500);
        });
        return promise;
    }


}


