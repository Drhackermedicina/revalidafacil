import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Nossas importações customizadas

import { auth, db } from '../../lib/firebaseConfig';

export default function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Adiciona o nome do usuário ao perfil de autenticação
      await updateProfile(user, { displayName: nome });

      // 3. Cria um documento para este usuário no Firestore
      //    O ID do documento será o mesmo ID do usuário na autenticação (user.uid)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: nome,
        email: user.email,
        createdAt: serverTimestamp(), // Data de criação do registro
        role: "subscriber", // Define um papel padrão para o novo usuário
        subscriptionStatus: "pending", // Status inicial da assinatura
        // Adicione aqui outros campos que você mencionou (país, cpf, etc.)
        // ou deixe para o usuário preencher depois em uma página de perfil.
      });

      console.log('Usuário registrado com sucesso e perfil criado no Firestore!');
      
      // 4. Redireciona o usuário para o dashboard após o registro
      router.push('/dashboard');

    } catch (err: any) {
      console.error("Erro no registro:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Este email já está em uso.');
      } else {
        setError('Ocorreu um erro ao criar a conta. Tente novamente.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">Criar Nova Conta</h2>
        
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-gray-900"
              placeholder="Seu Nome Completo"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-gray-900"
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
              minLength={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-gray-900"
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          {error && <p className="mb-4 text-center text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={isLoading} className="w-full flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50">
            {isLoading ? 'Criando conta...' : 'Registrar'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Já tem uma conta?{' '}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
            Faça o login
          </Link>
        </div>
      </div>
    </div>
  );
}
