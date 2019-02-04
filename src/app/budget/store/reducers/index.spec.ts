import * as fromModuleReducer from "./index";
import * as fromBudget from "./budget.reducer";
import * as fromBudgetLine from "./budget-line.reducer";
import * as fromExpense from "./expense.reducer";
import * as fromShifts from "./shift.reducer";

describe("BudgetModule selectors", () => {
  let initialState: fromModuleReducer.State;

  beforeEach(() => {
    initialState = {
      budgets: fromBudget.initialState,
      budgetLines: fromBudgetLine.initialState,
      expenses: fromExpense.initialState,
      shifts: fromShifts.initialState
    };
  });

  describe("feature selectors", () => {
    it("getBudgetModuleState should be initialized", () => {
      expect(fromModuleReducer.getBudgetModuleState).toBeDefined();
    });
    it("getBudgetsState should be initialized", () => {
      expect(fromModuleReducer.getBudgetsState).toBeDefined();
    });
    it("getBudgetLinesState should be initialized", () => {
      expect(fromModuleReducer.getBudgetLinesState).toBeDefined();
    });
    it("getExpensesState should be initialized", () => {
      expect(fromModuleReducer.getExpensesState(initialState)).toBeDefined();
    });
  });

  describe("state selectors", () => {});
});
