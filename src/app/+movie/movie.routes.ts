import { Routes } from '@angular/router';
import { AuthGuard } from '../+auth/services/auth-guard.service';
import { MoviePageComponent } from './containers/movie-page/movie-page.component';

export const routes: Routes = [
  {
    path: 'movie',
    component: MoviePageComponent,
    canActivate: [AuthGuard]
  }

];
