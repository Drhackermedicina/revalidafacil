// Local: src/lib/firebaseConfig.ts (ou lib/firebaseConfig.ts)

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Suas credenciais do Firebase (do seu arquivo original)
const firebaseConfig = {
  apiKey: "AIzaSyDIVtTrioEtvHXGCcvNATsxbYxZrUZhqng", // <<< SUA API KEY REAL AQUI
  authDomain: "appestacoes.firebaseapp.com",
  projectId: "appestacoes",
  storageBucket: "appestacoes.firebasestorage.app",
  messagingSenderId: "160232798179",
  appId: "1:160232798179:web:f9ce1140035c5f4ea312d6",
  measurementId: "G-1MLQKNX03Y" // Este é opcional
};

// Inicializa o Firebase, garantindo que seja feito apenas uma vez
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // Pega a instância já inicializada
}

// Inicializa os serviços de Autenticação e Firestore e os exporta
export const auth = getAuth(app);
export const db = getFirestore(app);

// Opcionalmente, você pode exportar a instância 'app' se precisar dela
export default app;