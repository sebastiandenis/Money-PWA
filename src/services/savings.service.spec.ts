import { TestBed, inject } from '@angular/core/testing';

import { SavingsService } from './savings.service';

describe('SavingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavingsService]
    });
  });

  it('should be created', inject([SavingsService], (service: SavingsService) => {
    expect(service).toBeTruthy();
  }));
});
