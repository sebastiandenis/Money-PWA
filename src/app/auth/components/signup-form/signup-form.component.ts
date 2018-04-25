import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl
} from '@angular/forms';
import { passwordMatcher } from '../../../utils/password-matcher';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  signupForm: FormGroup;
  userData: FormGroup;
  forbiddenUsernames = ['Test'];
  @Output() onSignup = new EventEmitter<any>();
  param = { value: 6 };

  constructor() {}

  ngOnInit() {
    this.createForm();
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  theSamePasswords(control: AbstractControl, control2?: AbstractControl) {
    // console.log('control.value: ' + control.value + ', control2.value: ' + control2.value);
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  createForm() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this)
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        )
      }),
      passwords: new FormGroup(
        {
          password: new FormControl(null, [
            Validators.required,
            Validators.minLength(6)
          ]),
          confirmPassword: new FormControl(null, [
            Validators.required,
            Validators.minLength(6)
          ])
        },
        passwordMatcher
      )
    });
  }

  signUp() {
    const email = this.signupForm.get('userData.email').value;
    const password = this.signupForm.get('passwords.password').value;
    this.onSignup.emit({ email: email, password: password });
  }
}
