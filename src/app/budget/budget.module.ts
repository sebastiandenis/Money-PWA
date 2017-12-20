import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetComponent } from './budget.component';
import { BudgetDashboardComponent } from './budget-dashboard/budget-dashboard.component';
import { BudgetLinesComponent } from './budget-lines/budget-lines.component';
import { BudgetSettingsComponent } from './budget-settings/budget-settings.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RoundProgressModule
  ],
  declarations: [BudgetComponent, BudgetDashboardComponent, BudgetLinesComponent, BudgetSettingsComponent]
})
export class BudgetModule { }
