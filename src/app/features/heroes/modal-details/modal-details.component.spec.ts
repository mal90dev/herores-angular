import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalDetailsComponent } from './modal-details.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../shared/interfaces/hero.interface';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { IconsAppearance } from '../shared/constants/IconsAppearance';
import { IconsPowerStats } from '../shared/constants/IconsPowerStats';

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
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockMatDialogData }
      ],
      imports: [
        MatIconModule
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

  it('should display hero image', () => {
    const imgElement = fixture.debugElement.query(By.css('.modal__img img'));
    expect(imgElement.nativeElement.getAttribute('src')).toBe(component.data.hero.image);
  });

  it('should display hero name and alias', () => {
    const nameElement = fixture.debugElement.query(By.css('.modal__name span:first-child')).nativeElement;
    expect(nameElement.textContent.trim()).toContain(component.data.hero.name);
    const aliasElement = fixture.debugElement.query(By.css('.modal__name span:last-child')).nativeElement;
    expect(aliasElement.textContent.trim()).toContain(component.data.hero.biography.aliases);
  });

  it('should display biography information', () => {
    const fullNameElement = fixture.debugElement.query(By.css('.modal__biography')).nativeElement;
    expect(fullNameElement.textContent).toContain(component.data.hero.biography.fullName);
  });

  it('should render appearance items correctly', () => {
    const appearanceItems = fixture.debugElement.queryAll(By.css('.modal__appearance .modal__app-pow--item'));
    expect(appearanceItems.length).toEqual(Object.keys(component.hero.appearance).length);
  });

  it('should render powerstats items correctly', () => {
    const appearanceItems = fixture.debugElement.queryAll(By.css('.modal__powerstats .modal__app-pow--item'));
    expect(appearanceItems.length).toEqual(Object.keys(component.hero.powerstats).length);
  });

  it('should return correct icon for appearance key', () => {
    const expectedIcon = 'transgender';
    const key = 'gender' as keyof typeof IconsAppearance;
    const icon = component.getIconAppearance(key);
    expect(icon).toEqual(expectedIcon);
  });

  it('should return correct icon for powerstats key', () => {
    const expectedIcon = 'lightbulb';
    const key = 'intelligence' as keyof typeof IconsPowerStats;
    const icon = component.getIconPowerstats(key);
    expect(icon).toEqual(expectedIcon);
  });

});
