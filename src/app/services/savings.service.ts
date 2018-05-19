import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Savings } from '../models/savings.model';

@Injectable()
export class SavingsService {

  constructor(private db: AngularFirestore) {

  }

  getDefaultSavings(): Observable<Savings> {
    return this.db.doc<Savings>('savings/92sKB46zBuGpEvKOlL1T').valueChanges();
  }

}
