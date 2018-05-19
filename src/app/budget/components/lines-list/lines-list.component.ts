import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { BudgetLine } from '../../models/budget-line.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.css']
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
