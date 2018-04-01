import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadDefaultBudgetAction, BudgetActionTypes, DefaultBudgetLoadedAction, Query, Added, Modified, Removed, UpdateBudget } from './budget.actions';
import { Budget } from '../../../models/budget.model';

const budget01: Budget = {
    id: 'abcdef',
    name: 'My budget',
    dateStart: new Date(),
    dateEnd: null,
    totalCash: 1000,
    cashLeft: 500
};

const budget02: Budget = {
    id: 'b002',
    name: 'My budget 2',
    dateStart: new Date(),
    dateEnd: null,
    totalCash: 500,
    cashLeft: 10
};

describe('BudgetAction', () => {
    describe('LoadDefaultBudgetAction', () => {
        it('should create an action', () => {
            const action = new LoadDefaultBudgetAction('bl001');
            expect({ ...action }).toEqual({ type: BudgetActionTypes.LoadDefaultBudget, payload: 'bl001' });
        });
    });

    describe('DefaultBudgetLoadedAction', () => {
        it('should create an action', () => {
            const payload = budget01;
            const action = new DefaultBudgetLoadedAction(payload);
            expect({ ...action }).toEqual({
                type: BudgetActionTypes.DefaultBudgetLoaded,
                payload
            });
        });
    });

    describe('Query', () => {
        it('should create an action', () => {
            const payload = {
                budgetId: 'abcde'
            };
            const action = new Query(payload);
            expect({ ...action }).toEqual({
                type: BudgetActionTypes.QUERY,
                payload
            });
        });
    });


    describe('Added', () => {
        it('should create an action', () => {
            const payload: Budget = budget01;
            const action = new Added(payload);
            expect({ ...action }).toEqual({
                type: BudgetActionTypes.ADDED,
                payload
            });
        });
    });

    describe('Modified', () => {
        it('should create an action', () => {
            const payload: Budget = budget02;
            const action = new Modified(payload);
            expect({ ...action }).toEqual({
                type: BudgetActionTypes.MODIFIED,
                payload
            });
        });
    });

    describe('Removed', () => {
        it('should create an action', () => {
            const payload: Budget = budget01;
            const action = new Removed(payload);
            expect({ ...action }).toEqual({
                type: BudgetActionTypes.REMOVED,
                payload
            });
        });
    });

    describe('UpdateBudget', () => {
        it('should create an action', () => {
            const changes: Partial<Budget> = {
                id: budget01.id,
                cashLeft: 0
            };
            const payload = {
                budgetId: budget01.id,
                changes: changes
            };
            const action = new UpdateBudget(payload);
            expect({ ...action }).toEqual({
                type: BudgetActionTypes.UpdateBudget,
                payload
            });
        });
    });
});





