import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  faSortAmountDown,
  faSortAmountUp,
  faSortAlphaDown,
  faSortAlphaUp
} from '@fortawesome/free-solid-svg-icons';

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


  selectedValue: string;

  @Output() sortLines = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
  }

  onChange(newValue: string) {
    this.selectedValue = newValue;
    this.sortLines.emit(this.selectedValue);
  }
}
