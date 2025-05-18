import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-password-dialog',
  template: `
    <h2 mat-dialog-title>Jelszó megerősítés</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label>Jelszó</mat-label>
        <input matInput [type]="'password'" [(ngModel)]="password" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Mégse</button>
      <button mat-button color="primary" (click)="confirm()" [disabled]="!password">Tovább</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatDialogActions,
    MatButtonModule,
    FormsModule

  ]
})
export class PasswordDialogComponent {
  password: string = '';
  constructor(public dialogRef: MatDialogRef<PasswordDialogComponent>) {}

  confirm() {
    this.dialogRef.close(this.password);
  }
}
