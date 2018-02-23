import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Budget } from '../models/budget.model';
import { BudgetLine } from '../models/budget-line.model';
import { Expense } from '../models/expense.model';
import { DocumentReference } from '@firebase/firestore-types';

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

  queryAllExpenses(budgetId: string, budgetLineId: string): Observable<DocumentChangeAction[]> {
    const budgetLine: AngularFirestoreDocument<Budget> = this.afs.doc<Budget>(`budgets/${budgetId}/budgetLines/${budgetLineId}`);
    return budgetLine.collection<Expense>('expenses').stateChanges();
  }


  addExpense(expense: Expense,
    budgetId: string,
    budgetLineId: string): Observable<DocumentReference> {
    const expensesCollectionRef: AngularFirestoreCollection<Expense> =
      this.afs.collection<Expense>(`budgets/${budgetId}/budgetLines/${budgetLineId}/expenses`);
    const id = this.afs.createId();
    expense.id = id;
    return Observable.fromPromise(expensesCollectionRef.add(expense));
    //  const expenseRef: AngularFirestoreDocument<Expense> = expensesCollectionRef.doc<Expense>(`${expense.id}`);
    //  return expenseRef.valueChanges();
  }

  updateBudget(budgetId: string, changes: Partial<Budget>): Observable<void> {
    const budgetRef: AngularFirestoreDocument<Budget> = this.afs.doc<Budget>(`budgets/${budgetId}`);
    return Observable.fromPromise(budgetRef.update(changes));
  }

  /*


  addExpense(expense: Expense,
    budgetId: string,
    budgetLineId: string,
    amount: number,
    changes: Partial<BudgetLine>): Observable<BudgetLine> {
    const budgetRef: AngularFirestoreDocument<Budget> = this.afs.doc<Budget>(`budgets/${budgetId}`);
    const budgetLineRef: AngularFirestoreDocument<BudgetLine> =
      this.afs.doc<BudgetLine>(`budgets/${budgetId}/budgetLines/${budgetLineId}`);
    budgetLineRef.update(changes);
    return budgetLineRef.valueChanges();
  }

  */



}
