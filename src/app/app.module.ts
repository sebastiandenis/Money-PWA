import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './core/containers/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { firebaseConfig } from '../environments/firebase.config';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import 'hammerjs';
import { MatToolbarModule, MatIconModule, MatMenuModule, MatTabsModule, MatCardTitle, MatCardModule, } from '@angular/material';
import { MatListModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSidenavModule, MatSnackBarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { reducers } from './store/app.reducers';
import { AuthModule } from './auth/auth.module';
import { AuthEffects } from './store/effects/auth.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { BudgetService } from './services/budget.service';
import { BudgetEffects } from './store/effects/budget.effects';
import { UserEffects } from './store/effects/user.effects';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { EqualValidator } from './auth/signup/equal-validator.directive';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './core/components/main-menu/main-menu.component';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { NotFoundPageComponent } from './core/containers/not-found-page';
import { BudgetModule } from './budget/budget.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/index';



// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    EqualValidator,
    MainMenuComponent,
    ToolbarComponent,
    NotFoundPageComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AuthModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    BudgetModule,
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, BudgetEffects, UserEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AuthService, BudgetService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
