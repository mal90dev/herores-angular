import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridHeroViewComponent } from './grid-hero-view.component';
import { HeroesService } from '../../shared/services/heroes.service';
import { Observable, of } from 'rxjs';
import { Hero } from '../../shared/interfaces/hero.interface';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';
import { GridComponent } from 'src/app/shared/components/grid/grid.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

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

describe('GridHeroViewComponent', () => {
  let component: GridHeroViewComponent;
  let fixture: ComponentFixture<GridHeroViewComponent>;
  let mockHeroesService: MockHeroesService;
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
    await TestBed.configureTestingModule({
      imports: [
        PaginatorComponent,
        GridComponent,
        SearchComponent,
        NoopAnimationsModule,
        RouterTestingModule,
      ]
    })
    .overrideComponent(GridHeroViewComponent, {
      set: { 
        providers: [{ provide: HeroesService, useValue: mockHeroesService }] 
      },
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

  it('should render the SearchComponent', () => {
    const searchComponent = fixture.debugElement.query(By.directive(SearchComponent));
    expect(searchComponent).toBeTruthy();
  });

  it('should render the "Add Hero" button', () => {
    const addButton = fixture.debugElement.query(By.css('button[routerLink="/heroes/create"]'));
    expect(addButton).toBeTruthy();
  });

  it('should render the GridComponent', () => {
    const gridComponent = fixture.debugElement.query(By.directive(GridComponent));
    expect(gridComponent).toBeTruthy();
  });

  it('should render the PaginatorComponent', () => {
    const paginatorComponent = fixture.debugElement.query(By.directive(PaginatorComponent));
    expect(paginatorComponent).toBeTruthy();
  });

  it('shoult call getHeroes and getStatusSpinner methods on ngOnInit', () => {
    spyOn(component, 'getHeroes');
    component.ngOnInit();
    expect(component.getHeroes).toHaveBeenCalled();
  });

  describe('getHeroes method', () => {
    it('should get heroes', () => {
      const event: PageEvent = {
        pageIndex: 0,
        previousPageIndex: 0,
        pageSize: 8,
        length: 10
      };
      component.getHeroes(event);
      expect(component.totalHeroes()).toBe(mockHeroesService.totalHeroes);
      expect(component.heroes()).toEqual([hero]);
    });
  });
  
  it('should call handleEventPaginator method and update totalHeroes', () => {
    const event: PageEvent = {
      pageIndex: 0,
      previousPageIndex: 0,
      pageSize: 8,
      length: 10
    };
    const spy = spyOn(component, 'getHeroes');
    component.handleEventPaginator(event);
    expect(spy).toHaveBeenCalled();
    expect(component.totalHeroes()).toBe(mockHeroesService.totalHeroes);
  });

  describe('handleSearchChange method', () => {
    it('should call getHeroes method', () => {
      const spy = spyOn(component, 'getHeroes');
      component.handleSearchChange(null);
      expect(spy).toHaveBeenCalled();
    });
    it('should call searchHeroes service and filter hero', () => {
      const value = 'bomba';
      component.handleSearchChange(value);
      expect(component.totalHeroes()).toBe(mockHeroesService.totalHeroes);
      expect(component.heroes()).toEqual([hero]);
    });
  });

  it('should call getHeroes method and set paginator index to 0', () => {
    const spy = spyOn(component, 'getHeroes');
    component.paginator.pageIndex.set(0);
    component.paginator.pageSize.set(8);
    component.handleEventRemove();
    expect(component.paginator.pageIndex()).toBe(0);
    expect(spy).toHaveBeenCalled();
  });

});
