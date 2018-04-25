import { OverlayRef } from '@angular/cdk/overlay';
import { LinesActionsComponent } from './lines-actions.component';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { filter, take } from 'rxjs/operators';
import { AnimationEvent } from '@angular/animations';


export class LinesActionsOverlayRef {
    componentInstance: LinesActionsComponent;
    private _beforeClose = new Subject<void>();
    private _afterClosed = new Subject<void>();

    constructor(private overlayRef: OverlayRef) { }
    close2(): void {
        this.overlayRef.dispose();
    }
    close(): void {
        // Listen for animation 'start' events
        this.componentInstance.animationStateChanged.pipe(
            filter(event => event.phaseName === 'start'),
            take(1)
        ).subscribe(() => {
            this._beforeClose.next();
            this._beforeClose.complete();
                this.overlayRef.detachBackdrop();
        });

        // Listen for animation 'done' events
        this.componentInstance.animationStateChanged.pipe(
            filter(event => event.phaseName === 'done' && event.toState === 'leave'),
            take(1)
        ).subscribe(() => {
            this.overlayRef.dispose();
            this._afterClosed.next();
            this._afterClosed.complete();

            this.componentInstance = null;
        });

        this.componentInstance.startExitAnimation();

        //   this.overlayRef.dispose();
    }

    afterClosed(): Observable<void> {
        return this._afterClosed.asObservable();
    }

    beforeClose(): Observable<void> {
        return this._beforeClose.asObservable();
    }

}
