import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  Input,
  Inject,
  HostListener,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  transition,
  animate,
  state,
  style,
  trigger
} from '@angular/animations';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store, select } from '@ngrx/store';
import * as AuthActions from './auth/store/auth.actions';
import * as UserActions from './user/store/user.actions';
import * as BudgetActions from './budget/store/actions/budget.actions';
import * as UiStateActions from './core/store/uiState.actions';
import * as fromRoot from './store/app.reducers';
import { User } from './user/models/user.model';
import { Auth } from './auth/models/auth.model';
import { StorageService } from './services/storage.service';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar, MatSidenav, MatSidenavContent } from '@angular/material';
import { UndoSnackbarComponent } from './core/components/undo-snackbar/undo-snackbar.component';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';
import { Router, NavigationEnd } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('toolbarState', [
      state(
        'normal',
        style({
          opacity: 1,
          transform: 'translateY(0px)'
        })
      ),
      state(
        'hidden',
        style({
          opacity: 1,
          transform: 'translateY(-100px)'
        })
      ),
      transition('normal => hidden', animate(600)),
      transition('hidden => normal', animate(300))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  title = 'app';
  user$: Observable<User>;
  auth$: Observable<Auth>;
  isLoggedIn$: Observable<boolean>;
  userSubscription: Subscription;
  authSubscription: Subscription;
  mainToolbarSubscription: Subscription;
  routerSubscription: Subscription;
  handsetSubscription: Subscription;
  scrollingSubscription: Subscription;
  showSidenav$: Observable<boolean>;
  showUndoSnackbar$: Observable<boolean>;
  showUndoSnackbarSub: Subscription;
  mainToolbarFixed$: Observable<boolean>;

  isPopState = false;

  storageRef: any;
  photoUrl: string;
  toolbarClassName = 'app-header';
  toolbarState = 'normal';
  sidenavClass = {};

  @Input() open = false;
  lastOffset: number;

  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('sidenavContent') sidenavContent: MatSidenavContent;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private translate: TranslateService,
    private afAuth: AngularFireAuth,
    private store: Store<fromRoot.AppState>,
    private storageService: StorageService,
    public cd: ChangeDetectorRef,
    public scroll: ScrollDispatcher,
    public snackBar: MatSnackBar,
    private router: Router,
    private locStrat: LocationStrategy
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');

    this.storageService
      .getUserPhotoUrl('kvMEwjiF6sRV2D0Zy5euiOLNuNt2')
      .subscribe(url => {
        this.photoUrl = url;
        // console.log('URL: ', url);
      });

    this.authSubscription = this.afAuth.authState.subscribe(user => {
      if (user) {
        // zalogowany
        // console.log('LoadUserDataAction... ', user.uid);
        this.store.dispatch(new UserActions.LoadUserDataAction(user.uid));
      } else {
        // nie jest zalogowany
      }
    });
    this.isLoggedIn$ = this.store.pipe(
      select(fromRoot.selectAuthIsUserLoggedIn)
    );
    this.showSidenav$ = this.store.select(fromRoot.selectShowSidenav);
    this.mainToolbarFixed$ = this.store.select(fromRoot.selectMainToolbarFixed);
    this.auth$ = this.store.select(fromRoot.selectAuthUserData);
    this.user$ = this.store.select(fromRoot.selectUser);
    this.showUndoSnackbar$ = this.store.select(
      fromRoot.selectUiShowUndoSnackbar
    );

    this.mainToolbarSubscription = this.mainToolbarFixed$.subscribe(isFixed => {
      if (isFixed && this.toolbarState !== 'normal') {
        this.toolbarState = 'normal';
        this.cd.detectChanges();
      } else if (!isFixed && this.toolbarState !== 'hidden') {
        this.toolbarState = 'hidden';
        this.cd.detectChanges();
      }
    });

    this.showUndoSnackbarSub = this.showUndoSnackbar$.subscribe(isVisible => {
      if (isVisible) {
        this.snackBar.openFromComponent(UndoSnackbarComponent, {
          data: 'not used',
          duration: 3500
          //    extraClasses: ['undo-class']
        });
        this.snackBar._openedSnackBarRef.afterDismissed().subscribe(() => {
          this.store.dispatch(new UiStateActions.CloseUndoSnackbar());
        });

        this.snackBar._openedSnackBarRef.onAction().subscribe(() => {
          // kliknięty przycisk cofnij
        });
      }
    });

    this.scrollingSubscription = this.scroll
      .scrolled()
      .subscribe((data: CdkScrollable) => {
        this.onWindowScroll(data);
      });
  }

  closeSidenav() {
    this.store.dispatch(new UiStateActions.CloseSidenavAction());
  }

  openSidenav() {
    this.store.dispatch(new UiStateActions.OpenSidenavAction());
  }

  switchSidenav() {
    this.store.dispatch(new UiStateActions.SwitchSidenavAction());
  }

  backdrop() {
    this.closeSidenav();
  }

  private onWindowScroll(data: CdkScrollable) {
    const scrollTop = data.getElementRef().nativeElement.scrollTop || 0;
    if (this.lastOffset > scrollTop) {
      this.store.dispatch(
        new UiStateActions.ChangeMainToolbarVisibleAction(true)
      );
    } else if (scrollTop < 10) {
      this.store.dispatch(
        new UiStateActions.ChangeMainToolbarVisibleAction(true)
      );
    } else if (scrollTop > 100) {
      this.store.dispatch(
        new UiStateActions.ChangeMainToolbarVisibleAction(false)
      );
    }

    this.lastOffset = scrollTop;
  }

  ngOnInit() {
    this.lastOffset = 0;
    this.authSubscription = this.auth$.subscribe(auth => {});
    this.userSubscription = this.user$.subscribe(user => {
      if (user && user.config && user.config.lang !== undefined) {
        this.translate.use(user.config.lang);
      }
    });

    this.mainToolbarFixed$.subscribe((isFixed: boolean) => {
      // console.log('mainToolbarFixed$:', isFixed);
      if (isFixed) {
        this.toolbarClassName = 'app-header';
      } else {
        this.toolbarClassName = 'app-header-hidden';
      }
    });

    this.locStrat.onPopState(() => {
      this.isPopState = true;
    });

    this.routerSubscription = this.router.events.subscribe(event => {
      // Scroll to top if accessing a page, not via browser history stack
      if (event instanceof NavigationEnd && !this.isPopState) {
        document.querySelector('[cdkScrollable]').scrollTop = 0;
        // window.scrollTo(0, 0);
        this.isPopState = false;
      }

      // Ensures that isPopState is reset
      if (event instanceof NavigationEnd) {
        this.isPopState = false;
      }
    });

    this.handsetSubscription = this.isHandset$.subscribe(result => {
      console.log('isHandset: ', result);
      if (result) {
        this.sidenavClass = { 'app-sidenav-handset': true };
      } else {
        this.sidenavClass = { 'app-sidenav': true };
      }
    });
  }

  signOut() {
    this.closeSidenav();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.mainToolbarSubscription) {
      this.mainToolbarSubscription.unsubscribe();
    }
    if (this.showUndoSnackbarSub) {
      this.showUndoSnackbarSub.unsubscribe();
    }

    if (this.scrollingSubscription) {
      this.scrollingSubscription.unsubscribe();
    }

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

    if (this.handsetSubscription) {
      this.handsetSubscription.unsubscribe();
    }
  }
}
