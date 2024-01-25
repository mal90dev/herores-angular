import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Hero } from '../interfaces/hero.interface';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpTestingController: HttpTestingController;
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(HeroesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('_totalHeroes parameter', () => {
    it('should get the value of _totalHeroes', () => {
      expect(service.totalHeroes).toBe(25);
    });
    it('should set the value of _totalHeroes', () => {
      service.totalHeroes = 10;
      expect(service.totalHeroes).toBe(10);
    });
  });

  describe('getHeroes method', () => {
    it('I should get a list of heroes', () => {
      const mockHeroes: Hero[] = [hero, hero];
      const page = 1;
      const limit = 10;
      const url = `http://localhost:3000/heroes?_page=${page}&_limit=${limit}`;
      service.getHeroes(page, limit).subscribe((heroes: Hero[]) => {
        expect(heroes).toEqual(mockHeroes);
      });
      const req = httpTestingController.expectOne(url);
      req.flush(mockHeroes);
    });
  });

  describe('getHeroById method', () => {
    it('should get a hero per ID', () => {
      const mockHero: Hero = hero;
      const url = 'http://localhost:3000/heroes/1';
      service.getHeroById(1).subscribe((hero: Hero) => {
        expect(hero).toEqual(mockHero);
      });
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockHero);
    });
  });

  describe('searchHeroes method', () => {
    it('should get a list of heroes filtered by a term', () => {
      const mockHeroes: Hero[] = [hero];
      const searchTerm = 'test';
      const limit = 8;
      const url = `http://localhost:3000/heroes?name_like=${searchTerm}&_limit=${limit}`;
      service.searchHeroes(searchTerm).subscribe((heroes: Hero[]) => {
        expect(heroes).toEqual(mockHeroes);
      });
      const req = httpTestingController.expectOne(url);
      req.flush(mockHeroes);
    });
  });

  
  describe('updateHero method', () => {
    it('should update a hero per ID', () => {
      const mockHero: Hero = hero;
      const url = 'http://localhost:3000/heroes/1';
      service.updateHero(hero).subscribe((hero: Hero) => {
        expect(hero).toEqual(mockHero);
      });
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toBe('PUT');
      req.flush(mockHero);
    });
  });

  describe('createHero method', () => {
    it('should create a hero', () => {
      const mockHero: Hero = hero;
      const url = 'http://localhost:3000/heroes';
      service.createHero(hero).subscribe((hero: Hero) => {
        expect(hero).toEqual(mockHero);
      });
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toBe('POST');
      req.flush(mockHero);
    });
  });

  describe('deleteHero method', () => {
    it('should delete a hero', () => {
      const id = hero.id;
      const mockHero: Hero = hero;
      const url = `http://localhost:3000/heroes/${id}`;
      service.deleteHero(Number(id)).subscribe((hero: Hero) => {
        expect(hero).toEqual(mockHero);
      });
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockHero);
    });
  });
  
});
