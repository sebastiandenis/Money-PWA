import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Input,
  Renderer2,
  AfterViewInit
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../store/app.reducers';
import {
  trigger,
  style,
  state,
  transition,
  animate
} from '@angular/animations';
import { ChangeDetectorRef } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-budget-tabs',
  templateUrl: './budget-tabs.component.html',
  styleUrls: ['./budget-tabs.component.scss'],
  animations: [
    trigger('tabsState', [
      state(
        'normal1',
        style({
          opacity: 1,
          transform: 'translateY(0px)'
        })
      ),
      state(
        'hidden1',
        style({
          opacity: 1,
          transform: 'translateY(-150px)'
        })
      ),
      transition('normal1 => hidden1', animate(300)),
      transition('hidden1 => normal1', animate(600))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetTabsComponent implements OnInit, OnDestroy, AfterViewInit {
  routeLinks: any[];
  activeLinkIndex = -1;
  mainToolbarFixed$: Observable<boolean>;
  tabsState = 'normal1';
  mainToolbarSubscription: Subscription;
  routerSubscription: Subscription;

  @Input() routerState: string;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    public cd: ChangeDetectorRef,
    private store: Store<fromRoot.AppState>
  ) {
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

  ngAfterViewInit() {}

  private activeLinkIndexResolver(url: string) {
    console.log('activateLinkIndexResolver');
    // let onElement: any;
    if (url.endsWith('dashboard')) {
      this.activeLinkIndex = 0;
      // if(this.renderer.selectRootElement('a#tab-link-0')){
      //   onElement = this.renderer.selectRootElement('a#tab-link-0');
      // }
    } else if (url.endsWith('lines')) {
      this.activeLinkIndex = 1;
      // if(this.renderer.selectRootElement('a#tab-link-1')){
      //   onElement = this.renderer.selectRootElement('a#tab-link-1');
      // }
    } else if (url.endsWith('alerts')) {
      this.activeLinkIndex = 2;
      // if(this.renderer.selectRootElement('a#tab-link-2')){
      //   onElement = this.renderer.selectRootElement('a#tab-link-2');
      // }
    } else {
      this.activeLinkIndex = -1;
    }

    // if(onElement){
    //   setTimeout(() => onElement.focus(), 0);
    // }
  }

  ngOnInit() {
    this.activeLinkIndex = 0;
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeLinkIndexResolver(event.url);
      });

    this.mainToolbarSubscription = this.mainToolbarFixed$.subscribe(isFixed => {
      if (isFixed && this.tabsState !== 'normal1') {
        this.tabsState = 'normal1';
        this.cd.detectChanges();
      } else if (!isFixed && this.tabsState !== 'hidden1') {
        this.tabsState = 'hidden1';
        this.cd.detectChanges();
      }
    });
  }
  ngOnDestroy() {
    if (this.mainToolbarSubscription) {
      this.mainToolbarSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
