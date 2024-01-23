import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';
import { GridComponent } from './grid/grid.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { HeaderComponent } from './header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorComponent } from './paginator/paginator.component';
import { CardComponent } from './card/card.component';
import { SearchComponent } from './search/search.component';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create/create.component';
import { CreateHeroViewComponent } from './views/create-hero-view/create-hero-view.component';
import { GridHeroViewComponent } from './views/grid-hero-view/grid-hero-view.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ModalDetailsComponent } from './modal-details/modal-details.component';

const materialModules = [
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  LayoutModule,
  MatDividerModule,
  MatPaginatorModule,
  MatInputModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    GridComponent,
    HeaderComponent,
    PaginatorComponent,
    CardComponent,
    SearchComponent,
    CreateComponent,
    CreateHeroViewComponent,
    GridHeroViewComponent,
    ModalDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeroesRoutingModule,
    materialModules
  ]
})
export class HeroesModule { }
