import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Auth } from '../models/auth.model';
import { Observable, from } from 'rxjs';



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
        console.log('service->signUp.email: ', user.email);
        return this.fromFirebaseAuthPromise(
        this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        );
    }

    private fromFirebaseAuthPromise(promise): Observable<any> {
        return from(<Promise<any>>promise);
    }
}
