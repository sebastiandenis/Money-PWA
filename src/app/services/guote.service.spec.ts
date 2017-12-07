import { TestBed, inject } from '@angular/core/testing';

import { GuoteService } from './guote.service';

describe('GuoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuoteService]
    });
  });

  it('should be created', inject([GuoteService], (service: GuoteService) => {
    expect(service).toBeTruthy();
  }));
});
