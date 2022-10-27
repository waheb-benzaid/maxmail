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

  // getAllZipcodes() {
  //   let zipcodesNumbers: string[] = [];
  //   this.getAllZipcodesObjects().subscribe((zipcodeObject) => {
  //     for (const zipCode of <ZipCode[]>zipcodeObject) {
  //       zipcodesNumbers.push(zipCode.zipNumber);
  //     }
  //   });
  //   return zipcodesNumbers;
  // }

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

  updateOrCreateZipcode(id: string, dataToUpdate: any) {
    const zipCodeToUpdate = doc(this.firestoreDB, `mail_zipcode`, id);
    if (zipCodeToUpdate) {
      return from(
        updateDoc(zipCodeToUpdate, dataToUpdate)
          .then(() => {
            console.log('Data updated');
          })
          .catch((err) => {
            console.log(err.message);
          })
      );
    } else {
      return from(this.saveZipcode(dataToUpdate));
    }
  }

  deleteZipcode(id: string) {
    let zipCodeToDelete = doc(this.firestoreDB, `mail_zipcode/${id}`);
    return from(deleteDoc(zipCodeToDelete));
  }
}
