import * as fromBudgetReducer from './budget.reducer';
import { BudgetActions, LoadDefaultBudgetAction, DefaultBudgetLoadedAction, ExpenseAdded } from '../actions/budget.actions';
import { State } from './budget.reducer';
import { Budget } from '../../../models/budget.model';

export const myState: State = {
    //   budgetHeader2: {
    id: 'b001',
    name: 'My budget',
    dateStart: new Date(),
    dateEnd: undefined,
    totalCash: 5000,
    cashLeft: 1400
    //   }
};

describe('BudgetReducer', () => {
    describe('undefined action', () => {
        it('should return the default state', () => {
            const { initialState } = fromBudgetReducer;
            const action: BudgetActions = {
                type: undefined
            };
            const state = fromBudgetReducer.budgetReducer(undefined, action);
            expect(state).toBe(initialState);
        });
    });

    describe('LoadDefaultBudget action', () => {
        it('should return payload', () => {
            const action: BudgetActions = new LoadDefaultBudgetAction('b001');
            const state = fromBudgetReducer.budgetReducer(myState, action);

            expect(state.id).toEqual('b001');
            expect(state.name).toEqual('My budget');
            expect(state.dateEnd).toEqual(undefined);
            expect(state.totalCash).toEqual(5000);
            expect(state.cashLeft).toEqual(1400);
        });
    });


    describe('DefaultBudgetLoaded action', () => {
        it('should return new state', () => {
            const budget: Budget = {
                id: 'b002',
                name: 'Nowy budżet',
                dateStart: null,
                dateEnd: null,
                totalCash: 10000,
                cashLeft: 5000
            };
            const action: BudgetActions = new DefaultBudgetLoadedAction(budget);
            const { initialState } = fromBudgetReducer;
            const state = fromBudgetReducer.budgetReducer(initialState, action);

            expect(state.id).toEqual('b002');
            expect(state.name).toEqual('Nowy budżet');
            expect(state.dateStart).toEqual(null);
            expect(state.dateEnd).toEqual(null);
            expect(state.totalCash).toEqual(10000);
            expect(state.cashLeft).toEqual(5000);
        });
    });

    describe('ExpenseAdded action', () => {
        it('should update cashLeft property', () => {
            const payload = {
                budgetId: 'b002',
                newCashLeft: 1000
            };
            const action: BudgetActions = new ExpenseAdded(payload);
            const { initialState } = fromBudgetReducer;
            const state = fromBudgetReducer.budgetReducer(initialState, action);

            expect(state.id).toEqual(undefined);
            expect(state.cashLeft).toEqual(1000);
        });
    });
});

