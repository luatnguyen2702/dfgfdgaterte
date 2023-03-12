import { TestBed } from '@angular/core/testing';

import { Auth.Interceptor.TsService } from './auth.interceptor.ts.service';

describe('Auth.Interceptor.TsService', () => {
  let service: Auth.Interceptor.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth.Interceptor.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
