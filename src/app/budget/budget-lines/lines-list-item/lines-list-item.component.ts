import { Component, OnInit, Input } from '@angular/core';
import { BudgetLine } from '../../../models/budget-line.model';

@Component({
  selector: 'app-lines-list-item',
  templateUrl: './lines-list-item.component.html',
  styleUrls: ['./lines-list-item.component.css']
})
export class LinesListItemComponent implements OnInit {

  @Input()
  line: BudgetLine;

  constructor() { }

  ngOnInit() {
  }

}
