import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Budget } from '../models/budget.model';
import { BudgetLine } from '../models/budget-line.model';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducers';
import { OnDestroy } from '@angular/core';
import * as BudgetActions from '../store/actions/budget.actions';
import * as UiStateActions from '../store/actions/uiState.actions';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit, OnDestroy {

  budget$: Observable<Budget>;
  budgetLines$: Observable<BudgetLine[]>;
  user$: Observable<User>;
  userSubscription: Subscription;


  constructor(translate: TranslateService,
    private store: Store<fromRoot.AppState>) {
    this.user$ = this.store.select(fromRoot.selectUser);
    this.budget$ = this.store.select(fromRoot.selectBudget);
    this.budgetLines$ = this.store.select(fromRoot.selectBudgetLines);
  }

  ngOnInit() {
    this.store.dispatch(new UiStateActions.ChangeTitleAction('budgettitle'));
    this.store.dispatch(new UiStateActions.ChangeMainMenuBtnVisibleAction(true));

    this.userSubscription = this.user$.subscribe(user => {
      if (user && user.config && user.config.currentBudgetId !== undefined) {
        this.store.dispatch(new BudgetActions.LoadDefaultBudgetAction(user.config.currentBudgetId)); // TODO: powinno iść z góry
        this.store.dispatch(new BudgetActions.LoadDefaultBudgetLinesAction(user.config.currentBudgetId)); // TODO: powinno iść z góry
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
