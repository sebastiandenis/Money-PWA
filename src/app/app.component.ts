import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { BudgetService } from '../services/budget.service';
import { BudgetLine } from '../models/expense.model';
import { Budget } from '../models/budget.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
  budget: Observable<Budget>;
  budgetLines: Observable<BudgetLine[]>;

  constructor(translate: TranslateService, db: AngularFirestore, budgetService: BudgetService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    this.itemDoc = db.doc<any>('test/1');
    this.item = this.itemDoc.valueChanges();

    this.budget = budgetService.loadDefaultBudget('1');
  }
}
