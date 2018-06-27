import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineCardComponent } from './line-card.component';

describe('LineCardComponent', () => {
  let component: LineCardComponent;
  let fixture: ComponentFixture<LineCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
