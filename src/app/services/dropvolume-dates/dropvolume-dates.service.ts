import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData } from '@angular/fire/firestore';
import { id } from 'date-fns/locale';
import { collection, doc, Firestore, updateDoc } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { Campaign } from 'src/app/models/Campaign.model';
import { VolumeDates } from 'src/app/models/VolumeDates.model';

@Injectable({
  providedIn: 'root',
})
export class DropvolumeDatesService {
  constructor(private firestoreDB: Firestore, private afs: AngularFirestore) {}

  saveVolume(date: string, volumeFields: VolumeDates) {
    return from(
      this.afs.collection('mail_drop_volume_dates').doc(date).set(volumeFields)
    );
  }

  getVolumeDateByID(date: string) {
    return this.afs
      .collection('mail_drop_volume_dates')
      .doc(date)
      .valueChanges() as Observable<VolumeDates>;
  }

  getAllVolumeDate() {
    return from(
      collectionData(collection(this.firestoreDB, 'mail_drop_volume_dates'), {
        idField: 'id',
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
          console.log('Data updated');
        })
        .catch((err) => {
          console.log(err.message);
        })
    );
  }

  deleteVolume() {}
}
