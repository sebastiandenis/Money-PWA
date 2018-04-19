import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducers';

@Injectable()
export class BudgetEffects {

    constructor(private actions$: Actions,
        private store: Store<fromRoot.AppState>) { }


}
