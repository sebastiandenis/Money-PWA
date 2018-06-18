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
import { Observable, from, merge } from 'rxjs';
import { Shift, NewShiftData } from '../models/shift.model';
import { selectShiftTotal } from '../store/reducers/shift.reducer';

@Injectable()
export class BudgetService {
  constructor(private afs: AngularFirestore) {}

  queryAllBudgets(userId: string): Observable<DocumentChangeAction<Budget>[]> {
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

  queryAllShifts(
    budgetId: string,
    budgetLineId: string
  ): Observable<DocumentChangeAction<any>[]> {
    // const budgetLine: AngularFirestoreDocument<Budget> = this.afs.doc<Budget>(`budgets/${budgetId}/budgetLines/${budgetLineId}`);
    return this.afs
      .doc<Budget>(`budgets/${budgetId}/budgetLines/${budgetLineId}`)
      .collection<Shift>('shifts')
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

  addShift(
    shift: Shift,
    budgetId: string,
    budgetLineId: string
  ): Observable<void> {
    // const budgetLineRef: AngularFirestoreDocument<BudgetLine> =
    //   this.afs.doc<BudgetLine>(`budgets/${budgetId}/budgetLines/${budgetLineId}`);
    // const expensesCollectionRef: AngularFirestoreCollection<Expense> =
    //   this.afs.doc<BudgetLine>(`budgets/${budgetId}/budgetLines/${budgetLineId}`).collection<Expense>(`expenses`);
    // this.afs.collection<Expense>(`budgets/${budgetId}/budgetLines/${budgetLineId}/expenses`);

    const id = this.afs.createId();
    shift.id = id;

    return from(
      this.afs
        .doc<BudgetLine>(`budgets/${budgetId}/budgetLines/${budgetLineId}`)
        .collection<Shift>(`shifts`)
        .doc(id)
        .set(shift)
    );
  }

  addShifts(shifts: Shift[], budgetId: string): Observable<void> {
    const shiftsObs: Observable<void>[] = [];
    shifts.forEach((shift: Shift) => {
      shift.id = this.afs.createId();
      shiftsObs.push(
        from(
          this.afs
            .doc<BudgetLine>(
              `budgets/${budgetId}/budgetLines/${shift.budgetLineId}`
            )
            .collection<Shift>(`shifts`)
            .doc(shift.id)
            .set(shift)
        )
      );
    });

    return merge(...shiftsObs);
  }



  deleteShifts(shifts: Shift[], budgetId: string): Observable<void> {
    const shiftsObs: Observable<any>[] = [];
    shifts.forEach((shift: Shift) => {
      const obs = from(
        this.afs
          .doc<Expense>(
            `budgets/${budgetId}/budgetLines/${shift.budgetLineId}/shifts/${shift.id}`
          )
          .delete()
      );
      shiftsObs.push(obs);
    });
    return merge(...shiftsObs);
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

  deleteShift(
    shiftId: string,
    budgetLineId: string,
    budgetId: string
  ): Observable<void> {
    return from(
      this.afs
        .doc<Shift>(
          `budgets/${budgetId}/budgetLines/${budgetLineId}/shifts/${shiftId}`
        )
        .delete()
    );
  }

  updateBudget(budgetId: string, changes: Partial<Budget>): Observable<void> {
    // const budgetRef: AngularFirestoreDocument<Budget> = this.afs.doc<Budget>(`budgets/${budgetId}`);
    return from(this.afs.doc<Budget>(`budgets/${budgetId}`).update(changes));
  }
}
