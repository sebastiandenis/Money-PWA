import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { BudgetLine } from '../../models/budget-line.model';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import * as fromBudgetApp from '../../store/reducers/index';
import { filter, take, switchMap, map } from 'rxjs/operators';
import * as BudgetLinesActions from '../../store/actions/budget-lines.actions';
import { Budget } from '../../models/budget.model';

@Component({
  selector: 'app-line-details',
  templateUrl: './line-details.component.html',
  styleUrls: ['./line-details.component.scss']
})
export class LineDetailsComponent implements OnInit, OnDestroy {
  budget$: Observable<Budget>;
  budgetLine$: Observable<BudgetLine>;
  budgetLineId: string;
  budgetId: string;

  budgetSub: Subscription;
  routingSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRoot.AppState>
  ) {
    this.budget$ = this.store.pipe(select(fromBudgetApp.selectCurrentBudget));
    this.budgetLine$ = this.store.pipe(
      select(fromBudgetApp.selectCurrentBudgetLine)
    );
    // this.budgetLine$ = this.store
    //   .pipe(select(fromBudgetApp.selectAllBudgetLines))
    //   .pipe(
    //     map((lines: BudgetLine[]) => {
    //       const fl = lines.filter((line: BudgetLine) => {
    //         return line.id === this.budgetLineId;
    //       });
    //       return fl.length > 0 ? fl[0] : null;
    //     })
    //   );
  }

  ngOnInit() {
    this.routingSub = this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.budgetLineId = params['id'];
        this.store.dispatch(
          new BudgetLinesActions.SelectBudgetLineAction({
            budgetLineId: this.budgetLineId
          })
        );
      }
    });

    this.budgetSub = this.budget$.subscribe(budget => {
      if (budget) {
        this.budgetId = budget.id;
        this.store.dispatch(
          new BudgetLinesActions.Query({ budgetId: budget.id })
        );
      }
    });

    // this.selectedBudgetLineSubscription = this.budgetLine$.subscribe(
    //   budgetLine => {
    //     if (budgetLine) {
    //       this.budgetLine = budgetLine;
    //     }
    //   }
    // );
  }

  ngOnDestroy() {
    if (this.routingSub) {
      this.routingSub.unsubscribe();
    }
    if (this.budgetSub) {
      this.budgetSub.unsubscribe();
    }
  }
}
