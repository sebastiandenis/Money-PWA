import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Component, Input, Inject, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.actions';
import * as UserActions from '../../store/actions/user.actions';
import * as BudgetActions from '../../store/actions/budget.actions';
import * as UiStateActions from '../../store/actions/uiState.actions';
import * as fromRoot from '../../store/app.reducers';
import { User } from '../../models/user.model';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';
import { Auth } from '../../models/auth.model';
import { ChangeDetectionStrategy } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from '../../services/window.service';



@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrls: ['./app.css'],
    animations: [
        trigger('toolbarState', [
            state('normal', style({
                opacity: 1,
                transform: 'translateY(0px)'
            })),
            state('hidden', style({
                opacity: 0.5,
                transform: 'translateY(-100px)'
            })),
            transition('normal => hidden', animate(600)),
            transition('hidden => normal', animate(300))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'app';
    user$: Observable<User>;
    auth$: Observable<Auth>;
    isLoggedIn$: Observable<boolean>;
    userSubscription: Subscription;
    authSubscription: Subscription;
    mainToolbarSubscription: Subscription;
    showSidenav$: Observable<boolean>;
    mainToolbarFixed$: Observable<boolean>;
    storageRef: any;
    photoUrl: string;
    toolbarClassName = 'app-header';
    toolbarState = 'normal';

    @Input() open = false;
    lastOffset: number;


    constructor(private translate: TranslateService,
        private afAuth: AngularFireAuth,
        private store: Store<fromRoot.AppState>,
        private storageService: StorageService,
        public cd: ChangeDetectorRef,
        @Inject(DOCUMENT) private document: Document,
        @Inject(WINDOW) private window: Window) {
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use('en');


        this.storageService.getUserPhotoUrl('kvMEwjiF6sRV2D0Zy5euiOLNuNt2')
            .subscribe((url) => {
                this.photoUrl = url;
                console.log('URL: ', url);
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
        this.isLoggedIn$ = this.store.select(fromRoot.selectAuthIsUserLoggedIn);
        this.showSidenav$ = this.store.select(fromRoot.selectShowSidenav);
        this.mainToolbarFixed$ = this.store.select(fromRoot.selectMainToolbarFixed);
        this.auth$ = this.store.select(fromRoot.selectAuthUserData);
        this.user$ = this.store.select(fromRoot.selectUser);

        this.mainToolbarSubscription = this.mainToolbarFixed$.subscribe(
            isFixed => {
                if (isFixed && this.toolbarState !== 'normal') {
                    this.toolbarState = 'normal';
                    this.cd.detectChanges();
                } else if (!isFixed && this.toolbarState !== 'hidden') {
                    this.toolbarState = 'hidden';
                    this.cd.detectChanges();
                }
            }
        );


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

    @HostListener('window:scroll', [])
    onWScroll() {
        console.log('window scrolling...');
        const scrollTop = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
        if (this.lastOffset > scrollTop) {
            this.store.dispatch(new UiStateActions.ChangeMainToolbarVisibleAction(true));
        } else if (scrollTop < 10) {
            this.store.dispatch(new UiStateActions.ChangeMainToolbarVisibleAction(true));
        } else if (scrollTop > 100) {
            this.store.dispatch(new UiStateActions.ChangeMainToolbarVisibleAction(false));
        }

        this.lastOffset = scrollTop;
    }


    ngOnInit() {
        this.lastOffset = 0;
        this.authSubscription = this.auth$.subscribe(
            auth => {
            }
        );
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
    }
}
