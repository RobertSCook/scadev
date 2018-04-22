import { TestBed, inject } from '@angular/core/testing';

import { Data.ServiceService } from './data.service.service';

describe('Data.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Data.ServiceService]
    });
  });

  it('should be created', inject([Data.ServiceService], (service: Data.ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
