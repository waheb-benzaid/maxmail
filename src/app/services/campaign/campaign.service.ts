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
import { from, Observable, timestamp } from 'rxjs';
import { Campaign } from 'src/app/models/Campaign.model';
import { serverTimestamp, where } from 'firebase/firestore';
import { CampaignStatus } from 'src/app/utils/Enums/Campaign Enums/CampaignStatus';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  cNames: string[] = [];
  isEmpty: boolean = false;
  public campaignId: string = '';
  public campaignInformation = {
    CampaignContact: '',
    CampaignCompany: '',
    CampaignStatus: '',
    campaignType: '',
    mailerSize: '',
  };

  constructor(private firestoreDB: Firestore, private afs: AngularFirestore) {}

  saveCampaign(campaignFields: Campaign, createdAt: any) {
    this.campaignId = this.afs.createId();
    campaignFields.campaignID = this.campaignId;
    campaignFields.createdAt = createdAt;
    campaignFields.campaignTimestamp = serverTimestamp();
    campaignFields.drops.forEach((drop) => {
      drop.campaignId = this.campaignId;
    });
    return from(
      this.afs
        .collection('mail_campaign')
        .doc(this.campaignId)
        .set(campaignFields)
    );
  }

  getCampaignById(id: string) {
    return this.afs
      .collection('mail_campaign')
      .doc(id)
      .valueChanges() as Observable<Campaign>;
  }

  getAllCampaigns() {
    return from(
      collectionData(collection(this.firestoreDB, 'mail_campaign'), {
        idField: 'id',
      }) as Observable<Campaign[]>
    );
  }

  getCampaignByUniqueNumber(campaignNumber: string) {
    return this.afs
      .collection('mail_campaign', (ref) =>
        ref.where('campaignNumber', '==', campaignNumber)
      )
      .snapshotChanges();
  }

  getLastCreatedCampaign() {
    const campaignRef = this.afs.collection<Campaign>('mail_campaign', (ref) =>
      ref.orderBy('createdAt', 'desc').limit(1)
    );
    return campaignRef.snapshotChanges();
  }

  getActiveCampaignsCount() {
    const campaignRef = this.afs.collection<Campaign>('mail_campaign', (ref) =>
      ref.where('campaignStatus', '==', CampaignStatus.ACTIVE)
    );
    return campaignRef.snapshotChanges();
  }

  getCompletedCampaignsCount() {
    const campaignRef = this.afs.collection<Campaign>('mail_campaign', (ref) =>
      ref.where('campaignStatus', '==', CampaignStatus.COMPLETED)
    );
    return campaignRef.snapshotChanges();
  }

  getSuspendedCampaignsCount() {
    const campaignRef = this.afs.collection<Campaign>('mail_campaign', (ref) =>
      ref.where('campaignStatus', '==', CampaignStatus.SUSPENDED)
    );
    return campaignRef.snapshotChanges();
  }

  getCancelledCampaignsCount() {
    const campaignRef = this.afs.collection<Campaign>('mail_campaign', (ref) =>
      ref.where('campaignStatus', '==', CampaignStatus.CANCELLED)
    );
    return campaignRef.snapshotChanges();
  }

  getLastCreateedCampaignByNumber() {
    const campaignRef = this.afs.collection<Campaign>('mail_campaign', (ref) =>
      ref.orderBy('campaignNumber', 'desc').limit(1)
    );
    return campaignRef.snapshotChanges();
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
}
