import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

import { of, Observable } from 'rxjs';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';
import * as UserActions from '../../user/store/user.actions';
import { AuthUserPayload } from './auth.actions';
import { AuthService } from '../services/auth.service';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

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
    catchError(error => of(new AuthActions.AuthErrorAction({ error: error })))
  );

  @Effect()
  authSignin$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.TrySignin),
    map((action: AuthActions.TrySignin) => action.payload),
    switchMap((authData: AuthUserPayload) =>
      this.authService
        .signIn(authData.user)
        .pipe(
          map(
            res =>
              new AuthActions.SigninCompleted(
                new AuthActions.AuthUserPayload(res)
              )
          ),
          tap(() => this.router.navigate(['/']))
        )
    )
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.Logout),
    map((action: AuthActions.Logout) => action.payload),
    switchMap(payload =>
      this.authService
        .signOut()
        .pipe(
          map(res => new AuthActions.LogoutCompleted()),
          tap(() => this.router.navigate(['/']))
        )
    ),
    catchError(error => of(new AuthActions.AuthErrorAction({ error: error })))
  );
}
