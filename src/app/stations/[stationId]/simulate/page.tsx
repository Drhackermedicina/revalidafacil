
// Localização: src/app/stations/[stationId]/simulate/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import socket from '@/lib/socket';
import AppLayout from '@/components/layout/app-layout';
import { Loader2, AlertTriangle, Wifi, WifiOff, PlayCircle, PauseCircle, Eye, Users, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ChecklistData, ChecklistItem, PrintedMaterial } from '@/lib/station-data'; 

interface StationFullData extends ChecklistData {
  id: string; 
}

const INITIAL_TIMER_SECONDS = 10 * 60; // 10 minutos

export default function SimulationPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const stationId = params.stationId as string;
  const role = searchParams.get('role') || 'candidate'; 
  const userId = user?.uid;

  const [stationData, setStationData] = useState<StationFullData | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('Verificando autenticação...');
  const [isConnectedToSocket, setIsConnectedToSocket] = useState(socket.connected);

  const [timer, setTimer] = useState(INITIAL_TIMER_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
      return;
    }

    if (user && stationId) {
      const fetchStationData = async () => {
        setStatusMessage('Carregando dados da estação...');
        try {
          const stationRef = doc(db, 'revalidafacio', stationId); // <- NOME DA COLEÇÃO ATUALIZADO
          const docSnap = await getDoc(stationRef);

          if (docSnap.exists()) {
            setStationData({ id: docSnap.id, ...docSnap.data() } as StationFullData);
            setError(null);
          } else {
            setError(`Estação com ID "${stationId}" não encontrada.`);
            setStationData(null);
          }
        } catch (err) {
          setError('Falha ao buscar dados da estação.');
          console.error(err);
          setStationData(null);
        }
      };
      fetchStationData();
    }
  }, [isAuthLoading, user, stationId, router]);

  useEffect(() => {
    if (user && stationData && !sessionId && !error) { 
      const createSessionAndConnect = async () => {
        setStatusMessage('Criando sessão de simulação...');
        try {
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
          if (!backendUrl) {
            setError('Erro: URL do backend não configurada.');
            console.error('NEXT_PUBLIC_BACKEND_URL não está definida no .env.local');
            return;
          }

          const response = await fetch(`${backendUrl}/api/create-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              stationId: stationData.id,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha ao criar sessão no backend.');
          }

          const session = await response.json();
          setSessionId(session.sessionId);

          socket.auth = {
            sessionId: session.sessionId,
            userId,
            role,
            stationId: stationData.id,
            nickname: user.displayName || 'Usuário Anônimo'
          };
          socket.connect();

        } catch (err) {
          setError((err as Error).message || 'Falha ao criar a sessão de simulação.');
          console.error(err);
        }
      };
      createSessionAndConnect();
    }
  }, [user, stationData, sessionId, userId, role, error]);

  useEffect(() => {
    function onConnect() {
      setStatusMessage(`Conectado à simulação! Sessão: ${socket.auth?.sessionId}`);
      setIsConnectedToSocket(true);
      socket.emit('joinSession', { sessionId: socket.auth?.sessionId, userId, role });
    }
    function onDisconnect(reason: string) {
      setStatusMessage(`Desconectado da simulação: ${reason}`);
      setIsConnectedToSocket(false);
    }
    function onSessionError(data: { message: string }) {
      setError(`Erro na sessão: ${data.message}`);
    }
    function onTimerUpdate(data: { remainingSeconds: number, running: boolean }) {
      setTimer(data.remainingSeconds);
      setIsTimerRunning(data.running);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('sessionError', onSessionError);
    socket.on('timerUpdate', onTimerUpdate); 

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('sessionError', onSessionError);
      socket.off('timerUpdate', onTimerUpdate);
    };
  }, [userId, role]); 

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleToggleTimer = () => {
    setIsTimerRunning(!isTimerRunning); 
  };

  if (isAuthLoading) {
    return (
      <AppLayout>
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">Verificando autenticação...</p>
        </div>
      </AppLayout>
    );
  }
  
  if (error) {
    return (
      <AppLayout>
        <div className="flex flex-col h-64 items-center justify-center text-destructive p-4">
          <AlertTriangle className="h-12 w-12 mb-4" />
          <h2 className="text-xl font-bold">Ocorreu um Erro</h2>
          <p className="text-center">{error}</p>
          <Button onClick={() => router.back()} className="mt-4">Voltar</Button>
        </div>
      </AppLayout>
    );
  }

  if (!stationData || !sessionId) {
    return (
      <AppLayout>
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">{statusMessage}</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto max-w-full px-2 sm:px-4 lg:px-6 py-6">
        <Card className="mb-6 shadow-md">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <Badge variant="secondary" className="mb-1">{stationData.area}</Badge>
                <CardTitle className="text-xl md:text-2xl font-bold text-primary">{stationData.title}</CardTitle>
                <CardDescription>Papel: <span className="font-semibold capitalize">{role}</span> | Sessão: <span className="font-semibold">{sessionId.substring(0,8)}...</span></CardDescription>
              </div>
              <div className={`flex items-center space-x-2 p-2 rounded-md text-xs ${isConnectedToSocket ? 'bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-300'}`}>
                {isConnectedToSocket ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
                <span>{isConnectedToSocket ? 'Conectado' : 'Desconectado'}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold text-foreground mb-1">Cenário: {stationData.scenario.title}</h3>
            <p className="text-sm text-muted-foreground prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: stationData.scenario.description }}/>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {role === 'candidate' ? <ClipboardList className="mr-2 h-5 w-5 text-primary"/> : <Users className="mr-2 h-5 w-5 text-primary"/>}
                  {role === 'candidate' ? 'Checklist da Estação' : 'Instruções do Ator'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {role === 'candidate' && stationData.checklistItems && (
                  <ul className="space-y-2 text-sm">
                    {stationData.checklistItems.map((item: ChecklistItem) => (
                      <li key={item.id} className="p-2 border rounded-md">
                        <span dangerouslySetInnerHTML={{ __html: item.description }} />
                      </li>
                    ))}
                  </ul>
                )}
                {role === 'actor' && (
                   <div className="text-sm prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: stationData.actorInstructions.content }} />
                )}
                {!stationData.checklistItems && role === 'candidate' && <p className="text-muted-foreground">Checklist não disponível.</p>}
              </CardContent>
            </Card>

            {role === 'candidate' && stationData.printedMaterials && stationData.printedMaterials.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Eye className="mr-2 h-5 w-5 text-primary"/>Materiais Impressos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Materiais impressos aparecerão aqui quando liberados pelo ator.</p>
                  {stationData.printedMaterials.map((material: PrintedMaterial) => (
                     <div key={material.id} className="p-2 border rounded-md mt-2">
                        <p className="font-semibold">{material.title} {material.isLocked ? "(Bloqueado)" : "(Liberado)"}</p>
                        {!material.isLocked && <div className="text-xs prose prose-xs" dangerouslySetInnerHTML={{__html: material.content}}/>}
                     </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6 lg:sticky lg:top-[calc(theme(spacing.16)+theme(spacing.4))] lg:h-fit">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl font-bold text-primary">{formatTime(timer)}</CardTitle>
                <CardDescription className="text-center">Tempo da Estação</CardDescription>
              </CardHeader>
              <CardContent>
                {role === 'actor' && ( 
                  <Button onClick={handleToggleTimer} className="w-full" variant={isTimerRunning ? "destructive" : "default"}>
                    {isTimerRunning ? <PauseCircle className="mr-2 h-4 w-4"/> : <PlayCircle className="mr-2 h-4 w-4"/>}
                    {isTimerRunning ? 'Pausar Timer' : 'Iniciar Timer'}
                  </Button>
                )}
                 {role === 'candidate' && (
                   <p className="text-center text-sm text-muted-foreground">{isTimerRunning ? "Tempo correndo..." : "Timer pausado."}</p>
                 )}
              </CardContent>
            </Card>

            {role === 'actor' && stationData.printedMaterials && stationData.printedMaterials.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Eye className="mr-2 h-5 w-5 text-primary"/>Controle de Materiais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {stationData.printedMaterials.map((material: PrintedMaterial) => (
                    <Button key={material.id} variant="outline" className="w-full justify-between">
                      {material.title}
                      <Badge variant={material.isLocked ? "destructive" : "default"}>{material.isLocked ? "Bloqueado" : "Liberado"}</Badge>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}
             <Card>
                <CardHeader><CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5"/>Participantes</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Usuário: {user?.displayName || user?.email}</p>
                    <p className="text-sm text-muted-foreground mt-1">Outro participante: Aguardando...</p>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
