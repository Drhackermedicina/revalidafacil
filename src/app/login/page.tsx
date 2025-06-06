// Localização: src/app/login/page.tsx
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '@/lib/firebase/firebaseconfig'; // Importa nossa configuração de auth
import { useAuth } from '@/context/AuthContext'; // Importa nosso hook de auth

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth(); // Pega o usuário do nosso contexto

  // Efeito que redireciona o usuário se ele já estiver logado
  useEffect(() => {
    // Se a verificação de auth terminou e o usuário já existe, manda ele para o dashboard
    if (!isAuthLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isAuthLoading, router]);

  const handleEmailLogin = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Usa a função do Firebase para fazer o login com email e senha
      await signInWithEmailAndPassword(auth, email, password);
      // O redirecionamento será feito pelo useEffect acima
    } catch (err: any) {
      setError("Falha no login. Verifique seu email e senha.");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      // Usa a função do Firebase para fazer login com a popup do Google
      await signInWithPopup(auth, provider);
      // O redirecionamento também será feito pelo useEffect
    } catch (err: any) {
      setError("Falha no login com o Google. Tente novamente.");
      setIsLoading(false);
    }
  };

  // Enquanto o Firebase verifica o estado inicial de autenticação, mostramos um loader.
  // Isso evita que a tela de login pisque rapidamente para um usuário que já está logado.
  if (isAuthLoading || user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div>Carregando...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">Acessar Plataforma</h2>
        
        {/* Formulário de Login com Email */}
        <form onSubmit={handleEmailLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="seuemail@exemplo.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="********"
            />
          </div>
          {error && <p className="mb-4 text-center text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={isLoading} className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50">
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Divisor "OU" */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 flex-shrink text-sm text-gray-500">OU</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Botão de Login com Google */}
        <button onClick={handleGoogleLogin} disabled={isLoading} className="w-full flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50">
          {/* Adicionei um SVG para o ícone do Google */}
          <svg className="mr-2 h-5 w-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M48 24.5C48 22.9 47.9 21.4 47.6 20H24.5V28.5H38.2C37.5 31.6 35.8 34.2 33.1 36.1V42H41.8C45.9 38.1 48 31.9 48 24.5Z" fill="#4285F4"></path><path d="M24.5 48C31.5 48 37.4 45.6 41.8 42L33.1 36.1C30.7 37.7 27.8 38.6 24.5 38.6C18.1 38.6 12.7 34.3 10.8 28.5H2.1V34.4C6.5 42.8 14.8 48 24.5 48Z" fill="#34A853"></path><path d="M10.8 28.5C10.3 27.1 10 25.6 10 24C10 22.4 10.3 20.9 10.8 19.5V13.6H2.1C0.8 16.3 0 19.9 0 24C0 28.1 0.8 31.7 2.1 34.4L10.8 28.5Z" fill="#FBBC05"></path><path d="M24.5 9.4C28.2 9.4 31.8 10.8 34.4 13.2L42 5.6C37.4 1.2 31.5 0 24.5 0C14.8 0 6.5 5.2 2.1 13.6L10.8 19.5C12.7 13.7 18.1 9.4 24.5 9.4Z" fill="#EA4335"></path></svg>
          Entrar com o Google
        </button>
      </div>
    </div>
  );
}
