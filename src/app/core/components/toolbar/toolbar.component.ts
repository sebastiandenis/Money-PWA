import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import * as UiStateActions from '../../../core/store/uiState.actions';
import { OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
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
