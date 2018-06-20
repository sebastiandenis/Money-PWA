import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Budget } from '../../models/budget.model';
import { User } from '../../../user/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import * as fromBudgetApp from '../../store/reducers/index';
import { OnDestroy } from '@angular/core';
import * as BudgetActions from '../../store/actions/budget.actions';
import * as UiStateActions from '../../../core/store/uiState.actions';
import * as budgetLinesActions from '../../store/actions/budget-lines.actions';
import { Router, RouterState } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  group
} from '@angular/animations';
import { routerTransitionTrigger } from '../../animations/route-animations';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-budget-main',
  templateUrl: './budget-main.component.html',
  styleUrls: ['./budget-main.component.scss'],
  animations: [routerTransitionTrigger]
})
export class BudgetMainComponent implements OnInit, OnDestroy {
  budget$: Observable<Budget>;

  user$: Observable<User>;
  userSubscription: Subscription;
  routerState: RouterState;

  constructor(
    translate: TranslateService,
    private store: Store<fromRoot.AppState>,
    private router: Router
  ) {
    this.user$ = this.store.select(fromRoot.selectUser);
    this.budget$ = this.store.select(fromBudgetApp.selectCurrentBudget);
  }

  ngOnInit() {
    this.store.dispatch(new UiStateActions.ChangeTitleAction('budgettitle'));
    this.store.dispatch(
      new UiStateActions.ChangeMainMenuBtnVisibleAction(true)
    );
    this.store.dispatch(
      new UiStateActions.ChangeMainToolbarCloseBtnVisibleAction(false)
    );
    this.store.dispatch(
      new UiStateActions.ChangeSideMenuBtnVisibleAction(true)
    );

    this.userSubscription = this.user$.subscribe(user => {
      // console.log('userSubscription: ', user);
      if (
        user &&
        user.config &&
        user.config.currentBudgetId !== undefined &&
        user.userId !== undefined
      ) {
        this.store.dispatch(new BudgetActions.Query({ userId: user.userId }));
        this.store.dispatch(
          new BudgetActions.SetCurrentBudget({
            budgetId: user.config.currentBudgetId
          })
        );
      }
    });
  }

  getState(outlet) {
   // console.log('outlet state: ', outlet.activatedRouteData.state);
    return outlet.activatedRouteData.state;
  }

  swipeLeft() {
    this.swipeResolver('left');
  }

  swipedRight() {
    this.swipeResolver('right');
  }

  private swipeResolver(type: string) {
    if (type === 'left') {
      if (this.router.routerState.snapshot.url.endsWith('dashboard')) {
        this.router.navigateByUrl('/budget/lines');
      } else if (this.router.routerState.snapshot.url.endsWith('lines')) {
        this.router.navigateByUrl('/budget/alerts');
      } else if (this.router.routerState.snapshot.url.endsWith('alerts')) {
        this.router.navigateByUrl('/budget/dashboard');
      }
    } else {
      // swipe right
      if (this.router.routerState.snapshot.url.endsWith('dashboard')) {
        this.router.navigateByUrl('/budget/alerts');
      } else if (this.router.routerState.snapshot.url.endsWith('lines')) {
        this.router.navigateByUrl('/budget/dashboard');
      } else if (this.router.routerState.snapshot.url.endsWith('alerts')) {
        this.router.navigateByUrl('/budget/lines');
      }
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
