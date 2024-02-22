import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';

describe('AppComponent', () => {

  it('should render AppComponent', async () => {
    const component = await render(AppComponent);
    expect(component).toBeTruthy();
  });

  it('should show app-header component', async () => {
    await render(AppComponent);
    const header = screen.getByRole('heading');
    expect(header).toBeVisible();
  });

  it('should load router-outlet', async () => {
    const { getByTestId } = await render(AppComponent);
    const spinnerComponent = getByTestId('router-outlet');
    expect(spinnerComponent).toBeTruthy();
  });

  it('should show app-spinner component', async () => {
    const { getByTestId } = await render(AppComponent);
    const spinnerComponent = getByTestId('app-spinner');
    expect(spinnerComponent).toBeTruthy();
  });

});
