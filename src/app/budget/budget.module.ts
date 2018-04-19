import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetComponent } from './budget.component';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { BudgetTabsComponent } from './containers/budget-tabs/budget-tabs.component';
import { BudgetDashboardComponent } from './containers/budget-dashboard/budget-dashboard.component';
import { BudgetLinesComponent } from './budget-lines/budget-lines.component';
import { BudgetSettingsComponent } from './containers/budget-settings/budget-settings.component';
import { BudgetRoutingModule } from './budget-routing.module';
import { LinesListComponent } from './budget-lines/lines-list/lines-list.component';
import { LinesListItemComponent } from './budget-lines/lines-list-item/lines-list-item.component';
import { LinesActionsComponent } from './budget-lines/lines-actions/lines-actions.component';
import { LineDetailsComponent } from './budget-lines/line-details/line-details.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { TranslateModule } from '@ngx-translate/core';
import { AddExpenseDlgComponent } from './budget-lines/add-expense-dlg.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BudgetEffects } from './store/effects/budget.effects';
import { BudgetLinesEffects } from './store/effects/budget-lines.effects';
import { ExpenseEffects } from './store/effects/expense.effects';
import { reducers } from './store/reducers/index';
import { LinesActionsOverlayService } from './budget-lines/lines-actions/lines-actions-overlay.service';
import { AddFastExpenseComponent } from './containers/add-fast-expense/add-fast-expense.component';





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
    LineDetailsComponent,
    AddExpenseDlgComponent,
    AddFastExpenseComponent
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
     AddExpenseDlgComponent, LinesActionsComponent
  ],
  providers: []

})
export class BudgetModule { }
