import { NgModule } from '@angular/core';
import { HeroesRoutingModule } from './heroes-routing.module';
import { GridComponent } from '../../shared/components/grid/grid.component';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { CreateHeroViewComponent } from './views/create-hero-view/create-hero-view.component';
import { GridHeroViewComponent } from './views/grid-hero-view/grid-hero-view.component';

@NgModule({
  imports: [
    HeroesRoutingModule,
    PaginatorComponent,
    GridComponent,
    CardComponent,
    SearchComponent,
    CreateHeroViewComponent,
    GridHeroViewComponent
  ]
})
export class HeroesModule { }
