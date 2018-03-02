import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BudgetLine } from '../../../models/budget-line.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import { SelectBudgetLineAction } from '../../store/actions/budget-lines.actions';

@Component({
  selector: 'app-lines-list-item',
  templateUrl: './lines-list-item.component.html',
  styleUrls: ['./lines-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinesListItemComponent implements OnInit {

  @Input()
  line: BudgetLine;

  @Output()
  onSelectLine = new EventEmitter<null>();

  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
  }


  getBadgeColor(cashLeft: number, totalCash: number) {
    if (cashLeft && totalCash) {
      if (cashLeft <= 0) {
        return { 'my-chip-red': true };
      } else if (Math.round((cashLeft / totalCash) * 100) < 25) {
        return { 'my-chip-orange': true };
      } else {
        return { 'my-chip-green': true };
      }
    } else {
      return { 'my-chip-red': true };
    }
  }

  selectLine(lineId: string) {
    this.store.dispatch(new SelectBudgetLineAction({ budgetLineId: lineId }));
   // console.log('clicked: ', lineId);
    this.onSelectLine.emit();
  }


}
