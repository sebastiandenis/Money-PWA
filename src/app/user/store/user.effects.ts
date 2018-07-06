import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Effect } from '@ngrx/effects';
import { UserService } from '../../user/services/user.service';
import * as fromRoot from '../../store/app.reducers';
import * as UserActions from './user.actions';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.AppState>,
    private userService: UserService
  ) {}

  @Effect()
  userFetch = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.LoadUserData),
    map((action: UserActions.LoadUserDataAction) => action.payload),
    switchMap(userId => {
      return this.userService.loadUserById(userId);
    }),
    map(results => new UserActions.UserDataLoadedAction(results))
  );
}
