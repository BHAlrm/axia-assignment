import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { MovieModel } from '../models/movie.model';

@Injectable()
export class MovieService {
  constructor(private afs: AngularFirestore) {

  }

  public getMovies() {
    return this.afs.collection<MovieModel>('movies').valueChanges();
  }

  public deleteMovie(id: string) {
    return this.afs.collection<MovieModel>('movies').doc(id).delete();
  }

}