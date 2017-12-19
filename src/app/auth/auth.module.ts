import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatInputModule, MatFormFieldModule, MatHint, MatError, MatIcon } from '@angular/material';
import {MatButtonModule} from '@angular/material';
import { ErrorSnackbarComponent } from '../utils/error-snackbar.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  entryComponents: [ErrorSnackbarComponent],
  imports: [
    FormsModule, ReactiveFormsModule,
    AuthRoutingModule, MatFormFieldModule, MatInputModule, MatButtonModule,CommonModule,
    TranslateModule.forRoot()
  ]
})
export class AuthModule {}
