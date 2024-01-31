import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';
import { GridComponent } from '../../shared/components/grid/grid.component';
import { MatDividerModule } from '@angular/material/divider';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateHeroViewComponent } from './views/create-hero-view/create-hero-view.component';
import { GridHeroViewComponent } from './views/grid-hero-view/grid-hero-view.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ModalDetailsComponent } from './modal-details/modal-details.component';

const materialModules = [
  MatDividerModule,
  MatInputModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    CreateHeroViewComponent,
    GridHeroViewComponent,
    ModalDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeroesRoutingModule,
    materialModules,
    PaginatorComponent,
    GridComponent,
    CardComponent,
    SearchComponent
  ]
})
export class HeroesModule { }
