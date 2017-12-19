import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { BudgetLine } from '../models/budget-line.model';
import { Budget } from '../models/budget.model';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as BudgetActions from '../store/actions/budget.actions';
import * as UiStateActions from '../store/actions/uiState.actions';
import * as fromRoot from '../store/app.reducers';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  budget$: Observable<Budget>;
  budgetLines$: Observable<BudgetLine[]>;
  user$: Observable<User>;
  userSubscription: Subscription;

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
        console.log('HomeComponent.ngOnInit.currentBudgetId: ', user.config.currentBudgetId);
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
