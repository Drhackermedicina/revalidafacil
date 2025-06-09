
// src/app/checklists/inep/page.tsx
"use client";

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import AppLayout from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { ChecklistData } from '@/lib/station-data'; // Keep type for data structure
import { BookCopy, Filter, Loader2, ListChecks } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from '@/lib/firebase'; // Firebase db import
import { collection, getDocs, query, orderBy } from "firebase/firestore"; // Firestore functions

// Helper function to extract INEP exam year from station title or code
const getIneptExamYear = (station: Partial<ChecklistData> & { code: string; title: string }): string | null => {
  if (!station.title && !station.code) return null;

  const titleMatch = station.title?.match(/INEP\s*\|\s*([0-9]{4}\.[1-2])/i);
  if (titleMatch && titleMatch[1]) return titleMatch[1];

  const codeMatch = station.code?.match(/([0-9]{4}-[1-2])$/i);
  if (codeMatch && codeMatch[1]) return codeMatch[1].replace('-', '.');
  
  const yearOnlyTitleMatch = station.title?.match(/INEP\s*\|\s*([0-9]{4})(?!\.)/i);
  if (yearOnlyTitleMatch && yearOnlyTitleMatch[1]) return yearOnlyTitleMatch[1];
  
  const yearOnlyCodeMatch = station.code?.match(/([0-9]{4})$/i);
  if (yearOnlyCodeMatch && yearOnlyCodeMatch[1]) return yearOnlyCodeMatch[1];

  if (station.title?.toLowerCase().includes("inep") || station.code?.toLowerCase().includes("inep")) {
    return "Outros INEP"; 
  }

  return null;
};

const generatePlaceholderData = (stationCode: string) => {
  let hash = 0;
  for (let i = 0; i < stationCode.length; i++) {
    const char = stationCode.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; 
  }
  const randomSeed = Math.abs(hash);
  const media = ((randomSeed % 31) / 10 + 7).toFixed(1); // Média entre 7.0 e 10.0
  const nota = ((randomSeed % 301) / 100 + 7).toFixed(2); // Nota entre 7.00 e 10.00
  return { media, nota };
};

interface InepStationFromFirestore extends Partial<ChecklistData> {
  id: string; // Firestore document ID
  code: string; // Station code, should be same as id for consistency or a dedicated field
  title: string;
  area?: string; // Area might not always be present or relevant for INEP filter
  inepExamYear: string | null;
  media: string;
  nota: string;
}

const predefinedIneepExamYears = ["Todas", "2024.2", "2024.1", "2023.2", "2023.1", "2022.2", "2022.1", "2021", "2020", "Outros INEP"];

