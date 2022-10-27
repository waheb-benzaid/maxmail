import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  doc,
  updateDoc,
  deleteDoc,
  collectionData,
} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { ZipCode } from 'src/app/models/Zipcode.model';

@Injectable({
  providedIn: 'root',
})
export class ZipCodeService {
  constructor(private firestoreDB: Firestore, private afs: AngularFirestore) {}

  saveZipcode(zipcodeFields: ZipCode) {
    let id = zipcodeFields.zipNumber;
    return from(this.afs.collection('mail_zipcode').doc(id).set(zipcodeFields));
  }

  getAllZipcodes() {
    return from(
      collectionData(collection(this.firestoreDB, 'mail_zipcode'), {
        idField: 'id',
      }) as Observable<ZipCode[]>
    );
  }

  getZipCodeById(id: string) {
    return this.afs
      .collection('mail_zipcode')
      .doc(id)
      .valueChanges() as Observable<ZipCode>;
  }

  initZipCode(id: string) {
    const zipCodeToUpdate = doc(this.firestoreDB, `mail_zipcode`, id);
    return from(
      updateDoc(zipCodeToUpdate, {
        zipNumber: id,
        accountName: '',
        campaignStatus: '',
        unavailablePostCard: false,
        unavailableMagazine: false,
        unavailableExternalMail: false,
      })
    );
  }

  updateZipCode(id: string, dataToUpdate: any) {
    const zipCodeToUpdate = doc(this.firestoreDB, `mail_zipcode`, id);
    return from(
      updateDoc(zipCodeToUpdate, dataToUpdate)
        .then(() => {
          console.log('Data updated');
        })
        .catch((err) => {
          console.log(err.message);
        })
    );
  }

  deleteZipcode(id: string) {
    let zipCodeToDelete = doc(this.firestoreDB, `mail_zipcode/${id}`);
    return from(deleteDoc(zipCodeToDelete));
  }
}
