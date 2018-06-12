import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSnackBarModule,
  MatTabsModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatBottomSheetModule
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule,
    OverlayModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBottomSheetModule,
    ScrollDispatchModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule,
    OverlayModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBottomSheetModule,
    ScrollDispatchModule
  ],
  declarations: []
})
export class MaterialModule { }
