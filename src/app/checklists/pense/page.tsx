
// src/app/checklists/pense/page.tsx
"use client";

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import AppLayout from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { type ChecklistData } from '@/lib/station-data'; // Keep type for data structure
import { ListChecks, Stethoscope, Baby, ShieldEllipsis, GitFork, Activity, Filter, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from '@/lib/firebase'; // Firebase db import
import { collection, getDocs, query, orderBy, where } from "firebase/firestore"; // Firestore functions

interface PageStationCategory {
  name: string;
  icon: React.ElementType;
  displayName: string;
  abbreviation: string;
  textColorClass: string;
  badgeBgClass: string;
  badgeTextColor: string;
}

const pageStationCategories: PageStationCategory[] = [
  { name: "Todas", icon: ListChecks, displayName: "Todas as Áreas", abbreviation: "ALL", textColorClass: "", badgeBgClass: "", badgeTextColor: "" },
  { name: "Clínica Médica", icon: Activity, displayName: "Clínica Médica", abbreviation: "CM", textColorClass: "text-sky-600 dark:text-sky-400", badgeBgClass: "bg-sky-500 hover:bg-sky-600", badgeTextColor: "text-white" },
  { name: "Cirurgia", icon: GitFork, displayName: "Cirurgia", abbreviation: "CR", textColorClass: "text-blue-700 dark:text-blue-500", badgeBgClass: "bg-purple-500 hover:bg-purple-600", badgeTextColor: "text-white" },
  { name: "G.O", displayName: "Ginecologia e Obstetrícia", icon: Stethoscope, abbreviation: "GO", textColorClass: "text-pink-600 dark:text-pink-400", badgeBgClass: "bg-pink-500 hover:bg-pink-600", badgeTextColor: "text-white" },
  { name: "Pediatria", icon: Baby, displayName: "Pediatria", abbreviation: "PE", textColorClass: "text-green-600 dark:text-green-400", badgeBgClass: "bg-green-500 hover:bg-green-600", badgeTextColor: "text-white" },
  { name: "Preventiva", icon: ShieldEllipsis, displayName: "Medicina Preventiva", abbreviation: "PR", textColorClass: "text-orange-600 dark:text-orange-400", badgeBgClass: "bg-orange-500 hover:bg-orange-600", badgeTextColor: "text-white" },
];

// Function to generate placeholder data
const generatePlaceholderData = (stationCode: string) => {
  let hash = 0;
  for (let i = 0; i < stationCode.length; i++) {
    const char = stationCode.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; 
  }
  const randomSeed = Math.abs(hash);
  const media = ((randomSeed % 31) / 10 + 7).toFixed(1);
  const nota = ((randomSeed % 301) / 100 + 7).toFixed(2);
  return { media, nota };
};

interface FirestoreStation extends Partial<ChecklistData> {
  code: string; 
  title: string;
  area: string;
}

export default function PenseChecklistsPage() {
  const [selectedArea, setSelectedArea] = useState<string>("Todas");
  const [stations, setStations] = useState<FirestoreStation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const stationsCollectionRef = collection(db, "revalidafacio");
        let q;
        if (selectedArea === "Todas") {
          q = query(stationsCollectionRef, orderBy("title"));
        } else {
          q = query(stationsCollectionRef, where("area", "==", selectedArea), orderBy("title"));
        }
        const querySnapshot = await getDocs(q);
        const stationsData = querySnapshot.docs.map(doc => ({
          ...(doc.data() as Partial<ChecklistData>), 
          code: doc.id, 
          title: doc.data().title || 'Título Indisponível', 
          area: doc.data().area || 'Área Indisponível', 
        })) as FirestoreStation[];
        setStations(stationsData);
      } catch (err) {
        console.error("Erro ao buscar estações do Firestore:", err);
        setError("Não foi possível carregar as estações.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStations();
  }, [selectedArea]);

  const stationDataWithPlaceholders = useMemo(() => {
    return stations.map(station => ({
      ...station,
      ...generatePlaceholderData(station.code),
    }));
  }, [stations]);


  return (
    <AppLayout>
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline flex items-center">
              <ListChecks className="mr-3 h-7 w-7 text-primary" />
              Estações Práticas - REVALIDA FÁCIL (Firestore)
            </CardTitle>
            <CardDescription>
              Acesse nossas estações práticas simuladas para treinar suas habilidades para o Revalida.
              Filtre por área ou navegue por todas as estações disponíveis. Os dados são carregados do Firestore.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <Select value={selectedArea} onValueChange={setSelectedArea} disabled={isLoading}>
                <SelectTrigger className="w-full sm:w-[220px] bg-background shadow-sm">
                  <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Filtrar por Área" />
                </SelectTrigger>
                <SelectContent>
                  {pageStationCategories.map(cat => (
                    <SelectItem key={cat.name} value={cat.name}>{cat.displayName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground self-end sm:self-center">
                {isLoading ? "Carregando..." : `${stationDataWithPlaceholders.length} Checklist(s) encontrado(s)`}
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="p-10 text-center text-destructive">
                <ListChecks className="mx-auto h-12 w-12 mb-4" />
                <p className="text-lg font-semibold">Erro ao carregar estações</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <div className="flex items-center px-4 py-3 bg-muted/60 border-b">
                  <div className="flex-grow font-medium text-muted-foreground text-xs uppercase tracking-wider pr-2">Checklist</div>
                  <div className="w-20 text-center font-medium text-muted-foreground text-xs uppercase tracking-wider hidden sm:block">Média</div>
                  <div className="w-24 text-center font-medium text-muted-foreground text-xs uppercase tracking-wider">Nota</div>
                  <div className="w-28 text-center font-medium text-muted-foreground text-xs uppercase tracking-wider">Treinar</div>
                </div>

                {stationDataWithPlaceholders.length > 0 ? (
                  stationDataWithPlaceholders.map((station, index) => {
                    const stationCatDetails = pageStationCategories.find(cat => cat.name === station.area);
                    const { media, nota } = station;

                    return (
                      <Link href={`/training/${station.code}`} passHref key={station.code} className="block group transition-colors duration-150 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <div className={`flex items-center px-4 py-3.5 text-sm ${index < stationDataWithPlaceholders.length - 1 ? 'border-b' : ''}`}>
                          <div className="flex-grow flex items-center min-w-0 pr-2">
                            {stationCatDetails && (
                              <Badge
                                variant="default"
                                className={`mr-2 sm:mr-3 py-0.5 px-1.5 sm:px-2 text-xs font-bold ${stationCatDetails.badgeBgClass} ${stationCatDetails.badgeTextColor} border-none whitespace-nowrap rounded-sm group-hover:opacity-90 transition-opacity`}
                              >
                                {stationCatDetails.abbreviation}
                              </Badge>
                            )}
                            <span className="font-medium text-foreground truncate group-hover:text-primary transition-colors" title={station.title}>
                              {station.title}
                            </span>
                          </div>
                          <div className="w-20 text-center text-muted-foreground hidden sm:block">{media}</div>
                          <div className="w-24 text-center">
                            <Badge 
                              variant="secondary" 
                              className={`py-1 px-2 text-xs sm:px-2.5 font-semibold text-white rounded-md
                                ${parseFloat(nota) >= 9 ? 'bg-green-500 hover:bg-green-600' : 
                                  parseFloat(nota) >= 7.5 ? 'bg-sky-500 hover:bg-sky-600' : 
                                  'bg-amber-500 hover:bg-amber-600'}`}
                            >
                              {nota}
                            </Badge>
                          </div>
                          <div className="w-28 flex justify-center items-center">
                            <Button variant="outline" size="sm" className="h-8 px-4 text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors border-border group-hover:border-primary/80">
                              Iniciar
                            </Button>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div className="p-10 text-center">
                    <ListChecks className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-semibold text-muted-foreground">
                      Nenhuma estação encontrada para "{selectedArea}" no Firestore.
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Tente selecionar outra área ou crie novas estações modelo na área de administração.
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

