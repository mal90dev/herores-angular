import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero } from '../../shared/models/hero.model';
import { HeroesService } from '../../shared/services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-create-hero-view',
  templateUrl: './create-hero-view.component.html',
  styleUrls: ['./create-hero-view.component.scss']
})
export class CreateHeroViewComponent implements OnInit {

  createForm!: FormGroup;
  avatarImg = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=128';
  id!: string|null;
  showSpinner = false;

  constructor(private readonly heroService: HeroesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly loading: LoadingService) {}

  ngOnInit(): void {
    this.initCreateForm();
    this.getStatusSpinner();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.getHeroById(this.id);
    }
  }

  get controls() {
    return this.createForm.controls;
  }

  initCreateForm(): void {
    this.createForm = new FormGroup({
      name: new FormControl(''),
      fullName: new FormControl(''),
      alias: new FormControl(''),
      publisher: new FormControl(''),
      intelligence: new FormControl(''),
      strength: new FormControl(''),
      speed: new FormControl(''),
      durability: new FormControl(''),
      power: new FormControl(''),
      combat: new FormControl(''),
      gender: new FormControl(''),
      race: new FormControl(''),
      height: new FormControl(''),
      weight: new FormControl(''),
      image: new FormControl('')
    });
  }

  onSubmit(): void {
    if (this.id) {
      this.updateHero(this.createObjHero(this.id));
    } else {
      this.saveHero();
    }
  }

  createObjHero(id?: string): Hero {
    const hero: Hero = {
      name: this.controls.name.value,
      appearance: {
        gender: this.controls.gender.value,
        race: this.controls.race.value,
        height: this.controls.height.value,
        weight: this.controls.weight.value
      },
      powerstats: {
        intelligence: this.controls.intelligence.value,
        strength: this.controls.strength.value,
        speed: this.controls.speed.value,
        durability: this.controls.durability.value,
        power: this.controls.power.value,
        combat: this.controls.combat.value
      },
      biography: {
        fullName: this.controls.fullName.value,
        aliases: this.controls.alias.value,
        publisher: this.controls.publisher.value
      },
      image: this.controls.image.value || this.avatarImg
    }
    if (id) {
      hero.id = Number(id);
    }
    return hero;
  }

  getHeroById(id: string): void {
    this.heroService.getHeroById(Number(id)).subscribe({
      next: (hero: Hero) => {
        this.setHeroToForm(hero);
      }
    });
  }

  saveHero(): void {
    this.heroService.createHero(this.createObjHero()).subscribe({
      next: (hero: Hero) => {
        console.log('Hero created: ', hero);
        this.openSnackBar('Created Hero!', 'save');
      }, complete: () => {
        this.heroService.totalHeroes++;
        this.router.navigate(['/heroes']);
      }
    });
  }

  updateHero(hero: Hero): void {
    this.heroService.updateHero(hero).subscribe({
      next: (heroUpdated: Hero) => {
        console.log(heroUpdated);
        this.openSnackBar('Updated Hero!', 'check');
      }, complete: () => {
        this.router.navigate(['/heroes']);
      }
    });
  }
  
  setHeroToForm(hero: Hero): void {
    this.controls.name.setValue(hero.name);
    this.controls.gender.setValue(hero.appearance.gender);
    this.controls.race.setValue(hero.appearance.race);
    this.controls.height.setValue(hero.appearance.height);
    this.controls.weight.setValue(hero.appearance.weight);
    this.controls.intelligence.setValue(hero.powerstats.intelligence);
    this.controls.strength.setValue(hero.powerstats.strength);
    this.controls.speed.setValue(hero.powerstats.speed);
    this.controls.durability.setValue(hero.powerstats.durability);
    this.controls.power.setValue(hero.powerstats.power);
    this.controls.combat.setValue(hero.powerstats.combat);
    this.controls.fullName.setValue(hero.biography.fullName);
    this.controls.alias.setValue(hero.biography.aliases);
    this.controls.publisher.setValue(hero.biography.publisher);
    this.controls.image.setValue(hero.image);
  }

  openSnackBar(message: string, icon?: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: {
        message,
        icon
      },
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  getStatusSpinner(): void {
    this.loading.loadingSub.subscribe({
      next: (value: boolean) => {
        this.showSpinner = value;
      }
    });
  }

}
