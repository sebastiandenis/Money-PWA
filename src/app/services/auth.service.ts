import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Auth } from '../models/auth.model';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AuthService {
    constructor(public afAuth: AngularFireAuth) { }

    signIn(user: Auth) {
        return this.fromFirebaseAuthPromise(
            this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        );
    }

    signOut() {
        return this.fromFirebaseAuthPromise(
            this.afAuth.auth.signOut()
        );
    }

    signUp(user: Auth) {
        return this.fromFirebaseAuthPromise(
            this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        );
    }

    private fromFirebaseAuthPromise(promise): Observable<any> {
        return Observable.fromPromise(<Promise<any>>promise);
    }
}
