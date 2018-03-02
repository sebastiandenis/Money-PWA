import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { LinesActionsOverlayRef } from './lines-actions-overlay-ref';
import { OverlayRef } from '@angular/cdk/overlay/typings/overlay-ref';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { LinesActionsComponent } from './lines-actions.component';
import { ComponentRef } from '@angular/core/src/linker/component_factory';
// import { LINES_ACTIONS_DIALOG_DATA } from './lines-actions-overlay.tokens';
import { BudgetLine } from '../../../models/budget-line.model';



interface LinesActionsDialogConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    dane?: string;
}

const DEFAULT_CONFIG: LinesActionsDialogConfig = {
    hasBackdrop: true,
    backdropClass: 'dark-backdrop',
    panelClass: 'tm-lines-actions-dialog-panel',
    dane: null
};

@Injectable()
export class LinesActionsOverlayService {
    constructor(
        private injector: Injector,
        private overlay: Overlay
    ) { }

    open(config: LinesActionsDialogConfig = {}) {
        const dialogConfig = { ...DEFAULT_CONFIG, ...config };

        const overlayRef: OverlayRef = this.createOverlay(dialogConfig);

        const dialogRef = new LinesActionsOverlayRef(overlayRef);

        const overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);

        dialogRef.componentInstance = overlayComponent;

        overlayRef.backdropClick().subscribe(_ => dialogRef.close2());

        return dialogRef;
    }

    private createOverlay(config: LinesActionsDialogConfig) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }

    private attachDialogContainer(overlayRef: OverlayRef, config: LinesActionsDialogConfig, dialogRef: LinesActionsOverlayRef) {
        const injector = this.createInjector(config, dialogRef);

        const containerPortal = new ComponentPortal(LinesActionsComponent, null, injector);
        const containerRef: ComponentRef<LinesActionsComponent> = overlayRef.attach(containerPortal);

        return containerRef.instance;
    }

    private createInjector(config: LinesActionsDialogConfig, dialogRef: LinesActionsOverlayRef): PortalInjector {
        const injectionTokens = new WeakMap();

        injectionTokens.set(LinesActionsOverlayRef, dialogRef);
     //    injectionTokens.set(LINES_ACTIONS_DIALOG_DATA, config.dane);

        return new PortalInjector(this.injector, injectionTokens);
    }

    private getOverlayConfig(config: LinesActionsDialogConfig): OverlayConfig {
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .bottom();


        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });

        return overlayConfig;
    }
}
