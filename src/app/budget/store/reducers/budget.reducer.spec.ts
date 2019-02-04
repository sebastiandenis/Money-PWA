import * as fromBudgetReducer from "./budget.reducer";
import {
  BudgetActions,
  UpdateBudget,
  Query,
  SetCurrentBudget
} from "../actions/budget.actions";
import { State } from "./budget.reducer";
import { Budget } from "../../models/budget.model";
import { Timestamp } from "@firebase/firestore-types";

describe("BudgetReducer", () => {
  let budget01: Budget;
  let budget02: Budget;
  let budgetArray: Budget[];
  let myState: State;

  beforeEach(() => {
    budget01 = {
      id: "b001",
      name: "My budget",
      dateStart: Timestamp.fromDate(new Date()),
      dateEnd: undefined,
      totalCash: 5000,
      cashLeft: 1400
    };

    budget02 = {
      id: "b002",
      name: "Nowy budżet",
      dateStart: null,
      dateEnd: null,
      totalCash: 10000,
      cashLeft: 5000
    };

    budgetArray = [budget01, budget02];

    myState = {
      currentBudgetId: budget01.id,
      ids: [budget01.id, budget02.id],
      entities: {
        [budget01.id]: budget01,
        [budget02.id]: budget02
      }
    };
  });

  it("Undefined action should return the default state", () => {
    const { initialState } = fromBudgetReducer;
    const action: BudgetActions = {
      type: undefined
    };
    const state = fromBudgetReducer.budgetReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it("UpdateBudget action should update the state", () => {
    const changes: Partial<Budget> = {
      cashLeft: budget02.cashLeft,
      totalCash: 0,
      name: "Update budget"
    };
    const payload = {
      budgetId: budget01.id,
      changes: changes
    };

    const action: BudgetActions = new UpdateBudget(payload);
    const { initialState } = fromBudgetReducer;
    const state = fromBudgetReducer.budgetReducer(myState, action);

    expect(state.currentBudgetId).toEqual(myState.currentBudgetId);
    expect(state.ids.length).toEqual(myState.ids.length);
    expect(state.ids[0]).toEqual(myState.ids[0]);
    expect(state.ids[1]).toEqual(myState.ids[1]);
    expect(state.entities[budget01.id].id).toEqual(payload.budgetId);
    expect(state.entities[budget01.id].totalCash).toEqual(
      payload.changes.totalCash
    );
    expect(state.entities[budget01.id].dateStart).toEqual(budget01.dateStart);
    expect(state.entities[budget01.id].dateEnd).toEqual(budget01.dateEnd);
  });

  it("Query action should return initial state", () => {
    const action: BudgetActions = new Query({ userId: "user001" });
    const { initialState } = fromBudgetReducer;
    const state = fromBudgetReducer.budgetReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it("getCurrentBudgetId should return id from state", () => {
    const action: BudgetActions = new SetCurrentBudget({
      budgetId: budget02.id
    });
    const { initialState } = fromBudgetReducer;
    const state = fromBudgetReducer.budgetReducer(initialState, action);

    expect(fromBudgetReducer.getCurrentBudgetId(state)).toEqual(
      state.currentBudgetId
    );
  });
});
