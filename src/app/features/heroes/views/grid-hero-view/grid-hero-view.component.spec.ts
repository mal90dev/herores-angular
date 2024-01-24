import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHeroViewComponent } from './grid-hero-view.component';
import { HeroesService } from '../../shared/services/heroes.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Hero } from '../../shared/models/hero.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LoadingService } from 'src/app/core/services/loading.service';

class MockHeroesService {
  
  totalHeroes = 1;
  hero: Hero = {
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

  searchHeroes(value: string): Observable<Hero[]> {
    if (value) {
      return of([this.hero]);
    } else {
      return of();
    }
  }

  getHeroes(page: number, numItems: number): Observable<Hero[]> {
    if (page !== undefined && numItems !== undefined) {
      return of([this.hero]);
    } else {
      return of();
    }
  }
}

class MockLoadingService {
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  setLoading(value: boolean): void {
    this.loadingSub.next(value);
  }
}

describe('GridHeroViewComponent', () => {
  let component: GridHeroViewComponent;
  let fixture: ComponentFixture<GridHeroViewComponent>;
  let mockHeroesService: MockHeroesService;
  let mockLoadingService: MockLoadingService;
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
    mockHeroesService = new MockHeroesService();
    mockLoadingService = new MockLoadingService();
    await TestBed.configureTestingModule({
      declarations: [ GridHeroViewComponent ],
      providers: [
        { provide: HeroesService, useValue: mockHeroesService },
        { provide: LoadingService, useValue: mockLoadingService }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridHeroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridHeroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoult call getHeroes and getStatusSpinner methods on ngOnInit', () => {
    spyOn(component, 'getHeroes');
    spyOn(component, 'getStatusSpinner');
    component.ngOnInit();
    expect(component.getHeroes).toHaveBeenCalled();
    expect(component.getStatusSpinner).toHaveBeenCalled();
  });

  describe('getHeroes method', () => {
    it('should get heroes', () => {
      const event: PageEvent = {
        pageIndex: 0,
        previousPageIndex: 0,
        pageSize: 8,
        length: 10
      };
      const spy = spyOn(component.totalHeroes, 'next');  
      component.getHeroes(event);
      expect(spy).toHaveBeenCalledWith(mockHeroesService.totalHeroes);
      expect(component.heroes.value).toEqual([hero]);
    });
  });
  
  it('should call getHeroes method and update totalHeroes', () => {
    const event: PageEvent = {
      pageIndex: 0,
      previousPageIndex: 0,
      pageSize: 8,
      length: 10
    };
    const spy = spyOn(component, 'getHeroes');
    const spy2 = spyOn(component.totalHeroes, 'next');
    component.handleEventPaginator(event);
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalledWith(mockHeroesService.totalHeroes);
  });

  describe('handleSearchChange method', () => {
    it('should call getHeroes method', () => {
      const spy = spyOn(component, 'getHeroes');
      component.handleSearchChange(null);
      expect(spy).toHaveBeenCalled();
    });
    it('should call searchHeroes service and filter hero', () => {
      const value = 'bomba';
      const spy = spyOn(component.totalHeroes, 'next');
      component.handleSearchChange(value);
      expect(spy).toHaveBeenCalledWith(mockHeroesService.totalHeroes);
      expect(component.heroes.value).toEqual([hero]);
    });
  });

  it('should call getHeroes method and set paginator index to 0', () => {
    const spy = spyOn(component, 'getHeroes');
    component.handleEventRemove();
    expect(component.paginator.pageIndex).toBe(0);
    expect(spy).toHaveBeenCalled();
  });

  describe('getStatusSpinner method', () => {
    it('should set showSpinner true', () => {
      mockLoadingService.setLoading(true);
      component.getStatusSpinner();
      expect(mockLoadingService.loadingSub.value).toBeTrue();
    });
    it('should set showSpinner false', () => {
      mockLoadingService.setLoading(false);
      component.getStatusSpinner();
      expect(mockLoadingService.loadingSub.value).toBeFalse();
    });
  });

});
