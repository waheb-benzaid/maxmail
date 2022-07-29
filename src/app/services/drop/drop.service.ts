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
import { Drop } from 'src/app/models/Drop.model';

@Injectable({
  providedIn: 'root',
})
export class DropService {
  constructor(private firestoreDB: Firestore) {}

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
}
