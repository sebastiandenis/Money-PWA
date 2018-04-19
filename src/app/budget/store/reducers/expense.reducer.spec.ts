import * as fromExpenseReducer from './expense.reducer';
import { Expense } from '../../models/expense.model';
import { State } from './expense.reducer';
import { ExpenseActions, AddExpense, Added, Modified, Removed, DeleteExpense } from '../actions/expense.actions';


const expense01: Expense = {
    id: 'exp001',
    amount: 100
};

const expense02: Expense = {
    id: 'exp002',
    amount: 50,
    description: 'Duży wydatek'
};

const expense03: Expense = {
    id: 'exp003',
    amount: 10,
    description: 'Lizak'
};

const expensesArray: Expense[] = [
    expense01, expense02
];

const myState: State = {
    selectedExpenseId: null,
    ids: [expense01.id, expense02.id],
    entities: {
        [expense01.id]: expense01,
        [expense02.id]: expense02
    }
};



describe('ExpenseReducer', () => {
    describe('undefined action', () => {
        it('should return the default state', () => {
            const { initialState } = fromExpenseReducer;
            const action: ExpenseActions = {
                type: undefined
            };
            const state = fromExpenseReducer.expenseReducer(undefined, action);
            expect(state).toBe(initialState);
        });
    });

    describe('AddExpense action', () => {
        it('should return state', () => {
            const expenseToAdd: Expense = {
                id: 'exp003',
                amount: 100
            };
            const payload = {
                expense: expenseToAdd,
                budgetId: 'b001',
                budgetLineId: 'bl001',
                newBudgetLineCashLeft: 10,
                newBudgetCashLeft: 100
            };
            const action: ExpenseActions = new AddExpense(payload);
            const { initialState } = fromExpenseReducer;
            const state = fromExpenseReducer.expenseReducer(initialState, action);

            expect(state.selectedExpenseId).toEqual(null);
            expect(state.ids.length).toEqual(0);
            expect(state.entities['exp003']).toBeUndefined();
        });
    });


    describe('Added action', () => {
        it('should add the expense to the state', () => {

            const action: ExpenseActions = new Added(expense03);
            const { initialState } = fromExpenseReducer;
            const state = fromExpenseReducer.expenseReducer(initialState, action);

            expect(state.selectedExpenseId).toEqual(null);
            expect(state.ids.length).toEqual(1);
            expect(state.entities[expense03.id]).toBeDefined();
            expect(state.entities[expense03.id].id).toEqual(expense03.id);
            expect(state.entities[expense03.id].amount).toEqual(expense03.amount);
            expect(state.entities[expense03.id].description).toEqual(expense03.description);
            expect(state.entities[expense03.id].when).toEqual(expense03.when);
        });
    });

    describe('Modified action', () => {
        it('should modify the expense', () => {
            const expenseModified: Expense = {
                id: expense02.id,
                amount: 66,
                description: expense02.description,
                when: expense02.when
            };

            const action: ExpenseActions = new Modified(expenseModified);
            // const { initialState } = fromExpenseReducer;
            const state = fromExpenseReducer.expenseReducer(myState, action);

            expect(state.selectedExpenseId).toEqual(null);
            expect(state.ids.length).toEqual(myState.ids.length);
            expect(state.entities[expense02.id].id).toEqual(expenseModified.id);
            expect(state.entities[expense02.id].amount).toEqual(expenseModified.amount);
            expect(state.entities[expense02.id].description).toEqual(expenseModified.description);
            expect(state.entities[expense02.id].when).toEqual(expenseModified.when);
        });
    });


    describe('Removed action', () => {
        it('should modify the expense', () => {
            const removedExpense: Expense = expense01;

            const action: ExpenseActions = new Removed(removedExpense);
            // const { initialState } = fromExpenseReducer;
            const state = fromExpenseReducer.expenseReducer(myState, action);

            expect(state.selectedExpenseId).toEqual(null);
            expect(state.ids.length).toEqual(1);
            expect(state.entities[expense01.id]).toBeUndefined();
            expect(state.entities[expense02.id].id).toEqual(expense02.id);
            expect(state.entities[expense02.id].amount).toEqual(expense02.amount);
            expect(state.entities[expense02.id].description).toEqual(expense02.description);
            expect(state.entities[expense02.id].when).toEqual(expense02.when);
        });
    });

    describe('Delete expense action', () => {
        it('should not modify the state', () => {
            const removedExpense: Expense = expense01;

            const action: ExpenseActions = new DeleteExpense({
                expense: removedExpense,
                budgetLineId: null,
                budgetId: null
            });
            // const { initialState } = fromExpenseReducer;
            const state = fromExpenseReducer.expenseReducer(myState, action);

            expect(state.selectedExpenseId).toEqual(myState.selectedExpenseId);
            expect(state.ids.length).toEqual(myState.ids.length);
            expect(state.entities[expense01.id]).toBeDefined();
            expect(state.entities[expense02.id].id).toEqual(expense02.id);
            expect(state.entities[expense02.id].amount).toEqual(expense02.amount);
            expect(state.entities[expense02.id].description).toEqual(expense02.description);
            expect(state.entities[expense02.id].when).toEqual(expense02.when);
        });
    });


});

