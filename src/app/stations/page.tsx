
// Localização: src/app/stations/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext'; 
import AppLayout from '@/components/layout/app-layout'; 

import { BookText, ChevronRight, Loader2 } from 'lucide-react';

interface Station {
  id: string; 
  title: string;
  area: string;
  caseSummary: string;
}

export default function StationsListPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const [stations, setStations] = useState<Station[]>([]);
  const [isLoadingStations, setIsLoadingStations] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [isAuthLoading, user, router]);

  useEffect(() => {
    if (user) {
      const fetchStations = async () => {
        setIsLoadingStations(true);
        try {
          const stationsCollectionRef = collection(db, "revalidafacio"); // <- NOME DA COLEÇÃO ATUALIZADO
          const q = query(stationsCollectionRef, orderBy("title"));
          const querySnapshot = await getDocs(q);

          const stationsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title || 'Título não encontrado',
            area: doc.data().area || 'Área não definida',
            caseSummary: doc.data().caseSummary || 'Resumo indisponível', // Mantido, mas pode não existir no novo modelo
          }));

          setStations(stationsData);
          setError(null);
        } catch (err) {
          console.error("Erro ao buscar estações do Firestore:", err);
          setError("Não foi possível carregar as estações. Verifique o nome da coleção e as regras de segurança do Firestore.");
        } finally {
          setIsLoadingStations(false);
        }
      };

      fetchStations();
    }
  }, [user]);

  if (isAuthLoading || !user) {
    return (
      <AppLayout>
        <div className="flex h-64 w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="ml-4">Verificando autenticação...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Estações Práticas</h1>
            <p className="mt-2 text-lg text-gray-600">Selecione uma estação abaixo para iniciar a simulação.</p>
        </div>

        {isLoadingStations ? (
            <div className="flex h-64 w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="ml-4">Carregando estações...</p>
            </div>
        ) : error ? (
            <p className="rounded-md bg-red-100 p-4 text-center text-red-600">{error}</p>
        ) : stations.length > 0 ? (
            <div className="overflow-hidden bg-white shadow-md sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {stations.map((station) => (
                        <li key={station.id}>
                            <div 
                                onClick={() => router.push(`/stations/${station.id}/simulate`)} 
                                className="flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <div className="flex items-center min-w-0">
                                    <div className="flex-shrink-0">
                                        <BookText className="h-8 w-8 text-blue-500" />
                                    </div>
                                    <div className="ml-4 min-w-0 flex-1">
                                        <p className="truncate text-base font-semibold text-gray-900">{station.title}</p>
                                        <p className="truncate text-sm text-gray-500">{station.area}</p>
                                    </div>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        ) : (
            <p className="text-center text-gray-500 mt-10">Nenhuma estação encontrada na coleção "revalidafacio".</p>
        )}
      </div>
    </AppLayout>
  );
}
