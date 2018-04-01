import {
    Query,
    BudgetLinesActionTypes,
    Added, Modified, Removed,
    SelectBudgetLineAction, LoadDefaultBudgetLinesAction, DefaultBudgetLinesLoadedAction,
    CreateBudgetLineAction, CreateBudgetLinesAction,
    UpdateBudgetLineAction, BudgetLineUpdatedAction,
    DeleteBudgetLineAction
} from './budget-lines.actions';
import { BudgetLine } from '../../../models/budget-line.model';

const budgetLine01: BudgetLine = {
    id: 'bgline01',
    name: 'Food',
    cashLeft: 100,
    cashToSpend: 900
};

const budgetLine02: BudgetLine = {
    id: 'bgline02',
    name: 'Car',
    cashLeft: 45.5,
    cashToSpend: 100
};

const budgetLineArray: BudgetLine[] = [
    budgetLine01, budgetLine02
];

describe('BudgetLinesAction', () => {
    describe('Query', () => {
        it('should create an action', () => {
            const payload = {
                budgetId: 'abcde',
            };
            const action = new Query(payload);
            expect({ ...action }).toEqual({
                type: BudgetLinesActionTypes.QUERY,
                payload
            });
        });
    });


    describe('Added', () => {
        it('should create an action', () => {
            const payload: BudgetLine = budgetLine01;
            const action = new Added(payload);
            expect({ ...action }).toEqual({
                type: BudgetLinesActionTypes.ADDED,
                payload
            });
        });
    });

    describe('Modified', () => {
        it('should create an action', () => {
            const payload: BudgetLine = budgetLine02;
            const action = new Modified(payload);
            expect({ ...action }).toEqual({
                type: BudgetLinesActionTypes.MODIFIED,
                payload
            });
        });
    });

    describe('Removed', () => {
        it('should create an action', () => {
            const payload: BudgetLine = budgetLine01;
            const action = new Removed(payload);
            expect({ ...action }).toEqual({
                type: BudgetLinesActionTypes.REMOVED,
                payload
            });
        });
    });

    describe('SelectBudgetLineAction', () => {
        it('should create an action', () => {
            const payload = { budgetLineId: 'bl001' };
            const action = new SelectBudgetLineAction(payload);
            expect({ ...action }).toEqual({
                type: BudgetLinesActionTypes.SelectBudgetLine,
                payload
            });
        });
    });

    describe('LoadDefaultBudgetLinesAction', () => {
        it('should create an action', () => {
            const payload = { budgetId: 'b001' };
            const action = new LoadDefaultBudgetLinesAction(payload);
            expect({ ...action }).toEqual({
                type: BudgetLinesActionTypes.LoadDefaultBudgetLines,
                payload
            });
        });
    });

    describe('DefaultBudgetLinesLoadedAction', () => {
        it('should create an action', () => {
            const payload = budgetLineArray;
            const action = new DefaultBudgetLinesLoadedAction(payload);
            expect({ ...action }).toEqual({
                type: BudgetLinesActionTypes.DefaultBudgetLinesLoaded,
                payload
            });
        });
    });

    describe('CreateBudgetLineAction', () => {
        it('should create an action', () => {
            const changes: Partial<BudgetLine> = {
                name: 'Nowa nazwa linii'
            };
            const payload = {
                budgetLine: budgetLine01
            };
            const action = new CreateBudgetLineAction(payload);
            expect({ ...action }).toEqual({
                type: BudgetLinesActionTypes.CreateBudgetLine,
                payload
            });
        });
    });

    describe('CreateBudgetLinesAction', () => {
        it('should create an action', () => {
            const payload = {
                budgetLines: budgetLineArray
            };
            const action = new CreateBudgetLinesAction(payload);
            expect({ ...action }).toEqual({
                type: BudgetLinesActionTypes.CreateBudgetLines,
                payload
            });
        });
    });

    describe('UpdateBudgetLineAction', () => {
        it('should create an action', () => {
            const changes: Partial<BudgetLine> = {
                name: 'Nowa nazwa linii'
            };
            const payload = {
                budgetId: 'b001',
                id: 'bl001',
                changes: changes
            };
            const action = new UpdateBudgetLineAction(payload);
            expect({ ...action }).toEqual({
                type: BudgetLinesActionTypes.UpdateBudgetLine,
                payload
            });
        });
    });

    describe('BudgetLineUpdatedAction', () => {
        it('should create an action', () => {
            const action = new BudgetLineUpdatedAction();
            expect({ ...action }).toEqual({
                type: BudgetLinesActionTypes.BudgetLineUpdated
            });
        });
    });

    describe('DeleteBudgetLineAction', () => {
        it('should create an action', () => {
            const payload = {
                id: 'bl001'
            };
            const action = new DeleteBudgetLineAction(payload);
            expect({ ...action }).toEqual({
                type: BudgetLinesActionTypes.DeleteBudgetLine,
                payload
            });
        });
    });

});




