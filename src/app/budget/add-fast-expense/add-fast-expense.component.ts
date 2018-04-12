import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducers';
import * as fromBudgetApp from '../store/reducers/index';
import * as UiStateActions from '../../store/actions/uiState.actions';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-add-fast-expense',
  templateUrl: './add-fast-expense.component.html',
  styleUrls: ['./add-fast-expense.component.scss']
})
export class AddFastExpenseComponent implements OnInit, OnDestroy {

  lines$: Observable<any>;


  constructor(private store: Store<fromRoot.AppState>) {
    this.lines$ = this.store.pipe(select(fromBudgetApp.selectAllBudgetLines));
  }

  ngOnInit() {
    this.store.dispatch(new UiStateActions.ChangeTitleAction('addexpense'));
    this.store.dispatch(new UiStateActions.ChangeMainMenuBtnVisibleAction(false));
    this.store.dispatch(new UiStateActions.ChangeMainToolbarCloseBtnVisibleAction(true));
  }

  onAddExpense(event): void {
    console.log('onAddExpense from AddFastExpenseComponent');
  }

  ngOnDestroy() {
    this.store.dispatch(new UiStateActions.ChangeMainToolbarCloseBtnVisibleAction(false));
  }

}
