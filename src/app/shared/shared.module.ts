import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorSnackbarComponent } from '../core/components/error-snackbar/error-snackbar.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    ErrorSnackbarComponent
  ]
})
export class SharedModule { }
