import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { SignOut } from '../../../+auth/actions';
import * as fromMovie from '../../reducers';
import { Get, Delete } from '../../actions';
import { MovieModel } from '../../models/movie.model';

@Component({
  selector: 'app-movie-page',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './movie-page.html'
})
export class MoviePageComponent implements OnInit {
  public movies$: Observable<MovieModel[]>;
  public editable$: Observable<boolean>;

  constructor(private store: Store<fromMovie.State>) {
    this.movies$ = store.pipe(select(fromMovie.getMovieList));
    this.editable$ = store.pipe(select(fromMovie.getEditable));
  }

  public ngOnInit() {
    this.store.dispatch(new Get());
  }

  public signOut() {
    this.store.dispatch(new SignOut());
  }

  public onDeleteItem(item: MovieModel) {
    this.store.dispatch(new Delete(item));
  }
}