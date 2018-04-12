import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import * as UiStateActions from '../../../store/actions/uiState.actions';
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


  constructor(private store: Store<fromRoot.AppState>,
    private _location: Location) {
    this.uiTitle$ = this.store.select(fromRoot.selectUiTitle);
    this.closeBtnVisible$ = this.store.select(fromRoot.selectUiMainToolbarCloseBtnVisible);
  }

  ngOnInit() {

  }

  onCloseBtn() {
    this._location.back();
  }



}
