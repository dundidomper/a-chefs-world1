import { Component, OnInit } from '@angular/core';
import {
  Auth,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  updateEmail
} from '@angular/fire/auth';
import {deleteDoc, doc, Firestore, getDoc, updateDoc} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { PasswordDialogComponent } from '../../dialogs/password-dialog/password-dialog.component';
import {EditProfileDialogComponent} from "../../dialogs/edit-profile-dialog/edit-profile-dialog.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButtonModule,
  ]
})
export class ProfileComponent implements OnInit {
  nickname: string | null = null;
  email: string | null = null;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private dialog: MatDialog,
    private router: Router
  ) {}

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (user) {
      const userRef = doc(this.firestore, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data() as { email: string, nickname: string };
        this.email = userData.email;
        this.nickname = userData.nickname;
      }
    }
  }

  async onEditProfile() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      data: { nickname: this.nickname, email: this.email }
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (!result) return;

    const user = this.auth.currentUser;
    if (!user) return;

    try {
      // Email frissítés
      if (user.email !== result.email) {
        await updateEmail(user, result.email);
      }

      // Jelszó frissítés (ha van megadva új jelszó)
      if (result.newPassword && result.newPassword.length >= 6) {
        await updatePassword(user, result.newPassword);
      }

      // Firestore frissítés
      const userRef = doc(this.firestore, 'users', user.uid);
      await updateDoc(userRef, {
        nickname: result.nickname,
        email: result.email
      });

      this.email = result.email;
      this.nickname = result.nickname;

      alert('Sikeresen módosítottad az adataidat!');
    } catch (error) {
      console.error('Hiba módosítás közben:', error);
      alert('Nem sikerült módosítani. Lehet, hogy újra be kell jelentkezned.');
    }
  }

  async onDeleteProfile() {
    const confirmRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Profil törlése',
        message: 'Biztosan törölni szeretnéd a profilodat? Ez a művelet nem visszavonható.'
      }
    });

    const confirmed = await confirmRef.afterClosed().toPromise();
    if (!confirmed) return;

    const user = this.auth.currentUser;
    if (!user || !user.email) return;

    const passwordRef = this.dialog.open(PasswordDialogComponent, {
      data: {
        email: user.email
      }
    });

    const password = await passwordRef.afterClosed().toPromise();
    if (!password) return;

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteDoc(doc(this.firestore, 'users', user.uid));
      await deleteUser(user);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Hiba a törlés során:', error);
      alert('A törlés nem sikerült. Lehet, hogy hibás jelszót adtál meg vagy lejárt a bejelentkezés.');
    }
  }
}
