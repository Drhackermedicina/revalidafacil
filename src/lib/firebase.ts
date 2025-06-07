// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, the initialization parameters are optional
const firebaseConfig = {
  apiKey: "AIzaSyADjhlT58gttZ3GzJH5odgbExlxBg6XikI",
  authDomain: "revaida-fcil-app.firebaseapp.com",
  projectId: "revaida-fcil-app",
  storageBucket: "revaida-fcil-app.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:185404830586:web:c0f8ee056cb153de445cc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };