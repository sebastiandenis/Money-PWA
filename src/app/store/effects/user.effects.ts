import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Effect } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import * as fromRoot from '../app.reducers';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {

    constructor(private actions$: Actions,
        private store: Store<fromRoot.AppState>,
        private userService: UserService) { }

    @Effect()
    userFetch = this.actions$
        .ofType(UserActions.LOAD_USER_DATA_ACTION)
        .map((action: UserActions.LoadUserDataAction) => action.payload)
        .switchMap(userId => {
            return this.userService.loadUserById(userId);
        })
        .take(1)
        .map(results => new UserActions.UserDataLoadedAction(results[0]));

}
