import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsListComponent } from './shifts-list.component';

describe('ShiftsListComponent', () => {
  let component: ShiftsListComponent;
  let fixture: ComponentFixture<ShiftsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
