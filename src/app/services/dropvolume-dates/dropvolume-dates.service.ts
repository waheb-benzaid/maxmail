import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData } from '@angular/fire/firestore';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { firstValueFrom, from, Observable } from 'rxjs';
import { Campaign } from 'src/app/models/Campaign.model';
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

  removeDropVolumeFromCalendar(campaign: Campaign) {
    let volumeDate: VolumeDates;
    let volumeDates$: Observable<VolumeDates>;
    const deleteCount = 1;
    campaign.drops.forEach(async (drop) => {
      volumeDates$ = this.getVolumeDateByID(drop.dropDate);
      volumeDate = await firstValueFrom(volumeDates$);
      if (volumeDate.volume.includes(drop.dropVolume)) {
        const index = volumeDate.volume.indexOf(drop.dropVolume);
        console.log(index, 'index');
        if (index !== -1) {
          volumeDate.volume.splice(index, deleteCount);
          this.updateVolume(drop.dropDate, volumeDate);
        }
      }
    });
  }
}
