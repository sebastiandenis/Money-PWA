import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { BudgetTabsComponent } from './containers/budget-tabs/budget-tabs.component';
import { BudgetDashboardComponent } from './containers/budget-dashboard/budget-dashboard.component';
import { BudgetLinesComponent } from './containers/budget-lines/budget-lines.component';
import { BudgetSettingsComponent } from './containers/budget-settings/budget-settings.component';
import { BudgetRoutingModule } from './budget-routing.module';
import { LinesListComponent } from './components/lines-list/lines-list.component';
import { LinesListItemComponent } from './components/lines-list-item/lines-list-item.component';
import { LineDetailsComponent } from './components/line-details/line-details.component';
import { OverlayModule, OverlayContainer } from '@angular/cdk/overlay';
import { TranslateModule } from '@ngx-translate/core';
import { AddExpenseDlgComponent } from './containers/budget-lines/add-expense-dlg.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BudgetEffects } from './store/effects/budget.effects';
import { BudgetLinesEffects } from './store/effects/budget-lines.effects';
import { ExpenseEffects } from './store/effects/expense.effects';
import { reducers } from './store/reducers/index';
import { AddFastExpenseComponent } from './containers/add-fast-expense/add-fast-expense.component';
import { DashboardChartComponent } from './components/dashboard-chart/dashboard-chart.component';
import { BudgetMainComponent } from './containers/budget-main/budget-main.component';
import { LineMenuComponent } from './components/line-menu/line-menu.component';
import { LineMenuService } from './components/line-menu/line-menu.service';


@NgModule({
  declarations: [
    BudgetDashboardComponent,
    BudgetLinesComponent,
    BudgetSettingsComponent,
    BudgetTabsComponent,
    LinesListComponent,
    LinesListItemComponent,
    LineDetailsComponent,
    AddExpenseDlgComponent,
    AddFastExpenseComponent,
    DashboardChartComponent,
    BudgetMainComponent,
    LineMenuComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('budgetModule', reducers ),
    EffectsModule.forFeature([BudgetLinesEffects, BudgetEffects, ExpenseEffects]),
    MaterialModule,
    SharedModule,
    RoundProgressModule,
    BudgetRoutingModule,
    OverlayModule
  ],
  entryComponents: [
     AddExpenseDlgComponent, LineMenuComponent
  ],
  providers: [LineMenuService]

})
export class BudgetModule { }
