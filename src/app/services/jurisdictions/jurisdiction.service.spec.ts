import { TestBed } from '@angular/core/testing';

import { JurisdictionService } from './jurisdiction.service';

describe('JurisdictionService', () => {
  let service: JurisdictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JurisdictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
