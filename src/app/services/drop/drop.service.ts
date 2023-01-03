import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  updateDoc,
  deleteDoc,
  collectionData,
  collection,
} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, Observable, reduce, take } from 'rxjs';
import { Drop } from 'src/app/models/Drop.model';
import {
  formatDate,
  getDay,
  getMonth,
  getYear,
} from '../../utils/Functions/format-date';
import { Campaign } from 'src/app/models/Campaign.model';
import { HiatusDatesService } from '../hiatus-dates/hiatus-dates.service';
import { DatePipe } from '@angular/common';
import { CampaignService } from '../campaign/campaign.service';

@Injectable({
  providedIn: 'root',
})
export class DropService {
  constructor(
    private firestoreDB: Firestore,
    private afs: AngularFirestore,
    private hiatusDatesService: HiatusDatesService,
    private datePipe: DatePipe,
    private campaignService: CampaignService
  ) {}

  currentCampaignId: string = '';

  // public drops: Drop[] = [];

  // createAutoDropsObject(
  //   campaignObject: Campaign,
  //   isEditMode: boolean,
  //   id?: string
  // ) {
  //   this.drops.length = 0;
  //   let day = getDay(campaignObject.firstDropDate as Date);
  //   let month = getMonth(campaignObject.firstDropDate as Date) + 1;
  //   let year = getYear(campaignObject.firstDropDate as Date);

  //   let dropDate = `${year}-${month}-${day}`;
  //   //objectToInsert.campaignId = this.currentCampaignId;

  //   for (let i = 1; i <= campaignObject.totalDropsNumber; i++) {
  //     let objectToInsert = new Object() as Drop;
  //     let date = new Date();
  //     //objectToInsert.campaignId = this.currentCampaignId;
  //     objectToInsert.campaignName = campaignObject.campaignName;
  //     objectToInsert.dropNumber = i;
  //     objectToInsert.dropDate = dropDate;
  //     objectToInsert.dropName = `${campaignObject.accountName}-${i}-${objectToInsert.dropDate}`;
  //     objectToInsert.dropVolume = campaignObject.firstDropVolume;
  //     objectToInsert.isDropCompleted = false;
  //     objectToInsert.isLastDrop = false;
  //     objectToInsert.isSeededReceived = false;
  //     this.drops.push(objectToInsert);

  //     date = new Date(dropDate);
  //     if (campaignObject.campaignType === 'magazine') {
  //       date = new Date(date.setMonth(date.getMonth() + 3));
  //     } else {
  //       date = new Date(date.setDate(date.getDate() + 21));
  //     }
  //     day = getDay(date);
  //     month = getMonth(date) + 1;
  //     year = getYear(date);
  //     dropDate = `${year}-${month}-${day}`;
  //     dropDate = formatDate(dropDate, this.datePipe) || '';
  //     let isHiatusDate =
  //       this.hiatusDatesService.hiatusDatesArray.includes(dropDate);
  //     while (isHiatusDate) {
  //       date = new Date(date.setDate(date.getDate() + 1));
  //       day = getDay(date);
  //       month = getMonth(date) + 1;
  //       year = getYear(date);
  //       dropDate = `${year}-${month}-${day}`;
  //       isHiatusDate =
  //         this.hiatusDatesService.hiatusDatesArray.includes(dropDate);
  //     }
  //     dropDate = `${year}-${month}-${day}`;
  //   }
  //   return this.drops;
  // }

  saveDrop(dropFields: Drop) {
    // dropFields.dropId = doc(collection(this.firestoreDB, 'dropId')).id;
    // return from(addDoc(collection(this.firestoreDB, 'mail_drop'), dropFields));
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

  dropsDates: string[] = [];
  isDropDateHiatus(): string[] {
    this.campaignService.getAllCampaigns().subscribe((res) => {
      res.forEach((campaign) => {
        campaign.drops.forEach((drop) => {
          this.dropsDates.push(drop.dropDate);
        });
        return this.dropsDates;
      });
    });
    return this.dropsDates;
  }

  getTodaysDrops() {}
}
