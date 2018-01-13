import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorSnackbarComponent } from '../core/components/error-snackbar/error-snackbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
  ],
  declarations: [
    ErrorSnackbarComponent
  ]
})
export class SharedModule { }
