import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentChangeAction,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Budget } from '../models/budget.model';
import { BudgetLine } from '../models/budget-line.model';
import { Expense } from '../models/expense.model';
import { DocumentReference } from '@firebase/firestore-types';
import { Observable, from } from 'rxjs';

@Injectable()
export class BudgetService {
  constructor(private afs: AngularFirestore) {}

  queryAllBudgets(userId: string): Observable<DocumentChangeAction<Budget>[]> {
    console.log('BudgetService.queryAllBudgets -> userId=', userId);
    //  const colRef = this.afs.collection<Budget>('budgets');
    //  colRef.ref.where(`access.${userId}`, '==', true);
    //  return colRef.snapshotChanges();

    return this.afs
      .collection<Budget>('budgets', ref =>
        ref.where(`access.${userId}`, '==', true)
      )
      .snapshotChanges();
  }

  queryAllBudgetLines(
    budgetId: string
  ): Observable<DocumentChangeAction<any>[]> {
    // const budget: AngularFirestoreDocument<Budget> = this.afs.doc<Budget>(`budgets/${budgetId}`);
    return this.afs
      .doc<Budget>(`budgets/${budgetId}`)
      .collection<BudgetLine>('budgetLines')
      .stateChanges();
  }

  queryAllExpenses(
    budgetId: string,
    budgetLineId: string
  ): Observable<DocumentChangeAction<any>[]> {
    // const budgetLine: AngularFirestoreDocument<Budget> = this.afs.doc<Budget>(`budgets/${budgetId}/budgetLines/${budgetLineId}`);
    return this.afs
      .doc<Budget>(`budgets/${budgetId}/budgetLines/${budgetLineId}`)
      .collection<Expense>('expenses')
      .stateChanges();
  }

  addExpense(
    expense: Expense,
    budgetId: string,
    budgetLineId: string
  ): Observable<void> {
    // const budgetLineRef: AngularFirestoreDocument<BudgetLine> =
    //   this.afs.doc<BudgetLine>(`budgets/${budgetId}/budgetLines/${budgetLineId}`);
    // const expensesCollectionRef: AngularFirestoreCollection<Expense> =
    //   this.afs.doc<BudgetLine>(`budgets/${budgetId}/budgetLines/${budgetLineId}`).collection<Expense>(`expenses`);
    // this.afs.collection<Expense>(`budgets/${budgetId}/budgetLines/${budgetLineId}/expenses`);

    const id = this.afs.createId();
    expense.id = id;

    return from(
      this.afs
        .doc<BudgetLine>(`budgets/${budgetId}/budgetLines/${budgetLineId}`)
        .collection<Expense>(`expenses`)
        .doc(id)
        .set(expense)
    );
  }

  deleteExpense(
    expenseId: string,
    budgetLineId: string,
    budgetId: string
  ): Observable<void> {
    // const expenseRef: AngularFirestoreDocument<Expense> =
    //   this.afs.doc<Expense>(`budgets/${budgetId}/budgetLines/${budgetLineId}/expenses/${expenseId}`);
    return from(
      this.afs
        .doc<Expense>(
          `budgets/${budgetId}/budgetLines/${budgetLineId}/expenses/${expenseId}`
        )
        .delete()
    );
  }

  updateBudget(budgetId: string, changes: Partial<Budget>): Observable<void> {
    // const budgetRef: AngularFirestoreDocument<Budget> = this.afs.doc<Budget>(`budgets/${budgetId}`);
    return from(this.afs.doc<Budget>(`budgets/${budgetId}`).update(changes));
  }
}
