import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import * as fromRoot from '../../../store/app.reducers';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() switchSideMenu = new EventEmitter();
  uiTitle$: Observable<string>;
  closeBtnVisible$: Observable<boolean>;
  sideMenuBtnVisible$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.AppState>,
    private _location: Location
  ) {
    this.uiTitle$ = this.store.select(fromRoot.selectUiTitle);
    this.closeBtnVisible$ = this.store.select(
      fromRoot.selectUiMainToolbarCloseBtnVisible
    );
    this.sideMenuBtnVisible$ = this.store.select(
      fromRoot.selectUiSideMenuBtnVisible
    );
  }

  ngOnInit() {
  }

  onCloseBtn() {
    this._location.back();
  }

}
