import { TestBed } from '@angular/core/testing';

import { ServiceProviderGuard } from './service-provider.guard';

describe('ServiceProviderGuard', () => {
  let guard: ServiceProviderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ServiceProviderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
