import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {UserModel} from "../../models/user.model";


@Component({
  selector: 'app-register',
  standalone: true,

  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private firestore: Firestore,
    private router: Router
  ) {}

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    nickname: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  async onSubmit() {
    if (this.registerForm.invalid || !this.passwordsMatch()) {
      alert('Hibás adat!');
      return;
    }

    const { email, password, nickname } = this.registerForm.value;

    try {
      const result = await this.authService.register(email!, password!);
      const uid = result.user.uid;

      const newUser: UserModel = {
        uid,
        email: email!,
        nickname: nickname!
      };

      // Mentés Firestore-ba
      const userRef = doc(this.firestore, `users/${uid}`);
      await setDoc(userRef, newUser);

      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
      alert('Hiba a regisztráció során!');
    }
  }

  passwordsMatch(): boolean {
    return this.registerForm.value.password === this.registerForm.value.confirmPassword;
  }
}
//register() {
//  this.authService.register(this.email, this.password)
//    .then(() => alert('Sikeres regisztráció!'))
