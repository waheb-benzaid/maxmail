import { Injectable } from '@angular/core';
import { addDoc, Firestore, collection } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';
import { from } from 'rxjs';
import { Campaign } from 'src/app/models/Campaign.model';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  constructor(private firestoreDB: Firestore) {}

  save(campaignFields: Campaign) {
    const db = collection(this.firestoreDB, 'mail_campaign');
    return from(
      addDoc(db, campaignFields)
        .then(() => console.log('data saved'))
        .catch((error) => console.log(error.message))
    );
  }

  getAllCampaign() {
    const db = collection(this.firestoreDB, 'mail_campaign');
    getDocs(db)
      .then((response) =>
        console.log(
          response.docs.map((item) => {
            return { ...item.data(), id: item.id };
          })
        )
      )
      .catch((err) => console.log(err.message));
  }
}
