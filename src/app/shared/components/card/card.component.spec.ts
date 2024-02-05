import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { Hero } from 'src/app/features/heroes/shared/interfaces/hero.interface';
import { By } from '@angular/platform-browser';

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
      declarations: [],
      imports: [
        MatCardModule,
        MatIconModule,
        MatMenuModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('hero', hero);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero name correctly', () => {
    const heroNameElement = fixture.debugElement.query(By.directive(MatCardTitle)).nativeElement;
    expect(heroNameElement.textContent.trim()).toContain(component.hero().name);
  });

  it('should display hero image correctly', () => {
    const heroImageElement = fixture.debugElement.query(By.css('.card__img')).nativeElement;
    expect(heroImageElement.getAttribute('src')).toBe(component.hero().image);
    expect(heroImageElement.getAttribute('alt')).toBe('image');
  });

  describe('remove method', () => {
    it('should emit an onRemove event', () => {
      const spy = spyOn(component.onRemove, 'next');
      component.remove();
      expect(spy).toHaveBeenCalledWith(hero.id);
    });
  });

  describe('details method', () => {
    it('should emit an onDetails event', () => {
      const spy = spyOn(component.onDetails, 'next');
      component.details();
      expect(spy).toHaveBeenCalledWith(hero.id);
    });
  });

});
