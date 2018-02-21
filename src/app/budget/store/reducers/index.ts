import * as fromApp from '../../../store/app.reducers';
import * as fromBudget from './budget.reducer';

import * as fromBudgetLine from './budget-line.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Budget } from '../../../models/budget.model';


export interface FeatureState extends fromApp.AppState {
    budgetHeader: State;
    budgetLines: State;
}

export interface State {
    budgetHeader: fromBudget.State;
    budgetLines: fromBudgetLine.State;
}


export const reducers: ActionReducerMap<State> = {
    budgetHeader: fromBudget.budgetReducer,
    budgetLines: fromBudgetLine.budgetLineReducer
};


export const getCurrentBudgetState = createFeatureSelector<State>('currentBudget');
export const getBudgetHeaderState = createFeatureSelector<fromBudget.State>('budgetHeader');
export const getBudgetLinesState = createFeatureSelector<fromBudgetLine.State>('budgetLines');

export const selectBudgetHeader = createSelector(getCurrentBudgetState, getBudgetHeaderState);
export const selectBudget = createSelector(getBudgetHeaderState, fromBudget.getBudget);

export const selectBudgetLinesState = createSelector(getCurrentBudgetState, getBudgetLinesState);

export const selectBudgetLineIds = createSelector(selectBudgetLinesState, fromBudgetLine.selectBudgetLineIds);
export const selectBudgetLines = createSelector(selectBudgetLinesState, fromBudgetLine.selectBudgetLineEntities);
export const selectAllBudgetLines = createSelector(selectBudgetLinesState, fromBudgetLine.selectAllBudgetLines);
export const selectBudgetLineTotal = createSelector(selectBudgetLinesState, fromBudgetLine.selectBudgetLinesTotal);
export const selectCurrentBudgetLineId = createSelector(selectBudgetLinesState, fromBudgetLine.getSelectedBudgetLineId);


export const selectCurrentBudgetLine = createSelector(
    selectBudgetLines,
    selectCurrentBudgetLineId,
    (budgetLineEntities, budgetLineId) => {
        return budgetLineEntities[budgetLineId];
    }
);
