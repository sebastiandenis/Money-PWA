import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { BudgetService } from './budget.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from 'angularfire2/firestore';
import { Query } from '@firebase/firestore-types';
import { Expense } from '../models/expense.model';
import { Budget } from '../models/budget.model';

let budgetService: BudgetService;
let afsSpy: jasmine.SpyObj<AngularFirestore>;
let snapshotChangesSpy: jasmine.Spy;
let collectionSpy: jasmine.Spy;
let stateChangesSpy: jasmine.Spy;
let docSpy: jasmine.Spy;
let setSpy: jasmine.Spy;
let createIdSpy: jasmine.Spy;
let deleteSpy: jasmine.Spy;
let updateSpy: jasmine.Spy;
let angularFirestoreStub: any;
let array1, array2: any;
let promise1: Promise<string>;
let myExpense: Expense;
let budgetChanges: Partial<Budget>;

describe('BudgetService', () => {
  beforeEach(() => {
    myExpense = {
      id: 'ex001',
      amount: 100
    };
    array1 = [
      {
        type: 'added',
        payload: 'dokument1'
      },
      {
        type: 'removed',
        payload: 'dokument2'
      }
    ];

    array2 = [
      {
        type: 'modified',
        payload: 'dokument3'
      }
    ];

    promise1 = new Promise((resolve, rejest) => {
      resolve();
    });

    snapshotChangesSpy = jasmine
      .createSpy('snapshotChanges')
      .and.returnValue(of(array1));

    stateChangesSpy = jasmine
      .createSpy('stateChangesSpy')
      .and.returnValue(of([array2]));

    collectionSpy = jasmine.createSpy('collection').and.returnValue({
      snapshotChanges: snapshotChangesSpy,
      stateChanges: stateChangesSpy,
      doc: docSpy
    });

    setSpy = jasmine.createSpy('set').and.returnValue(promise1);
    createIdSpy = jasmine.createSpy('createId').and.returnValue('xyz');
    deleteSpy = jasmine.createSpy('delete').and.returnValue(promise1);
    updateSpy = jasmine.createSpy('update').and.returnValue(promise1);
    budgetChanges = {
      totalCash: 1000
    };

    docSpy = jasmine.createSpy('doc').and.returnValue({
      collection: collectionSpy,
      set: setSpy,
      delete: deleteSpy,
      update: updateSpy
    });

    angularFirestoreStub = {
      collection: collectionSpy,
      doc: docSpy,
      createId: createIdSpy
    };

    TestBed.configureTestingModule({
      providers: [
        BudgetService,
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    });
    // Inject both the service-to-test and its (spy) dependency
    budgetService = TestBed.get(BudgetService);
    afsSpy = TestBed.get(AngularFirestore);
    collectionSpy.calls.reset();
    snapshotChangesSpy.calls.reset();
    docSpy.calls.reset();
    stateChangesSpy.calls.reset();
    setSpy.calls.reset();
    deleteSpy.calls.reset();
    updateSpy.calls.reset();
    createIdSpy.calls.reset();
  });

  it('#queryAllBudgets should return stubbed value from a spy', () => {
    const query$: Observable<
      DocumentChangeAction<any>[]
    > = budgetService.queryAllBudgets('user001');

    expect(collectionSpy).toHaveBeenCalledTimes(1);
    expect(snapshotChangesSpy).toHaveBeenCalledTimes(1);
    expect(collectionSpy).toHaveBeenCalledBefore(snapshotChangesSpy);
    expect(query$).toBeDefined();
  });

  it('#queryAllBudgets should return value from observable', (done: DoneFn) => {
    budgetService.queryAllBudgets('user001').subscribe(value => {
      expect(value).toBe(array1);
      done();
    });
  });

  it('#queryAllBudgetLines should return stubbed value from a spy', () => {
    const query$: Observable<
      DocumentChangeAction<any>[]
    > = budgetService.queryAllBudgetLines('b001');

    expect(collectionSpy).toHaveBeenCalledTimes(1);
    expect(docSpy).toHaveBeenCalledTimes(1);
    expect(stateChangesSpy).toHaveBeenCalledTimes(1);
    expect(docSpy).toHaveBeenCalledBefore(collectionSpy);
    expect(collectionSpy).toHaveBeenCalledBefore(stateChangesSpy);
    expect(query$).toBeDefined();
  });

  it('#queryAllBudgetLines should return value from observable', (done: DoneFn) => {
    budgetService.queryAllBudgetLines('b001').subscribe(value => {
      expect(value[0]).toBe(array2);
      done();
    });
  });

  it('#queryAllExpenses should return stubbed value from a spy', () => {
    const query$: Observable<
      DocumentChangeAction<any>[]
    > = budgetService.queryAllExpenses('b001', 'bl001');

    expect(collectionSpy).toHaveBeenCalledTimes(1);
    expect(docSpy).toHaveBeenCalledTimes(1);
    expect(stateChangesSpy).toHaveBeenCalledTimes(1);
    expect(docSpy).toHaveBeenCalledBefore(collectionSpy);
    expect(collectionSpy).toHaveBeenCalledBefore(stateChangesSpy);
    expect(query$).toBeDefined();
  });

  it('#queryAllExpenses should return value from observable', (done: DoneFn) => {
    budgetService.queryAllExpenses('b001', 'bl001').subscribe(value => {
      expect(value[0]).toBe(array2);
      done();
    });
  });

  it('#addExpense should return stubbed value from a spy', () => {
    const add$: Observable<void> = budgetService.addExpense(
      myExpense,
      'b001',
      'bl001'
    );

    expect(collectionSpy).toHaveBeenCalledTimes(1);
    expect(docSpy).toHaveBeenCalledTimes(1);
    // expect(setSpy).toHaveBeenCalledTimes(1);

    // expect(docSpy).toHaveBeenCalledBefore(collectionSpy);
    expect(add$).toBeDefined();
  });

  it('#addExpense should return empty observable', (done: DoneFn) => {
    budgetService.addExpense(myExpense, 'b001', 'bl001').subscribe(value => {
      expect(value).toBeUndefined();
      done();
    });
  });

  it('#deleteExpense should return stubbed value from a spy', () => {
    const delete$: Observable<void> = budgetService.deleteExpense(
      'exp001',
      'bl001',
      'b001'
    );
    expect(docSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(delete$).toBeDefined();
  });
  it('#deleteExpense should return empty observable', (done: DoneFn) => {
    budgetService.deleteExpense('exp001', 'b001', 'bl001').subscribe(value => {
      expect(value).toBeUndefined();
      done();
    });
  });

  it('#updateBudget should return stubbed value from a spy', () => {
    const update$: Observable<void> = budgetService.updateBudget(
      'b001',
      budgetChanges
    );
    expect(docSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(update$).toBeDefined();
  });

  it('#updateBudget should return empty observable', (done: DoneFn) => {
    budgetService.updateBudget('exp001', budgetChanges).subscribe(value => {
      expect(value).toBeUndefined();
      done();
    });
  });
});

// deleteExpense(expenseId: string, budgetLineId: string, budgetId: string): Observable<void> {
//     const expenseRef: AngularFirestoreDocument<Expense> =
//       this.afs.doc<Expense>(`budgets/${budgetId}/budgetLines/${budgetLineId}/expenses/${expenseId}`);
//     return Observable.fromPromise(expenseRef.delete());
//   }
