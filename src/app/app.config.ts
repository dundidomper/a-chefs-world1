import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "sef-vlog-398db", appId: "1:498604610685:web:465f7a7388fa8b277e8d14", storageBucket: "sef-vlog-398db.firebasestorage.app", apiKey: "AIzaSyC-rJuOQwMeAJEEQn_MZdIUGXkjF9vxb3A", authDomain: "sef-vlog-398db.firebaseapp.com", messagingSenderId: "498604610685", measurementId: "G-CGHNS46H5F" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
