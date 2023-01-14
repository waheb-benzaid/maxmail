import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData } from '@angular/fire/firestore';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { firstValueFrom, from, Observable, Subscription } from 'rxjs';
import { Campaign } from 'src/app/models/Campaign.model';
import { Drop } from 'src/app/models/Drop.model';
import { VolumeDates } from 'src/app/models/VolumeDates.model';
import { CampaignStatus } from 'src/app/utils/Enums/Campaign Enums/CampaignStatus';
import { formatDate } from 'src/app/utils/Functions/format-date';

@Injectable({
  providedIn: 'root',
})
export class DropvolumeDatesService {
  constructor(
    private firestoreDB: Firestore,
    private afs: AngularFirestore,
    private datePipe: DatePipe
  ) {}

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
    console.log(date, 'id');
    console.log(dataToUpdate, 'dataToUpdate');

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

  removeDropVolumeFromCalendar(campaign: Campaign) {
    //NOTE: this methode is used when the Campaign status get changed
    let volumeDate: VolumeDates;
    let volumeDates$: Observable<VolumeDates>;
    const deleteCount = 1;
    campaign.drops.forEach(async (drop) => {
      volumeDates$ = this.getVolumeDateByID(drop.dropDate);
      volumeDate = await firstValueFrom(volumeDates$);
      if (volumeDate.volume.includes(drop.dropVolume)) {
        const index = volumeDate.volume.indexOf(drop.dropVolume);
        if (index !== -1) {
          volumeDate.volume.splice(index, deleteCount);
          this.updateVolume(drop.dropDate, volumeDate);
        }
      }
    });
  }

  addDropVolumeToCalendar(drops: Drop[]) {
    //NOTE: this methode is used when the Campaign status get changed
    let volumeDate: VolumeDates;
    let volumeDates$: Observable<VolumeDates>;
    let i = 0;
    drops.forEach((drop) => {
      i++;
      //volumeDates$ =
      this.getVolumeDateByID(drop.dropDate).subscribe((res) => {
        const volumeToUpdate = res;
        volumeToUpdate.volume.push(drop.dropVolume);
        this.updateVolume(drop.dropDate, volumeToUpdate);
      });
      // volumeDate =  firstValueFrom(volumeDates$);
      // console.log(drop.dropVolume, 'dropVolume from the function');
      // volumeDate.volume.push(drop.dropVolume);
    });
  }

  async removeVolumeByDrop(drop: Drop) {
    //NOTE: this methode will be invoked when drop status is changed
    let volumeDate: VolumeDates = new Object() as VolumeDates;
    let volumeDates$: Observable<VolumeDates> = new Observable();
    const deleteCount = 1;
    volumeDates$ = this.getVolumeDateByID(drop.dropDate);
    volumeDate = await firstValueFrom(volumeDates$);
    if (volumeDate.volume.includes(drop.dropVolume)) {
      const index = volumeDate.volume.indexOf(drop.dropVolume);
      if (index !== -1) {
        volumeDate.volume.splice(index, deleteCount);
        this.updateVolume(drop.dropDate, volumeDate);
      }
    }
  }

  async addVolumeByDrop(drop: Drop) {
    //NOTE: this method will be invoked when drop status is changed
    let volumeDate: VolumeDates = new Object() as VolumeDates;
    let volumeDates$: Observable<VolumeDates> = new Observable();
    volumeDates$ = this.getVolumeDateByID(drop.dropDate);
    volumeDate = await firstValueFrom(volumeDates$);
    volumeDate.volume.push(drop.dropVolume);
    this.updateVolume(drop.dropDate, volumeDate);
  }

  async saveOrUpdateVolumeDate(
    date_: string,
    volumeValue: number,
    campaignStatus: string,
    isEditData: boolean
  ) {
    const dateFormatted = formatDate(date_, this.datePipe);
    let date = dateFormatted?.toString();
    const volumneDate$ = this.getVolumeDateByID(date!);
    const volumeDate = await firstValueFrom(volumneDate$);
    let volume: number[] = [];
    if (campaignStatus === CampaignStatus.ACTIVE) {
      if (volumeDate && !isEditData) {
        volume = volumeDate.volume;
        volume.push(volumeValue);
        this.updateVolume(date!, {
          date,
          volume,
        });
      } else {
        volume.push(volumeValue);
        if (date) {
          this.saveVolume(date!, {
            date,
            volume,
          });
        }
      }
    }
  }
}
