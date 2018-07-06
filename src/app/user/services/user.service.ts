import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

    constructor(private afs: AngularFirestore) { }

    loadUserById(userId: string): Observable<User> {
        // console.log('userService.loadUserById->userId=', userId);
        // return this.afs.collection<User>('users', ref => ref.where('userId', '==', userId)).valueChanges();
        return this.afs.doc<User>(`users/${userId}`).valueChanges();
    }

}
