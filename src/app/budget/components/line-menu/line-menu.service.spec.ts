import { TestBed, inject } from '@angular/core/testing';

import { LineMenuService } from './line-menu.service';

describe('LineMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LineMenuService]
    });
  });

  it('should be created', inject([LineMenuService], (service: LineMenuService) => {
    expect(service).toBeTruthy();
  }));
});
