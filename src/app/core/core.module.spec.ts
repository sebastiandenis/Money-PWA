import { CoreModule } from './core.module';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';

describe('CoreModule', () => {
  let coreModule: CoreModule;
  let overlayContainer: OverlayContainer;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [OverlayContainer] });
    overlayContainer = TestBed.get(OverlayContainer);
    coreModule = new CoreModule(overlayContainer);
  });

  it('should create an instance', () => {
    expect(coreModule).toBeTruthy();
  });
});
