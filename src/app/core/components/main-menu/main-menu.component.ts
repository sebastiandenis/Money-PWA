import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {


  mainMenuBtnVisible$: Observable<boolean>;

  constructor(private store: Store<fromRoot.AppState>) {
    this.mainMenuBtnVisible$ = this.store.select(fromRoot.selectUiMainMenuBtnVisible);
  }

  ngOnInit() {
  }



}
