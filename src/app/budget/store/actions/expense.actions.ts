import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Expense } from '../../models/expense.model';

export enum ExpenseActionTypes {
  QUERY = '[Expense] query Expense',
  ADDED = '[Expense] added',
  MODIFIED = '[Expense] modified',
  REMOVED = '[Expense] removed',
  LoadExpenses = '[Expense] Load Expenses',
  AddExpense = '[Expense] Add Expense',
  UpsertExpense = '[Expense] Upsert Expense',
  AddExpenses = '[Expense] Add Expenses',
  UpsertExpenses = '[Expense] Upsert Expenses',
  UpdateExpense = '[Expense] Update Expense',
  UpdateExpenses = '[Expense] Update Expenses',
  DeleteExpense = '[Expense] Delete Expense',
  DeleteExpenses = '[Expense] Delete Expenses',
  ClearExpenses = '[Expense] Clear Expenses'
}

export class Query implements Action {
  readonly type = ExpenseActionTypes.QUERY;
  constructor(public payload: { budgetId: string, budgetLineId: string }) { }
}

export class Added implements Action {
  readonly type = ExpenseActionTypes.ADDED;
  constructor(public payload: Expense) { }
}


export class Modified implements Action {
  readonly type = ExpenseActionTypes.MODIFIED;
  constructor(public payload: Expense) { }
}

export class Removed implements Action {
  readonly type = ExpenseActionTypes.REMOVED;
  constructor(public payload: Expense) { }
}

export class LoadExpenses implements Action {
  readonly type = ExpenseActionTypes.LoadExpenses;

  constructor(public payload: { expenses: Expense[] }) { }
}

export class AddExpense implements Action {
  readonly type = ExpenseActionTypes.AddExpense;

  constructor(public payload: {
    expense: Expense,
    budgetId: string,
    budgetLineId: string,
    showUndo?: boolean
  }) { }
}

export class UpsertExpense implements Action {
  readonly type = ExpenseActionTypes.UpsertExpense;

  constructor(public payload: { expense: Expense }) { }
}

export class AddExpenses implements Action {
  readonly type = ExpenseActionTypes.AddExpenses;

  constructor(public payload: { expenses: Expense[] }) { }
}

export class UpsertExpenses implements Action {
  readonly type = ExpenseActionTypes.UpsertExpenses;

  constructor(public payload: { expenses: Expense[] }) { }
}

export class UpdateExpense implements Action {
  readonly type = ExpenseActionTypes.UpdateExpense;

  constructor(public payload: { expense: Update<Expense> }) { }
}

export class UpdateExpenses implements Action {
  readonly type = ExpenseActionTypes.UpdateExpenses;

  constructor(public payload: { expenses: Update<Expense>[] }) { }
}

export class DeleteExpense implements Action {
  readonly type = ExpenseActionTypes.DeleteExpense;

  constructor(public payload:
    {
      expense: Expense,
      budgetLineId: string,
      budgetId: string,
      showUndo?: boolean
    }) { }
}

export class DeleteExpenses implements Action {
  readonly type = ExpenseActionTypes.DeleteExpenses;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearExpenses implements Action {
  readonly type = ExpenseActionTypes.ClearExpenses;
}

export type ExpenseActions =
  Query
  | Added
  | Removed
  | Modified
  | LoadExpenses
  | AddExpense
  | UpsertExpense
  | AddExpenses
  | UpsertExpenses
  | UpdateExpense
  | UpdateExpenses
  | DeleteExpense
  | DeleteExpenses
  | ClearExpenses;
