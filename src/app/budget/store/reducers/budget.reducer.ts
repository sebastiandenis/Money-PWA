import { Budget } from '../../models/budget.model';
import { Action, createSelector, createFeatureSelector } from '@ngrx/store';
import {
    BudgetActions, BudgetActionTypes,
    Modified, UpdateBudget, Removed, Added, SetCurrentBudget
} from '../actions/budget.actions';
import { BudgetEffects } from '../effects/budget.effects';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as fromApp from '../../../store/app.reducers';



export interface FeatureState extends fromApp.AppState {
    budgets: State;
}

// tslint:disable-next-line:no-empty-interface



export const adapter = createEntityAdapter<Budget>();

export interface State extends EntityState<Budget> {
    currentBudgetId: string | null;
}

export const initialState: State = adapter.getInitialState({
    currentBudgetId: null
});

/*
export const initialState: State = {
    //   budgetHeader2: {
    id: undefined,
    name: undefined,
    dateStart: undefined,
    dateEnd: undefined,
    totalCash: 0,
    cashLeft: 0
    //   }
};
*/

export function budgetReducer(state = initialState, action: BudgetActions): State {
    switch (action.type) {
        case BudgetActionTypes.UpdateBudget:
            return handleUpdateBudget(state, <any>action);
        case BudgetActionTypes.MODIFIED:
            return handleModifiedAction(state, <any>action);
        case BudgetActionTypes.ADDED:
            return handleAddedAction(state, <any>action);
        case BudgetActionTypes.REMOVED:
            return handleRemovedAction(state, <any>action);
        case BudgetActionTypes.SetCurrentBudget:
            return handleSetCurrentBudget(state, <any>action);
        case BudgetActionTypes.QUERY:
            return {...state};
        default:
            return state;
    }
}
// return adapter.addOne(action.payload, state);

function handleUpdateBudget(state: State, action: UpdateBudget): State {
    return adapter.updateOne({ id: action.payload.budgetId, changes: action.payload.changes }, state);
}

function handleSetCurrentBudget(state: State, action: SetCurrentBudget) {
    return {
        ...state,
        currentBudgetId: action.payload.budgetId
    };
}

function handleAddedAction(state: State, action: Added) {
    return adapter.addOne(action.payload, state);
}

function handleRemovedAction(state: State, action: Removed) {
    return adapter.removeOne(action.payload.id, state);
}

function handleModifiedAction(state: State, action: Modified): State {
    return adapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
}



// export function getBudget(state: State) {
//     return state;
// }


export const getCurrentBudgetId = (state: State) => {
    return state.currentBudgetId;
};

export const {
    // select the array of expense ids
    selectIds: selectBudgetIds,

    // select the dictionary of expense entities
    selectEntities: selectBudgetEntities,

    // select the array of expense
    selectAll: selectAllBudgets,

    // select the total expense count
    selectTotal: selectBudgetTotal

} = adapter.getSelectors();
