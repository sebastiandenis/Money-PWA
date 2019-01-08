import * as fromApp from "../../../store/app.reducers";
import * as fromBudget from "./budget.reducer";
import * as fromBudgetLine from "./budget-line.reducer";
import * as fromExpense from "./expense.reducer";
import * as fromShift from "./shift.reducer";
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";


export interface FeatureState extends fromApp.AppState {
    budgets: State;
    budgetLines: State;
    expenses: State;
    shifts: State;
}

export interface State {
    budgets: fromBudget.State;
    budgetLines: fromBudgetLine.State;
    expenses: fromExpense.State;
    shifts: fromShift.State;

}


export const reducers: ActionReducerMap<State> = {
    budgets: fromBudget.budgetReducer,
    budgetLines: fromBudgetLine.budgetLineReducer,
    expenses: fromExpense.expenseReducer,
    shifts: fromShift.shiftReducer
};


export const getBudgetModuleState = createFeatureSelector<State>("budgetModule");
export const getBudgetsState = createFeatureSelector<fromBudget.State>("budgets");
export const getBudgetLinesState = createFeatureSelector<fromBudgetLine.State>("budgetLines");
export const getExpensesState = createFeatureSelector<fromExpense.State>("expenses");
export const getShiftsState = createFeatureSelector<fromShift.State>("shifts");

export const selectBudgetsState = createSelector(getBudgetModuleState, getBudgetsState);
export const selectBudgetLinesState = createSelector(getBudgetModuleState, getBudgetLinesState);
export const selectExpensesState = createSelector(getBudgetModuleState, getExpensesState);
export const selectShiftsState = createSelector(getBudgetModuleState, getShiftsState);

// select the array of entities' ids
export const selectBudgetIds = createSelector(selectBudgetsState, fromBudget.selectBudgetIds);
export const selectBudgetLineIds = createSelector(selectBudgetLinesState, fromBudgetLine.selectBudgetLineIds);
export const selectExpenseIds = createSelector(selectExpensesState, fromExpense.selectExpenseIds);
export const selectShiftIds = createSelector(selectShiftsState, fromShift.selectShiftIds);

// select the dictionary of entities
export const selectBudgets = createSelector(selectBudgetsState, fromBudget.selectBudgetEntities);
export const selectBudgetLines = createSelector(selectBudgetLinesState, fromBudgetLine.selectBudgetLineEntities);
export const selectExpenses = createSelector(selectExpensesState, fromExpense.selectExpenseEntities);
export const selectShifts = createSelector(selectShiftsState, fromShift.selectShiftEntities);

// select the array of entities
export const selectAllBudgets = createSelector(selectBudgetsState, fromBudget.selectAllBudgets);
export const selectAllBudgetLines = createSelector(selectBudgetLinesState, fromBudgetLine.selectAllBudgetLines);
export const selectAllExpenses = createSelector(selectExpensesState, fromExpense.selectAllExpenses);
export const selectAllShifts = createSelector(selectShiftsState, fromShift.selectAllShifts);

// select the total entities count
export const selectBudgetTotal = createSelector(selectBudgetsState, fromBudget.selectBudgetTotal);
export const selectBudgetLineTotal = createSelector(selectBudgetLinesState, fromBudgetLine.selectBudgetLinesTotal);
export const selectExpenseTotal = createSelector(selectExpensesState, fromExpense.selectExpenseTotal);
export const selectShiftTotal = createSelector(selectShiftsState, fromShift.selectShiftTotal);

// select selected entity id
export const selectCurrentBudgetId = createSelector(selectBudgetsState, fromBudget.getCurrentBudgetId);
export const selectCurrentBudgetLineId = createSelector(selectBudgetLinesState, fromBudgetLine.getSelectedBudgetLineId);
export const selectCurrentExpenseId = createSelector(selectExpensesState, fromExpense.getSelectedExpenseId);
export const selectCurrentShiftId = createSelector(selectShiftsState, fromShift.getSelectedShiftId);


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

export const selectCurrentShift = createSelector(
  selectShifts,
  selectCurrentShiftId,
  (shiftEntities, shiftId) => {
      return shiftEntities[shiftId];
  }
);
