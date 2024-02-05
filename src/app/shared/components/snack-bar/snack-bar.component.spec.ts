import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackBarComponent } from './snack-bar.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { SnackBarData } from '../../interfaces/snackBarData.interface';

describe('SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;
  let mockMatDialogData: SnackBarData;

  beforeEach(async () => {
    mockMatDialogData = {
      message: 'Test image',
      icon: 'icon'
    };
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        MatIconModule
      ],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: mockMatDialogData },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the message correctly', () => {
    const messageElement = fixture.debugElement.query(By.css('.snack-bar__p')).nativeElement;
    expect(messageElement.textContent.trim()).toBe(component.data.message);
  });

  it('should display the icon correctly', () => {
    const iconElement = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    expect(iconElement.getAttribute('fontIcon')).toBe(component.data.icon);
  });
  
});
