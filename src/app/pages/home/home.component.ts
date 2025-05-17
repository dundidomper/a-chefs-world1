import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatListModule

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
  
  
})


export class HomeComponent {
  recipes = [
    { title: 'Marhapörkölt', description: 'A magyar konyha klasszikusa.', image: 'assets/porkolt.jpg' },
    { title: 'Csirkepaprikás', description: 'Tejfölös, szaftos finomság.', image: 'assets/csirkepaprikas.jpg' }
  ];
  
  reviews = [
    { text: 'Mindig jókat olvasok!', author: 'Kati'},
    { text: 'Nagyon szeretem!', author: 'Béla'}
  ];

}