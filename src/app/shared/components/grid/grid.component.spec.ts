import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { GridComponent } from './grid.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HeroesService } from '../../../features/heroes/shared/services/heroes.service';
import { Observable, of } from 'rxjs';
import { Hero } from '../../../features/heroes/shared/interfaces/hero.interface';

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
  deleteHero(id: number): Observable<boolean> {
    if (id) {
      return of(true)
    } else {
      return of(false);
    }
  }

  getHeroById(id: number): Observable<Hero> {
    if (id) {
      return of(this.hero)
    } else {
      return of();
    }
  }
}

class MockMatDialog {
  result: boolean = true;

  setResult(val: boolean) {
    this.result = val;
  }

  open() {
    return { afterClosed: () => of(this.result) };
  }

  afterClosed(): Observable<boolean> {
    return of(true);
  }
}


describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let mockHeroesService: MockHeroesService;
  let mockMatDialog: MockMatDialog;
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
    mockMatDialog = new MockMatDialog;

    TestBed.configureTestingModule({
      declarations: [ GridComponent ],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: HeroesService, useValue: mockHeroesService }
      ]
    }).compileComponents();    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  describe('handleRemove method', () => {
    it('should delete a hero and decrement totalHeroes', () => { 
      const id = 1;
      const spy = spyOn(component.eventRemove, 'next');
      component.handleRemove(id);
      expect(mockHeroesService.totalHeroes).toBe(0);
      expect(spy).toHaveBeenCalled();
    });

    it('should not delete a hero and not decrement totalHeroes', () => { 
      const spy = spyOn(component.eventRemove, 'next');
      component.handleRemove(undefined);
      expect(mockHeroesService.totalHeroes).toBe(1);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('handleDetails method', () => {
    it('should call getHeroById', () => {
      const id = 1;
      const spy = spyOn(component, 'getHeroById');
      component.handleDetails(id);
      expect(spy).toHaveBeenCalledWith(id.toString());
    });

    it('should not call getHeroById', () => {
      const id = undefined;
      const spy = spyOn(component, 'getHeroById');
      component.handleDetails(id);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('should be open dialog, openDialog method', () => {
    spyOn(mockMatDialog, 'open').and.callThrough();
    component.openDialog();
    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('should be open dialog, openModal method', () => {
    spyOn(mockMatDialog, 'open').and.callThrough();
    component.openModal(hero);
    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('should call getHeroById from heroService', () => {
    const id = '1';
    const spy = spyOn(component, 'openModal');
    component.getHeroById(id);
    expect(spy).toHaveBeenCalledWith(hero);
  });
  
});
