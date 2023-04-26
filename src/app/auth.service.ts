// auth.service.ts
import { Injectable } from '@angular/core';
import { AuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user$: Observable<any>;

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private http: HttpClient
  ) {
    this.user$ = afAuth.authState;
  }

  // Sign in with Google and call loginOrCreateUser
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  async AuthLogin(provider: AuthProvider) {
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      console.log('You have been successfully logged in!');
      this.user$.pipe(
        filter((user: any) => !!user),
        take(1)
      ).subscribe(async (user: any) => {
        const uid = user.uid;
        console.log("user.uid: " + uid);
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      console.log('You have been successfully logged out!');
    });
  }

}