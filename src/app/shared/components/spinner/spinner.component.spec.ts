import { render, screen } from '@testing-library/angular';
import { SpinnerComponent } from './spinner.component';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from '../../../core/services/loading.service';


describe('SpinnerComponent', () => { 

  it('should render component', async () => {    
    const component = await render(SpinnerComponent);
    expect(component).toBeTruthy();
  });

  it('should not show spinner', async () => {
    const loadingMock = {
      loadingSub: new BehaviorSubject<boolean>(false)
    };
    await render(SpinnerComponent, {
      componentProviders: [
        {
          provide: LoadingService,
          useValue: loadingMock
        },
      ]
    });
    const spinner = screen.queryByRole('progressbar');
    expect(spinner).toBeNull();
    expect(spinner?.getElementsByClassName('spinner__overlay')).toBeFalsy();
  });

  it('should show spinner', async () => {
    const loadingMock = {
      loadingSub: new BehaviorSubject<boolean>(true)
    };
    await render(SpinnerComponent, {
      componentProviders: [
        {
          provide: LoadingService,
          useValue: loadingMock
        },
      ]
    });
    const spinner = screen.queryByRole('progressbar');
    expect(spinner).toBeVisible();
    expect(spinner?.getElementsByClassName('spinner__overlay')).toBeTruthy();
  });

  it('should not show overlay', async () => {
    const loadingMock = {
      loadingSub: new BehaviorSubject<boolean>(false)
    };
    const { container, fixture } = await render(SpinnerComponent, {
      componentProviders: [
        {
          provide: LoadingService,
          useValue: loadingMock
        }
      ]
    });
    const overlayElement = container.querySelector('.spinner__overlay');
    expect(overlayElement).toBeFalsy();
  });

  it('should show overlay', async () => {
    const loadingMock = {
      loadingSub: new BehaviorSubject<boolean>(true)
    };
    const { container, fixture } = await render(SpinnerComponent, {
      componentProviders: [
        {
          provide: LoadingService,
          useValue: loadingMock
        }
      ]
    });
    const overlayElement = container.querySelector('.spinner__overlay');
    expect(overlayElement).toBeTruthy();
  });

});

