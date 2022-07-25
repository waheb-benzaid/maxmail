import { Injectable } from '@angular/core';
import {
  addDoc,
  Firestore,
  collection,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { deleteDoc, getDocs } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { Campaign } from 'src/app/models/Campaign.model';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  constructor(private firestoreDB: Firestore) {}
  saveCampaign(campaignFields: Campaign) {
    const db = collection(this.firestoreDB, 'mail_campaign');
    return from(
      addDoc(db, campaignFields)
        .then(() => console.log('data saved'))
        .catch((error) => console.log(error.message))
    );
  }

  getAllCampaigns() {
    const db = collection(this.firestoreDB, 'mail_campaign');
    return from(
      getDocs(db).then((response) => {
        return response.docs.map((item) => {
          return { ...(<Campaign[]>item.data()), id: item.id };
        });
      })
    );
  }

  updateCampaign(id: string, dataToUpdate: any) {
    const campaignToUpdate = doc(this.firestoreDB, 'mail_campaign', id);
    return from(
      updateDoc(campaignToUpdate, dataToUpdate)
        .then(() => {
          console.log('Data updated');
        })
        .catch((err) => {
          console.log(err.message);
        })
    );
  }

  deleteCampaign(id: string) {
    const campaignToDelete = doc(this.firestoreDB, 'mail_campaign', id);
    return from(deleteDoc(campaignToDelete));
  }
}
