import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnwjkzTpYRfCtDlOEZFW5fV8a9rVxP5ro",
  authDomain: "chatapp-77c58.firebaseapp.com",
  projectId: "chatapp-77c58",
  storageBucket: "chatapp-77c58.appspot.com",
  messagingSenderId: "208590779573",
  appId: "1:208590779573:web:784de0731c8241e4827afc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);