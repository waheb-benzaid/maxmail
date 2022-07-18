import { Injectable, NgZone } from '@angular/core';
import { authInstance$, authState, user, Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
  getAdditionalUserInfo,
  UserInfo,
  AdditionalUserInfo,
  getAuth,
  UserProfile,
} from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { initializeApp, firebaseApp$, FirebaseApp } from '@angular/fire/app';

import {
  concatMap,
  config,
  from,
  Observable,
  ObservableInput,
  switchMap,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { loggedIn } from '@angular/fire/auth-guard';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: Auth, private firebase: FirebaseApp) {}

  public currentUser$ = authState(this.auth);

  login(email: any, password: any) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return from(this.auth.signOut());
  }

  saveUser(firstName: any, lastName: any, email: any, password: any) {
    let signUpApp = this.auth.app.name + '_signUp';
    console.log(`this is the signUpApp ${signUpApp}`);

    let secondaryApp = initializeApp(this.auth.app.options, signUpApp);
    let secondaryAppAuth = getAuth(secondaryApp);
    console.log(`this is the SecondaryAuth ${secondaryAppAuth}`);

    return from(
      createUserWithEmailAndPassword(secondaryAppAuth, email, password)
    ).pipe(
      switchMap(({ user }) => updateProfile(user, { displayName: firstName }))
    );
  }
}
