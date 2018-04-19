import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import { Expense } from '../../models/expense.model';
import { ExpenseActions, ExpenseActionTypes } from '../actions/expense.actions';

export interface FeatureState extends fromApp.AppState {
    expenses: State;
}

export const adapter = createEntityAdapter<Expense>();

export interface State extends EntityState<Expense> {
    // additional entity state properties
    selectedExpenseId: string | null;
}

export const initialState: State = adapter.getInitialState({
    selectedExpenseId: null
});

export function expenseReducer(state = initialState, action: ExpenseActions): State {
    switch (action.type) {
        case ExpenseActionTypes.AddExpense:
            return { ...state };
        case ExpenseActionTypes.ADDED:
            return adapter.addOne(action.payload, state);
        case ExpenseActionTypes.MODIFIED:
            return adapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
        case ExpenseActionTypes.REMOVED:
            return adapter.removeOne(action.payload.id, state);
        case ExpenseActionTypes.DeleteExpense:
            return { ...state };
        default: {
            return state;
        }
    }

}

export const getSelectedExpenseId = (state: State) => {
    return state.selectedExpenseId;
};

export const {
    // select the array of expense ids
    selectIds: selectExpenseIds,

    // select the dictionary of expense entities
    selectEntities: selectExpenseEntities,

    // select the array of expense
    selectAll: selectAllExpenses,

    // select the total expense count
    selectTotal: selectExpenseTotal

} = adapter.getSelectors();
