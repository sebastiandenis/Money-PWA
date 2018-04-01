import { Action } from '@ngrx/store';
import { Budget } from '../../../models/budget.model';


export enum BudgetActionTypes {
    QUERY = '[Budget] query Budgets',
    ADDED = '[Budget] added',
    MODIFIED = '[Budget] modified',
    REMOVED = '[Budget] removed',
    LoadDefaultBudget = '[Budget] Load Default Budget',
    DefaultBudgetLoaded = '[Budget] Default Budget Loaded',
    UpdateBudget = '[Budget] Update',
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

export class UpdateBudget implements Action {
    readonly type = BudgetActionTypes.UpdateBudget;
    constructor(public payload?: { budgetId: string, changes: Partial<Budget> }) {
    }
}

export class Query implements Action {
    readonly type = BudgetActionTypes.QUERY;
    constructor(public payload: { budgetId: string }) { }
}

export class Added implements Action {
    readonly type = BudgetActionTypes.ADDED;
    constructor(public payload: Budget) { }
}


export class Modified implements Action {
    readonly type = BudgetActionTypes.MODIFIED;
    constructor(public payload: Budget) { }
}

export class Removed implements Action {
    readonly type = BudgetActionTypes.REMOVED;
    constructor(public payload: Budget) { }
}







export type BudgetActions =
    | DefaultBudgetLoadedAction
    | LoadDefaultBudgetAction
    | Query
    | Modified
    | Removed
    | Added
    | UpdateBudget;

