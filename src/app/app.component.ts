import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from "./shared/navbar/navbar.component";


@Component({
    selector: 'app-root',
  imports: [CommonModule, HomeComponent, NavbarComponent, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'a-chefs-world';
}
