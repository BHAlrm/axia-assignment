import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { forEach } from 'lodash';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { IdentifyModel } from '../../../+core/models/identify.model';
import { EmailSignIn } from '../../actions';
import { EmailSignInModel } from '../../models/email-sign-in.model';
import * as fromAuth from '../../reducers';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.html',
  styleUrls: ['./sign-in-page.scss']
})
export class SignInPageComponent implements OnInit, OnDestroy {
  public loading$: Observable<boolean>;
  public error$: Observable<string>;

  private subscriptions: Subscription[];

  constructor(private store: Store<fromAuth.AuthState>) {
    this.loading$ = store.pipe(select(fromAuth.getAuthLoading));
    this.error$ = store.pipe(select(fromAuth.getAuthError));
  }

  public ngOnInit() {
  }

  public ngOnDestroy(): void {
    forEach<Subscription>(this.subscriptions, s => s.unsubscribe());
  }

  public signIn(value: EmailSignInModel) {
    this.store.dispatch(new EmailSignIn(value));
  }
}
