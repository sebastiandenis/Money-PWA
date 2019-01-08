import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable()
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  getUserPhotoUrl(uid: string): Observable<string> {
    const pathToProfilePhoto = this.storage.ref(`${uid}/me_small.jpg`);
    return this.fromFirebaseStoragePromise(pathToProfilePhoto.getDownloadURL());
  }

  private fromFirebaseStoragePromise(promise): Observable<any> {
    return from(<Promise<any>>promise);
  }
}
