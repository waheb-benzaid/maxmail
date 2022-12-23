import { Injectable } from '@angular/core';
import { from, Observable, of, switchMap } from 'rxjs';
import { UserModel } from 'src/app/models/User.model';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Auth, User } from 'firebase/auth';
import {} from 'firebase/functions';

import { AuthenticationService } from '../auth/authentication.service';
import { ProfileUser } from 'src/app/models/Profile.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firestore: Firestore,
    private authService: AuthenticationService
  ) {}

  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  addUser(user: ProfileUser): Observable<any> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }

  getAllUsers() {
    return from(
      collectionData(collection(this.firestore, 'users'), {
        idField: 'id',
      }) as Observable<UserModel[]>
    );
  }
}
