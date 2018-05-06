import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BudgetActionTypes,
  Query,
  Added,
  Modified,
  Removed,
  UpdateBudget,
  SetCurrentBudget
} from './budget.actions';
import { Budget } from '../../models/budget.model';

describe('BudgetAction', () => {
  let budget01: Budget;
  let budget02: Budget;
  beforeEach(() => {
    budget01 = {
      id: 'abcdef',
      name: 'My budget',
      dateStart: new Date(),
      dateEnd: null,
      totalCash: 1000,
      cashLeft: 500
    };

    budget02 = {
      id: 'b002',
      name: 'My budget 2',
      dateStart: new Date(),
      dateEnd: null,
      totalCash: 500,
      cashLeft: 10
    };

    const budgetArray: Budget[] = [budget01, budget02];
  });

  it('#Query should create an action', () => {
    const payload = {
      userId: 'abcde'
    };
    const action = new Query(payload);
    expect({ ...action }).toEqual({
      type: BudgetActionTypes.QUERY,
      payload
    });
  });

  it('#Added should create an action', () => {
    const payload: Budget = budget01;
    const action = new Added(payload);
    expect({ ...action }).toEqual({
      type: BudgetActionTypes.ADDED,
      payload
    });
  });

  it('#Modified should create an action', () => {
    const payload: Budget = budget02;
    const action = new Modified(payload);
    expect({ ...action }).toEqual({
      type: BudgetActionTypes.MODIFIED,
      payload
    });
  });

  it('#Removed should create an action', () => {
    const payload: Budget = budget01;
    const action = new Removed(payload);
    expect({ ...action }).toEqual({
      type: BudgetActionTypes.REMOVED,
      payload
    });
  });

  it('#UpdateBudget should create an action', () => {
    const changes: Partial<Budget> = {
      id: budget01.id,
      cashLeft: 0
    };
    const payload = {
      budgetId: budget01.id,
      changes: changes
    };
    const action = new UpdateBudget(payload);
    expect({ ...action }).toEqual({
      type: BudgetActionTypes.UpdateBudget,
      payload
    });
  });

  it('#SetCurrentBudget should create an action', () => {
    const action = new SetCurrentBudget({ budgetId: 'b001' });
    expect({ ...action }).toEqual({
      type: BudgetActionTypes.SetCurrentBudget,
      payload: {
        budgetId: 'b001'
      }
    });
  });
});
