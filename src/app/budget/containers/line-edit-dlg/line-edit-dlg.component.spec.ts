import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineEditDlgComponent } from './line-edit-dlg.component';

describe('LineEditDlgComponent', () => {
  let component: LineEditDlgComponent;
  let fixture: ComponentFixture<LineEditDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineEditDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineEditDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
