import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetComponent } from './budget.component';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { BudgetTabsComponent } from './budget-tabs/budget-tabs.component';
import { BudgetDashboardComponent } from './budget-dashboard/budget-dashboard.component';
import { BudgetLinesComponent } from './budget-lines/budget-lines.component';
import { BudgetSettingsComponent } from './budget-settings/budget-settings.component';
import { BudgetRoutingModule } from './budget-routing.module';
import { LinesListComponent } from './budget-lines/lines-list/lines-list.component';
import { LinesListItemComponent } from './budget-lines/lines-list-item/lines-list-item.component';
import { LinesActionsComponent } from './budget-lines/lines-actions/lines-actions.component';
import { LineDetailsComponent } from './budget-lines/line-details/line-details.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { TranslateModule } from '@ngx-translate/core';




@NgModule({
  declarations: [
    BudgetComponent,
    BudgetDashboardComponent,
    BudgetLinesComponent,
    BudgetSettingsComponent,
    BudgetTabsComponent,
    LinesListComponent,
    LinesListItemComponent,
    LinesActionsComponent,
    LineDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RoundProgressModule,
    BudgetRoutingModule,
    OverlayModule
  ],
  entryComponents: [
    LinesActionsComponent
  ]

})
export class BudgetModule { }
