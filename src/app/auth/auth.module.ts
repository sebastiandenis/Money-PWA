import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import { SigninComponent } from './containers/signin/signin.component';
import { SignupComponent } from './containers/signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatInputModule, MatFormFieldModule, MatHint, MatError, MatIcon } from '@angular/material';
import {MatButtonModule} from '@angular/material';
import { ErrorSnackbarComponent } from '../core/components/error-snackbar/error-snackbar.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/index';
import { SharedModule } from '../shared/shared.module';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';


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
