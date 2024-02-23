import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { hero } from '../../../../__mocks__/hero';
import { screen, within } from '@testing-library/angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import userEvent from '@testing-library/user-event';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('hero', hero);
    fixture.detectChanges();
  });

  it('should render the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show the name of hero', () => {
    expect(screen.getByText(hero.name));
  });

  it('should show the mat-menu buttons', async () => {
    const buttonMenu = screen.getByLabelText('Toggle menu');
    await userEvent.click(buttonMenu);
    const buttons = screen.getAllByRole('menuitem');
    
    expect(buttons.length).toBe(3);
    expect(within(buttons[0]).getByText(/Details/i)).toBeInTheDocument();
    expect(within(buttons[1]).getByText(/Edit/i)).toBeInTheDocument();
    expect(within(buttons[2]).getByText(/Remove/i)).toBeInTheDocument();
  });

  it('should show the image', () => {
    const img = screen.getByRole('img');

    expect(img).toBeVisible();
    expect(img).toHaveAttribute('src', hero.image);
  });

  it('should emit an onRemove event', () => {
    const spy = jest.spyOn(component.onRemove, 'next');
    component.remove();
    expect(spy).toHaveBeenCalledWith(hero.id);
  });

  it('should emit an onDetails event', () => {
    const spy = jest.spyOn(component.onDetails, 'next');
    component.details();
    expect(spy).toHaveBeenCalledWith(hero.id);
  });  

});
