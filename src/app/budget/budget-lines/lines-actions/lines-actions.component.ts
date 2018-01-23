import { Component, OnInit, Inject } from '@angular/core';
import { LinesActionsOverlayRef } from './lines-actions-overlay-ref';
import { LINES_ACTIONS_DIALOG_DATA } from './lines-actions-overlay.tokens';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lines-actions',
  templateUrl: './lines-actions.component.html',
  styleUrls: ['./lines-actions.component.scss']
})
export class LinesActionsComponent implements OnInit {

  constructor(public dialogRef: LinesActionsOverlayRef,
    @Inject(LINES_ACTIONS_DIALOG_DATA) public dane: string) {
  }

  ngOnInit() {
  }

}
