import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { Hero } from '../shared/models/hero.model';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
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
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule,
        MatMenuModule,
        RouterTestingModule
      ],
      declarations: [ CardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('remove method', () => {
    it('should emit an onRemove event with the id', () => {
      component.hero = hero;
      const spy = spyOn(component.onRemove, 'next');
      component.remove();
      expect(spy).toHaveBeenCalledWith(hero.id);
    });

    it('should not emit an onRemove event with the id', () => {
      component.hero = undefined;
      const spy = spyOn(component.onRemove, 'next');
      component.remove();
      expect(spy).toHaveBeenCalledWith(undefined);
    });
  });

  describe('details method', () => {
    it('should emit an onDetails event with the id', () => {
      component.hero = hero;
      const spy = spyOn(component.onDetails, 'next');
      component.details();
      expect(spy).toHaveBeenCalledWith(hero.id);
    });
    it('should not emit an onDetails event with the id', () => {
      component.hero = undefined;
      const spy = spyOn(component.onDetails, 'next');
      component.details();
      expect(spy).toHaveBeenCalledWith(undefined);
    });
  });

});
