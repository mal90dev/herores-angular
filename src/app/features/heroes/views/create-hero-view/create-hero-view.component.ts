import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroesService } from '../../shared/services/heroes.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-create-hero-view',
  templateUrl: './create-hero-view.component.html',
  styleUrls: ['./create-hero-view.component.scss'],
  imports: [
    CommonModule,
    SafePipe,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    HeroesService
  ]
})
export class CreateHeroViewComponent implements OnInit {

  createForm!: FormGroup;
  avatarImg = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=128';
  id = signal('');

  constructor(private readonly heroService: HeroesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.initCreateForm();
    this.id.set(this.activatedRoute.snapshot.paramMap.get('id') as string);
    if (this.id()) {
      this.getHeroById(this.id());
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
    if (this.id()) {
      this.updateHero(this.createObjHero(this.id()));
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
        this.openSnackBar(`Created ${hero.name} Hero!`, 'save');
      }, complete: () => {
        this.heroService.totalHeroes++;
        this.router.navigate(['/heroes']);
      }
    });
  }

  updateHero(hero: Hero): void {
    this.heroService.updateHero(hero).subscribe({
      next: (heroUpdated: Hero) => {
        this.openSnackBar(`Updated ${heroUpdated.name} Hero!`, 'check');
      }, complete: () => {
        this.router.navigate(['/heroes']);
      }
    });
  }
  
  setHeroToForm(hero: Hero): void {
    this.createForm.setValue({
      name: hero.name,
      gender: hero.appearance.gender,
      race: hero.appearance.race,
      height: hero.appearance.height,
      weight: hero.appearance.weight,
      intelligence: hero.powerstats.intelligence,
      strength: hero.powerstats.strength,
      speed: hero.powerstats.speed,
      durability: hero.powerstats.durability,
      power: hero.powerstats.power,
      combat: hero.powerstats.combat,
      fullName: hero.biography.fullName,
      alias: hero.biography.aliases,
      publisher: hero.biography.publisher,
      image: hero.image
    });
  }

  openSnackBar(message: string, icon: string): void {
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

}
