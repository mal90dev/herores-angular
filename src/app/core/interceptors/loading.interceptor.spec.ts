import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoadingInterceptor } from './loading.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoadingService } from '../services/loading.service';

describe('LoadingInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let loadingService: LoadingService;
  let http: HttpClient;

  beforeEach(() => { TestBed.configureTestingModule({
    providers: [
      LoadingInterceptor,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi: true,
      },
      LoadingService
    ],
    imports: [
      HttpClientTestingModule
    ]
    });
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    loadingService = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    const interceptor: LoadingInterceptor = TestBed.inject(LoadingInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should show and hide the upload correctly', fakeAsync(() => {
    http.get('/api/data').subscribe(() => {
      expect(loadingService.loadingSub.value).toBeTruthy();
    });
    const req = httpTestingController.expectOne('/api/data');
    req.flush({});
    tick(3000);
    expect(loadingService.loadingSub.value).toBeFalsy();
  }));

});
