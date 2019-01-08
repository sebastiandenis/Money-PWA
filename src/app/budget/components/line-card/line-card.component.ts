import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetLine } from '../../models/budget-line.model';
import { Budget } from '../../models/budget.model';
import { Observable } from 'rxjs';
import { Expense } from '../../models/expense.model';
import { Shift } from '../../models/shift.model';

@Component({
  selector: 'app-line-card',
  templateUrl: './line-card.component.html',
  styleUrls: ['./line-card.component.scss']
})
export class LineCardComponent implements OnInit {
  @Input() budget: Budget;
  @Input() budgetLine: BudgetLine;
  @Input() expenses$: Observable<Expense[]>;
  @Input() shifts$: Observable<Shift[]>;

  @Output() startEditEmmiter = new EventEmitter<BudgetLine>();
  @Output() startDeleteEmmiter = new EventEmitter<BudgetLine>();

  panelOpenState = false;

  constructor() {}

  ngOnInit() {}

  onEdit() {
    this.startEditEmmiter.emit(this.budgetLine);
  }

  onDelete() {
    this.startDeleteEmmiter.emit(this.budgetLine);
  }

  getProcentToTotalBudget(): number {
    if (
      this.budget &&
      this.budgetLine &&
      this.budget.totalCash !== 0 &&
      this.budgetLine.cashToSpend !== 0
    ) {
      return Math.round(
        (this.budgetLine.cashToSpend / this.budget.totalCash) * 100
      );
    } else {
      return 0;
    }
  }
}
