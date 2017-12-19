import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import * as UiStateActions from '../../../store/actions/uiState.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output() switchSideMenu = new EventEmitter();
  uiTitle$: Observable<string>;


  constructor(private store: Store<fromRoot.AppState>) {
    this.uiTitle$ = this.store.select(fromRoot.selectUiTitle);
  }



}
