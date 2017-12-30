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




@NgModule({
  declarations: [BudgetComponent, BudgetDashboardComponent, BudgetLinesComponent, BudgetSettingsComponent, BudgetTabsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RoundProgressModule,
    BudgetRoutingModule
  ]

})
export class BudgetModule { }
