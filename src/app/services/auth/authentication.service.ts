import { Injectable } from '@angular/core';
import { authState, Auth } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getAuth,
} from 'firebase/auth';
import { initializeApp, FirebaseApp } from '@angular/fire/app';
import { from, switchMap } from 'rxjs';

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
    let secondaryApp = initializeApp(this.auth.app.options, signUpApp);
    let secondaryAppAuth = getAuth(secondaryApp);
    return from(
      createUserWithEmailAndPassword(secondaryAppAuth, email, password)
    ).pipe(
      switchMap(({ user }) => updateProfile(user, { displayName: firstName }))
    );
  }
}
