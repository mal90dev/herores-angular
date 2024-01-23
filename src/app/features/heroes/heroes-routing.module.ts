import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHeroViewComponent } from './views/create-hero-view/create-hero-view.component';
import { GridHeroViewComponent } from './views/grid-hero-view/grid-hero-view.component';

const routes: Routes = [
  { path: '', component: GridHeroViewComponent },
  { path: 'create', component: CreateHeroViewComponent },
  { path: 'edit/:id', component: CreateHeroViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
