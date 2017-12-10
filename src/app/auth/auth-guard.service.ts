import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/app.reducers';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromRoot.AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.selectAuthIsUserLoggedIn);
    // .take(1)
    // .map((authenticated: boolean) => {
    //   return authenticated;
    // });
  }
}
