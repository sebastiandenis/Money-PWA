import * as fromApp from '../../../store/app.reducers';
import * as fromBudget from './budget.reducer';
import * as fromBudgetLine from './budget-line.reducer';
import * as fromExpense from './expense.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Budget } from '../../models/budget.model';


export interface FeatureState extends fromApp.AppState {
    budgets: State;
    budgetLines: State;
    expenses: State;
}

export interface State {
    budgets: fromBudget.State;
    budgetLines: fromBudgetLine.State;
    expenses: fromExpense.State;
}


export const reducers: ActionReducerMap<State> = {
    budgets: fromBudget.budgetReducer,
    budgetLines: fromBudgetLine.budgetLineReducer,
    expenses: fromExpense.expenseReducer
};


export const getBudgetModuleState = createFeatureSelector<State>('budgetModule');
export const getBudgetsState = createFeatureSelector<fromBudget.State>('budgets');
export const getBudgetLinesState = createFeatureSelector<fromBudgetLine.State>('budgetLines');
export const getExpensesState = createFeatureSelector<fromExpense.State>('expenses');

export const selectBudgetsState = createSelector(getBudgetModuleState, getBudgetsState);
export const selectBudgetLinesState = createSelector(getBudgetModuleState, getBudgetLinesState);
export const selectExpensesState = createSelector(getBudgetModuleState, getExpensesState);

// select the array of entities' ids
export const selectBudgetIds = createSelector(selectBudgetsState, fromBudget.selectBudgetIds);
export const selectBudgetLineIds = createSelector(selectBudgetLinesState, fromBudgetLine.selectBudgetLineIds);
export const selectExpenseIds = createSelector(selectExpensesState, fromExpense.selectExpenseIds);

// select the dictionary of entities
export const selectBudgets = createSelector(selectBudgetsState, fromBudget.selectBudgetEntities);
export const selectBudgetLines = createSelector(selectBudgetLinesState, fromBudgetLine.selectBudgetLineEntities);
export const selectExpenses = createSelector(selectExpensesState, fromExpense.selectExpenseEntities);

// select the array of entities
export const selectAllBudgets = createSelector(selectBudgetsState, fromBudget.selectAllBudgets);
export const selectAllBudgetLines = createSelector(selectBudgetLinesState, fromBudgetLine.selectAllBudgetLines);
export const selectAllExpenses = createSelector(selectExpensesState, fromExpense.selectAllExpenses);

// select the total entities count
export const selectBudgetTotal = createSelector(selectBudgetsState, fromBudget.selectBudgetTotal);
export const selectBudgetLineTotal = createSelector(selectBudgetLinesState, fromBudgetLine.selectBudgetLinesTotal);
export const selectExpenseTotal = createSelector(selectExpensesState, fromExpense.selectExpenseTotal);

// select selected entity id
export const selectCurrentBudgetId = createSelector(selectBudgetsState, fromBudget.getCurrentBudgetId);
export const selectCurrentBudgetLineId = createSelector(selectBudgetLinesState, fromBudgetLine.getSelectedBudgetLineId);
export const selectCurrentExpenseId = createSelector(selectExpensesState, fromExpense.getSelectedExpenseId);


// select selected entity
export const selectCurrentBudget = createSelector(
    selectBudgets,
    selectCurrentBudgetId,
    (budgetEntities, budgetId) => {
        return budgetEntities[budgetId];
    }
);
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
