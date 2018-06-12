import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { BudgetLine } from '../../models/budget-line.model';

@Component({
  selector: 'app-lines-list-item',
  templateUrl: './lines-list-item.component.html',
  styleUrls: ['./lines-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinesListItemComponent implements OnInit {
  @Input() line: BudgetLine;

  @Input() isFastExpenseMode = false;

  @Output() lineSelected = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  getBadgeColor(cashLeft: number, totalCash: number) {
    if (cashLeft && totalCash) {
      if (cashLeft <= 0) {
        return { 'my-chip-red': true };
      } else if (Math.round(cashLeft / totalCash * 100) < 25) {
        return { 'my-chip-orange': true };
      } else {
        return { 'my-chip-green': true };
      }
    } else {
      return { 'my-chip-red': true };
    }
  }

  selectLine(lineId: string) {
    if (this.isFastExpenseMode) {
    } else {
      // this.store.dispatch(new SelectBudgetLineAction({ budgetLineId: lineId }));
    }

    // console.log('clicked: ', lineId);
    this.lineSelected.emit(lineId);
  }
}
