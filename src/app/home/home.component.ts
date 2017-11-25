import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { BudgetLine } from '../../models/budget-line.model';
import { Budget } from '../../models/budget.model';
import { TranslateService } from '@ngx-translate/core';
import { BudgetService } from '../../services/budget.service';

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


  constructor(translate: TranslateService, db: AngularFirestore, budgetService: BudgetService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    this.itemDoc = db.doc<any>('test/1');
    this.item = this.itemDoc.valueChanges();

    this.budget$ = budgetService.loadDefaultBudget('1');
    this.budgetLines$ = budgetService.loadBudgetLines('1');
  }

  ngOnInit() {
  }

}
