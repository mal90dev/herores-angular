import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { LoadingService } from '../../../core/services/loading.service';
import { screen } from '@testing-library/angular';

describe('SpinnerComponent', () => {

  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let loadingService: LoadingService = new LoadingService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    })
    .overrideProvider(LoadingService, {
      useValue: loadingService
    })
    .compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render component', () => {
    expect(component).toBeTruthy();
  });

  describe('show/hide mat-spinner component', () => {
    it('should show mat-spinner', () => {
      loadingService.setLoading(true);
      fixture.detectChanges();
      expect(screen.getByRole('progressbar')).toBeVisible();
    });
  
    it('should not show mat-spinner', () => {
      loadingService.setLoading(false);
      fixture.detectChanges();
      expect(screen.queryByRole('progressbar')).toBeNull();
    });
  });

  describe('show/hide overlay', () => {
    it('should show overlay', () => {
      loadingService.setLoading(true);
      fixture.detectChanges();
      expect(screen.getByTestId('spinner__overlay')).toBeVisible();
    });

    it('should not show overlay', () => {
      loadingService.setLoading(false);
      fixture.detectChanges();
      expect(screen.queryByTestId('spinner__overlay')).toBeNull();
    });
  });

});
