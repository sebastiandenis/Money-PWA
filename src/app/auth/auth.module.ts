import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatInputModule, MatFormFieldModule, MatHint, MatError, MatIcon } from '@angular/material';
import {MatButtonModule} from '@angular/material';
import { ErrorSnackbarComponent } from '../core/components/error-snackbar/error-snackbar.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/index';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  entryComponents: [ErrorSnackbarComponent],
  imports: [
    FormsModule, ReactiveFormsModule,
    AuthRoutingModule, MaterialModule, CommonModule, SharedModule
  ]
})
export class AuthModule {}
