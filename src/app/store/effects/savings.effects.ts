import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as MyActions from '../actions';

@Injectable()
export class SavingsEffects {

    constructor(private actions$: Actions) {
    }
   
}
