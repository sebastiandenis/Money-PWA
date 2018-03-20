import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorSnackbarComponent } from '../core/components/error-snackbar/error-snackbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { UndoSnackbarComponent } from '../core/components/undo-snackbar/undo-snackbar.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    FormsModule
  ],
  declarations: [
    ErrorSnackbarComponent, UndoSnackbarComponent
  ],
  entryComponents: [UndoSnackbarComponent]
})
export class SharedModule { }
