import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {


  mainMenuBtnVisible$: Observable<boolean>;

  constructor(private store: Store<fromRoot.AppState>) {
    this.mainMenuBtnVisible$ = this.store.select(fromRoot.selectUiMainMenuBtnVisible);
  }

  ngOnInit() {
  }

}
