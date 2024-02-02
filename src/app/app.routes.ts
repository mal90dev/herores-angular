import { Routes } from '@angular/router'
import { GridHeroViewComponent } from './features/heroes/views/grid-hero-view/grid-hero-view.component'

export const routes: Routes = [
    {
        path: 'heroes',
        component: GridHeroViewComponent
    },
    {
      path: '',   
      redirectTo: '/heroes', 
      pathMatch: 'full'
    }
];
