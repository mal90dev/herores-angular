import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHeroViewComponent } from './create-hero-view.component';

describe('CreateHeroViewComponent', () => {
  let component: CreateHeroViewComponent;
  let fixture: ComponentFixture<CreateHeroViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHeroViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHeroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
