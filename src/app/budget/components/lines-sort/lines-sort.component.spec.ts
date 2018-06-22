import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesSortComponent } from './lines-sort.component';

describe('LinesSortComponent', () => {
  let component: LinesSortComponent;
  let fixture: ComponentFixture<LinesSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinesSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinesSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
