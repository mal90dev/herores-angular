import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateHeroViewComponent } from './create-hero-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateHeroViewComponent', () => {
  let component: CreateHeroViewComponent;
  let fixture: ComponentFixture<CreateHeroViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHeroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the component', () => {
    expect(component).toBeDefined();
  });
});
