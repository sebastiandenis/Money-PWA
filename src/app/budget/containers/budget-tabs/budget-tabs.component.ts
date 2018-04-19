import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../store/app.reducers';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-budget-tabs',
  templateUrl: './budget-tabs.component.html',
  styleUrls: ['./budget-tabs.component.scss'],
  animations: [
    trigger('tabsState', [
      state('normal1', style({
        opacity: 1,
        transform: 'translateY(0px)'
      })),
      state('hidden1', style({
        opacity: 1,
        transform: 'translateY(-150px)'
      })),
      transition('normal1 => hidden1', animate(300)),
      transition('hidden1 => normal1', animate(600))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetTabsComponent implements OnInit, OnDestroy {

  routeLinks: any[];
  activeLinkIndex = -1;
  mainToolbarFixed$: Observable<boolean>;
  tabsState = 'normal1';
  mainToolbarSubscription: Subscription;

  constructor(private router: Router, public cd: ChangeDetectorRef,
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
        icon: 'lightbulb_outline',
        link: './alerts',
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
    this.mainToolbarSubscription = this.mainToolbarFixed$.subscribe(
      isFixed => {
        if (isFixed && this.tabsState !== 'normal1') {
          this.tabsState = 'normal1';
          this.cd.detectChanges();
        } else if (!isFixed && this.tabsState !== 'hidden1') {
          this.tabsState = 'hidden1';
          this.cd.detectChanges();
        }
      }
    );

  }
  ngOnDestroy() {
    if (this.mainToolbarSubscription) {
      this.mainToolbarSubscription.unsubscribe();
    }
  }

}
