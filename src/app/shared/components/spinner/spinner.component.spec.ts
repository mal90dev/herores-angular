import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { LoadingService } from 'src/app/core/services/loading.service';
import { By } from '@angular/platform-browser';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let loadingService: LoadingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        LoadingService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    loadingService = TestBed.inject(LoadingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display mat-spinner when loading is true', () => {
    loadingService.setLoading(true);
    fixture.detectChanges();
    const spinnerElement = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinnerElement).toBeTruthy();
  });

  it('should display spinner overlay when loading is true', () => {
    loadingService.setLoading(true);
    fixture.detectChanges();
    const overlayElement = fixture.debugElement.query(By.css('.spinner__overlay'));
    expect(overlayElement).toBeTruthy();
  });

  it('should not display mat-spinner when loading is false', () => {
    loadingService.setLoading(false);
    fixture.detectChanges();
    const spinnerElement = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinnerElement).toBeNull();
  });

  it('should not display spinner overlay when loading is false', () => {
    loadingService.setLoading(false);
    fixture.detectChanges();
    const overlayElement = fixture.debugElement.query(By.css('.spinner__overlay'));
    expect(overlayElement).toBeNull();
  });
});
