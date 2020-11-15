import { TestBed } from '@angular/core/testing';

import { PayuService } from './payu.service';

describe('PayuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayuService = TestBed.get(PayuService);
    expect(service).toBeTruthy();
  });
});
