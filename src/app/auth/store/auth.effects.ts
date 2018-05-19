import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

import { from as fromPromise, Observable } from 'rxjs';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';
import * as UserActions from '../../user/store/user.actions';
import { AuthUserPayload } from './auth.actions';
import { AuthService } from '../services/auth.service';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.TrySignup),
    map((action: AuthActions.TrySignup) => action.payload),
    switchMap((authData: AuthUserPayload) =>
      this.authService
        .signUp(authData.user)
        .pipe(
          map(
            res =>
              new AuthActions.SignupCompleted(
                new AuthActions.AuthUserPayload(res)
              )
          ),
          tap(() => this.router.navigate(['/']))
        )
    ),
    catchError(error =>
      Observable.of(new AuthActions.AuthErrorAction({ error: error }))
    )
  );

  @Effect()
  authSignin$: Observable<Action> = this.actions$
    .ofType(AuthActions.AuthActionTypes.TrySignin)
    .map((action: AuthActions.TrySignin) => action.payload)
    .switchMap((authData: AuthUserPayload) =>
      this.authService
        .signIn(authData.user)
        .map(
          res =>
            new AuthActions.SigninCompleted(
              new AuthActions.AuthUserPayload(res)
            )
        )
        .pipe(tap(() => this.router.navigate(['/'])))
        .catch(error => {
          return Observable.of(
            new AuthActions.AuthErrorAction({ error: error })
          );
        })
    );

  @Effect({ dispatch: false })
  authLogout = this.actions$
    .ofType(AuthActions.AuthActionTypes.Logout)
    .map((action: AuthActions.Logout) => action.payload)
    .switchMap(payload =>
      this.authService
        .signOut()
        .map(res => new AuthActions.LogoutCompleted())
        .pipe(tap(() => this.router.navigate(['/'])))
        .catch(error =>
          Observable.of(new AuthActions.AuthErrorAction({ error: error }))
        )
    );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
