import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { screen, waitFor } from '@testing-library/angular';
import { GridComponent } from './grid.component';
import { Hero } from '../../../features/heroes/shared/interfaces/hero.interface';
import { hero } from '../../../../__mocks__/hero';
import { HeroesService } from '../../../features/heroes/shared/services/heroes.service';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ModalDetailsComponent } from '../../../features/heroes/modal-details/modal-details.component';

describe('GridComponent', () => { 
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let heroes: Hero[] = [hero];
  let heroService: HeroesService;
  let matDialog: MatDialog;
  let dialogRef: { afterClosed: jest.Mock<Observable<boolean>> };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [ 
        {
          provide: HeroesService,
          useValue: {
            totalHeroes: 10,
            deleteHero: (id: number): Observable<void> => {
              return new Observable<void>(observer => {
                observer.next();
                observer.complete();
              });
            },
            getHeroById: (id: string): Observable<Hero> => {
              return new Observable<Hero>(observer => {
                observer.next(heroes[0]);
                observer.complete();
              });
            }
          }
        },
        {
          provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: jest.fn(() => dialogRef.afterClosed())
            })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    fixture.componentRef.setInput('heroes', heroes);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroesService);
    matDialog = TestBed.inject(MatDialog);
    dialogRef = { afterClosed: jest.fn(() => of(true)) };
    fixture.detectChanges();
  });

  it('should render the component', () => {
    expect(component).toBeDefined();
  });

  it('should show a list of heroes', () => {
    expect(screen.getByRole('list')).toBeVisible();
  });

  it('should show a hero card', () => {
    const cards = screen.getAllByTestId('mat-card');

    expect(cards.length).toBe(1);
  });

  it('should show two hero card', () => {
    heroes = [hero, hero];
    fixture.componentRef.setInput('heroes', heroes);
    fixture.detectChanges();
    const cards = screen.getAllByTestId('mat-card');

    expect(cards.length).toBe(2);
  });

  describe('handleRemove method', () => {

    it('should open dialog', () => {
      const spy = jest.spyOn(component, 'openDialog');
      component.handleRemove(heroes[0].id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call to deleteHero of the heroService', async () => {
      const spyDeleteHero = jest.spyOn(heroService, 'deleteHero');
      component.handleRemove(heroes[0].id);
      
      expect(spyDeleteHero).toHaveBeenCalledTimes(1);
    });

    it('should not call to deleteHero of the heroService', async () => {
      const spyDeleteHero = jest.spyOn(heroService, 'deleteHero');
      dialogRef.afterClosed.mockReturnValueOnce(of(false));
      component.handleRemove(heroes[0].id);
      
      expect(spyDeleteHero).toHaveBeenCalledTimes(0);
    });
    
    it('should subtrack one hero from totalHeroes', async () => {
      const spyEventRemove = jest.spyOn(component.eventRemove, 'next');
      const totalHeroes = heroService.totalHeroes - 1;
      component.handleRemove(heroes[0].id);

      await waitFor(() => {
        expect(heroService.totalHeroes).toEqual(totalHeroes);
        expect(spyEventRemove).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('handleDetails method', () => {

    it('should call getHeroById method', () => {
      const spy = jest.spyOn(component, 'getHeroById');
      component.handleDetails(heroes[0].id);
      
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not call getHeroById method', () => {
      const spy = jest.spyOn(component, 'getHeroById');
      component.handleDetails(undefined);
      
      expect(spy).toHaveBeenCalledTimes(0);
    });

  });

  it('should open DialogComponent', () => {
    const spy = jest.spyOn(matDialog, 'open');
    component.openDialog();

    expect(spy).toHaveBeenCalledWith(DialogComponent, 
      expect.objectContaining({
        data: {
          title: expect.any(String),
          textContent: expect.any(String),
          buttonTextOk: expect.any(String),
          buttonTextCancel: expect.any(String)
        }
      }));
  });

  it('should open ModalDetailsComponent', () => {
    const spy = jest.spyOn(matDialog, 'open');
    component.openModal(heroes[0]);

    expect(spy).toHaveBeenCalledWith(ModalDetailsComponent, 
      expect.objectContaining({
        data: {
          hero: heroes[0]
        }
      }));
  });

  it('should call getHeroById method of HeroService', async () => {
    const spyOpenModal = jest.spyOn(component, 'openModal');
    component.getHeroById('1');
    
    await waitFor(() => {
      expect(spyOpenModal).toHaveBeenCalledWith(heroes[0]);
    });
  });

});
