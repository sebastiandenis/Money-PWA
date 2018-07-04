import { Component, OnInit, Input } from '@angular/core';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  @Input() expenses: Expense[] = [];

  constructor() {}

  ngOnInit() {}

  getSortedExpenses(expenses: Expense[]): Expense[] {
    return expenses
      .sort((a: Expense, b: Expense) => {
        // desc
        if (a.when < b.when) {
          return 1;
        } else if (a.when === b.when) {
          return 0;
        } else {
          return -1;
        }
      })
      .slice();
  }

  getShortDesc(desc: string): string {
    let shortDesc = '';
    if (desc) {
      shortDesc = desc.substr(0, 30);
      if (desc.length > 30) {
        shortDesc = shortDesc + '...';
      }
    }

    return shortDesc;
  }

  getBadgeColor(amount: number) {
    if (amount) {
      if (amount > 0) {
        return { 'my-chip-red': true };
      } else {
        return { 'my-chip-green': true };
      }
    }
  }
}
