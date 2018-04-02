import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Budget } from '../models/budget.model';
import { BudgetLine } from '../models/budget-line.model';
import { Expense } from '../models/expense.model';
import { DocumentReference } from '@firebase/firestore-types';
import 'rxjs/add/observable/fromPromise';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class BudgetService {

  constructor(private afs: AngularFirestore) { }


  queryAllBudgets(userId: string): Observable<DocumentChangeAction[]> {
    // console.log('BudgetService.queryAllBudgets -> userId=', userId);
    return this.afs.collection('budgets', ref => ref.where(`access.${userId}`, '==', true)).snapshotChanges();
  }
  /*
    loadBudgetLines(budgetId: string): Observable<BudgetLine[]> {
      // console.log('BudgetService.loadDefaultBudgetLines->budgetId=', budgetId);
      const budget: AngularFirestoreDocument<Budget> = this.afs.doc<Budget>(`budgets/${budgetId}`);
      return budget.collection<BudgetLine>('budgetLines').valueChanges();
  
    }
    */

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
    budgetLineId: string): Observable<void> {
    const budgetLineRef: AngularFirestoreDocument<BudgetLine> =
      this.afs.doc<BudgetLine>(`budgets/${budgetId}/budgetLines/${budgetLineId}`);
    const expensesCollectionRef: AngularFirestoreCollection<Expense> =
      budgetLineRef.collection<Expense>(`expenses`);
    // this.afs.collection<Expense>(`budgets/${budgetId}/budgetLines/${budgetLineId}/expenses`);

    const id = this.afs.createId();
    expense.id = id;
    return Observable.fromPromise(expensesCollectionRef.doc(id).set(expense));

  }

  deleteExpense(expenseId: string, budgetLineId: string, budgetId: string): Observable<void> {
    const expenseRef: AngularFirestoreDocument<Expense> =
      this.afs.doc<Expense>(`budgets/${budgetId}/budgetLines/${budgetLineId}/expenses/${expenseId}`);
    return Observable.fromPromise(expenseRef.delete());
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
