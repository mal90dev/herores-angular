import { ComponentFixture, TestBed } from '@angular/core/testing';
import { screen } from '@testing-library/angular';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the component', () => {
    expect(component).toBeDefined();
  });

  it('should render the header', () => {
    expect(screen.getByRole('heading')).toBeVisible();
    expect(screen.getByRole('heading')).toHaveTextContent('Heroes App');
  });

  it('should render the divider', () => {
    expect(screen.getByRole('separator')).toBeVisible();
  });

});
