import * as fromBudgetLineReducer from './budget-line.reducer';
import {
    BudgetLinesActions, Added, Modified,
    Removed, SelectBudgetLineAction, ExpenseAdded,
    DefaultBudgetLinesLoadedAction,
    CreateBudgetLineAction,
    UpdateBudgetLineAction,
    DeleteBudgetLineAction
} from '../actions/budget-lines.actions';
import { BudgetLine } from '../../../models/budget-line.model';
import { State } from './budget-line.reducer';


const budgetLine01: BudgetLine = {
    id: 'bl001',
    name: 'Nowa linia',
    cashToSpend: 1000,
    cashLeft: 500
};

const budgetLine02: BudgetLine = {
    id: 'bl002',
    name: 'Linia 2',
    cashToSpend: 340,
    cashLeft: 22.5
};

const budgetLinesArray: BudgetLine[] = [
    budgetLine01, budgetLine02
];




const myState: State = {
    selectedBudgetLineId: null,
    ids: [budgetLine01.id, budgetLine02.id],
    entities: {
        [budgetLine01.id]: budgetLine01,
        [budgetLine02.id]: budgetLine02
    }
};


describe('BudgetLineReducer', () => {
    describe('undefined action', () => {
        it('should return the default state', () => {
            const { initialState } = fromBudgetLineReducer;
            const action: BudgetLinesActions = {
                type: undefined
            };
            const state = fromBudgetLineReducer.budgetLineReducer(undefined, action);
            expect(state).toBe(initialState);
        });
    });

    describe('Added action', () => {
        it('should create new entity', () => {
            const action: BudgetLinesActions = new Added(budgetLine01);
            const { initialState } = fromBudgetLineReducer;
            const state = fromBudgetLineReducer.budgetLineReducer(initialState, action);

            expect(state.selectedBudgetLineId).toEqual(null);
            expect(state.ids.length).toEqual(1);
            expect(state.ids[0]).toEqual(budgetLine01.id);
            expect(state.entities['bl001']).toEqual({
                id: budgetLine01.id,
                name: budgetLine01.name,
                cashToSpend: budgetLine01.cashToSpend,
                cashLeft: budgetLine01.cashLeft
            });
        });
    });

    describe('Modified action', () => {
        it('should modify the entity', () => {
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
            expect(state.ids[0]).toEqual('bl001');
            expect(state.ids[1]).toEqual('bl002');
            expect(state.entities['bl002']).toEqual({
                id: updatedBudgetLine.id,
                name: updatedBudgetLine.name,
                cashToSpend: updatedBudgetLine.cashToSpend,
                cashLeft: updatedBudgetLine.cashLeft
            });
        });
    });


    describe('Removed action', () => {
        it('should remove the entity', () => {
            const entityToRemove: BudgetLine = {
                id: 'bl002',
                name: 'Linia zaktualizowana',
                cashToSpend: 300,
                cashLeft: 0
            };
            const action: BudgetLinesActions = new Removed(entityToRemove);
            // const { initialState } = fromBudgetLineReducer;
            const state = fromBudgetLineReducer.budgetLineReducer(myState, action);

            expect(state.selectedBudgetLineId).toEqual(null);
            expect(state.ids.length).toEqual(1);
            expect(state.ids[0]).toEqual('bl001');
            expect(state.entities['bl001'].id).toEqual(budgetLine01.id);
            expect(state.entities['bl002']).toBeUndefined();
        });
    });

    describe('SelectBudgetLine action', () => {
        it('should select the entity', () => {
            const payload = {
                budgetLineId: 'bl002'
            };
            const action: BudgetLinesActions = new SelectBudgetLineAction(payload);
            // const { initialState } = fromBudgetLineReducer;
            const state = fromBudgetLineReducer.budgetLineReducer(myState, action);

            expect(state.selectedBudgetLineId).toEqual(payload.budgetLineId);
            expect(state.ids.length).toEqual(2);
            expect(state.ids[0]).toEqual(budgetLine01.id);
            expect(state.entities['bl002'].id).toEqual(budgetLine02.id);
        });
    });

    describe('ExpenseAdded action', () => {
        it('should update the entity', () => {
            const payload = {
                budgetId: 'b001',
                budgetLineId: 'bl002',
                newCashLeft: 10
            };
            const action: BudgetLinesActions = new ExpenseAdded(payload);
            // const { initialState } = fromBudgetLineReducer;
            const state = fromBudgetLineReducer.budgetLineReducer(myState, action);

            expect(state.selectedBudgetLineId).toEqual(null);
            expect(state.ids.length).toEqual(2);
            expect(state.ids[0]).toEqual(budgetLine01.id);
            expect(state.ids[1]).toEqual(budgetLine02.id);
            expect(state.entities[payload.budgetLineId].id).toEqual(myState.entities[budgetLine02.id].id);
            expect(state.entities[payload.budgetLineId].cashToSpend).toEqual(myState.entities[budgetLine02.id].cashToSpend);
            expect(state.entities[payload.budgetLineId].cashLeft).toEqual(payload.newCashLeft);
        });
    });

    describe('DefaultBudgetLinesLoaded action', () => {
        it('should load entities', () => {
            const action: BudgetLinesActions = new DefaultBudgetLinesLoadedAction(budgetLinesArray);
            const { initialState } = fromBudgetLineReducer;
            const state = fromBudgetLineReducer.budgetLineReducer(initialState, action);

            expect(state.selectedBudgetLineId).toEqual(null);
            expect(state.ids.length).toEqual(2);
            expect(state.ids[0]).toEqual(budgetLinesArray[0].id);
            expect(state.ids[1]).toEqual(budgetLinesArray[1].id);
            expect(state.entities[budgetLine01.id].id).toEqual(budgetLinesArray[0].id);
            expect(state.entities[budgetLine01.id].cashToSpend).toEqual(budgetLinesArray[0].cashToSpend);
            expect(state.entities[budgetLine01.id].cashLeft).toEqual(budgetLinesArray[0].cashLeft);
            expect(state.entities[budgetLine01.id].name).toEqual(budgetLinesArray[0].name);
            expect(state.entities[budgetLine02.id].id).toEqual(budgetLinesArray[1].id);
            expect(state.entities[budgetLine02.id].cashToSpend).toEqual(budgetLinesArray[1].cashToSpend);
            expect(state.entities[budgetLine02.id].cashLeft).toEqual(budgetLinesArray[1].cashLeft);
            expect(state.entities[budgetLine02.id].name).toEqual(budgetLinesArray[1].name);
        });
    });

    describe('CreateBudgetLine action', () => {
        it('should create the entity', () => {
            const newBudgetLine: BudgetLine = {
                id: 'bl003',
                name: 'Linia 3',
                cashLeft: 100,
                cashToSpend: 1000
            };
            const action: BudgetLinesActions = new CreateBudgetLineAction({ budgetLine: newBudgetLine });
            const { initialState } = fromBudgetLineReducer;
            const state = fromBudgetLineReducer.budgetLineReducer(initialState, action);

            expect(state.selectedBudgetLineId).toEqual(null);
            expect(state.ids.length).toEqual(1);
            expect(state.ids[0]).toEqual(newBudgetLine.id);
            expect(state.entities[newBudgetLine.id].id).toEqual(newBudgetLine.id);
            expect(state.entities[newBudgetLine.id].cashToSpend).toEqual(newBudgetLine.cashToSpend);
            expect(state.entities[newBudgetLine.id].cashLeft).toEqual(newBudgetLine.cashLeft);
            expect(state.entities[newBudgetLine.id].name).toEqual(newBudgetLine.name);
        });
    });

    describe('UpdateBudgetLine action', () => {
        it('should update the entity', () => {
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
            expect(state.entities[budgetLine02.id].cashToSpend).toEqual(changes.cashToSpend);
            expect(state.entities[budgetLine02.id].cashLeft).toEqual(budgetLine02.cashLeft);
            expect(state.entities[budgetLine02.id].name).toEqual(changes.name);
        });
    });

    describe('DeleteBudgetLine action', () => {
        it('should delete the entity', () => {
            const budgetLineIdToDelete = budgetLine02.id;
            const action: BudgetLinesActions = new DeleteBudgetLineAction({ id: budgetLineIdToDelete });
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



});
