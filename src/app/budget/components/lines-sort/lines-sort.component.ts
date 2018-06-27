import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {
  faSortAmountDown,
  faSortAmountUp,
  faSortAlphaDown,
  faSortAlphaUp
} from '@fortawesome/free-solid-svg-icons';

export enum SortingLinesTypes {
  AMOUNT_DOWN = '[Sort Lines] Amount Down',
  AMOUNT_UP = '[Sort Lines] Amount Up',
  ALPHA_DOWN = '[Sort Lines] Alpha Down',
  ALPHA_UP = '[Sort Lines] Alpha Up'
}

@Component({
  selector: 'app-lines-sort',
  templateUrl: './lines-sort.component.html',
  styleUrls: ['./lines-sort.component.scss']
})
export class LinesSortComponent implements OnInit {
  faSortAmountDown = faSortAmountDown;
  faSortAmountUp = faSortAmountUp;
  faSortAlphaUp = faSortAlphaUp;
  faSortAlphaDown = faSortAlphaDown;

  @Input() sortBy: SortingLinesTypes;

  selectedValue: string;

  @Output() sortLines = new EventEmitter<SortingLinesTypes>();

  constructor() {}

  ngOnInit() {
    this.selectedValue = this.sortBy;
  }

  isChecked(value: string) {
    if (value && value === this.sortBy) {
      console.log('isChecked is true for value: ', value);
    }
  }

  onChange(newValue: string) {
    this.selectedValue = newValue;
    switch (this.selectedValue) {
      case SortingLinesTypes.ALPHA_DOWN:
        this.sortBy = SortingLinesTypes.ALPHA_DOWN;
        break;
      case SortingLinesTypes.ALPHA_UP:
        this.sortBy = SortingLinesTypes.ALPHA_UP;
        break;
      case SortingLinesTypes.AMOUNT_DOWN:
        this.sortBy = SortingLinesTypes.AMOUNT_DOWN;
        break;
      case SortingLinesTypes.AMOUNT_UP:
        this.sortBy = SortingLinesTypes.AMOUNT_UP;
        break;
    }
    this.sortLines.emit(this.sortBy);
  }
}
