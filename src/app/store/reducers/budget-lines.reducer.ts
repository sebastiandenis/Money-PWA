import { Action } from '@ngrx/store';
import { BudgetLine } from '../../models/budget-line.model';
import { BudgetLinesActions, BudgetLinesActionTypes } from '../actions/budget-lines.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';


export const adapter = createEntityAdapter<BudgetLine>();

export interface State extends EntityState<BudgetLine> {
    // additional entity state properties
    selectedBudgetLineId: string | null;
}

export const initialState: State = adapter.getInitialState({
    selectedBudgetLineId: null
});

export function reducer(state = initialState, action: BudgetLinesActions): State {
    switch (action.type) {
        case BudgetLinesActionTypes.ADDED:
            return adapter.addOne(action.payload, state);
        case BudgetLinesActionTypes.MODIFIED:
            return adapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
        case BudgetLinesActionTypes.REMOVED:
            return adapter.removeOne(action.payload.id, state);
        case BudgetLinesActionTypes.LoadDefaultBudgetLines:
            return {
                ...state
            };
        case BudgetLinesActionTypes.SelectBudgetLine:
            return {
                ...state,
                selectedBudgetLineId: action.payload.budgetLineId
            };
        case BudgetLinesActionTypes.AddExpenseToBudgetLine:
            return adapter.updateOne(
                {
                    id: action.payload.id,
                    changes: action.payload.changes
                }, state
            );

        case BudgetLinesActionTypes.DefaultBudgetLinesLoaded:
            //    return handleDefaultBudgetLinesLoadedAction(state, <any>action);
            console.log('Action-> defaultBudgetLinesLoaded: ', action.payload);
            adapter.removeAll(state);
            return adapter.addMany(action.payload, state);

        case BudgetLinesActionTypes.CreateBudgetLine:
            return adapter.addOne(action.payload.budgetLine, state);

        case BudgetLinesActionTypes.UpdateBudgetLine:
            return adapter.updateOne({ id: action.payload.id, changes: action.payload.changes }, state);

        case BudgetLinesActionTypes.DeleteBudgetLine:
            return adapter.removeOne(action.payload.id, state);

        default: {
            return state;
        }
    }

}

export const getSelectedBudgetLineId = (state: State) => {
    console.log('getSelectedBudgetLineId: ', state.selectedBudgetLineId);
    return state.selectedBudgetLineId;
}

export const {
    // select the array of budget line ids
    selectIds: selectBudgetLineIds,

    // select the dictionary of budget line entities
    selectEntities: selectBudgetLineEntities,

    // select the array of budget lines
    selectAll: selectAllBudgetLines,

    // select the total budget line count
    selectTotal: selectBudgetLinesTotal

} = adapter.getSelectors();

