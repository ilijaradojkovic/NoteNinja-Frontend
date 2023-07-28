import {TestBed} from '@angular/core/testing';

import {DataNotifierService} from './service/data-notifier.service';

describe('DataNotifierService', () => {
  let service: DataNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
