// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration from the user
const firebaseConfig = {
  apiKey: "AIzaSyBv4duy17y72b22VtBxisXztEylSFuK1jU",
  authDomain: "gilfinnasnew.firebaseapp.com",
  projectId: "gilfinnasnew",
  storageBucket: "gilfinnasnew.appspot.com",
  messagingSenderId: "53159078238",
  appId: "1:53159078238:web:bcb62c2c14fb5faa2907cf",
  measurementId: "G-JDEW3WD82Q"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export the initialized services directly
export const auth = getAuth(app);
export const db = getFirestore(app);
