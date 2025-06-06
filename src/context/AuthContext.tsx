// Localização: src/context/AuthContext.tsx
'use client'; // Necessário, pois usamos hooks do React (useState, useEffect, etc.)

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Importa o tipo 'User' para tipagem e 'onAuthStateChanged' para observar o login.
import { onAuthStateChanged, User } from 'firebase/auth';
// Importa a instância de autenticação que configuramos no firebaseConfig.
import { auth } from '@/lib/firebaseConfig';

// Define como serão os dados que nosso contexto irá fornecer.
interface AuthContextType {
  user: User | null;  // O objeto do usuário do Firebase ou null se não estiver logado.
  isLoading: boolean; // Um estado para sabermos se a verificação inicial já terminou.
}

// Cria o Contexto. É como criar um "canal" de dados para o app.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente "Provedor". Ele é quem vai fornecer os dados para o "canal".
// Ele deve "abraçar" seu aplicativo para que todas as páginas tenham acesso.
export function AuthProvider({ children }: { children: ReactNode }) {
  // Estado para armazenar o objeto do usuário.
  const [user, setUser] = useState<User | null>(null);
  // Estado para saber se ainda estamos verificando o login na primeira vez que o app carrega.
  const [isLoading, setIsLoading] = useState(true);

  // Este efeito roda apenas uma vez quando o app é montado.
  useEffect(() => {
    // onAuthStateChanged é a função do Firebase que fica "vigiando" o estado de login.
    // Ela nos retorna o usuário (se logado) ou null (se deslogado).
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // Atualiza nosso estado com a informação do Firebase.
      setUser(firebaseUser);
      // Marca que a verificação inicial de autenticação já terminou.
      setIsLoading(false);
    });

    // Esta é uma função de limpeza. Ela "desliga o vigia" se o componente for desmontado,
    // evitando vazamentos de memória.
    return () => unsubscribe();
  }, []); // O array vazio [] garante que o efeito rode somente uma vez.

  // O valor que será compartilhado com todo o app.
  const value = { user, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook customizado. É um atalho para facilitar o uso do contexto em outras páginas.
// Em vez de importar e usar o useContext em todo lugar, apenas usamos useAuth().
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
