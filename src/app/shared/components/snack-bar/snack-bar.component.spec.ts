import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackBarComponent } from './snack-bar.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarData } from '../../interfaces/snackBarData.interface';
import { screen } from '@testing-library/angular';


describe('SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;
  let matSnackbarData: SnackBarData;
  
  beforeEach(async () => {
    matSnackbarData = {
      message: 'message testing',
      icon: 'icon testing'
    };
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: matSnackbarData
        }
      ]
    })
    .compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render component', () => {
    expect(component).toBeTruthy();
  });

  it('should show message', () => {
    expect(screen.getByText(matSnackbarData.message)).toBeVisible();
  });
  
  it('should show icon', () => {
    const icon = screen.getByRole('img', { name: 'icon' });
    expect(icon).toBeVisible();
    expect(icon.getAttribute('ng-reflect-font-icon')).toBe(matSnackbarData.icon);
  });

});


