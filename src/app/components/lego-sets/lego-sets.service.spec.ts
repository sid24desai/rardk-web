import { TestBed } from '@angular/core/testing';

import { LegoSetsService } from './lego-sets.service';

describe('LegoSetsService', () => {
  let service: LegoSetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegoSetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
