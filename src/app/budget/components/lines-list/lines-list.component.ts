import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { BudgetLine } from '../../models/budget-line.model';
import { Subject, Subscription } from 'rxjs';
import { SortingLinesTypes } from '../lines-sort/lines-sort.component';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinesListComponent implements OnInit, OnDestroy {
  @Input() lines: BudgetLine[] = [];

  @Input() isFastExpenseMode: boolean;

  @Input() sortBy: SortingLinesTypes;

  @Output() addExpenseEmitter = new EventEmitter<any>();

  @Output() selectLine = new EventEmitter<string>();

  @Output() sortLines = new EventEmitter<SortingLinesTypes>();

  constructor() {}

  ngOnInit() {
  }

  private onSelectLine(budgetLineId: string) {
    this.selectLine.emit(budgetLineId);
  }

  onSortLines(sortBy: SortingLinesTypes) {
    this.sortLines.emit(sortBy);
  }

  ngOnDestroy() {}
}
