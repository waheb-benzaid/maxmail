import { Injectable } from '@angular/core';
import { addDoc, Firestore, collection } from '@angular/fire/firestore';
import { Campaign } from 'src/app/models/Campaign.model';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  constructor(private firestoreDB: Firestore) {}

  // getAllCampaign() {
  //   return new Promise<any>((resolve) => {
  //     this.db
  //       .collection('User')
  //       .valueChanges({ idField: 'id' })
  //       .subscribe((users) => resolve(users));
  //   });
  // }

  save(campaignFields: Campaign) {
    const db = collection(this.firestoreDB, 'mail_campaign');
    addDoc(db, campaignFields)
      .then(() => console.log('data saved'))
      .catch((error) => console.log(error.message));
  }
}
