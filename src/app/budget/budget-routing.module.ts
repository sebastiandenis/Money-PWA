import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetDashboardComponent } from './containers/budget-dashboard/budget-dashboard.component';
import { BudgetLinesComponent } from './budget-lines/budget-lines.component';
import { BudgetSettingsComponent } from './containers/budget-settings/budget-settings.component';
import { BudgetComponent } from './budget.component';
import { AddFastExpenseComponent } from './containers/add-fast-expense/add-fast-expense.component';

const budgetRoutes: Routes = [
    {
        path: 'budget', component: BudgetComponent, children: [
            { path: 'dashboard', component: BudgetDashboardComponent },
            { path: 'lines', component: BudgetLinesComponent },
            { path: 'alerts', component: BudgetSettingsComponent },

        ],
    },
    {
        path: 'addFastExpense', component: AddFastExpenseComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(budgetRoutes)
    ],
    exports: [RouterModule]
})
export class BudgetRoutingModule { }
