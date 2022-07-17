import { Injectable, NgZone } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
  getAdditionalUserInfo,
  UserInfo,
  AdditionalUserInfo,
} from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { concatMap, from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: Auth) {}

  currentUser$ = authState(this.auth);

  login(email: any, password: any) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return from(this.auth.signOut());
  }

  saveUser(firstName: any, lastName: any, email: any, password: any) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(({ user }) => updateProfile(user, { displayName: firstName }))
    );
  }
}
