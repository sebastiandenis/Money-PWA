import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesActionsComponent } from './lines-actions.component';

describe('LinesActionsComponent', () => {
  let component: LinesActionsComponent;
  let fixture: ComponentFixture<BudgetActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinesActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinesActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
