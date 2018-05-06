import {
  Query,
  BudgetLinesActionTypes,
  Added,
  Modified,
  Removed,
  SelectBudgetLineAction,
  CreateBudgetLineAction,
  CreateBudgetLinesAction,
  UpdateBudgetLineAction,
  BudgetLineUpdatedAction,
  DeleteBudgetLineAction
} from './budget-lines.actions';
import { BudgetLine } from '../../models/budget-line.model';

describe('BudgetLinesAction', () => {
  let budgetLine01: BudgetLine;
  let budgetLine02: BudgetLine;
  let budgetLineArray: BudgetLine[];

  beforeEach(() => {
    budgetLine01 = {
      id: 'bgline01',
      name: 'Food',
      cashLeft: 100,
      cashToSpend: 900
    };

    budgetLine02 = {
      id: 'bgline02',
      name: 'Car',
      cashLeft: 45.5,
      cashToSpend: 100
    };
  });

  budgetLineArray = [budgetLine01, budgetLine02];

  it('#Query should create an action', () => {
    const payload = {
      budgetId: 'abcde'
    };
    const action = new Query(payload);
    expect({ ...action }).toEqual({
      type: BudgetLinesActionTypes.QUERY,
      payload
    });
  });

  it('#Added should create an action', () => {
    const payload: BudgetLine = budgetLine01;
    const action = new Added(payload);
    expect({ ...action }).toEqual({
      type: BudgetLinesActionTypes.ADDED,
      payload
    });
  });

  it('#Modified should create an action', () => {
    const payload: BudgetLine = budgetLine02;
    const action = new Modified(payload);
    expect({ ...action }).toEqual({
      type: BudgetLinesActionTypes.MODIFIED,
      payload
    });
  });

  it('#Removed should create an action', () => {
    const payload: BudgetLine = budgetLine01;
    const action = new Removed(payload);
    expect({ ...action }).toEqual({
      type: BudgetLinesActionTypes.REMOVED,
      payload
    });
  });

  it('#SelectBudgetLineAction should create an action', () => {
    const payload = { budgetLineId: 'bl001' };
    const action = new SelectBudgetLineAction(payload);
    expect({ ...action }).toEqual({
      type: BudgetLinesActionTypes.SelectBudgetLine,
      payload
    });
  });

  it('#CreateBudgetLineAction should create an action', () => {
    const changes: Partial<BudgetLine> = {
      name: 'Nowa nazwa linii'
    };
    const payload = {
      budgetLine: budgetLine01
    };
    const action = new CreateBudgetLineAction(payload);
    expect({ ...action }).toEqual({
      type: BudgetLinesActionTypes.CreateBudgetLine,
      payload
    });
  });

  it('#CreateBudgetLinesAction should create an action', () => {
    const payload = {
      budgetLines: budgetLineArray
    };
    const action = new CreateBudgetLinesAction(payload);
    expect({ ...action }).toEqual({
      type: BudgetLinesActionTypes.CreateBudgetLines,
      payload
    });
  });

  it('#UpdateBudgetLineAction should create an action', () => {
    const changes: Partial<BudgetLine> = {
      name: 'Nowa nazwa linii'
    };
    const payload = {
      budgetId: 'b001',
      id: 'bl001',
      changes: changes
    };
    const action = new UpdateBudgetLineAction(payload);
    expect({ ...action }).toEqual({
      type: BudgetLinesActionTypes.UpdateBudgetLine,
      payload
    });
  });

  it('#BudgetLineUpdatedAction should create an action', () => {
    const action = new BudgetLineUpdatedAction();
    expect({ ...action }).toEqual({
      type: BudgetLinesActionTypes.BudgetLineUpdated
    });
  });

  it('#DeleteBudgetLineAction should create an action', () => {
    const payload = {
      id: 'bl001'
    };
    const action = new DeleteBudgetLineAction(payload);
    expect({ ...action }).toEqual({
      type: BudgetLinesActionTypes.DeleteBudgetLine,
      payload
    });
  });
});
