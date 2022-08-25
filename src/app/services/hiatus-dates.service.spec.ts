import { TestBed } from '@angular/core/testing';

import { HiatusDatesService } from './hiatus-dates.service';

describe('HiatusDatesService', () => {
  let service: HiatusDatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HiatusDatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
