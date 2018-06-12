import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMainComponent } from './budget-main.component';

describe('BudgetMainComponent', () => {
  let component: BudgetMainComponent;
  let fixture: ComponentFixture<BudgetMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
