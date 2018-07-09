import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { of } from 'rxjs/index';
import { Observable } from 'rxjs/Rx';
import { NotAuthenticated, GetProfile } from '../actions';
import * as fromAuth from '../reducers/index';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private afAuth: AngularFireAuth,
              private store: Store<fromAuth.State>) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.hasAuth()
      .switchMap(isAuth => {
        if (!isAuth) {
          this.store.dispatch(new NotAuthenticated());
          return of(false);
        }
        return this.hasProfile();
      })
      .catch(() => of(false));
  }

  private hasProfileInStore(): Observable<boolean> {
    return this.store.select(fromAuth.getUserProfile)
      .map(profile => !!profile)
      .take(1);
  }

  private hasProfileInFirebase(): Observable<boolean> {
    return this.afAuth.authState
      .do(() => this.store.dispatch(new GetProfile()))
      .switchMap(() => this.hasProfileInStore())
      .catch(() => {
        return of(false);
      });
  }

  private hasProfile(): Observable<boolean> {
    return this.hasProfileInStore()
      .switchMap(inStore => {
        if (inStore) {
          return of(true);
        }
        return this.hasProfileInFirebase();
      });
  }

}