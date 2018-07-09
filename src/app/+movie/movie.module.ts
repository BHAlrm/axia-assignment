import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MoviePageComponent } from './containers/movie-page/movie-page.component';
import { MovieListEffectService } from './effects/movie-list-effect.service';
import { routes } from './movie.routes';
import { reducers } from './reducers';
import { MovieService } from './services/movie.service';

export const components = [
  // containers
  MoviePageComponent,
  // components
  MovieListComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('movie', reducers),
    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([MovieListEffectService])
  ],
  declarations: components,
  exports: components
})
export class MovieModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MovieModule,
      providers: [MovieService]
    };
  }

  constructor() {

  }
}