import { LinesListItemComponent } from './lines-list-item.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BudgetLine } from '../../models/budget-line.model';

describe('Component: LinesListItemComponent', () => {
  let component: LinesListItemComponent;
  let fixture: ComponentFixture<LinesListItemComponent>;
  let chipCashLeftEl: DebugElement;
  let budgetLine01: BudgetLine;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LinesListItemComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LinesListItemComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
      });
  }));

  beforeEach(() => {
    chipCashLeftEl = fixture.debugElement.query(
      By.css('.my-mat-chip-cash-left')
    );
    budgetLine01 = {
      id: 'bl001',
      cashLeft: 100,
      cashToSpend: 100,
      name: 'Food'
    };
  });

  it('can instantiate the component', () => {
    expect(component).not.toBeNull();
  });

  it('#getBadgeColor should return proper badge color', () => {
    expect(component.getBadgeColor(null, null)).toEqual({
      'my-chip-red': true
    });
    expect(component.getBadgeColor(100, 100)).toEqual({
      'my-chip-green': true
    });
    expect(component.getBadgeColor(0, 100)).toEqual({
      'my-chip-red': true
    });
    expect(component.getBadgeColor(24, 100)).toEqual({
      'my-chip-orange': true
    });
    expect(component.getBadgeColor(25, 100)).toEqual({
      'my-chip-green': true
    });
    expect(component.getBadgeColor(50, 100)).toEqual({
      'my-chip-green': true
    });
    expect(component.getBadgeColor(110, 100)).toEqual({
      'my-chip-green': true
    });
  });

  it('should emit onSelectLine', () => {
    let lineId: string;

    component.onSelectLine.subscribe(value => {
      lineId = value;
    });
    component.selectLine('line001');
    expect(lineId).toEqual('line001');
  });

  it('should set proper class for my-chip span', () => {
    component.isFastExpenseMode = false;
    budgetLine01.cashLeft = 100;
    budgetLine01.cashToSpend = 100;
    component.line = budgetLine01;
    fixture.detectChanges();
    expect(chipCashLeftEl.classes['my-chip-green']).toBeTruthy();
    expect(chipCashLeftEl.classes['my-chip-orange']).toBeUndefined();
    expect(chipCashLeftEl.classes['my-chip-red']).toBeUndefined();

    budgetLine01.cashLeft = 0;
    budgetLine01.cashToSpend = 100;
    component.line = budgetLine01;
    fixture.detectChanges();
    console.log('Classes : ', chipCashLeftEl.classes);
    expect(chipCashLeftEl.classes['my-chip-green']).toBeUndefined();
    expect(chipCashLeftEl.classes['my-chip-orange']).toBeUndefined();
    expect(chipCashLeftEl.classes['my-chip-red']).toBeTruthy();



  });
});
