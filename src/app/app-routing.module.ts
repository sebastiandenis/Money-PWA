import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './core/containers/app';
import { BudgetComponent } from './budget/budget.component';
import { SigninComponent } from './auth/signin/signin.component';

const appRoutes: Routes = [

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
