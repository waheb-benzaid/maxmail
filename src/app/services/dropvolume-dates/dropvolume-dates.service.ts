import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData } from '@angular/fire/firestore';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { VolumeDates } from 'src/app/models/VolumeDates.model';

@Injectable({
  providedIn: 'root',
})
export class DropvolumeDatesService {
  constructor(private firestoreDB: Firestore, private afs: AngularFirestore) {}

  saveVolume(date: string, volumeFields: VolumeDates) {
    return from(
      this.afs
        .collection('mail_drop_volume_dates')
        .doc(date.trim())
        .set(volumeFields)
    );
  }

  getVolumeDateByID(id: string) {
    return this.afs
      .collection('mail_drop_volume_dates')
      .doc(id)
      .valueChanges() as Observable<VolumeDates>;
  }

  getAllVolumeDate() {
    return from(
      collectionData(collection(this.firestoreDB, 'mail_drop_volume_dates'), {
        idField: 'date',
      }) as Observable<VolumeDates[]>
    );
  }

  updateVolume(date: string, dataToUpdate: any) {
    const VolumeDatesToUpdate = doc(
      this.firestoreDB,
      `mail_drop_volume_dates`,
      date
    );
    return from(
      updateDoc(VolumeDatesToUpdate, dataToUpdate)
        .then(() => {
          console.log('volume dates Data updated');
        })
        .catch((err) => {
          console.log(err.message);
        })
    );
  }

  deleteVolume() {}
}
