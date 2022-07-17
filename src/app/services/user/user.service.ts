import { Injectable } from '@angular/core';
import { from, Observable, of, switchMap } from 'rxjs';
import { UserModel } from 'src/app/models/User.model';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firestore: Firestore,
    private authService: AuthenticationService
  ) {}

  get currentUserProfile$(): Observable<UserModel | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<UserModel>;
      })
    );
  }

  addUser(user: UserModel): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: UserModel): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }
}
