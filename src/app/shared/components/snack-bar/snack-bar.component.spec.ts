import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarComponent } from './snack-bar.component';
import { Hero } from 'src/app/features/heroes/shared/interfaces/hero.interface';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

describe('SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;
  let mockMatDialogData: any;
  const hero: Hero = {
    name: "A-Bombaa",
    appearance: {
      gender: "Male",
      race: "Human",
      height: [
        "203"
      ],
      weight: [
        "441"
      ]
    },
    powerstats: {
      intelligence: 402,
      strength: 100,
      speed: 17,
      durability: 80,
      power: 24,
      combat: 64
    },
    biography: {
      fullName: "Richard Milhouse Jones",
      aliases: [
        "Rick Jones"
      ],
      publisher: "Marvel Comics"
    },
    image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg",
    id: 1
  };

  beforeEach(async () => {
    mockMatDialogData = {
      hero: hero
    };
    await TestBed.configureTestingModule({
      declarations: [ SnackBarComponent ],
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
  
});
