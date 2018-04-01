import * as fromBudgetReducer from './budget.reducer';
import {
    BudgetActions, LoadDefaultBudgetAction, DefaultBudgetLoadedAction, UpdateBudget
} from '../actions/budget.actions';
import { State } from './budget.reducer';
import { Budget } from '../../../models/budget.model';



export const budget01: Budget = {
    id: 'b001',
    name: 'My budget',
    dateStart: new Date(),
    dateEnd: undefined,
    totalCash: 5000,
    cashLeft: 1400
};

export const budget02: Budget = {
    id: 'b002',
    name: 'Nowy budżet',
    dateStart: null,
    dateEnd: null,
    totalCash: 10000,
    cashLeft: 5000
};


export const myState: State = {
    ...budget01
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
        it('should return state', () => {
            const action: BudgetActions = new LoadDefaultBudgetAction(budget01.id);
            const state = fromBudgetReducer.budgetReducer(myState, action);

            expect(state.id).toEqual(myState.id);
            expect(state.name).toEqual(myState.name);
            expect(state.dateEnd).toEqual(myState.dateEnd);
            expect(state.totalCash).toEqual(myState.totalCash);
            expect(state.cashLeft).toEqual(myState.cashLeft);
        });
    });


    describe('DefaultBudgetLoaded action', () => {
        it('should return new state', () => {
            const budget: Budget = budget02;
            const action: BudgetActions = new DefaultBudgetLoadedAction(budget);
            const { initialState } = fromBudgetReducer;
            const state = fromBudgetReducer.budgetReducer(initialState, action);

            expect(state.id).toEqual(budget.id);
            expect(state.name).toEqual(budget.name);
            expect(state.dateStart).toEqual(budget.dateStart);
            expect(state.dateEnd).toEqual(budget.dateEnd);
            expect(state.totalCash).toEqual(budget.totalCash);
            expect(state.cashLeft).toEqual(budget.cashLeft);
        });
    });

    describe('UpdateBudget action', () => {
        it('should update the state', () => {
            const changes: Partial<Budget> = {
                cashLeft: budget02.cashLeft,
                totalCash: 0,
                name: 'Update budget'
            };
            const payload = {
                budgetId: budget01.id,
                changes: changes
            };

            const action: BudgetActions = new UpdateBudget(payload);
            const { initialState } = fromBudgetReducer;
            const state = fromBudgetReducer.budgetReducer(myState, action);

            expect(state.id).toEqual(budget01.id);
            expect(state.name).toEqual(payload.changes.name);
            expect(state.cashLeft).toEqual(payload.changes.cashLeft);
            expect(state.totalCash).toEqual(payload.changes.totalCash);
            expect(state.dateStart).toEqual(budget01.dateStart);
            expect(state.dateEnd).toEqual(budget01.dateEnd);

        });
    });

    describe('Query action', () => {
        it('should...', () => {

        });
    });


});

