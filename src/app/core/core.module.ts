import { NgModule } from '@angular/core';
import { ErrorSnackbarComponent } from './components/error-snackbar/error-snackbar.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/index';
import { AuthService } from '../services/auth.service';
import { BudgetService } from '../services/budget.service';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EqualValidator } from '../auth/signup/equal-validator.directive';
import { NotFoundPageComponent } from './containers/not-found-page';
import { WindowScrollDirective } from './containers/window-scroll.directive';

@NgModule({
    declarations: [
        MainMenuComponent,
        ToolbarComponent,
        EqualValidator,
        NotFoundPageComponent,
        WindowScrollDirective
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [
        AppRoutingModule,
        MainMenuComponent,
        ToolbarComponent,
        EqualValidator,
        NotFoundPageComponent,
        WindowScrollDirective
    ],
    providers: [AuthService, BudgetService, UserService, StorageService],
})
export class CoreModule {}