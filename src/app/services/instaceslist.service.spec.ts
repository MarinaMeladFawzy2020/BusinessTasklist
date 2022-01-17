import { TestBed } from '@angular/core/testing';

import { InstaceslistService } from './instaceslist.service';

describe('InstaceslistService', () => {
  let service: InstaceslistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstaceslistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
