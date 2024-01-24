import { Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { Hero } from '../../shared/models/hero.model';
import { HeroesService } from '../../shared/services/heroes.service';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-grid-hero-view',
  templateUrl: './grid-hero-view.component.html',
  styleUrls: ['./grid-hero-view.component.scss']
})
export class GridHeroViewComponent {

  @ViewChild('paginator') paginator!: PaginatorComponent;

  heroes: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  totalHeroes: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  pageIndex!: number;
  showSpinner = false;

  constructor(private readonly heroService: HeroesService,
    private readonly loading: LoadingService) {}

  ngOnInit(): void {
    this.getHeroes();
    this.getStatusSpinner();
  }

  getHeroes(event?: PageEvent): void {
    this.totalHeroes.next(this.heroService.totalHeroes);
    const page = event?.pageIndex || 0;
    const numItems = event?.pageSize || 8;
    this.heroService.getHeroes(page, numItems).subscribe({
      next: (heroes: Hero[]) => {
        this.heroes.next(heroes);
      }
    });
  }

  handleEventPaginator(event: PageEvent): void {
    event.pageIndex = event.pageIndex + 1;
    this.totalHeroes.next(this.heroService.totalHeroes);
    this.getHeroes(event);
  }

  handleSearchChange(value: string|null): void {
    if (value === null) {
      this.getHeroes();
    } else if (value) {
      this.heroService.searchHeroes(value).subscribe({
        next: (hero: Hero[]) => {
          this.totalHeroes.next(hero?.length);
          this.heroes.next(hero);
        }
      });
    }
  }

  handleEventRemove(): void {
    this.getHeroes();
    this.paginator.pageIndex = 0;
  }

  getStatusSpinner(): void {
    this.loading.loadingSub.subscribe({
      next: (value: boolean) => {
        this.showSpinner = value;
      }
    });
  }

}
