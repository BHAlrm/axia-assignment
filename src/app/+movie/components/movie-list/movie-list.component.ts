import {
  Component,
  ViewEncapsulation,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { MovieModel } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit {

  private _data: MovieModel[];
  private _editable: boolean;
  @Output() public onClickDelete = new EventEmitter<MovieModel>();

  @Input()
  public set data(value: MovieModel[]) {
    this._data = value;
  }

  public get data() {
    return this._data;
  }

  @Input()
  public set editable(value: boolean) {
    this._editable = value;
  }

  public get editable(): boolean {
    return this._editable;
  }

  constructor() {
  }

  public ngOnInit(): void {
  }

}