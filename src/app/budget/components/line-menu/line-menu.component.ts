import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Inject
} from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { LineMenuService } from './line-menu.service';

@Component({
  selector: 'app-line-menu',
  templateUrl: './line-menu.component.html',
  styleUrls: ['./line-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineMenuComponent implements OnInit {
  @Output() addExpenseEmitter = new EventEmitter<any>();

  constructor(
    private bottomSheetRef: MatBottomSheetRef<LineMenuComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: string,
    private lineMenuService: LineMenuService
  ) {}

  ngOnInit() {
    // console.log('...and the data is: ', this.data);
  }

  onAddExpense() {
    // this.addExpenseEmitter.emit({ action: 'addExpense' });
    this.lineMenuService.emitAddExpense(this.data);
    this.bottomSheetRef.dismiss();
  }

  onAddCash() {
    this.lineMenuService.emitAddCash(this.data);
    this.bottomSheetRef.dismiss();
  }
}
