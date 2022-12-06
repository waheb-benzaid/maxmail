import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
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
    const id = hiatusDateFields.hiatusDate;
    return from(
      this.afs.collection('hiatus_dates').doc(id).set(hiatusDateFields)
    );
  }

  getHiatusDates() {
    return from(
      collectionData(collection(this.firestoreDB, 'hiatus_dates'), {
        idField: 'id',
      }) as Observable<HiatusDate[]>
    );
  }

  getHiatusDateByID(id: string) {
    return this.afs
      .collection('hiatus_dates')
      .doc(id)
      .valueChanges() as Observable<HiatusDate>;
  }

  updateHiatusDate(id: string, dataToUpdate: any) {
    const campaignToUpdate = doc(this.firestoreDB, `hiatus_dates`, id);
    return from(
      updateDoc(campaignToUpdate, dataToUpdate)
        .then(() => {
          console.log('Data updated');
        })
        .catch((err) => {
          console.log(err.message);
        })
    );
  }

  deleteHiatusDate(id: string) {
    let dataToDelete = doc(this.firestoreDB, `hiatus_dates/${id}`);
    return from(deleteDoc(dataToDelete));
  }
}
