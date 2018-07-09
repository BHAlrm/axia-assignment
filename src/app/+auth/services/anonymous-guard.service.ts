import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { of } from 'rxjs/index';
import { Observable } from 'rxjs/Rx';
import { GetProfile } from '../actions';
import * as fromAuth from '../reducers/index';
import { AuthService } from './auth.service';

@Injectable()
export class AnonymousGuard implements CanActivate {

  constructor(private authService: AuthService,
              private afAuth: AngularFireAuth,
              private store: Store<fromAuth.State>) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService
      .hasAuth()
      .switchMap(isAuth => {
        if (isAuth) {
          this.store.dispatch(new GetProfile());
        }
        return of(!isAuth);
      })
      .catch(() => of(false));
  }
}