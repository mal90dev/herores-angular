import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { screen } from '@testing-library/angular';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render component', () => {
    expect(component).toBeTruthy();
  });

  it('should show app-header component', () => {
    expect(screen.getByRole('heading')).toBeVisible();
  });

  it('should show app-spinner component', () => {
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeVisible();
  });

});
