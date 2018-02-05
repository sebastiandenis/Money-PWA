import { Action } from '@ngrx/store';
import { Budget } from '../../models/budget.model';
import { BudgetLine } from '../../models/budget-line.model';


export enum BudgetActionTypes {
    LoadDefaultBudget = '[Budget] Load Default Budget',
    DefaultBudgetLoaded = '[Budget] Default Budget Loaded',
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

export type All =
    DefaultBudgetLoadedAction |
    LoadDefaultBudgetAction;
