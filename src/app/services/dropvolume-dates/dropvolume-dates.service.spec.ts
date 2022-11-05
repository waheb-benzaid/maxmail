import { TestBed } from '@angular/core/testing';

import { DropvolumeDatesService } from './dropvolume-dates.service';

describe('DropvolumeDatesService', () => {
  let service: DropvolumeDatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropvolumeDatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
