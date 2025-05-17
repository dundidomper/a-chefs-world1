// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-rJuOQwMeAJEEQn_MZdIUGXkjF9vxb3A",
  authDomain: "sef-vlog-398db.firebaseapp.com",
  projectId: "sef-vlog-398db",
  storageBucket: "sef-vlog-398db.firebasestorage.app",
  messagingSenderId: "498604610685",
  appId: "1:498604610685:web:465f7a7388fa8b277e8d14",
  measurementId: "G-CGHNS46H5F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
