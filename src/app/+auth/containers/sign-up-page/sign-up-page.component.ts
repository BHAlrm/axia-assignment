import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { forEach } from 'lodash';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { IdentifyModel } from '../../../+core/models/identify.model';
import { EmailSignUp } from '../../actions';
import { EmailSignUpModel } from '../../models/email-sign-up.model';
import * as fromAuth from '../../reducers';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-up-page.html',
  styleUrls: ['./sign-up-page.scss']
})
export class SignUpPageComponent implements OnInit, OnDestroy {
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

  public signUp(value: EmailSignUpModel) {
    this.store.dispatch(new EmailSignUp(value));
  }
}
