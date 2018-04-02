import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetDashboardComponent } from './budget-dashboard/budget-dashboard.component';
import { BudgetLinesComponent } from './budget-lines/budget-lines.component';
import { BudgetSettingsComponent } from './budget-settings/budget-settings.component';
import { BudgetComponent } from './budget.component';

const budgetRoutes: Routes = [
    {
        path: 'budget', component: BudgetComponent, children: [
            { path: 'dashboard', component: BudgetDashboardComponent },
            { path: 'lines', component: BudgetLinesComponent },
            { path: 'alerts', component: BudgetSettingsComponent }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(budgetRoutes)
    ],
    exports: [RouterModule]
})
export class BudgetRoutingModule { }
