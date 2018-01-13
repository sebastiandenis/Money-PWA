import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesListComponent } from './lines-list.component';

describe('LinesListComponent', () => {
  let component: LinesListComponent;
  let fixture: ComponentFixture<LinesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
