import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import * as fromApp from '../../../reducers';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'az-app',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public version = environment.version;

  constructor(private store: Store<fromApp.State>) {
  }

  public ngOnInit() {

  }

}
