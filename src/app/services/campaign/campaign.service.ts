import { Injectable } from '@angular/core';
import {
  addDoc,
  Firestore,
  collection,
  doc,
  updateDoc,
  FieldValue,
} from '@angular/fire/firestore';
import { de, id } from 'date-fns/locale';
import { deleteDoc, getDocs } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { Campaign } from 'src/app/models/Campaign.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  cNames: string[] = [];
  constructor(
    private firestoreDB: Firestore,
    private firestore: AngularFirestore
  ) {}
  items: Observable<any[]> | undefined;

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
    //return from(this.firestore.collection('mail_campaign').valueChanges());

    return from(
      getDocs(db).then((response) => {
        return response.docs.map((item) => {
          return { ...(<Campaign[]>item.data()), id: item.id };
        });
      })
    );
  }

  getAllCampaignsNames() {
    let campaigns = this.firestore.collection('mail_campaign').valueChanges();
    campaigns.subscribe((res) => {
      for (let campaign of <Campaign[]>res) {
        this.cNames.push(campaign.campaignName);
      }
    });
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
