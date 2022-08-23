import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  doc,
  updateDoc,
  deleteDoc,
  collectionData,
} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { Campaign } from 'src/app/models/Campaign.model';

import { DropService } from '../drop/drop.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  cNames: string[] = [];
  isEmpty: boolean = false;
  campaignId: string = '';

  public campaignInformation = {
    CampaignContact: '',
    CampaignCompany: '',
    CampaignStatus: '',
    campaignType: '',
    mailerSize: '',
  };

  constructor(
    private firestoreDB: Firestore,
    private afs: AngularFirestore,
    private dropService: DropService
  ) {
    this.isCampaignCollectionEmpty();
    console.log(this.campaignId, 'campaignID');
  }

  items: Observable<any[]> | undefined;

  saveCampaign(campaignFields: Campaign) {
    let id = this.afs.createId();
    campaignFields.campaignID = id;
    this.dropService.getCurrentCampaignID(id);
    return from(
      this.afs.collection('mail_campaign').doc(id).set(campaignFields)
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

  // getCampaignInformations(_campaignName: string) {
  //   this.getAllCampaigns().subscribe((campaigns) => {
  //     for (const campaign of <Campaign[]>campaigns) {
  //       if (campaign.campaignName === _campaignName) {
  //         this.campaignInformation.CampaignCompany = campaign.contactName;
  //         this.campaignInformation.CampaignContact = campaign.contactName;
  //         this.campaignInformation.CampaignStatus = campaign.campaignStatus;
  //         this.campaignInformation.campaignType = campaign.campaignType;
  //         this.campaignInformation.mailerSize = campaign.mailerSize;
  //       }
  //     }
  //   });
  // }

  getCampaignIdByName(_campaignName: string) {
    let id: string = '';
    this.getAllCampaigns().subscribe((campaigns) => {
      for (const campaign of <Campaign[]>campaigns) {
        if (campaign.campaignName === _campaignName) {
          //doc('campaign'.data)
        }
      }
    });
    return id;
  }

  updateCampaign(id: string, dataToUpdate: any) {
    const campaignToUpdate = doc(this.firestoreDB, `mail_campaign`, id);
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

  async isCampaignCollectionEmpty() {}
}
//
