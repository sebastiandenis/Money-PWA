import { Action } from '@ngrx/store';
import { BudgetLine } from '../../models/budget-line.model';
import { Update } from '@ngrx/entity';
import { BudgetActionTypes } from './budget.actions';


export enum BudgetLinesActionTypes {
    QUERY = '[BudgetLine] query Budget Lines',
    ADDED = '[BudgetLine] added',
    MODIFIED = '[BudgetLine] modified',
    REMOVED = '[BudgetLine] removed',
    CreateBudgetLine = '[BudgetLine] Create Budget Line',
    CreateBudgetLines = '[BudgetLine] Create Budget Lines',
    UpdateBudgetLine = '[BudgetLine] Update Budget Line',
    BudgetLineUpdated = '[BudgetLine] Budget Line Updated',
    DeleteBudgetLine = '[BudgetLine] Delete Budget Line',
    SelectBudgetLine = '[BudgetLine] Select Budget Line',



}

export class Query implements Action {
    readonly type = BudgetLinesActionTypes.QUERY;
    constructor(public payload: { budgetId: string }) { }
}

export class Added implements Action {
    readonly type = BudgetLinesActionTypes.ADDED;
    constructor(public payload: BudgetLine) { }
}


export class Modified implements Action {
    readonly type = BudgetLinesActionTypes.MODIFIED;
    constructor(public payload: BudgetLine) { }
}

export class Removed implements Action {
    readonly type = BudgetLinesActionTypes.REMOVED;
    constructor(public payload: BudgetLine) { }
}



export class SelectBudgetLineAction {
    readonly type = BudgetLinesActionTypes.SelectBudgetLine;
    constructor(public payload?: { budgetLineId: string }) {
    }
}

export class CreateBudgetLineAction implements Action {
    readonly type = BudgetLinesActionTypes.CreateBudgetLine;
    constructor(public payload: { budgetLine: BudgetLine }) {
    }
}

export class CreateBudgetLinesAction implements Action {
    readonly type = BudgetLinesActionTypes.CreateBudgetLines;
    constructor(public payload: { budgetLines: BudgetLine[] }) {
    }
}


export class UpdateBudgetLineAction implements Action {
    readonly type = BudgetLinesActionTypes.UpdateBudgetLine;
    constructor(public payload: { budgetId: string, id: string, changes: Partial<BudgetLine> }) {
    }
}

export class BudgetLineUpdatedAction implements Action {
    readonly type = BudgetLinesActionTypes.BudgetLineUpdated;
    constructor() { }
}

export class DeleteBudgetLineAction implements Action {
    readonly type = BudgetLinesActionTypes.DeleteBudgetLine;
    constructor(public payload: { id: string }) {
    }
}


export type BudgetLinesActions =
    Query |
    Added |
    Modified |
    Removed |
    CreateBudgetLineAction |
    CreateBudgetLinesAction |
    UpdateBudgetLineAction |
    BudgetLineUpdatedAction |
    DeleteBudgetLineAction |
    SelectBudgetLineAction;
