import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

import * as AuthActions from '../actions/auth.actions';
import * as UserActions from '../actions/user.actions';
import { Observable } from 'rxjs/Observable';
import { AuthUserPayload } from '../actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { Action } from '@ngrx/store';
import { toPayload } from '@ngrx/effects/src/util';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup$ = this.actions$
        .ofType(AuthActions.TRY_SIGNUP)
        .map((action: AuthActions.TrySignup) => action.payload)
        .switchMap((authData: AuthUserPayload) => this.authService.signUp(authData.user)
            /*
                .mergeMap((res) => {
                    console.log('MergeMap.res=', res);
                    return [
                        {
                            type: AuthActions.SIGNUP_COMPLETED,
                            payload: res
                        },
                        {
                            type: AuthActions.SIGNIN_COMPLETED,
                            payload: res
                        }
                    ];
                })
                */
            .map(res => (new AuthActions.SignupCompleted(new AuthActions.AuthUserPayload(res))))
            .do(() => this.router.navigate(['/']))
            .catch((error) => Observable.of(new AuthActions.AuthErrorAction({ error: error })))
        );


    @Effect()
    authSignin$: Observable<Action> = this.actions$
        .ofType(AuthActions.TRY_SIGNIN)
        .map((action: AuthActions.TrySignin) => action.payload)
        .switchMap((authData: AuthUserPayload) => this.authService.signIn(authData.user)
            .map(res => (new AuthActions.SigninCompleted(new AuthActions.AuthUserPayload(res))))
            .do(() => this.router.navigate(['/']))
            .catch((error) => {
                return Observable.of(new AuthActions.AuthErrorAction({ error: error }));
            }
            )
        );



    @Effect({ dispatch: false })
    authLogout = this.actions$
        .ofType(AuthActions.LOGOUT)
        .map((action: AuthActions.Logout) => action.payload)
        .switchMap(payload => this.authService.signOut()
            .map(res => (new AuthActions.LogoutCompleted()))
            .do(() => this.router.navigate(['/']))
            .catch((error) => Observable.of(new AuthActions.AuthErrorAction({ error: error })))
        );

    constructor(private actions$: Actions, private authService: AuthService, private router: Router) {
    }
}
