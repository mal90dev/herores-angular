import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateHeroViewComponent } from './create-hero-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { routes } from '../../../../app.routes';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

describe('CreateHeroViewComponent', () => {
  let component: CreateHeroViewComponent;
  let fixture: ComponentFixture<CreateHeroViewComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes(routes),
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
    }).compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHeroViewComponent);
    location = TestBed.inject(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the component', () => {
    expect(component).toBeDefined();
  });

  describe('HTML tests', () => {

    describe('Back button', () => {
      it('should show the back button', () => {
        expect(screen.getByRole('button', { name: 'Back'})).toBeVisible();
      });

      it('should go to "/" route', async () => {
        const backButton = screen.getByRole('button', { name: 'Back'});
        
        await userEvent.click(backButton);
        fixture.detectChanges();

        expect(location.path()).toBe('/heroes');
      });
        
    });
  
    it('should show the form element', () => {
      expect(screen.getByRole('form')).toBeVisible();
    });
  
    it('should show an image', () => {
      expect(screen.getByRole('img')).toBeVisible();
    });
  
    it('should show three headers', () => {
      const headers = screen.getAllByRole('heading');
  
      expect(headers.length).toBe(3);
      expect(headers.at(0)).toHaveTextContent('Biography');
      expect(headers.at(1)).toHaveTextContent('Powerstats');
      expect(headers.at(2)).toHaveTextContent('Appearance');
    });
  
    describe('Button Update/Created', () => {

      it('should show the Create button', () => {
        expect(screen.getByRole('button', { name: 'Created'})).toBeVisible();
      });
    
      it('should show the Update button', () => {
        component.id.set('1');
        fixture.detectChanges();
  
        expect(screen.getByRole('button', { name: 'Update'})).toBeVisible();
      });

      it('should call onSubmit method to click button', async () => {
        const spySubmit = jest.spyOn(component, 'onSubmit');
        const button = screen.getByRole('button', { name: 'Created'});

        await userEvent.click(button);

        expect(spySubmit).toHaveBeenCalledTimes(1);
      });
    });

    it('should show the Biography data', () => {
      expect(screen.getByLabelText('Name')).toBeVisible();
      expect(screen.getByLabelText('fullName')).toBeVisible();
      expect(screen.getByLabelText('aliases')).toBeVisible();
      expect(screen.getByLabelText('publisher')).toBeVisible();
    });

    it('should show the Powerstats data', () => {
      expect(screen.getByLabelText('intelligence')).toBeVisible();
      expect(screen.getByLabelText('strength')).toBeVisible();
      expect(screen.getByLabelText('speed')).toBeVisible();
      expect(screen.getByLabelText('durability')).toBeVisible();
      expect(screen.getByLabelText('power')).toBeVisible();
      expect(screen.getByLabelText('combat')).toBeVisible();
    });

    it('should show the Appearance data', () => {
      expect(screen.getByLabelText('gender')).toBeVisible();
      expect(screen.getByLabelText('race')).toBeVisible();
      expect(screen.getByLabelText('height')).toBeVisible();
      expect(screen.getByLabelText('weight')).toBeVisible();
    });

  });

});
