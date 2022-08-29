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
import { Conditional } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class HiatusDatesService {
  public hiatusDatesArray: string[] = [];

  constructor(private afs: AngularFirestore, private firestoreDB: Firestore) {
    this.getHiatusDates();
    console.log(this.hiatusDatesArray, 'array');
  }

  saveHiatusDate(hiatusDateFields: HiatusDate) {
    return from(
      this.afs.collection('hiatus_dates').doc().set(hiatusDateFields)
    );
  }

  getHiatusDates() {
    const hiatus_dates = collection(this.firestoreDB, 'hiatus_dates');
    let hiatusDatesData = collectionData(hiatus_dates, {
      //  idField: 'id',
    }) as Observable<HiatusDate[]>;
    hiatusDatesData.subscribe((res) => {
      for (let index = 0; index < res.length; index++) {
        this.hiatusDatesArray.push(res[index].hiatusDate);
      }
    });
  }
}
