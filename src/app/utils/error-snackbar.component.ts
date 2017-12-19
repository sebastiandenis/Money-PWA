import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';


@Component({
    selector: 'app-error-snackbar',
    styleUrls: ['./error-snackbar.component.css'],
    template: '<span >{{ data | translate }}</span>'
})
export class ErrorSnackbarComponent {
    constructor( @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    }
}

