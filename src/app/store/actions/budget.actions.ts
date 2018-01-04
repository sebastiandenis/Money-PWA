import { Action } from '@ngrx/store';
import { Budget } from '../../models/budget.model';
import { BudgetLine } from '../../models/budget-line.model';


export enum BudgetActionTypes {
    LoadDefaultBudget = '[Budget] Load Default Budget',
    DefaultBudgetLoaded = '[Budget] Default Budget Loaded',
    LoadDefaultBudgetLines = '[Budget] Load Default Budget Lines',
    DefaultBudgetLinesLoaded = '[Budget] Default Budget Lines Loaded'
}
/*
export const LOAD_DEFAULT_BUDGET_ACTION = 'LOAD_DEFAULT_BUDGET_ACTION';
export const DEFAULT_BUDGET_LOADED_ACTION = 'DEFAULT_BUDGET_LOADED_ACTION';
export const LOAD_DEFAULT_BUDGETLINES_ACTION = 'LOAD_DEFAULT_BUDGETLINES_ACTION';
export const DEFAULT_BUDGETLINES_LOADED_ACTION = 'DEFAULT_BUDGETLINES_LOADED_ACTION';
*/
// ------------------------------------------------------------- BUDGET ACTIONS

export class LoadDefaultBudgetLinesAction implements Action {
    readonly type: string = BudgetActionTypes.LoadDefaultBudgetLines;
    constructor(public payload?: string) {
    }
}

export class DefaultBudgetLinesLoadedAction implements Action {
    readonly type: string = BudgetActionTypes.DefaultBudgetLinesLoaded;
    constructor(public payload?: BudgetLine[]) {
    }
}

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

export type All =
    DefaultBudgetLoadedAction |
    LoadDefaultBudgetAction |
    DefaultBudgetLinesLoadedAction |
    LoadDefaultBudgetLinesAction;
