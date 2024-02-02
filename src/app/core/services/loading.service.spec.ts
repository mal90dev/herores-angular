import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('You should send a loadingSub event with a value passed as a parameter', () => {
    const spy = spyOn(service.loadingSub, 'next');
    const value = true;
    service.setLoading(value);
    expect(spy).toHaveBeenCalledWith(value);
  });

});
