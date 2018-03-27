import { TestBed, inject } from '@angular/core/testing';

import { PrivateAuthGuardService } from './private-auth-guard.service';

describe('PrivateAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrivateAuthGuardService]
    });
  });

  it('should be created', inject([PrivateAuthGuardService], (service: PrivateAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
