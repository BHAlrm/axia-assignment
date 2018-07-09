import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { UserInfo } from 'firebase';
import { of } from 'rxjs/index';
import { Observable } from 'rxjs/Rx';
import { UserProfileModel } from '../../+core/models/user-profile.model';
import { ProfileModel, UserRole } from '../models/profile.model';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
  }

  public signIn(email: string, password: string, isKeepSignIn: boolean) {
    const persistRule = isKeepSignIn
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION;

    const transaction = this.afAuth.auth
      .setPersistence(persistRule)
      .then(() => this.afAuth.auth.signInWithEmailAndPassword(email, password));

    return Observable.fromPromise(transaction);
  }

  public signUp(email: string, password: string, role: UserRole) {
    const transaction = this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = { id: userCredential.user.uid, role };
        this.createProfile(user);
      });

    return Observable.fromPromise(transaction);
  }

  public getProfile(authData: UserInfo) {
    if (!authData) {
      return of(null);
    }

    return this.afs.collection('profiles')
      .doc(authData.uid)
      .valueChanges();
  }

  public createProfile(user: ProfileModel) {
    const transaction = this.afs.collection('profiles').doc(user.id).set(user);
    return Observable.fromPromise(transaction);
  }

  public signOut() {
    return Observable.fromPromise(this.afAuth.auth.signOut());
  }

  public hasAuth(): Observable<boolean> {
    return this.afAuth.authState
      .map(authData => !!authData)
      .take(1);
  }
}