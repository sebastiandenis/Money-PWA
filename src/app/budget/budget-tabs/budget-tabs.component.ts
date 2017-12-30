import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-tabs',
  templateUrl: './budget-tabs.component.html',
  styleUrls: ['./budget-tabs.component.css']
})
export class BudgetTabsComponent implements OnInit {

  routeLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
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
  }

  onClick(i: number) {
    this.activeLinkIndex = i;
  }

  ngOnInit() {
    this.activeLinkIndex = 0;
  }

}
