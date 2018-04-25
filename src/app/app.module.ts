import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { reducers } from './store/app.reducers';
import { AuthModule } from './auth/auth.module';
import { AuthEffects } from './auth/store/auth.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { BudgetService } from './budget/services/budget.service';
import { BudgetEffects } from './budget/store/effects/budget.effects';
import { UserEffects } from './user/store/user.effects';
import { UserService } from './user/services/user.service';
import { AuthService } from './auth/services/auth.service';
import { EqualValidator } from './auth/containers/signup/equal-validator.directive';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './core/components/main-menu/main-menu.component';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { NotFoundPageComponent } from './core/containers/not-found-page';
import { BudgetModule } from './budget/budget.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/index';
import { StorageService } from './services/storage.service';
import { WindowScrollDirective } from './core/containers/window-scroll.directive';
import { CoreModule } from './core/core.module';
import { WINDOW_PROVIDERS } from './services/window.service';
import { LinesActionsOverlayService } from './budget/components/lines-actions/lines-actions-overlay.service';
import { BudgetLinesEffects } from './budget/store/effects/budget-lines.effects';
import { LinesActionsComponent } from './budget/components/lines-actions/lines-actions.component';
import { MAT_DATE_LOCALE } from '@angular/material';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [
    AppComponent,
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
    CoreModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, UserEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [WINDOW_PROVIDERS,
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' }
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
