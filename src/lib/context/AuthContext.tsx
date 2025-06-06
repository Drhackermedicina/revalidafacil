// Localização: src/context/AuthContext.tsx

'use client'; // Este componente usa hooks do React, então é um Componente de Cliente

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig'; // Importa a configuração do Firebase que já criamos

// Define o tipo de dados que nosso contexto vai fornecer
type AuthContextType = {
user: User | null;      // O objeto do usuário do Firebase, ou null se não estiver logado
isLoading: boolean;     // Para sabermos se a autenticação inicial já foi verificada
};

// Cria o Contexto com um valor inicial
const AuthContext = createContext<AuthContextType>({
user: null,
isLoading: true,
});

// Cria o componente "Provedor". Ele vai "abraçar" todo o nosso app.
export function AuthProvider({ children }: { children: ReactNode }) {
const [user, setUser] = useState\<User | null\>(null);
const [isLoading, setIsLoading] = useState(true); // Começa como true

useEffect(() =\> {
// onAuthStateChanged é o "vigia" do Firebase. Ele roda quando o app carrega
// e sempre que o usuário faz login ou logout.
const unsubscribe = onAuthStateChanged(auth, (firebaseUser) =\> {
setUser(firebaseUser); // Define o usuário (pode ser null)
setIsLoading(false); // Marca que a verificação inicial terminou
console.log('[AuthContext] Estado de autenticação verificado. Usuário:', firebaseUser?.email || 'Nenhum');
});