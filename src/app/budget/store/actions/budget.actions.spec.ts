import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadDefaultBudgetAction, BudgetActionTypes, DefaultBudgetLoadedAction, ExpenseAdded } from './budget.actions';
import { Budget } from '../../../models/budget.model';

const budget01: Budget = {
    id: 'abcdef',
    name: 'My budget',
    dateStart: new Date(),
    dateEnd: null,
    totalCash: 1000,
    cashLeft: 500
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

    describe('ExpenseAdded', () => {
        it('should create an action', () => {
            const payload = {
                budgetId: 'abcde',
                newCashLeft: 1000
            };
            const action = new ExpenseAdded(payload);
            expect({ ...action }).toEqual({
                type: BudgetActionTypes.ExpenseAdded,
                payload
            });
        });
    });
});





