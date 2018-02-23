import { Action } from '@ngrx/store';
import { Budget } from '../../../models/budget.model';


export enum BudgetActionTypes {
    LoadDefaultBudget = '[Budget] Load Default Budget',
    DefaultBudgetLoaded = '[Budget] Default Budget Loaded',
    ExpenseAdded = '[Budget] Added Expense'
}



// ------------------------------------------------------------- BUDGET ACTIONS



export class LoadDefaultBudgetAction implements Action {
    readonly type: string = BudgetActionTypes.LoadDefaultBudget;
    constructor(public payload?: string) {
    }
}

export class DefaultBudgetLoadedAction implements Action {
    readonly type: string = BudgetActionTypes.DefaultBudgetLoaded;
    constructor(public payload?: Budget) {
    }
}

export class ExpenseAdded implements Action {
    readonly type = BudgetActionTypes.ExpenseAdded;
    constructor(public payload?: { budgetId: string, newCashLeft: number }) {
    }
}




export type BudgetActions =
    | DefaultBudgetLoadedAction
    | LoadDefaultBudgetAction
    | ExpenseAdded;

