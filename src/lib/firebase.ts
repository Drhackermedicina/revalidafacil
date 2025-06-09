
// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // Importar getStorage

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, the initialization parameters are optional
const firebaseConfig = {
  // IMPORTANT: Replace "YOUR_API_KEY_HERE_FROM_FIREBASE_CONSOLE" with your actual Firebase project API key.
  // You can find this in your Firebase project settings:
  // Project Settings > General > Web API Key
  apiKey: "YOUR_API_KEY_HERE_FROM_FIREBASE_CONSOLE", // <<< COLOQUE SUA API KEY AQUI
  authDomain: "revaida-fcil-app.firebaseapp.com",
  projectId: "revaida-fcil-app",
  storageBucket: "revaida-fcil-app.firebasestorage.app",
  // Se você for usar o Firebase Cloud Messaging (FCM) no futuro,
  // substitua "YOUR_MESSAGING_SENDER_ID" pelo valor real do seu projeto.
  // Isso NÃO afeta a autenticação ou o Firestore.
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Pode manter ou substituir se for usar FCM
  appId: "1:185404830586:web:c0f8ee056cb153de445cc3"
};

// Initialize Firebase
// Garante que o app seja inicializado apenas uma vez (importante no Next.js com HMR)
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp); // Inicializar Firebase Storage

export { firebaseApp, db, auth, storage }; // Exportar storage
