import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/index';
import { map, catchError, switchMap } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/Rx';
import { toPayload } from '../../shared/to-payload.util';
import { Get, MovieActionTypes, GetSuccess, GetFail, DeleteSuccess, DeleteFail } from '../actions';
import { AuthService } from '../services/auth.service';
import { MovieService } from '../services/movie.service';

@Injectable()
export class MovieListEffectService {

  @Effect()
  public getList: Observable<Action> = this.actions$.pipe(
    ofType<Get>(MovieActionTypes.Get),
    switchMap(() => this.movieService.getMovies()),
    map(movies => new GetSuccess(movies)),
    catchError(() => of(new GetFail({ error: 'fail' })))
  );

  @Effect()
  public delete$: Observable<Action> = this.actions$.pipe(
    ofType<Get>(MovieActionTypes.Delete),
    map(toPayload),
    switchMap((movie) => this.movieService.deleteMovie(movie.id)),
    map(() => new DeleteSuccess()),
    catchError(() => of(new DeleteFail({ error: 'fail' })))
  );

  constructor(private actions$: Actions,
              private movieService: MovieService) {
  }

}
