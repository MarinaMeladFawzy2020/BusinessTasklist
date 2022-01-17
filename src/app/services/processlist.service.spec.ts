import { TestBed } from '@angular/core/testing';

import { ProcesslistService } from './processlist.service';

describe('ProcesslistService', () => {
  let service: ProcesslistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesslistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
