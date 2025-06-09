
// Localização: src/app/register/page.tsx
"use client";

import React, { useState } from 'react';
import { Book, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Importar auth diretamente

// Componente da Página de Cadastro
export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setIsLoading(true);
    setError(''); 

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      router.push('/dashboard');

    } catch (firebaseError: any) {
      console.error("Erro no cadastro:", firebaseError.code);
      if (firebaseError.code === 'auth/email-already-in-use') {
        setError('Este endereço de e-mail já está em uso.');
      } else {
        setError('Ocorreu um erro ao criar a conta. Tente novamente.');
        console.error("Detalhes do erro Firebase:", firebaseError); 
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setError('');
    setIsLoading(true);

    try {
      await signInWithPopup(auth, provider); // Usar o 'auth' importado
      router.push('/dashboard');
    } catch (googleError) {
      console.error("Erro com Google:", googleError);
      setError("Falha ao se conectar com o Google. Tente novamente.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 p-4 font-sans text-gray-800">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <Book className="h-12 w-12 text-blue-600 mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-blue-800">Crie sua Conta Grátis</h2>
          <p className="text-gray-500 mt-2">Junte-se à comunidade Revalida Fácil!</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <div className="relative">
              <User className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          </div>
          <div>
            <label htmlFor="email-register" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="email" id="email-register" value={email} onChange={(e) => setEmail(e.target.value)} required className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          </div>
          <div>
            <label htmlFor="password-register" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <div className="relative">
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="password" id="password-register" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
            <div className="relative">
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
          >
            {isLoading ? 'Criando conta...' : 'Cadastrar'}
          </button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Ou entre com</span></div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3">
            <button onClick={handleGoogleSignIn} disabled={isLoading} className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-60">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" alt="Google" className="h-5 w-5 mr-3" data-ai-hint="logo google" />
              Entrar com Google
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
              Faça Login!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
