import { Injectable } from '@angular/core';
import { collection, Firestore, collectionData } from '@angular/fire/firestore';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { HiatusDate } from 'src/app/models/HiatusDates.model';

@Injectable({
  providedIn: 'root',
})
export class HiatusDatesService {
  public hiatusDatesArray: string[] = [];

  constructor(private afs: AngularFirestore, private firestoreDB: Firestore) {
    this.hiatusDatesArray = [];
    this.getHiatusDates();
  }

  saveHiatusDate(hiatusDateFields: HiatusDate) {
    return from(
      this.afs.collection('hiatus_dates').doc().set(hiatusDateFields)
    );
  }

  getHiatusDates() {
    return from(
      collectionData(collection(this.firestoreDB, 'hiatus_dates'), {
        idField: 'id',
      }) as Observable<HiatusDate[]>
    );
  }
}
