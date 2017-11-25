import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    FormsModule, ReactiveFormsModule,
    AuthRoutingModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    TranslateModule.forRoot()
  ]
})
export class AuthModule {}
