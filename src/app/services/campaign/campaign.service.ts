import { Injectable } from '@angular/core';
import {
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

  constructor(private firestoreDB: Firestore, private afs: AngularFirestore) {}

  saveCampaign(campaignFields: Campaign, createdAt: any) {
    let id = this.afs.createId();
    campaignFields.campaignID = id;
    campaignFields.createdAt = createdAt;
    //this.dropService.getCurrentCampaignID(id);
    return from(
      this.afs.collection('mail_campaign').doc(id).set(campaignFields)
    );
  }

  getAllCampaigns() {
    return from(
      collectionData(collection(this.firestoreDB, 'mail_campaign'), {
        idField: 'id',
      }) as Observable<Campaign[]>
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

  // isCampaignZipcodeUnavailable(zipcode: string, campaignType: string): boolean {
  //   let isZipcodeUnvailable = false;
  //   this.getAllCampaigns().subscribe((res) => {
  //     res.forEach((campaign) => {
  //       if (campaign.campaignType === campaignType) {
  //         campaign.zipcodes.forEach((zip) => {
  //           if (zip.zipNumber === zipcode) {
  //             isZipcodeUnvailable = true;
  //           } else isZipcodeUnvailable = false;
  //         });
  //       }
  //     });
  //   });
  //   return isZipcodeUnvailable;
  // }
}
