import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  doc,
  updateDoc,
  deleteDoc,
  collectionData,
} from '@angular/fire/firestore';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { HiatusDate } from 'src/app/models/HiatusDates.model';

@Injectable({
  providedIn: 'root',
})
export class HiatusDatesService {
  constructor(private afs: AngularFirestore) {}

  saveHiatusDate(hiatusDateFields: HiatusDate) {
    return from(
      this.afs.collection('hiatus_dates').doc().set(hiatusDateFields)
    );
  }
}
