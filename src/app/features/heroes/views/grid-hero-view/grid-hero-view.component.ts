import { Component, ViewChild, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroesService } from '../../shared/services/heroes.service';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';

@Component({
  selector: 'app-grid-hero-view',
  templateUrl: './grid-hero-view.component.html',
  styleUrls: ['./grid-hero-view.component.scss']
})
export class GridHeroViewComponent {

  @ViewChild('paginator') paginator!: PaginatorComponent;

  heroes = signal<Hero[]>([]);
  totalHeroes = signal<number>(0);
  showSpinner = signal(false);

  constructor(private readonly heroService: HeroesService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(event?: PageEvent): void {
    this.totalHeroes.set(this.heroService.totalHeroes);
    const page = event?.pageIndex || 0;
    const numItems = event?.pageSize || 8;
    this.heroService.getHeroes(page, numItems).subscribe({
      next: (heroes: Hero[]) => {
        this.heroes.set(heroes);
      }
    });
  }

  handleEventPaginator(event: PageEvent): void {
    event.pageIndex = event.pageIndex + 1;
    this.totalHeroes.set(this.heroService.totalHeroes);
    this.getHeroes(event);
  }

  handleSearchChange(value: string|null): void {
    if (value === null) {
      this.getHeroes();
    } else if (value) {
      this.heroService.searchHeroes(value).subscribe({
        next: (hero: Hero[]) => {
          this.totalHeroes.set(hero?.length);
          this.heroes.set(hero);
        }
      });
    }
  }

  handleEventRemove(): void {
    this.getHeroes();
    this.paginator.pageIndex.set(0);
  }

}
