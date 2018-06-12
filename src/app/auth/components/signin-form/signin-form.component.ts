import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnInit {
  signinForm: FormGroup;

  @Output() signIn = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signinForm = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });

    // this.loginForm.statusChanges.subscribe(
    //   (status) => console.log(status)
    // );
  }

  onSubmit() {
    // console.log(this.loginForm.value);
    this.signIn.emit(this.signinForm.value);
  }
}
