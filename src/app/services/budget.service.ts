import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Budget } from '../models/budget.model';
import { BudgetLine } from '../models/budget-line.model';

@Injectable()
export class BudgetService {

  constructor(private afs: AngularFirestore) { }

  loadDefaultBudget(budgetId: string): Observable<Budget> {
    // console.log('BudgetService.loadDefaultBudget->budgetId=', budgetId);
    return this.afs.doc<Budget>(`budgets/${budgetId}`).valueChanges();
  }

  loadBudgetLines(budgetId: string): Observable<BudgetLine[]> {
    // console.log('BudgetService.loadDefaultBudgetLines->budgetId=', budgetId);
    const budget: AngularFirestoreDocument<Budget> = this.afs.doc<Budget>(`budgets/${budgetId}`);
    return budget.collection<BudgetLine>('budgetLines').valueChanges();

  }



}
