import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-signin-form',
  template: `
  <form [formGroup]="signinForm" (ngSubmit)="onSubmit()"
  class="signin-form" fxLayout="column" fxLayoutAlign="center center"
  fxLayoutGap="10px" id="signInForm">
    <mat-form-field class="full-width space-between">
      <input matInput placeholder="{{'email' | translate}}" id="email" type="email"
       formControlName="login">
      <mat-error >
        {{'pleaseenteravalidemailaddress' | translate}}!
      </mat-error>
    </mat-form-field>
    <mat-form-field class="full-width space-between" style="margin-top: 20px;">
      <input matInput placeholder="{{'password' | translate}}" id="password" type="password"
        formControlName="password">
    </mat-form-field>
    <button mat-raised-button color="accent" type="submit" class="signin-btn" [disabled]="!signinForm.valid"
    style="margin-top: 10px;">
      {{'signin' | translate}}
    </button>
  </form>
  `,
  styles: [
    `.signin-form {margin-top: 90px;margin-left: 20px;margin-right: 20px;}`,
    `.full-width {width: 100%;}`,
    `.signin-btn{margin-top: 10px;padding: 10px;font-size: 110%;width: 100%;}`,
    `.space-between {margin-top: 10px;margin-bottom: 10px;}`
  ]
})
export class SigninFormComponent implements OnInit {

  signinForm: FormGroup;

  @Output()
  signIn = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signinForm = new FormGroup({
      'login': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
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
