import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../../+auth/reducers';
import * as fromRoot from '../../reducers';
import * as fromMovieList from './movie-list.reducers';

export interface MoviePageState {
  list: fromMovieList.State;
}

export const reducers: ActionReducerMap<MoviePageState> = {
  list: fromMovieList.reducer
};

export interface State extends fromRoot.State {
  movie: MoviePageState;
}

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getMovieState = createFeatureSelector<MoviePageState>('movie');

export const getMovieListState = createSelector(
  getMovieState,
  (state: MoviePageState) => state.list
);

export const getMovieList = createSelector(
  getMovieListState,
  fromMovieList.getMovieList
);

export const getEditable = createSelector(
  fromAuth.getUserProfile,
  (profile) => profile && profile.role === 'MANAGER'
);