import { TestBed, inject } from '@angular/core/testing';

import { PublicAuthGuardService } from './public-auth-guard.service';

describe('PublicAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicAuthGuardService]
    });
  });

  it('should be created', inject([PublicAuthGuardService], (service: PublicAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
