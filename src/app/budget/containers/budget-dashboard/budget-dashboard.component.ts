import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../user/models/user.model';
import { Budget } from '../../models/budget.model';
import { BudgetLine } from '../../models/budget-line.model';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as BudgetActions from '../../store/actions/budget.actions';
import * as UiStateActions from '../../../core/store/uiState.actions';
import * as fromRoot from '../../../store/app.reducers';
import * as fromBudgetApp from '../../store/reducers/index';

@Component({
  selector: 'app-budget-dashboard',
  templateUrl: './budget-dashboard.component.html',
  styleUrls: ['./budget-dashboard.component.scss']
})
export class BudgetDashboardComponent  implements OnInit, OnDestroy {



  lastOffset: number;
  budget$: Observable<Budget>;
  budgetLines$: Observable<BudgetLine[]>;
  user$: Observable<User>;
  userSubscription: Subscription;

  constructor(translate: TranslateService,
    private store: Store<fromRoot.AppState>,
    private router: Router) {
    this.user$ = this.store.select(fromRoot.selectUser);
    this.budget$ = this.store.select(fromBudgetApp.selectCurrentBudget);


  }

  ngOnInit() {
    this.store.dispatch(new UiStateActions.ChangeTitleAction('budgettitle'));
    this.store.dispatch(new UiStateActions.ChangeMainMenuBtnVisibleAction(true));
    this.lastOffset = 0;
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onAddFastExpense(): void {
    this.router.navigate(['addFastExpense']);

  }


}
