import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatDividerModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header title correctly', () => {
    const titleElement = fixture.debugElement.query(By.css('.header__title'));
    expect(titleElement.nativeElement.textContent).toContain('Heroes App');
  });

  it('should render a mat-divider', () => {
    const dividerElement = fixture.debugElement.query(By.directive(MatDivider));
    expect(dividerElement).toBeTruthy();
  });
  
});
