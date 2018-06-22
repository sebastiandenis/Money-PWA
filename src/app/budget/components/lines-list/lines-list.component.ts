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

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinesListComponent implements OnInit, OnDestroy {
  @Input() lines: BudgetLine[] = [];

  @Input() sortSubject: Subject<string>;

  @Input() sortBy: string;

  @Input() isFastExpenseMode: boolean;

  @Output() addExpenseEmitter = new EventEmitter<any>();

  @Output() selectLine = new EventEmitter<string>();

  @Output() sortLines = new EventEmitter<string>();

  sortSubcription: Subscription;

  constructor() {}

  ngOnInit() {
    this.sortSubcription = this.sortSubject.subscribe((sortBy: string) => {
      this.sortBy = sortBy;
    });
  }

  private onSelectLine(budgetLineId: string) {
    this.selectLine.emit(budgetLineId);
  }

  onSortLines(sortBy: string) {
    this.sortLines.emit(sortBy);
  }

  sortLinesBy(sortBy: string): BudgetLine[] {
    switch (sortBy) {
      case 'alphaUp':
        return this.lines.sort((a: BudgetLine, b: BudgetLine) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
      case 'alphaDown':
        return this.lines.sort((a: BudgetLine, b: BudgetLine) => {
          return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        });
      case 'amountUp':
        return this.lines.sort((a: BudgetLine, b: BudgetLine) => {
          return a.cashLeft - b.cashLeft;
        });
      case 'amountDown':
        return this.lines.sort((a: BudgetLine, b: BudgetLine) => {
          return b.cashLeft - a.cashLeft;
        });
      default:
        return this.lines.sort((a: BudgetLine, b: BudgetLine) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
    }
  }

  ngOnDestroy() {
    if (this.sortSubcription) {
      this.sortSubcription.unsubscribe();
    }
  }
}
