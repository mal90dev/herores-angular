import { Route } from '@angular/router';
import { CreateHeroViewComponent } from './views/create-hero-view/create-hero-view.component';
import { GridHeroViewComponent } from './views/grid-hero-view/grid-hero-view.component';

export const HEROES_ROUTES: Route[] = [
  { path: '', component: GridHeroViewComponent },
  { path: 'create', component: CreateHeroViewComponent },
  { path: 'edit/:id', component: CreateHeroViewComponent }
];
