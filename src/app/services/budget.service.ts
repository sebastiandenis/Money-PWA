import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from 'angularfire2/firestore';
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
    console.log('BudgetService.loadDefaultBudgetLines->budgetId=', budgetId);
    const budget: AngularFirestoreDocument<Budget> = this.afs.doc<Budget>(`budgets/${budgetId}`);
    return budget.collection<BudgetLine>('budgetLines').valueChanges();

  }

  queryAllBudgetLines(budgetId: string): Observable<DocumentChangeAction[]> {
    const budget: AngularFirestoreDocument<Budget> = this.afs.doc<Budget>(`budgets/${budgetId}`);
    return budget.collection<BudgetLine>('budgetLines').stateChanges();
  }

  addExpense(budgetLineId: string,
    budgetId: string,
    amount: number,
    changes: Partial<BudgetLine>): Observable<BudgetLine> {
    const budgetLineRef: AngularFirestoreDocument<BudgetLine> =
      this.afs.doc<BudgetLine>(`budgets/${budgetId}/budgetLines/${budgetLineId}`);
    budgetLineRef.update(changes);
    return budgetLineRef.valueChanges();
  }



}
