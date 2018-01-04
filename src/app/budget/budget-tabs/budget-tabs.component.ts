import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../store/app.reducers';


@Component({
  selector: 'app-budget-tabs',
  templateUrl: './budget-tabs.component.html',
  styleUrls: ['./budget-tabs.component.css']
})
export class BudgetTabsComponent implements OnInit {

  routeLinks: any[];
  activeLinkIndex = -1;
  mainToolbarFixed$: Observable<boolean>;

  constructor(private router: Router,
    private store: Store<fromRoot.AppState>) {
    this.routeLinks = [
      {
        icon: 'account_balance_wallet',
        link: './dashboard',
        index: 0
      },
      {
        icon: 'view_list',
        link: './lines',
        index: 1
      },
      {
        icon: 'settings',
        link: './settings',
        index: 2
      }
    ];

    this.mainToolbarFixed$ = this.store.select(fromRoot.selectMainToolbarFixed);
  }

  onClick(i: number) {
    this.activeLinkIndex = i;
  }

  ngOnInit() {
    this.activeLinkIndex = 0;
  }

}
