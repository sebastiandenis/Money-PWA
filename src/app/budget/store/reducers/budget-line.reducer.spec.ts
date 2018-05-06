import * as fromBudgetLineReducer from './budget-line.reducer';
import {
  BudgetLinesActions,
  Added,
  Modified,
  Removed,
  SelectBudgetLineAction,
  CreateBudgetLineAction,
  UpdateBudgetLineAction,
  DeleteBudgetLineAction
} from '../actions/budget-lines.actions';
import { BudgetLine } from '../../models/budget-line.model';
import { State } from './budget-line.reducer';

describe('BudgetLineReducer', () => {
  let budgetLine01: BudgetLine;
  let budgetLine02: BudgetLine;
  let budgetLinesArray: BudgetLine[];
  let myState: State;

  beforeEach(() => {
    budgetLine01 = {
      id: 'bl001',
      name: 'Nowa linia',
      cashToSpend: 1000,
      cashLeft: 500
    };

    budgetLine02 = {
      id: 'bl002',
      name: 'Linia 2',
      cashToSpend: 340,
      cashLeft: 22.5
    };

    budgetLinesArray = [budgetLine01, budgetLine02];

    myState = {
      selectedBudgetLineId: null,
      ids: [budgetLine01.id, budgetLine02.id],
      entities: {
        [budgetLine01.id]: budgetLine01,
        [budgetLine02.id]: budgetLine02
      }
    };
  });

  it('#undefined action should return the default state', () => {
    const { initialState } = fromBudgetLineReducer;
    const action: BudgetLinesActions = {
      type: undefined
    };
    const state = fromBudgetLineReducer.budgetLineReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('#Added action should create new entity', () => {
    const action: BudgetLinesActions = new Added(budgetLine01);
    const { initialState } = fromBudgetLineReducer;
    const state = fromBudgetLineReducer.budgetLineReducer(initialState, action);

    expect(state.selectedBudgetLineId).toEqual(null);
    expect(state.ids.length).toEqual(1);
    expect(state.ids[0]).toEqual(budgetLine01.id);
    expect(state.entities[budgetLine01.id]).toEqual({
      id: budgetLine01.id,
      name: budgetLine01.name,
      cashToSpend: budgetLine01.cashToSpend,
      cashLeft: budgetLine01.cashLeft
    });
  });

  it('#Modified action should modify the entity', () => {
    const updatedBudgetLine: BudgetLine = {
      id: 'bl002',
      name: 'Linia zaktualizowana',
      cashToSpend: 300,
      cashLeft: 0
    };
    const action: BudgetLinesActions = new Modified(updatedBudgetLine);
    // const { initialState } = fromBudgetLineReducer;
    const state = fromBudgetLineReducer.budgetLineReducer(myState, action);

    expect(state.selectedBudgetLineId).toEqual(null);
    expect(state.ids.length).toEqual(2);
    expect(state.ids[0]).toEqual(myState.ids[0]);
    expect(state.ids[1]).toEqual(myState.ids[1]);
    expect(state.entities[updatedBudgetLine.id]).toEqual({
      id: updatedBudgetLine.id,
      name: updatedBudgetLine.name,
      cashToSpend: updatedBudgetLine.cashToSpend,
      cashLeft: updatedBudgetLine.cashLeft
    });
  });

  it('#Removed action should remove the entity', () => {
    const entityToRemove: BudgetLine = {
      ...budgetLine02
    };
    const action: BudgetLinesActions = new Removed(entityToRemove);
    // const { initialState } = fromBudgetLineReducer;
    const state = fromBudgetLineReducer.budgetLineReducer(myState, action);

    expect(state.selectedBudgetLineId).toEqual(null);
    expect(state.ids.length).toEqual(1);
    expect(state.ids[0]).toEqual(myState.ids[0]);
    expect(state.entities[budgetLine01.id].id).toEqual(budgetLine01.id);
    expect(state.entities[budgetLine02.id]).toBeUndefined();
  });

  it('#SelectBudgetLine action should select the entity', () => {
    const payload = {
      budgetLineId: 'bl002'
    };
    const action: BudgetLinesActions = new SelectBudgetLineAction(payload);
    // const { initialState } = fromBudgetLineReducer;
    const state = fromBudgetLineReducer.budgetLineReducer(myState, action);

    expect(state.selectedBudgetLineId).toEqual(payload.budgetLineId);
    expect(state.ids.length).toEqual(2);
    expect(state.ids[0]).toEqual(budgetLine01.id);
    expect(state.entities[payload.budgetLineId].id).toEqual(budgetLine02.id);
  });

  it('#CreateBudgetLine action should create the entity', () => {
    const newBudgetLine: BudgetLine = {
      id: 'bl003',
      name: 'Linia 3',
      cashLeft: 100,
      cashToSpend: 1000
    };
    const action: BudgetLinesActions = new CreateBudgetLineAction({
      budgetLine: newBudgetLine
    });
    const { initialState } = fromBudgetLineReducer;
    const state = fromBudgetLineReducer.budgetLineReducer(initialState, action);

    expect(state.selectedBudgetLineId).toEqual(null);
    expect(state.ids.length).toEqual(1);
    expect(state.ids[0]).toEqual(newBudgetLine.id);
    expect(state.entities[newBudgetLine.id].id).toEqual(newBudgetLine.id);
    expect(state.entities[newBudgetLine.id].cashToSpend).toEqual(
      newBudgetLine.cashToSpend
    );
    expect(state.entities[newBudgetLine.id].cashLeft).toEqual(
      newBudgetLine.cashLeft
    );
    expect(state.entities[newBudgetLine.id].name).toEqual(newBudgetLine.name);
  });

  it('#UpdateBudgetLine action should update the entity', () => {
    const changes: Partial<BudgetLine> = {
      name: 'Linia zaktualizowana',
      cashToSpend: 999
    };
    const payload = {
      budgetId: 'b001',
      id: budgetLine02.id,
      changes: changes
    };
    const action: BudgetLinesActions = new UpdateBudgetLineAction(payload);
    // const { initialState } = fromBudgetLineReducer;
    const state = fromBudgetLineReducer.budgetLineReducer(myState, action);

    expect(state.selectedBudgetLineId).toEqual(null);
    expect(state.ids.length).toEqual(2);
    expect(state.ids[0]).toEqual(myState.ids[0]);
    expect(state.entities[budgetLine02.id].id).toEqual(payload.id);
    expect(state.entities[budgetLine02.id].cashToSpend).toEqual(
      changes.cashToSpend
    );
    expect(state.entities[budgetLine02.id].cashLeft).toEqual(
      budgetLine02.cashLeft
    );
    expect(state.entities[budgetLine02.id].name).toEqual(changes.name);
  });

  it('#DeleteBudgetLine action should delete the entity', () => {
    const budgetLineIdToDelete = budgetLine02.id;
    const action: BudgetLinesActions = new DeleteBudgetLineAction({
      id: budgetLineIdToDelete
    });
    // const { initialState } = fromBudgetLineReducer;
    const state = fromBudgetLineReducer.budgetLineReducer(myState, action);

    expect(state.selectedBudgetLineId).toEqual(null);
    expect(state.ids.length).toEqual(1);
    expect(state.ids[0]).toEqual(myState.ids[0]);
    expect(state.ids[1]).toBeUndefined();
    expect(state.entities[budgetLine01.id].id).toEqual(budgetLine01.id);
    expect(state.entities[budgetLine02.id]).toBeUndefined();
  });
});
