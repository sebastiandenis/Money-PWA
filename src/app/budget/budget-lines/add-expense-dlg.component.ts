import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-expense-dlg',
  template: `
  <form fxLayout="column" fxLayoutAlign="center center" #f="ngForm" (ngSubmit)="onSubmit(f)">
  <mat-dialog-content>
    <mat-form-field>
      <input type="number" matInput placeholder="Amount" ngModel name="expenseAmount" required #amountInput="ngModel">
      <mat-error>Podaj wartość</mat-error>
    </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
    <button type="submit" mat-raised-button color="accent">Dodaj</button>
    </mat-dialog-actions>
    

    </form>
  `,
  styles: []
})
export class AddExpenseDlgComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddExpenseDlgComponent>,
    @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {  
  }

  onSubmit(form: NgForm){
    console.log(form);
  }



}
