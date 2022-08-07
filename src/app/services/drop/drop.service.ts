import { Injectable } from '@angular/core';
import {
  addDoc,
  Firestore,
  collection,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
  getDocs,
} from '@angular/fire/firestore';
import { from, Observable, combineLatest, combineLatestAll } from 'rxjs';
import { Campaign } from 'src/app/models/Campaign.model';
import { Drop } from 'src/app/models/Drop.model';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { CampaignService } from '../campaign/campaign.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DropService {
  constructor(
    private firestoreDB: Firestore,
    private afs: AngularFirestore,
    private campaignService: CampaignService
  ) {
    this.deleteDropsByCampaignName('jksjks');
  }

  createAutoDropsObject() {}

  saveDrop(dropFields: Drop) {
    dropFields.dropId = doc(collection(this.firestoreDB, 'dropId')).id;
    return from(addDoc(collection(this.firestoreDB, 'mail_drop'), dropFields));
  }

  getAllDrops() {
    const db = collection(this.firestoreDB, 'mail_drop');

    return from(
      getDocs(db).then((response) => {
        return response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
      })
    );
  }

  getDropByCampaignName(_campaignName: string) {
    let drop: Drop[] = [];
    this.getAllDrops().subscribe((res) => {
      for (const iterator of <Drop[]>res) {
        if (iterator.campaignName === _campaignName) {
          drop.push(iterator);
        }
      }
    });
    return drop;
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

  deleteDropsByCampaignName(_campaignName: string) {
    // this.itemDoc = this.afs.doc<Drop>('items/1');
    //this.drop = this.itemDoc.valueChanges();
  }
}
