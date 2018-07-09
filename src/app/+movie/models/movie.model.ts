export type MovieRating = 'G' | 'PG' | 'M' | 'MA' | 'R';

export interface MovieModel {
  id: string;
  rating: MovieRating;
  released: number; // timestamp
  title: string;
}