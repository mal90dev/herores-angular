import { render, screen } from '@testing-library/angular';
import { SnackBarComponent } from './snack-bar.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarData } from '../../interfaces/snackBarData.interface';

describe('SnackBarComponent', () => {

  it('should render SnackBarComponent', async () => {
    const component = render(SnackBarComponent);
    expect(component).toBeTruthy();
  });


  it('should show message and icon', async () => {
    const data: SnackBarData = {
      message: 'message testing',
      icon: 'icon testing'
    };
    await render(SnackBarComponent, {
      componentProviders: [
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: data
        }
      ]
    });
    const icon = screen.getByRole('img');
    expect(screen.getByText(data.message)).toBeInTheDocument();
    expect(icon).toHaveAttribute('ng-reflect-font-icon', data.icon);
  });

});