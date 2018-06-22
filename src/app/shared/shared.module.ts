import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ErrorSnackbarComponent } from '../core/components/error-snackbar/error-snackbar.component';
import { UndoSnackbarComponent } from '../core/components/undo-snackbar/undo-snackbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    FormsModule,
    FontAwesomeModule
  ],
  declarations: [ErrorSnackbarComponent, UndoSnackbarComponent],
  entryComponents: [UndoSnackbarComponent]
})
export class SharedModule {}
