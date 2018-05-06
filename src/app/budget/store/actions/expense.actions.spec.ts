import {
  Query,
  ExpenseActionTypes,
  Modified,
  Removed,
  LoadExpenses,
  AddExpense,
  UpsertExpense,
  UpsertExpenses,
  AddExpenses,
  UpdateExpense,
  UpdateExpenses,
  DeleteExpense,
  DeleteExpenses,
  ClearExpenses,
  Added
} from './expense.actions';
import { Expense } from '../../models/expense.model';
import { Update } from '@ngrx/entity/src/models';

describe('ExpenseAction', () => {
  let expense01: Expense;
  let expense02: Expense;
  let expensesArray: Expense[];

  beforeEach(() => {
    expense01 = {
      id: 'exp01',
      amount: 10
    };

    expense02 = {
      id: 'exp02',
      amount: -50,
      description: 'Duży wydatek na plus'
    };

    expensesArray = [expense01, expense02];
  });

  it('#Query should create an action', () => {
    const payload = {
      budgetId: 'abcde',
      budgetLineId: 'abcdefgh'
    };
    const action = new Query(payload);
    expect({ ...action }).toEqual({
      type: ExpenseActionTypes.QUERY,
      payload
    });
  });

  it('#Added should create an action', () => {
    const payload: Expense = expense01;
    const action = new Added(payload);
    expect({ ...action }).toEqual({
      type: ExpenseActionTypes.ADDED,
      payload
    });
  });

  it('#Modified should create an action', () => {
    const payload: Expense = expense01;
    const action = new Modified(payload);
    expect({ ...action }).toEqual({
      type: ExpenseActionTypes.MODIFIED,
      payload
    });
  });

  it('#Removed should create an action', () => {
    const payload: Expense = expense01;
    const action = new Removed(payload);
    expect({ ...action }).toEqual({
      type: ExpenseActionTypes.REMOVED,
      payload
    });
  });

  it('#LoadExpenses should create an action', () => {
    const payload = {
      expenses: expensesArray
    };
    const action = new LoadExpenses(payload);
    expect({ ...action }).toEqual({
      type: ExpenseActionTypes.LoadExpenses,
      payload
    });
  });

  it('#AddExpense should create an action', () => {
    const expense: Expense = expense02;
    const payload = {
      expense,
      budgetId: 'budget001',
      budgetLineId: 'budgetLine001',
      showUndo: true
    };
    const action = new AddExpense(payload);
    expect({ ...action }).toEqual({
      type: ExpenseActionTypes.AddExpense,
      payload
    });
  });

  it('#UpsertExpense should create an action', () => {
    const expense: Expense = expense02;
    const payload = {
      expense: expense
    };
    const action = new UpsertExpense(payload);
    expect({ ...action }).toEqual({
      type: ExpenseActionTypes.UpsertExpense,
      payload
    });
  });

  it('#UpsertExpenses should create an action', () => {
    const payload = {
      expenses: expensesArray
    };
    const action = new UpsertExpenses(payload);
    expect({ ...action }).toEqual({
      type: ExpenseActionTypes.UpsertExpenses,
      payload
    });
  });

  it('#AddExpenses should create an action', () => {
    const payload = {
      expenses: expensesArray
    };
    const action = new AddExpenses(payload);
    expect({ ...action }).toEqual({
      type: ExpenseActionTypes.AddExpenses,
      payload
    });
  });

  it('#UpdateExpense should create an action', () => {
    const expUpdate: Update<Expense> = {
      id: 'exp001',
      changes: {
        amount: 100,
        description: 'To jest nowy opis'
      }
    };
    const payload = { expense: expUpdate };
    const action = new UpdateExpense(payload);
    expect({ ...action }).toEqual({
      type: ExpenseActionTypes.UpdateExpense,
      payload
    });
  });

  it('#UpdateExpenses create an action', () => {
    const expUpdate01: Update<Expense> = {
      id: 'exp001',
      changes: {
        amount: 100,
        description: 'To jest nowy opis'
      }
    };
    const expUpdate02: Update<Expense> = {
      id: 'exp002',
      changes: {
        amount: 99,
        when: Date.now().valueOf()
      }
    };
    const payload = {
      expenses: [expUpdate01, expUpdate02]
    };
    const action = new UpdateExpenses(payload);
    expect({ ...action }).toEqual({
      type: ExpenseActionTypes.UpdateExpenses,
      payload
    });
  });

  it('#DeleteExpense should create an action', () => {
    const payload = {
      expense: expense01,
      budgetLineId: 'bl001',
      budgetId: 'b001',
      newBudgetCashLeft: 0,
      newBudgetLineCashLeft: 0
    };
    const action = new DeleteExpense(payload);
    expect({ ...action }).toEqual({
      type: ExpenseActionTypes.DeleteExpense,
      payload
    });
  });

  it('#DeleteExpenses should create an action', () => {
    const ids = ['exp001', 'exp002'];
    const payload = {
      ids: ids
    };

    const action = new DeleteExpenses(payload);
    expect({ ...action }).toEqual({
      type: ExpenseActionTypes.DeleteExpenses,
      payload
    });
  });

  it('#ClearExpenses should create an action', () => {
    const action = new ClearExpenses();
    expect({ ...action }).toEqual({
      type: ExpenseActionTypes.ClearExpenses
    });
  });
});
