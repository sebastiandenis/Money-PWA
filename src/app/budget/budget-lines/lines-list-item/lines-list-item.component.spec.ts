import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesListItemComponent } from './lines-list-item.component';

describe('LinesListItemComponent', () => {
  let component: LinesListItemComponent;
  let fixture: ComponentFixture<LinesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinesListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
