import { Injectable } from '@angular/core';
import {
  addDoc,
  Firestore,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from '@angular/fire/firestore';
import { from } from 'rxjs';
import { Drop } from 'src/app/models/Drop.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CampaignService } from '../campaign/campaign.service';
import { DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/dialog';
import { getDay, getMonth, getYear } from '../../utils/Functions/format-date';
import { Campaign } from 'src/app/models/Campaign.model';

@Injectable({
  providedIn: 'root',
})
export class DropService {
  constructor(
    private firestoreDB: Firestore,
    private afs: AngularFirestore,
    private campaignService: CampaignService
  ) {
    this.deleteDropsByCampaignName('jksjks');
  }
  public drops: Drop[] = [
    {
      campaignName: '',
      isSeededReceived: false,
      isLastDrop: false,
      isDropCompleted: false,
      dropNumber: 0,
      dropVolume: '',
      dropDate: '',
    },
  ];
  createAutoDropsObject(campaignObject: Campaign) {
    this.drops.length = 0;
    let day = getDay(campaignObject.firstDropDate as Date) + 1;
    let month = getMonth(campaignObject.firstDropDate as Date) + 1;
    let year = getYear(campaignObject.firstDropDate as Date);
    let objectToInsert = {
      campaignName: '',
      isSeededReceived: false,
      isLastDrop: false,
      isDropCompleted: false,
      dropNumber: 0,
      dropVolume: '',
      dropDate: '',
    };
    for (let i = 1; i <= campaignObject.totalDropsNumber; i++) {
      objectToInsert = new Object() as any;
      objectToInsert.campaignName = campaignObject.campaignName;
      objectToInsert.dropNumber = i;
      objectToInsert.dropDate = `${year}/${month}/${day}`;
      objectToInsert.dropVolume = campaignObject.firstDropVolume;
      objectToInsert.isDropCompleted = false;
      objectToInsert.isLastDrop = false;
      objectToInsert.isSeededReceived = false;
      this.drops.push(objectToInsert);
      month++;
      if (month === 7) {
        month++;
      }
      if (month > 12) {
        month = 1;
        year++;
      }
    }
    return this.drops;
  }

  saveDrop(dropFields: Drop) {
    dropFields.dropId = doc(collection(this.firestoreDB, 'dropId')).id;
    return from(addDoc(collection(this.firestoreDB, 'mail_drop'), dropFields));
  }

  getAllDrops() {
    const db = collection(this.firestoreDB, 'mail_drop');
    return from(
      getDocs(db).then((response) => {
        return response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
      })
    );
  }

  getDropByCampaignName(_campaignName: string) {
    let drop: Drop[] = [];
    this.getAllDrops().subscribe((res) => {
      for (const iterator of <Drop[]>res) {
        if (iterator.campaignName === _campaignName) {
          drop.push(iterator);
        }
      }
    });
    return drop;
  }

  updateDrop(id: string, dataToUpdate: any) {
    const dropToUpdate = doc(this.firestoreDB, 'mail_drop', id);
    return from(
      updateDoc(dropToUpdate, dataToUpdate)
        .then(() => {
          console.log('Data updated');
        })
        .catch((err) => {
          console.log(err.message);
        })
    );
  }

  deleteDrop(id: string) {
    const dropToDelete = doc(this.firestoreDB, 'mail_drop', id);
    return from(deleteDoc(dropToDelete));
  }

  deleteDropsByCampaignName(_campaignName: string) {
    // this.itemDoc = this.afs.doc<Drop>('items/1');
    //this.drop = this.itemDoc.valueChanges();
  }
}
