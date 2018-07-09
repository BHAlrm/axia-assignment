import { Action } from '@ngrx/store';
import { EmailSignInModel } from '../models/email-sign-in.model';
import { EmailSignUpModel } from '../models/email-sign-up.model';
import { MovieModel } from '../models/movie.model';
import { ProfileModel } from '../models/profile.model';

export enum MovieActionTypes {
  Get = '[Movie] Get Movie List',
  GetSuccess = '[Movie] Get Movie List Success',
  GetFail = '[Movie] Get Movie List Fail',
  Delete = '[Movie] Delete Movie',
  DeleteSuccess = '[Movie] Delete Movie Success',
  DeleteFail = '[Movie] Delete Movie Fail'
}

export class Get implements Action {
  public readonly type = MovieActionTypes.Get;

  constructor(public payload?: any) {
  }
}

export class GetSuccess implements Action {
  public readonly type = MovieActionTypes.GetSuccess;

  constructor(public payload: MovieModel[]) {
  }
}

export class GetFail implements Action {
  public readonly type = MovieActionTypes.GetFail;

  constructor(public payload: { error: string }) {
  }
}

export class Delete implements Action {
  public readonly type = MovieActionTypes.Delete;

  constructor(public payload: MovieModel) {
  }
}

export class DeleteSuccess implements Action {
  public readonly type = MovieActionTypes.DeleteSuccess;

  constructor(public payload?: any) {
  }
}

export class DeleteFail implements Action {
  public readonly type = MovieActionTypes.DeleteFail;

  constructor(public payload?: { error: string }) {
  }
}

export type MovieActions = Get
  | GetSuccess
  | GetFail
  | Delete
  | DeleteSuccess
  | DeleteFail;
