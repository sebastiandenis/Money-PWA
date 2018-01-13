import { Component, OnInit, Input } from '@angular/core';
import { BudgetLine } from '../../models/budget-line.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducers';

@Component({
  selector: 'app-budget-lines',
  templateUrl: './budget-lines.component.html',
  styleUrls: ['./budget-lines.component.css']
})
export class BudgetLinesComponent implements OnInit {

  constructor(private store: Store<fromRoot.AppState>) {
    this.budgetLines$ = this.store.select(fromRoot.selectBudgetLines);
  }

  budgetLines$: Observable<BudgetLine[]>;

 // myLines = [{name: 'linia1', wartosc: 10}, {name: 'linia2', wartosc: 99} ];


  ngOnInit() {

  }

}
