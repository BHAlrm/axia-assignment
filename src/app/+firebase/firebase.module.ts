import { CommonModule } from '@angular/common';
import { NgModule, SkipSelf, Optional } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ]
})
export class FirebaseModule {
  public static forRoot() {
    return {
      ngModule: FirebaseModule,
      providers: [
        AngularFireAuth,
        AngularFireDatabase,
        AngularFirestore
      ]
    };
  }

  constructor(private afs: AngularFirestore,
              @Optional() @SkipSelf() private parentModule: FirebaseModule) {
    try {
      const settings = { timestampsInSnapshots: true };
      // afs.app.firestore().settings(settings);
      // afs.app.firestore().enablePersistence();
    } catch (e) {

    }

  }
}
