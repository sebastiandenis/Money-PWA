import { SigninFormComponent } from './signin-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  TranslateModule,
  TranslateService,
  TranslateLoader,
  TranslateFakeLoader
} from '@ngx-translate/core';
import { MaterialModule } from '../../../material/index';

describe('Component: SigninFormComponent', () => {
  let component: SigninFormComponent;
  let fixture: ComponentFixture<SigninFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        MaterialModule
      ],
      declarations: [SigninFormComponent],
      providers: [TranslateService]
    });

    fixture = TestBed.createComponent(SigninFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  // beforeEach(() => {
  //   component.ngOnInit();
  // });

  // afterAll(() => {
  //   TestBed.resetTestingModule();
  // });

  it('Form should be invalid when empty', () => {
    expect(component.signinForm.valid).toBeFalsy();
  });

  it('Login field should be invalid when empty', () => {
    const email = component.signinForm.controls['login'];
    expect(email.valid).toBeFalsy();
  });

  it('Login field should have required error when empty', () => {
    let errors = {};
    const login = component.signinForm.controls['login'];
    errors = login.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Password field should be invalid when empty', () => {
    const password = component.signinForm.controls['password'];
    expect(password.valid).toBeFalsy();
  });

  it('Password field should have required error when empty', () => {
    let errors = {};
    const password = component.signinForm.controls['password'];
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Email field should have email error when wrong email', () => {
    let errors = {};
    const login = component.signinForm.controls['login'];
    login.setValue('test');
    errors = login.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();
  });

  it('Entering email and password should emit signIn event', () => {
    expect(component.signinForm.valid).toBeFalsy();
    component.signinForm.controls['login'].setValue('test@test.com');
    component.signinForm.controls['password'].setValue('123456');
    expect(component.signinForm.valid).toBeTruthy();

    let user: {
      login;
      password;
    };

    component.signIn.subscribe(value => {
      user = value;
    });

    component.onSubmit();

    expect(user.login).toBe('test@test.com');
    expect(user.password).toBe('123456');
  });
});
