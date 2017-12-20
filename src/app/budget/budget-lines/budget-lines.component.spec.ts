import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetLinesComponent } from './budget-lines.component';

describe('BudgetLinesComponent', () => {
  let component: BudgetLinesComponent;
  let fixture: ComponentFixture<BudgetLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
