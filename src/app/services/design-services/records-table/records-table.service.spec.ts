import { TestBed } from '@angular/core/testing';

import { RecordsTableService } from './records-table.service';

describe('RecordsTableService', () => {
  let service: RecordsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
