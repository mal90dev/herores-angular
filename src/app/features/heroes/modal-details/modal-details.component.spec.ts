import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailsComponent } from './modal-details.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../shared/models/hero.model';

describe('ModalDetailsComponent', () => {
  let component: ModalDetailsComponent;
  let fixture: ComponentFixture<ModalDetailsComponent>;
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
      declarations: [ ModalDetailsComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockMatDialogData },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get hero', () => {
    expect(component.hero).toEqual(hero);
  });
});
