import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineDetailsComponent } from './line-details.component';

describe('LinesDetailsComponent', () => {
  let component: LineDetailsComponent;
  let fixture: ComponentFixture<LineDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
