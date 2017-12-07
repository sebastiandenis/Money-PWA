import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngrx/store';
import * as UserActions from './store/actions/user.actions';
import * as BudgetActions from './store/actions/budget.actions';
import * as fromRoot from './store/app.reducers';
import { User } from './models/user.model';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  user$: Observable<User>;


  constructor(private translate: TranslateService,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private store: Store<fromRoot.AppState>) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // zalogowany
        this.store.dispatch(new UserActions.LoadUserDataAction(user.uid));
      } else {
        // nie jest zalogowany
      }
    });

    this.user$ = this.store.select(fromRoot.selectUser);
  }

  ngOnInit() {
    this.user$.subscribe(user => {
      if (user && user.config && user.config.lang !== undefined) {
        this.translate.use(user.config.lang);
      }
    });
  }
}
