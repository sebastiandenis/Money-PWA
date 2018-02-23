import * as fromApp from '../../../store/app.reducers';
import * as fromBudget from './budget.reducer';
import * as fromBudgetLine from './budget-line.reducer';
import * as fromExpense from './expense.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Budget } from '../../../models/budget.model';


export interface FeatureState extends fromApp.AppState {
    budgetHeader: State;
    budgetLines: State;
    expenses: State;
}

export interface State {
    budgetHeader: fromBudget.State;
    budgetLines: fromBudgetLine.State;
    expenses: fromExpense.State;
}


export const reducers: ActionReducerMap<State> = {
    budgetHeader: fromBudget.budgetReducer,
    budgetLines: fromBudgetLine.budgetLineReducer,
    expenses: fromExpense.expenseReducer
};


export const getCurrentBudgetState = createFeatureSelector<State>('currentBudget');
export const getBudgetHeaderState = createFeatureSelector<fromBudget.State>('budgetHeader');
export const getBudgetLinesState = createFeatureSelector<fromBudgetLine.State>('budgetLines');
export const getExpenseState = createFeatureSelector<fromExpense.State>('expenses');

export const selectBudgetHeader = createSelector(getCurrentBudgetState, getBudgetHeaderState);
// export const selectBudget = createSelector(getBudgetHeaderState, fromBudget.getBudget);
export const selectBudgetLinesState = createSelector(getCurrentBudgetState, getBudgetLinesState);
export const selectExpensesState = createSelector(getCurrentBudgetState, getExpenseState);

// select the array of entities' ids
export const selectBudgetLineIds = createSelector(selectBudgetLinesState, fromBudgetLine.selectBudgetLineIds);
export const selectExpenseIds = createSelector(selectExpensesState, fromExpense.selectExpenseIds);

// select the dictionary of entities
export const selectBudgetLines = createSelector(selectBudgetLinesState, fromBudgetLine.selectBudgetLineEntities);
export const selectExpenses = createSelector(selectExpensesState, fromExpense.selectExpenseEntities);

// select the array of entities
export const selectAllBudgetLines = createSelector(selectBudgetLinesState, fromBudgetLine.selectAllBudgetLines);
export const selectAllExpenses = createSelector(selectExpensesState, fromExpense.selectAllExpenses);

// select the total entities count
export const selectBudgetLineTotal = createSelector(selectBudgetLinesState, fromBudgetLine.selectBudgetLinesTotal);
export const selectExpenseTotal = createSelector(selectExpensesState, fromExpense.selectExpenseTotal);

// select selected entity id
export const selectCurrentBudgetLineId = createSelector(selectBudgetLinesState, fromBudgetLine.getSelectedBudgetLineId);
export const selectCurrentExpenseId = createSelector(selectExpensesState, fromExpense.getSelectedExpenseId);


// select selected entity
export const selectCurrentBudgetLine = createSelector(
    selectBudgetLines,
    selectCurrentBudgetLineId,
    (budgetLineEntities, budgetLineId) => {
        return budgetLineEntities[budgetLineId];
    }
);

export const selectCurrentExpense = createSelector(
    selectExpenses,
    selectCurrentExpenseId,
    (expenseEntities, expenseId) => {
        return expenseEntities[expenseId];
    }
);
