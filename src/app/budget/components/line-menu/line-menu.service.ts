import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LineMenuService {
  constructor() {}

  // Observable string sources
  private addExpenseSource = new Subject<any>();

  // Observable string streams
  addExpense$ = this.addExpenseSource.asObservable();

  emitAddExpense(budgetLineId: string) {
    this.addExpenseSource.next(budgetLineId);
  }
}
