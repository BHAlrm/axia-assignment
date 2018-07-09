import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { of } from 'rxjs/index';
import { map, tap, switchMap } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/Rx';
import { toPayload } from '../../shared/to-payload.util';
import {
  EmailSignIn,
  AuthActionTypes,
  GetProfile,
  Authenticated,
  NotAuthenticated,
  SignInRedirect,
  SignOut,
  AuthError,
  RootRedirect,
  EmailSignUp
} from '../actions';
import { EmailSignUpModel } from '../models/email-sign-up.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffect {

  @Effect({ dispatch: false })
  public signInRedirect$: Observable<Action> = this.actions$.pipe(
    ofType<SignInRedirect>(AuthActionTypes.SignInRedirect),
    tap(() => this.router.navigate(['/auth/sign-in']))
  );

  @Effect({ dispatch: false })
  public rootRedirect$: Observable<Action> = this.actions$.pipe(
    ofType<SignInRedirect>(AuthActionTypes.RootRedirect),
    tap(() => this.router.navigate(['/']))
  );

  @Effect()
  public getProfile$: Observable<Action> = this.actions$.pipe(
    ofType<GetProfile>(AuthActionTypes.GetProfile),
    // Projects each source value to an Observable which is merged in the output
    // Observable only if the previous projected Observable has completed.
    switchMap(() => this.afAuth.authState),
    switchMap(authData => this.authService.getProfile(authData)),
    map(profile => {
      if (!!profile) {

        /// User logged in
        return new Authenticated(profile);
      } else {
        /// User not logged in
        return new NotAuthenticated();
      }
    })
  );

  @Effect()
  public signIn$: Observable<Action> = this.actions$.pipe(
    ofType<EmailSignIn>(AuthActionTypes.EmailSignIn),
    map(toPayload),
    switchMap((auth) => this.authService.signIn(auth.email, auth.password, auth.isKeepSignIn)
      .map(() => new GetProfile())
      .catch(error => of(new AuthError({ error: error.message })))
    )
  );

  @Effect()
  public signUp$: Observable<Action> = this.actions$.pipe(
    ofType<EmailSignUp>(AuthActionTypes.EmailSignUp),
    map(toPayload),
    switchMap((auth: EmailSignUpModel) => this.authService.signUp(auth.email, auth.password, auth.role)
      .map(() => new GetProfile())
      .catch(error => of(new AuthError({ error: error.message })))
    )
  );

  @Effect()
  public signOut$: Observable<Action> = this.actions$.pipe(
    ofType<SignOut>(AuthActionTypes.SignOut),
    map(toPayload),
    switchMap(() => this.authService.signOut()
      .switchMap(() => [new NotAuthenticated()]))
  );

  @Effect()
  public notAuthenticated$: Observable<Action> = this.actions$.pipe(
    ofType<NotAuthenticated>(AuthActionTypes.NotAuthenticated),
    map(() => new SignInRedirect())
  );

  @Effect()
  public authenticated$: Observable<Action> = this.actions$.pipe(
    ofType<Authenticated>(AuthActionTypes.Authenticated),
    map(() => new RootRedirect())
  );

  constructor(private actions$: Actions,
              private authService: AuthService,
              private afAuth: AngularFireAuth,
              private router: Router) {
  }

}
