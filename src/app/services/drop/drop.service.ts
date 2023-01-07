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
}
