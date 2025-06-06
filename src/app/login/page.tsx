// Localização: src/app/login/page.tsx
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Importa o componente de Link para navegação
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// 1. CORREÇÃO: O caminho correto para o seu arquivo de configuração do Firebase.
import { auth } from '@/lib/firebase/firebaseconfig';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  // Efeito que redireciona o usuário se ele já estiver logado
  useEffect(() => {
    if (!isAuthLoading && user) {
      console.log('[Login Page] Usuário já logado, redirecionando para /dashboard');
      router.push('/dashboard');
    }
  }, [user, isAuthLoading, router]);

  const handleEmailLogin = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log('[Login Page] Tentando login com email:', email);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('[Login Page] Login com email bem-sucedido.');
      // O redirecionamento acontece no useEffect acima, não precisa de código aqui.
    } catch (err: any) {
      console.error('[Login Page] Falha no login com email. Código:', err.code, 'Mensagem:', err.message, 'Erro completo:', err);
      // 2. APRIMORAMENTO: Tratamento de erros mais específico
      let errorMessage = "Ocorreu um erro inesperado. Tente novamente.";
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          errorMessage = "Email ou senha incorretos.";
          break;
        case 'auth/invalid-email':
          errorMessage = "O formato do email é inválido.";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Acesso temporariamente bloqueado devido a muitas tentativas. Tente novamente mais tarde.";
          break;
        case 'auth/network-request-failed':
          errorMessage = "Erro de rede. Verifique sua conexão com a internet.";
          break;
        default:
          errorMessage = `Erro ao fazer login (${err.code || 'desconhecido'}). Tente novamente.`;
      }
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    console.log('[Login Page] Tentando login com Google...');
    try {
      await signInWithPopup(auth, provider);
      console.log('[Login Page] Login com Google bem-sucedido.');
      // O redirecionamento também será feito pelo useEffect
    } catch (err: any) {
      console.error('[Login Page] Falha no login com Google. Código:', err.code, 'Mensagem:', err.message, 'Erro completo:', err);
      let errorMessage = "Falha no login com o Google. Tente novamente.";
      if (err.code) {
        switch (err.code) {
          case 'auth/popup-closed-by-user':
            errorMessage = "A janela de login com o Google foi fechada. Tente novamente.";
            break;
          case 'auth/account-exists-with-different-credential':
            errorMessage = "Já existe uma conta com este e-mail usando outro método de login.";
            break;
          case 'auth/cancelled-popup-request':
            errorMessage = "A solicitação de login com Google foi cancelada.";
            break;
          case 'auth/popup-blocked':
            errorMessage = "O pop-up de login do Google foi bloqueado pelo navegador. Verifique as configurações do seu navegador.";
            break;
          case 'auth/network-request-failed':
            errorMessage = "Erro de rede ao tentar logar com o Google. Verifique sua conexão.";
            break;
          default:
            errorMessage = `Erro ao logar com Google (${err.code || 'desconhecido'}). Tente novamente.`;
        }
      }
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  // Enquanto o Firebase verifica o estado inicial de autenticação, mostramos um loader.
  if (isAuthLoading || user) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <div className="text-center p-8">
          <svg className="mx-auto h-12 w-12 animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg font-medium text-slate-700">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <img src="https://firebasestorage.googleapis.com/v0/b/appestacoes.firebasestorage.app/o/Gemini_Generated_Image_i9d3fi9d3fi9d3fi.png?alt=media&token=3d5efc89-91be-4954-8a27-c20fd56bcc71" alt="Revalida Fácil Logo" className="mx-auto h-20 w-20 mb-4 rounded-full shadow-md" data-ai-hint="brain logo"/>
          <h2 className="text-3xl font-bold text-primary">Revalida Fácil</h2>
          <p className="text-slate-600">Acesse sua conta para continuar</p>
        </div>
        
        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-3 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="seuemail@exemplo.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-3 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="********"
            />
          </div>
          {error && <p className="text-center text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
          <button type="submit" disabled={isLoading} className="w-full flex justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </>
            ) : 'Entrar'}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 flex-shrink text-sm text-gray-500">OU</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button onClick={handleGoogleLogin} disabled={isLoading} className="w-full flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed">
          <svg className="mr-2 h-5 w-5" viewBox="0 0 48 48"><path d="M48 24.5C48 22.9 47.9 21.4 47.6 20H24.5V28.5H38.2C37.5 31.6 35.8 34.2 33.1 36.1V42H41.8C45.9 38.1 48 31.9 48 24.5Z" fill="#4285F4"></path><path d="M24.5 48C31.5 48 37.4 45.6 41.8 42L33.1 36.1C30.7 37.7 27.8 38.6 24.5 38.6C18.1 38.6 12.7 34.3 10.8 28.5H2.1V34.4C6.5 42.8 14.8 48 24.5 48Z" fill="#34A853"></path><path d="M10.8 28.5C10.3 27.1 10 25.6 10 24C10 22.4 10.3 20.9 10.8 19.5V13.6H2.1C0.8 16.3 0 19.9 0 24C0 28.1 0.8 31.7 2.1 34.4L10.8 28.5Z" fill="#FBBC05"></path><path d="M24.5 9.4C28.2 9.4 31.8 10.8 34.4 13.2L42 5.6C37.4 1.2 31.5 0 24.5 0C14.8 0 6.5 5.2 2.1 13.6L10.8 19.5C12.7 13.7 18.1 9.4 24.5 9.4Z" fill="#EA4335"></path></svg>
          Entrar com o Google
        </button>

        <div className="mt-8 text-center text-sm">
          <p className="text-gray-600">
            Não tem uma conta?{' '}
            <Link href="/register" className="font-semibold text-primary hover:text-primary/80">
              Crie uma agora
            </Link>
          </p>
           <p className="mt-2 text-gray-600">
            <Link href="/" className="font-semibold text-slate-500 hover:text-slate-700">
              Voltar para a Página Inicial
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
