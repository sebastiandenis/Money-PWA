import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Budget } from './models/budget.model';
import { User } from '../user/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducers';
import * as fromBudgetApp from './store/reducers/index';
import { OnDestroy } from '@angular/core';
import * as BudgetActions from './store/actions/budget.actions';
import * as UiStateActions from '../core/store/uiState.actions';
import * as budgetLinesActions from './store/actions/budget-lines.actions';




@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit, OnDestroy {

  budget$: Observable<Budget>;

  user$: Observable<User>;
  userSubscription: Subscription;





  constructor(translate: TranslateService,
    private store: Store<fromRoot.AppState>) {
    this.user$ = this.store.select(fromRoot.selectUser);
    this.budget$ = this.store.select(fromBudgetApp.selectCurrentBudget);
  }

  ngOnInit() {

    this.store.dispatch(new UiStateActions.ChangeTitleAction('budgettitle'));
    this.store.dispatch(new UiStateActions.ChangeMainMenuBtnVisibleAction(true));
    this.store.dispatch(new UiStateActions.ChangeMainToolbarCloseBtnVisibleAction(false));
    this.store.dispatch(new UiStateActions.ChangeSideMenuBtnVisibleAction(true));

    this.userSubscription = this.user$.subscribe(user => {
      // console.log('userSubscription: ', user);
      if (user && user.config && user.config.currentBudgetId !== undefined
        && user.userId !== undefined) {
        this.store.dispatch(new BudgetActions.Query({ userId: user.userId }));
        this.store.dispatch(new BudgetActions.SetCurrentBudget({ budgetId: user.config.currentBudgetId }));
      }
    });
  }



  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }


}
