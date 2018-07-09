import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'movie', pathMatch: 'full' },

  // lazy load Module
  { path: 'auth', loadChildren: './+auth/auth.module#AuthModule' },
  { path: 'movie', loadChildren: './+movie/movie.module#MovieModule' },
  // { path: 'ir', loadChildren: './+investor-relations/investor-relations.module#InvestorRelationsModule' }
];
