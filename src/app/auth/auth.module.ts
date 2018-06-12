import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { SigninComponent } from './containers/signin/signin.component';
import { SignupComponent } from './containers/signup/signup.component';
import { ErrorSnackbarComponent } from '../core/components/error-snackbar/error-snackbar.component';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    SigninFormComponent,
    SignupFormComponent
  ],
  entryComponents: [ErrorSnackbarComponent],
  imports: [
    FormsModule, ReactiveFormsModule,
    AuthRoutingModule, MaterialModule, CommonModule, SharedModule
  ]
})
export class AuthModule {}

