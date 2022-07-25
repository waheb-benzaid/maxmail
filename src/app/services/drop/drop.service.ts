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
import { Drop } from 'src/app/models/Drop.model';

@Injectable({
  providedIn: 'root',
})
export class DropService {
  constructor(private firestoreDB: Firestore) {}
  saveDrop(dropFields: Drop) {
    const db = collection(this.firestoreDB, 'mail_drop');
    return from(
      addDoc(db, dropFields)
        .then(() => console.log('data saved'))
        .catch((error) => console.log(error.message))
    );
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
