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
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';
import { Campaign } from 'src/app/models/Campaign.model';
import { Drop } from 'src/app/models/Drop.model';
import { setDoc, where } from 'firebase/firestore';

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

  constructor(private firestoreDB: Firestore, private afs: AngularFirestore) {
    //console.log(this.getCampaignId());
    this.isCampaignCollectionEmpty();

    this.getCampaignId();
    console.log(this.campaignId, 'campaignID');
  }

  items: Observable<any[]> | undefined;

  saveCampaign(campaignFields: Campaign) {
    // campaignFields.campaignID = this.afs.createId();
    // return from(
    //   // setDoc(collection(this.firestoreDB, 'mail_campaign',id), campaignFields)
    //   setDoc(
    //     (this.afs, 'mail_campaign', campaignFields.campaignID),
    //     campaignFields
    //   )
    // );
    let id = this.afs.createId();
    campaignFields.campaignID = id;
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

  getCampaignId() {
    // const campaignCollection = this.afs
    //   .collection<Campaign>('mail_campaign')
    //   .snapshotChanges();
    // let obj: Drop = null;
    // campaignCollection.forEach((value) => {
    //   return value.map((res) => {
    //     if (res.payload.doc.data().campaignName === 'x') {
    //       this.campaignId = res.payload.doc.id;
    //       obj.campaignId = res.payload.doc.id;
    //       let obj: Drop = res.
    //       return obj.campaignId;
    //     }
    //     return '';
    //   });
    // // });
    // return this.afs
    //   .collection<Campaign>('mail_campaign')
    //   .snapshotChanges()
    //   .subscribe((res) => {
    //     res.map((item) => {});
    //   });
    //       const racesCollection: AngularFirestoreCollection<Race>;
    // return racesCollection.snapshotChanges().map(actions => {
    //   return actions.map(a => {
    //     const data = a.payload.doc.data() as Race;
    //     data.id = a.payload.doc.id;
    //     return data;
    //   });
    // });
  }

  getCampaignInformations(_campaignName: string) {
    this.getAllCampaigns().subscribe((campaigns) => {
      for (const campaign of <Campaign[]>campaigns) {
        if (campaign.campaignName === _campaignName) {
          this.campaignInformation.CampaignCompany = campaign.contactName;
          this.campaignInformation.CampaignContact = campaign.contactName;
          this.campaignInformation.CampaignStatus = campaign.campaignStatus;
          this.campaignInformation.campaignType = campaign.campaignType;
          this.campaignInformation.mailerSize = campaign.mailerSize;
        }
      }
    });
  }

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
