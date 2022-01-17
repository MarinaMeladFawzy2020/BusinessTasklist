import { TestBed } from '@angular/core/testing';

import { TasklistService } from './tasklist.service';

describe('TasklistService', () => {
  let service: TasklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
