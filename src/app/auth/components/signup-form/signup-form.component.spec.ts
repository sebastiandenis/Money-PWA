import { SignupFormComponent } from './signup-form.component';
import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  ComponentFixtureAutoDetect
} from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  TranslateModule,
  TranslateService,
  TranslateLoader,
  TranslateFakeLoader
} from '@ngx-translate/core';
import { MaterialModule } from '../../../material/index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';






describe('Component: SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let spy: any;



  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        MaterialModule
      ],
      declarations: [SignupFormComponent],
      providers: [
        TranslateService,
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  // afterAll(() => {
  //   TestBed.resetTestingModule();
  // });

  it('Form should be invalid by default', () => {
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('Username field should be invalid when empty', () => {
    const username = component.signupForm.get('userData.username');
    expect(username.valid).toBeFalsy();
  });

  it('Username field should have required error when empty', () => {
    let errors = {};
    const username = component.signupForm.get('userData.username');
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Email field should be invalid when empty', () => {
    const email = component.signupForm.get('userData.email');
    expect(email.valid).toBeFalsy();
  });

  it('Email field should have required error when empty', () => {
    let errors = {};
    const email = component.signupForm.get('userData.email');
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Email field should have email error when wrong format', () => {
    let errors = {};
    const email = component.signupForm.get('userData.email');
    email.setValue('test');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();
  });

  it('Password field should be invalid when empty', () => {
    const password = component.signupForm.get('passwords.password');
    expect(password.valid).toBeFalsy();
  });

  it('Confirm password field should be invalid when empty', () => {
    const password = component.signupForm.get('passwords.confirmPassword');
    expect(password.valid).toBeFalsy();
  });

  it('Password field should have required error when empty', () => {
    let errors = {};
    const password = component.signupForm.get('passwords.password');
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Confirm password field should have required error when empty', () => {
    let errors = {};
    const password = component.signupForm.get('passwords.confirmPassword');
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Password field should have minlength error when empty', () => {
    let errors = {};
    const password = component.signupForm.get('passwords.password');
    password.setValue('12345');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();
  });

  it('Confirm password field should have minlength error when empty', () => {
    let errors = {};
    const password = component.signupForm.get('passwords.confirmPassword');
    password.setValue('12345');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();
  });

  it('Passwords should be invalid when dont match', () => {
    let errors = {};
    const password = component.signupForm.get('passwords.confirmPassword');
    const confirmPassword = component.signupForm.get(
      'passwords.confirmPassword'
    );
    const passwords = component.signupForm.get('passwords');

    password.setValue('123456');
    confirmPassword.setValue('123455');

    errors = passwords.errors || {};
    expect(errors['nomatch']).toBeTruthy();
  });

  it('Should emit onSignup event', async(() => {

    // spy = spyOn(component, 'forbiddenEmails').and.callFake(fakeForbiddenEmails);
    spy = spyOn(component, 'forbiddenEmails').and.returnValue({
      $observable: Observable.fromPromise(Promise.resolve(true))
    });
    expect(component.signupForm.valid).toBeFalsy();

    component.signupForm.get('userData.username').setValue('Sebastian');
    component.signupForm.get('userData.email').setValue('sebek@gmail.com');

    component.signupForm.get('passwords.password').setValue('123456');
    component.signupForm.get('passwords.confirmPassword').setValue('123456');

    // TODO: poniższe nie działa gdy używam asynchronicznego validatora, nie wiem czemu
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.signupForm.valid).toBeTruthy();


      let user: {
        email;
        password;
      };

      component.onSignup.subscribe(value => {
        user = value;
      });

      component.signUp();

      expect(user.email).toBe('sebek@gmail.com');
      expect(user.password).toBe('123456');
    });
  }));
});
