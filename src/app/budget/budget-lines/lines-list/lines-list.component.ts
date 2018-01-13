import { Component, OnInit, Input } from '@angular/core';
import { BudgetLine } from '../../../models/budget-line.model';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.css']
})
export class LinesListComponent implements OnInit {

  @Input()
  lines: BudgetLine[];
 // lines: any[];

  constructor() { }

  ngOnInit() {
    console.log('BudgetLines: ', this.lines);
  }

}
