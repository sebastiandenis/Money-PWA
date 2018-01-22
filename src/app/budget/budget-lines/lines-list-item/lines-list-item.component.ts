import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetLine } from '../../../models/budget-line.model';

@Component({
  selector: 'app-lines-list-item',
  templateUrl: './lines-list-item.component.html',
  styleUrls: ['./lines-list-item.component.scss']
})
export class LinesListItemComponent implements OnInit {

  @Input()
  line: BudgetLine;

  @Output()
  onSelectLine = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }


  getBadgeColor(cashLeft: number, totalCash: number) {
    if (cashLeft && totalCash) {
      if (cashLeft <= 0) {
        return { 'background-color': 'orange' };
      } else if (Math.round((cashLeft / totalCash) * 100) < 25) {
        return { 'background-color': 'yellow' };
      } else {
        return { 'background-color': 'green' };
      }
    } else {
      return { 'background-color': 'red' };
    }
  }

  selectLine(lineId: string) {
    console.log('clicked: ', lineId);
    this.onSelectLine.emit(lineId);
  }


}
