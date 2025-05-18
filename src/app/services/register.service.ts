import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { UserCredential } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private auth: Auth) {}

  register(email: string, password: string, displayName: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, { displayName }).then(() => userCredential);
      });
  }
}
