import { Component, OnInit, Input, HostListener, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { Budget } from '../../models/budget.model';
import { BudgetLine } from '../../models/budget-line.model';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { OnDestroy } from '@angular/core';
import * as BudgetActions from '../store/actions/budget.actions';
import * as UiStateActions from '../../store/actions/uiState.actions';
import * as fromRoot from '../../store/app.reducers';
import * as fromBudgetApp from '../store/reducers/index';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-budget-dashboard',
  templateUrl: './budget-dashboard.component.html',
  styleUrls: ['./budget-dashboard.component.css']
})
export class BudgetDashboardComponent implements OnInit, OnDestroy {


  stroke = 15;
  radius = 105;
  semicircle = false;
  rounded = true;
  responsive = true;
  clockwise = false;
  color = '#baa0c5';
  background = '#c4d2db';
  duration = 800;
  animation = 'easeOutCubic';
  animationDelay = 1000;
  animations: string[] = [];
  gradient = false;
  realCurrent = 0;


  lastOffset: number;
  budget$: Observable<Budget>;
  budgetLines$: Observable<BudgetLine[]>;
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
    this.lastOffset = 0;



  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }




  getColor(left: number, total: number): string {
    if (left && total) {
      const p = left / total;
      if (p <= 0.15) {
        return '#ff6666';
      } else if (p >= 0.50) {
        return '#99cc00';
      } else {
        return '#ffaa00';
      }
    } else {
      return this.color;
    }
  }

  getBackgroundColor(left: number, total: number): string {
    if (left && total) {
      const p = left / total;
      if (p <= 0.15) {
        return '#ffe6e6';
      } else if (p >= 0.50) {
        return '#ecf9ec';
      } else {
        return '#fff7e6';
      }
    } else {
      return this.color;
    }
  }

  getOverlayStyle() {
    const isSemi = this.semicircle;
    const transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.radius / 3.5 + 'px'
    };
  }

  public getRoundedCashLeft(cashLeft: number) {
    return Math.round(cashLeft);
  }

  public daysLeft(dateEnd: Date): number {
    if (dateEnd) {
      const today = new Date();
      return Math.round((dateEnd.valueOf() - today.valueOf()) / (1000 * 60 * 60 * 24));
    } else {
      return 0;
    }
  }

  public perDay(daysLeft: number, cashLeft: number): number {
    if (daysLeft && daysLeft > 0 && cashLeft && cashLeft > 0) {
      return Math.round(cashLeft / daysLeft);
    } else {
      return 0;
    }
  }

}
