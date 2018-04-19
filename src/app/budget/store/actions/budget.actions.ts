import { Action } from '@ngrx/store';
import { Budget } from '../../models/budget.model';


export enum BudgetActionTypes {
    QUERY = '[Budget] query Budgets',
    ADDED = '[Budget] added',
    MODIFIED = '[Budget] modified',
    REMOVED = '[Budget] removed',
    UpdateBudget = '[Budget] Update',
    SetCurrentBudget = '[Budget] Set Current Budget'
}



// ------------------------------------------------------------- BUDGET ACTIONS

export class SetCurrentBudget implements Action {
    readonly type: string = BudgetActionTypes.SetCurrentBudget;
    constructor(public payload: { budgetId: string }) { }
}

export class UpdateBudget implements Action {
    readonly type = BudgetActionTypes.UpdateBudget;
    constructor(public payload?: { budgetId: string, changes: Partial<Budget> }) {
    }
}

export class Query implements Action {
    readonly type = BudgetActionTypes.QUERY;
    constructor(public payload: { userId: string }) {
       // console.log('Budget.Query():', this.payload.userId);
     }
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
    | Query
    | Modified
    | Removed
    | Added
    | UpdateBudget
    | SetCurrentBudget;

