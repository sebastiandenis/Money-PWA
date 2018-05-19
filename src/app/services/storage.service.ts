import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';



@Injectable()
export class StorageService {
    constructor() { }


    getUserPhotoUrl(uid: string): Observable<string> {
        const storageRef = firebase.storage().ref();
        const pathToProfilePhoto = storageRef.child(`${uid}/me_small.jpg`);
        return this.fromFirebaseStoragePromise(
            pathToProfilePhoto.getDownloadURL()
        );
    }

    private fromFirebaseStoragePromise(promise): Observable<any> {
        return Observable.fromPromise(<Promise<any>>promise);
    }
}
