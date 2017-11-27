import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { BudgetLine } from '../../models/budget-line.model';
import { Budget } from '../../models/budget.model';
import { TranslateService } from '@ngx-translate/core';
import { BudgetService } from '../../services/budget.service';
import { Store } from '@ngrx/store';
import * as BudgetActions from '../store/actions/budget.actions';
import * as fromRoot from '../store/app.reducers';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
  budget$: Observable<Budget>;
  budgetLines$: Observable<BudgetLine[]>;


  constructor(translate: TranslateService, db: AngularFirestore,
    private store: Store<fromRoot.AppState>,
    budgetService: BudgetService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    this.itemDoc = db.doc<any>('test/1');
    this.item = this.itemDoc.valueChanges();

    this.budget$ = this.store.select(fromRoot.selectBudget);
    this.budgetLines$ = this.store.select(fromRoot.selectBudgetLines);
  }

  ngOnInit() {
    this.store.dispatch(new BudgetActions.LoadDefaultBudgetAction());
    this.store.dispatch(new BudgetActions.LoadDefaultBudgetLinesAction('myID'));
  }

}
