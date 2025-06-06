// Localização: src/lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 1. Define a estrutura do objeto de configuração, lendo as chaves do .env.local
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 2. Inicializa o app de forma segura usando o objeto 'firebaseConfig'
//    A sintaxe !getApps().length ? ... evita erros no ambiente de desenvolvimento
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 3. Exporta os serviços de Autenticação (auth) e Banco de Dados (db)
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };