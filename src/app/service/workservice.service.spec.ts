import { TestBed } from '@angular/core/testing';

import { WorkserviceService } from './workservice.service';

describe('WorkserviceService', () => {
  let service: WorkserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
