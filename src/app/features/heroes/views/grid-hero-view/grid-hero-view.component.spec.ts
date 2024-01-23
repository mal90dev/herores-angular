import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHeroViewComponent } from './grid-hero-view.component';

describe('GridHeroViewComponent', () => {
  let component: GridHeroViewComponent;
  let fixture: ComponentFixture<GridHeroViewComponent>;
GridHeroViewComponent
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridHeroViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridHeroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
