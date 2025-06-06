// Local: src/lib/firebaseConfig.ts (ou lib/firebaseConfig.ts)

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Suas credenciais do Firebase (do seu arquivo original)
// IMPORTANTE: As credenciais abaixo (apiKey, authDomain, etc.)
// DEVEM ser as credenciais REAIS do seu projeto Firebase para que a autenticação funcione.
// Certifique-se de que este projeto Firebase está ativo e configurado corretamente,
// incluindo os métodos de login que você deseja usar (Email/Senha, Google).
const firebaseConfig = {
  apiKey: "AIzaSyADjhlT58gttZ3GzJH5odgbExlxBg6XikI", // <<< SUA API KEY REAL AQUI
  authDomain: "appestacoes.firebaseapp.com",
  projectId: "revaida-fcil-app",
  storageBucket: "appestacoes.firebasestorage.app",
  messagingSenderId: "160232798179",
  appId: " ",
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
