import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  doc,
  updateDoc,
  deleteDoc,
  collectionData,
  FieldPath,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Campaign } from 'src/app/models/Campaign.model';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  cNames: string[] = [];
  constructor(private firestoreDB: Firestore) {
    this.getAllCampaignsNames();
    console.log(this.getCampaignIdByName('second'), 'campaign name');
  }
  items: Observable<any[]> | undefined;

  saveCampaign(campaignFields: Campaign) {
    campaignFields.id = doc(collection(this.firestoreDB, 'id')).id;
    return from(
      addDoc(collection(this.firestoreDB, 'mail_campaign'), campaignFields)
    );
  }

  getAllCampaigns() {
    const campaigns = collection(this.firestoreDB, 'mail_campaign');
    return from(
      collectionData(campaigns, { idField: 'id' }) as Observable<Campaign[]>
    );
  }

  getAllCampaignsNames() {
    let names: string[] = [];
    this.getAllCampaigns().subscribe((campaigns) => {
      for (const campaign of <Campaign[]>campaigns) {
        names.push(campaign.campaignName);
      }
    });
    return names;
  }

  getCampaignIdByName(_campaignName: string) {
    let id: string = '';
    this.getAllCampaigns().subscribe((campaigns) => {
      for (const campaign of <Campaign[]>campaigns) {
        if (campaign.campaignName === _campaignName) {
          id = campaign.id;
        }
      }
    });
    return id;
  }

  updateCampaign(id: string, dataToUpdate: any) {
    const campaignToUpdate = doc(this.firestoreDB, `mail_campaign/${id}`);
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
    let campaignToDelete = doc(this.firestoreDB, `mail_campaign/${id}`);
    return from(deleteDoc(campaignToDelete));
  }
}
