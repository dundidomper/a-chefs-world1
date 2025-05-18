import { Component, inject, signal } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HoverHighlightDirective } from '../../directives/hover-highlight.directive';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    HoverHighlightDirective,
    NgIf,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  auth = inject(Auth);
  router = inject(Router);
  isLoggedIn = signal(false);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn.set(!!user);
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/']);  // Visszairányítás főoldalra
    });
  }

}