export default function InepChecklistsPage() {
  const [selectedExamYear, setSelectedExamYear] = useState<string>("Todas");
  const [allFirestoreStations, setAllFirestoreStations] = useState<InepStationFromFirestore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const stationsCollectionRef = collection(db, "revalidafacio");
        const q = query(stationsCollectionRef, orderBy("title")); // Order by title, or another relevant field
        const querySnapshot = await getDocs(q);
        
        const stationsData = querySnapshot.docs.map(doc => {
          const data = doc.data() as Partial<ChecklistData> & { code?: string; title?: string };
          const stationCode = data.code || doc.id;
          const stationTitle = data.title || 'Título Indisponível';
          
          return {
            ...data,
            id: doc.id,
            code: stationCode,
            title: stationTitle,
            inepExamYear: getIneptExamYear({ code: stationCode, title: stationTitle, area: data.area }),
            ...generatePlaceholderData(stationCode),
          };
        }).filter(station => station.inepExamYear !== null) as InepStationFromFirestore[]; // Filter only INEP stations

        setAllFirestoreStations(stationsData);
      } catch (err) {
        console.error("Erro ao buscar estações INEP do Firestore:", err);
        setError("Não foi possível carregar as estações INEP do Firestore.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStations();
  }, []);

  const filteredStations = useMemo(() => {
    if (selectedExamYear === "Todas") {
      return allFirestoreStations;
    }
    return allFirestoreStations.filter(station => station.inepExamYear === selectedExamYear);
  }, [selectedExamYear, allFirestoreStations]);

  const availableExamYears = useMemo(() => {
    const yearsFromStations = new Set(allFirestoreStations.map(s => s.inepExamYear).filter(Boolean) as string[]);
    const dynamicYears = Array.from(yearsFromStations).sort((a, b) => {
      // Custom sort: "YYYY.S" desc, then "YYYY" desc, then "Outros INEP"
      if (a.includes('.') && b.includes('.')) return b.localeCompare(a);
      if (a.includes('.')) return -1;
      if (b.includes('.')) return 1;
      if (a === "Outros INEP") return 1;
      if (b === "Outros INEP") return -1;
      return b.localeCompare(a);
    });
    
    // Combine predefined with dynamic, ensuring "Todas" is first and "Outros INEP" last if present
    const combined = ["Todas", ...dynamicYears];
    if (yearsFromStations.has("Outros INEP") && !combined.includes("Outros INEP")) {
        combined.push("Outros INEP");
    }
    // Add any predefined years not covered by actual stations, for future-proofing UI
    predefinedIneepExamYears.forEach(py => {
        if (py !== "Todas" && py !== "Outros INEP" && !combined.includes(py)) {
            // Potentially insert in sorted order or just append and re-sort
        }
    });
    // For simplicity, we'll use the dynamic list plus "Todas", and ensure predefined are available if needed.
    // The current predefined list is already quite comprehensive.
    const finalYears = new Set(["Todas"]);
    predefinedIneepExamYears.forEach(y => {
        if (y === "Todas" || yearsFromStations.has(y)) {
            finalYears.add(y);
        }
    });
    // Ensure "Outros INEP" is an option if there are stations for it or if it's predefined and might be used.
    if (yearsFromStations.has("Outros INEP") || predefinedIneepExamYears.includes("Outros INEP")) {
        finalYears.add("Outros INEP");
    }

    return Array.from(finalYears).sort((a, b) => {
        if (a === "Todas") return -1;
        if (b === "Todas") return 1;
        if (a === "Outros INEP") return 1;
        if (b === "Outros INEP") return -1;
        return b.localeCompare(a); // Sort descending for years
    });

  }, [allFirestoreStations]);


  return (
    <AppLayout>
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline flex items-center">
              <BookCopy className="mr-3 h-7 w-7 text-primary" />
              Estações Práticas - INEP Provas Anteriores
            </CardTitle>
            <CardDescription>
              Acesse estações práticas de provas anteriores do INEP.
              Filtre pela prova desejada. Os dados são carregados do Firestore.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <Select value={selectedExamYear} onValueChange={setSelectedExamYear} disabled={isLoading}>
                <SelectTrigger className="w-full sm:w-[280px] bg-background shadow-sm">
                  <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Filtrar por Prova INEP" />
                </SelectTrigger>
                <SelectContent>
                  {availableExamYears.map(year => (
                    <SelectItem key={year} value={year}>{year === "Todas" ? "Todas as Provas" : year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground self-end sm:self-center">
                {isLoading ? "Carregando..." : `${filteredStations.length} Checklist(s) encontrado(s)`}
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="p-10 text-center text-destructive">
                <BookCopy className="mx-auto h-12 w-12 mb-4" />
                <p className="text-lg font-semibold">Erro ao carregar estações</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <div className="flex items-center px-4 py-3 bg-muted/60 border-b">
                  <div className="flex-grow font-medium text-muted-foreground text-xs uppercase tracking-wider pr-2">Checklist</div>
                  <div className="w-28 text-center font-medium text-muted-foreground text-xs uppercase tracking-wider hidden sm:block">Prova INEP</div>
                  <div className="w-20 text-center font-medium text-muted-foreground text-xs uppercase tracking-wider hidden sm:block">Média</div>
                  <div className="w-24 text-center font-medium text-muted-foreground text-xs uppercase tracking-wider">Nota</div>
                  <div className="w-28 text-center font-medium text-muted-foreground text-xs uppercase tracking-wider">Treinar</div>
                </div>

                {filteredStations.length > 0 ? (
                  filteredStations.map((station, index) => (
                    <Link href={`/training/${station.code}`} passHref key={station.code} className="block group transition-colors duration-150 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <div className={`flex items-center px-4 py-3.5 text-sm ${index < filteredStations.length - 1 ? 'border-b' : ''}`}>
                        <div className="flex-grow flex items-center min-w-0 pr-2">
                          <span className="font-medium text-foreground truncate group-hover:text-primary transition-colors" title={station.title}>
                            {station.title.replace(/ - INEP \| [0-9]{4}\.[1-2]/i, '').replace(/ - INEP \| [0-9]{4}/i, '').replace(/INEP\s*\|\s*[0-9]{4}\.[1-2]\s*-\s*/i, '').replace(/INEP\s*\|\s*[0-9]{4}\s*-\s*/i, '')} 
                          </span>
                        </div>
                        <div className="w-28 text-center text-xs text-muted-foreground hidden sm:block">
                            <Badge variant="outline">{station.inepExamYear}</Badge>
                        </div>
                        <div className="w-20 text-center text-muted-foreground hidden sm:block">{station.media}</div>
                        <div className="w-24 text-center">
                          <Badge 
                            variant="secondary" 
                            className={`py-1 px-2 text-xs sm:px-2.5 font-semibold text-white rounded-md
                              ${parseFloat(station.nota) >= 9 ? 'bg-green-500 hover:bg-green-600' : 
                                parseFloat(station.nota) >= 7.5 ? 'bg-sky-500 hover:bg-sky-600' : 
                                'bg-amber-500 hover:bg-amber-600'}`}
                          >
                            {station.nota}
                          </Badge>
                        </div>
                        <div className="w-28 flex justify-center items-center">
                          <Button variant="outline" size="sm" className="h-8 px-4 text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors border-border group-hover:border-primary/80">
                            Iniciar
                          </Button>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-10 text-center">
                    <ListChecks className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-semibold text-muted-foreground">
                      Nenhuma estação INEP encontrada para "{selectedExamYear}" no Firestore.
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Verifique se as estações INEP estão na coleção "revalidafacio" do Firestore e se seus títulos/códigos permitem a identificação da prova.
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
