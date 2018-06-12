import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { BudgetLine } from '../../models/budget-line.model';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.scss']
})
export class LinesListComponent implements OnInit, OnDestroy {
  @Input() lines: BudgetLine[] = [];

  @Input() isFastExpenseMode: boolean;

  @Output() addExpenseEmitter = new EventEmitter<any>();

  @Output() onSelectLineEmitter = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
  }

  private onSelectLine(budgetLineId: string) {
    this.onSelectLineEmitter.emit(budgetLineId);
  }

  ngOnDestroy() {}
}
