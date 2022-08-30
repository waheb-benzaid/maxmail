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
import {
  formatDate,
  getDay,
  getMonth,
  getYear,
} from '../../utils/Functions/format-date';
import { Months } from '../../utils/Enums/months';
import { Campaign } from 'src/app/models/Campaign.model';
import { HiatusDatesService } from '../hiatus-dates/hiatus-dates.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DropService {
  constructor(
    private firestoreDB: Firestore,
    private hiatusDatesService: HiatusDatesService,
    private datePipe: DatePipe
  ) {}
  currentCampaignId: string = '';
  public drops: Drop[] = [
    {
      campaignId: '',
      campaignName: '',
      dropName: '',
      isSeededReceived: false,
      isLastDrop: false,
      isDropCompleted: false,
      dropNumber: 0,
      dropVolume: '',
      dropDate: '',
      nextAvailableDates: '',
    },
  ];
  createAutoDropsObject(
    campaignObject: Campaign,
    isEditMode: boolean,
    id?: string
  ) {
    this.drops.length = 0;
    let day = getDay(campaignObject.firstDropDate as Date);
    let month = getMonth(campaignObject.firstDropDate as Date) + 1;
    let year = getYear(campaignObject.firstDropDate as Date);

    let objectToInsert = {
      campaignId: '',
      campaignName: '',
      dropName: '',
      isSeededReceived: false,
      isLastDrop: false,
      isDropCompleted: false,
      dropNumber: 0,
      dropVolume: '',
      dropDate: '',
      nextAvailableDates: '',
    };
    let dropDate = `${year}-${month}-${day}`;
    objectToInsert.campaignId = this.currentCampaignId;
    for (let i = 1; i <= campaignObject.totalDropsNumber; i++) {
      objectToInsert = new Object() as any;
      let date = new Date();
      objectToInsert.campaignId = this.currentCampaignId;
      objectToInsert.campaignName = campaignObject.campaignName;
      objectToInsert.dropNumber = i;
      objectToInsert.dropDate = dropDate;
      objectToInsert.dropName = `${campaignObject.accountName}-${i}-${objectToInsert.dropDate}`;
      objectToInsert.dropVolume = campaignObject.firstDropVolume;
      objectToInsert.isDropCompleted = false;
      objectToInsert.isLastDrop = false;
      objectToInsert.isSeededReceived = false;
      this.drops.push(objectToInsert);
      date = new Date(dropDate);
      if (campaignObject.campaignType === 'magazine') {
        date = new Date(date.setMonth(date.getMonth() + 3));
      } else {
        date = new Date(date.setDate(date.getDate() + 21));
        console.log(date, 'date after adding 21 days');
      }
      day = getDay(date);
      month = getMonth(date) + 1;
      year = getYear(date);
      dropDate = `${year}-${month}-${day}`;
      dropDate = formatDate(dropDate, this.datePipe) || '';
      let isHiatusDate =
        this.hiatusDatesService.hiatusDatesArray.includes(dropDate);
      let dropsVolume = this.getAllDropsVolume(dropDate);
      while (isHiatusDate || dropsVolume >= 50000) {
        date = new Date(date.setDate(date.getDate() + 1));
        day = getDay(date);
        month = getMonth(date) + 1;
        year = getYear(date);
        dropDate = `${year}-${month}-${day}`;
        isHiatusDate =
          this.hiatusDatesService.hiatusDatesArray.includes(dropDate);
        dropsVolume = this.getAllDropsVolume(dropDate);
      }
      dropDate = `${year}-${month}-${day}`;
    }
    return this.drops;
  }

  getCurrentCampaignID(campaignId: string) {
    this.currentCampaignId = campaignId;
    console.log(this.currentCampaignId);
  }

  saveDrop(dropFields: Drop) {
    // dropFields.dropId = doc(collection(this.firestoreDB, 'dropId')).id;
    // return from(addDoc(collection(this.firestoreDB, 'mail_drop'), dropFields));
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
      for (const iterator of <Drop[]>(<unknown>res)) {
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

  getAllDropsVolume(date: string) {
    let dropVolume = 0;
    this.getAllDrops().subscribe((res) => {
      for (const drop of <Drop[]>(<unknown>res)) {
        if (date === drop.dropDate) {
          dropVolume = dropVolume + drop.dropVolume;
        }
      }
    });
    return dropVolume;
  }

  deleteDropsByCampaignName(_campaignName: string) {
    // this.itemDoc = this.afs.doc<Drop>('items/1');
    //this.drop = this.itemDoc.valueChanges();
  }
}
