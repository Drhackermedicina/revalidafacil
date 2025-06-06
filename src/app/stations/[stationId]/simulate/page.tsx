// Localização: src/app/station/[stationId]/simulate/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';

// Nossas importações customizadas
import { auth, db } from '../../lib/firebaseConfig';
import { useAuth } from '@/context/AuthContext';
import { socket } from '@/lib/socket';
import AppLayout from '@/components/layout/app-layout';

// Ícones para feedback visual
import { Loader2, AlertTriangle, Wifi, WifiOff } from 'lucide-react';

// Define a "forma" dos dados de uma estação
interface Station {
  id: string;
  title: string;
  area: string;
  caseSummary: string;
  checklistDocId?: string; // ID do checklist associado
}

export default function SimulationPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const params = useParams(); // Pega o [stationId] da URL
  const searchParams = useSearchParams(); // Pega o ?role=...

  // Extrai os dados da URL
  const stationId = params.stationId as string;
  const role = searchParams.get('role') || 'candidate';
  const userId = user?.uid; // Pega o UID do usuário logado

  // Estados para gerenciar o fluxo da página
  const [stationData, setStationData] = useState<Station | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('Verificando autenticação...');
  const [isConnected, setIsConnected] = useState(socket.connected);

  // --- EFEITO 1: Proteção da Rota e Busca dos Dados da Estação ---
  useEffect(() => {
    // Se não estiver carregando a auth e não houver usuário, volta para o login
    if (!isAuthLoading && !user) {
      router.push('/login');
      return;
    }

    // Se temos um usuário e um ID de estação, busca os dados da estação
    if (user && stationId) {
      const fetchStationData = async () => {
        setStatusMessage('Carregando dados da estação...');
        try {
          const stationRef = doc(db, 'estacoes_clinicas', stationId); // << Lembre-se que sua coleção é "estacoes_clinicas"
          const docSnap = await getDoc(stationRef);

          if (docSnap.exists()) {
            setStationData({ id: docSnap.id, ...docSnap.data() } as Station);
          } else {
            setError(`Estação com ID "${stationId}" não encontrada.`);
          }
        } catch (err) {
          setError('Falha ao buscar dados da estação.');
          console.error(err);
        }
      };
      fetchStationData();
    }
  }, [isAuthLoading, user, stationId, router]);

  // --- EFEITO 2: Criação da Sessão e Conexão do Socket ---
  useEffect(() => {
    // Roda somente se tivermos usuário, dados da estação e ainda não tivermos um sessionId
    if (user && stationData && !sessionId) {
      const createSessionAndConnect = async () => {
        setStatusMessage('Criando sessão de simulação...');
        try {
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
          
          const response = await fetch(`${backendUrl}/api/create-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              stationId: stationData.id,
              checklistId: stationData.checklistDocId || 'default-checklist', // Usa o ID do checklist da estação
            }),
          });

          if (!response.ok) throw new Error('Falha ao criar sessão no backend.');

          const session = await response.json();
          setSessionId(session.sessionId);

          // Configura os dados para a conexão do socket
          socket.auth = {
            sessionId: session.sessionId,
            userId,
            role,
            stationId: stationData.id,
          };

          // Conecta o socket
          socket.connect();

        } catch (err) {
          setError('Falha ao criar a sessão de simulação.');
          console.error(err);
        }
      };
      createSessionAndConnect();
    }
  }, [user, stationData, sessionId, userId, role]); // Dependências deste efeito

  // --- EFEITO 3: Configuração dos Ouvintes (Listeners) do Socket ---
  useEffect(() => {
    function onConnect() {
      setStatusMessage('Conectado à simulação!');
      setIsConnected(true);
    }
    function onDisconnect() {
      setStatusMessage('Desconectado da simulação.');
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // Função de limpeza para remover os listeners quando o componente for desmontado
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []); // Roda apenas uma vez para configurar os listeners

  // --- Renderização ---
  if (error) {
    return (
      <AppLayout>
        <div className="flex flex-col h-64 items-center justify-center text-red-600">
          <AlertTriangle className="h-12 w-12 mb-4" />
          <h2 className="text-xl font-bold">Ocorreu um Erro</h2>
          <p>{error}</p>
        </div>
      </AppLayout>
    );
  }
  
  // Tela de Carregamento Genérica
  if (!sessionId || !stationData) {
    return (
      <AppLayout>
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="ml-4 text-gray-600">{statusMessage}</p>
        </div>
      </AppLayout>
    );
  }

  // A tela principal da simulação quando tudo está conectado
  return (
    <AppLayout>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8 p-4 bg-white shadow rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{stationData.title}</h1>
              <p className="text-gray-500">{stationData.area}</p>
            </div>
            <div className={`flex items-center space-x-2 p-2 rounded-full ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isConnected ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
              <span className="text-sm font-semibold">{isConnected ? 'Conectado' : 'Desconectado'}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800">Resumo do Caso:</h3>
            <p className="text-gray-600 mt-1">{stationData.caseSummary}</p>
          </div>
        </header>

        {/* ÁREA PRINCIPAL DA SIMULAÇÃO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna do Checklist (para o Candidato/Avaliador) */}
          <div className="lg:col-span-2 bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">Checklist da Estação</h2>
            <p>(Aqui virá a lista de tarefas do checklist interativo)</p>
          </div>

          {/* Coluna de Ações (para o Ator) e Timer */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">Painel de Controle</h2>
            <p>(Aqui virá o timer e os botões para o ator liberar dados)</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}