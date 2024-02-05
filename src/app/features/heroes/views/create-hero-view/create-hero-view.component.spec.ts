import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateHeroViewComponent } from './create-hero-view.component';
import { Observable, of } from 'rxjs';
import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroesService } from '../../shared/services/heroes.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';
import { ActivatedRoute } from '@angular/router';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { ComponentType } from '@angular/cdk/portal';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PowerstatsHero } from '../../shared/classes/powerstats-hero.class';
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

  updateHero(hero: Hero): Observable<Hero> {
    if (hero.id !== 0) {
      return of(hero);
    } else {
      return of();
    }
  }

  createHero(hero: Hero): Observable<Hero> {
    if (hero) {
      return of(hero);
    } else {
      return of();
    }
  }

  getHeroById(id: number): Observable<Hero> {
    if (id) {
      return of(this.hero);
    } else {
      return of();
    }
  }
}

class MockActivateRoute {
  value = '123';
  snapshot = { 
    paramMap:  { 
      get: () => { return this.value }
    }
  }
  setValue(value: string): void {
    this.value = value;
  }
}

const mockSnackBar = {
  openFromComponent: <T, D = any>(component: ComponentType<T>, config?: MatSnackBarConfig<D>) => {}
};

describe('CreateHeroViewComponent', () => {
  let component: CreateHeroViewComponent;
  let fixture: ComponentFixture<CreateHeroViewComponent>;
  let mockHeroesService: MockHeroesService;
  let mockActivatedRoute: MockActivateRoute;

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
    mockActivatedRoute = new MockActivateRoute();

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        FormsModule,
        SafePipe
      ]
    })
    .overrideComponent(CreateHeroViewComponent, {
      set: { 
        providers: [
          { provide: HeroesService, useValue: mockHeroesService },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          { provide: MatSnackBar, useValue: mockSnackBar }
        ] 
      },
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHeroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with correct form controls', () => {
    const form = fixture.debugElement.query(By.css('form'));
    const headingElements = fixture.debugElement.queryAll(By.css('h2.mat-h2'));
    expect(form).toBeTruthy();
    expect(headingElements.length).toBe(3);
  });

  describe('ngOnInit method', () => {
    it('should call initCreateForm, getStatusSpinner and getHeroById method', () => {
      const id = '123';
      mockActivatedRoute.setValue(id);
      const spy = spyOn(component, 'initCreateForm');
      const spy3 = spyOn(component, 'getHeroById');
      component.ngOnInit();
      expect(component.id()).toBe(id);
      expect(spy).toHaveBeenCalled();
      expect(spy3).toHaveBeenCalledWith(id);
    });

    it('should  not call getHeroById method', () => {
      const spy3 = spyOn(component, 'getHeroById');
      mockActivatedRoute.setValue('');
      component.ngOnInit();
      expect(spy3).not.toHaveBeenCalled();
    });
  });

  it('should initialize the form', () => {
    component.initCreateForm();
    expect(component.createForm instanceof FormGroup).not.toBeUndefined();
  });

  it('should add controls to form', () => {
    const powerstatsHero = new PowerstatsHero();
    Object.keys(component.createForm.controls).forEach(controlName => {
      component.createForm.removeControl(controlName);
    });
    component.addControls(powerstatsHero);
    expect(component.createForm.get('intelligence')).not.toBeUndefined();
    expect(component.createForm.get('strength')).not.toBeUndefined();
    expect(component.createForm.get('speed')).not.toBeUndefined();
    expect(component.createForm.get('durability')).not.toBeUndefined();
    expect(component.createForm.get('power')).not.toBeUndefined();
    expect(component.createForm.get('combat')).not.toBeUndefined();
  });


  describe('onSubmit method', () => {
    it('should update the hero', () => {
      component.id.set('123');
      const spy = spyOn(component, 'updateHero');
      component.onSubmit();
      expect(spy).toHaveBeenCalled();
    });

    it('should save the hero', () => {
      component.id.set('');
      const spy = spyOn(component, 'saveHero');
      component.onSubmit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('createObjHero method', () => {
    it('should return a Hero object with the id', () => {
      const id = '10';
      const hero = component.createObjHero(id);
      expect(hero.id).toEqual(Number(id));
      expect(hero instanceof Object).toBeTrue();
    });

    it('should return a hero and add the avatarImg parameter as an image', () => {
      component.controls.image.setValue('');
      const hero = component.createObjHero();
      expect(hero instanceof Object).toBeTrue();
      expect(hero.image).toEqual(component.avatarImg);
    });
  });

  describe('getHeroById method', () => {
    it('should get a hero and call setHeroToForm method with it', () => {
      const spy = spyOn(component, 'setHeroToForm');
      const id = '1';
      component.getHeroById(id);
      expect(spy).toHaveBeenCalledWith(hero);
    });
    it('should not get any heroes', () => {
      const spy = spyOn(component, 'setHeroToForm');
      component.getHeroById('');
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('saveHero method', () => {
    it('should create a hero and open a snackbar displaying "Created Hero!"', () => {
      const spy = spyOn(component, 'openSnackBar');
      const routerSpy = spyOn(component['router'], 'navigate');
      component.saveHero();
      expect(spy).toHaveBeenCalledWith(`Created ${hero.name} Hero!`, 'save');
      expect(mockHeroesService.totalHeroes).toBe(2);
      expect(routerSpy).toHaveBeenCalledWith(['/heroes']);
    });
  });

  describe('updateHero method', () => {
    it('should update a hero and open a snackbar displaying "Updated Hero!"', () => {
      const spy = spyOn(component, 'openSnackBar');
      const routerSpy = spyOn(component['router'], 'navigate');
      component.updateHero(hero);
      expect(spy).toHaveBeenCalledWith(`Updated ${hero.name} Hero!`, 'check');
      expect(mockHeroesService.totalHeroes).toBe(1);
      expect(routerSpy).toHaveBeenCalledWith(['/heroes']);
    });
  });

  it('should set the hero values ​​in the form', () => {
    component.setHeroToForm(hero);
    expect(component.controls.name.value).toEqual(hero.name);
    expect(component.controls.gender.value).toEqual(hero.appearance.gender);
    expect(component.controls.combat.value).toEqual(hero.powerstats.combat);
    expect(component.controls.aliases.value).toEqual(hero.biography.aliases.toString());
  });

  it('should open the snackBar', () => {
    const openFromComponentSpy = spyOn(mockSnackBar, 'openFromComponent');
    component.openSnackBar('Mensaje de prueba', 'icono-prueba');
    expect(openFromComponentSpy).toHaveBeenCalledWith(SnackBarComponent, {
      duration: 2000,
      data: {
        message: 'Mensaje de prueba',
        icon: 'icono-prueba',
      },
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  });

});
