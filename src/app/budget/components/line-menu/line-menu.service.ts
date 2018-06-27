import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LineMenuService {
  constructor() {}

  // Observable string sources
  private addExpenseSource = new Subject<any>();
  private addCashSource = new Subject<any>();
  private moreSource = new Subject<any>();

  // Observable string streams
  addExpense$ = this.addExpenseSource.asObservable();
  addCash$ = this.addCashSource.asObservable();
  more$ = this.moreSource.asObservable();

  emitAddExpense(budgetLineId: string) {
    this.addExpenseSource.next(budgetLineId);
  }

  emitAddCash(budgetLineId: string) {
    this.addCashSource.next(budgetLineId);
  }

  emitMore(budgetLineId: string){
    this.moreSource.next(budgetLineId);
  }
}
