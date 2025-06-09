
// src/app/checklists/inep/page.tsx
"use client";

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import AppLayout from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { allStations, type ChecklistData } from '@/lib/station-data'; // Using allStations from local data
import { BookCopy, Filter, Loader2, ListChecks } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Helper function to extract INEP exam year from station title or code
const getIneptExamYear = (station: ChecklistData): string | null => {
  const titleMatch = station.title.match(/INEP\s*\|\s*([0-9]{4}\.[1-2])/i);
  if (titleMatch && titleMatch[1]) return titleMatch[1];

  const codeMatch = station.code.match(/([0-9]{4}-[1-2])$/i);
  if (codeMatch && codeMatch[1]) return codeMatch[1].replace('-', '.');
  
  // Fallback for years without semester
  const yearOnlyTitleMatch = station.title.match(/INEP\s*\|\s*([0-9]{4})(?!\.)/i);
  if (yearOnlyTitleMatch && yearOnlyTitleMatch[1]) return yearOnlyTitleMatch[1];
  
  const yearOnlyCodeMatch = station.code.match(/([0-9]{4})$/i);
  if (yearOnlyCodeMatch && yearOnlyCodeMatch[1]) return yearOnlyCodeMatch[1];

  if (station.title.toLowerCase().includes("inep") || station.code.toLowerCase().includes("inep")) {
    // If it's an INEP station but year parsing failed, categorize as "Outros INEP" or handle as needed
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

interface InepStation extends ChecklistData {
  inepExamYear: string | null;
  media: string;
  nota: string;
}

const predefinedIneepExamYears = ["Todas", "2024.2", "2024.1", "2023.2", "2023.1", "2022.2", "2022.1", "2021", "2020", "Outros INEP"];

export default function InepChecklistsPage() {
  const [selectedExamYear, setSelectedExamYear] = useState<string>("Todas");
  const [isLoading, setIsLoading] = useState(true); // Simulate loading for consistency
  const [error, setError] = useState<string | null>(null);

  const processedStations = useMemo(() => {
    setIsLoading(true);
    try {
      const inepStations = allStations
        .map(station => ({
          ...station,
          inepExamYear: getIneptExamYear(station),
          ...generatePlaceholderData(station.code),
        }))
        .filter(station => station.inepExamYear !== null) as InepStation[];
      setError(null);
      return inepStations;
    } catch (err) {
      console.error("Erro ao processar estações INEP:", err);
      setError("Não foi possível carregar as estações INEP.");
      return [];
    } finally {
       // Simulate async loading
      setTimeout(() => setIsLoading(false), 300);
    }
  }, []);

  const filteredStations = useMemo(() => {
    if (selectedExamYear === "Todas") {
      return processedStations;
    }
    return processedStations.filter(station => station.inepExamYear === selectedExamYear);
  }, [selectedExamYear, processedStations]);

  const availableExamYears = useMemo(() => {
    const yearsFromStations = new Set(processedStations.map(s => s.inepExamYear).filter(Boolean) as string[]);
    // Ensure predefined years are available for selection even if no stations exist yet for them.
    return predefinedIneepExamYears.filter(year => year === "Todas" || yearsFromStations.has(year) || predefinedIneepExamYears.includes(year));
  }, [processedStations]);


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
              Filtre pela prova desejada.
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
                            {station.title.replace(/ - INEP \| [0-9]{4}\.[1-2]/i, '').replace(/ - INEP \| [0-9]{4}/i, '')} 
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
                      Nenhuma estação INEP encontrada para "{selectedExamYear}" nos dados locais.
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Verifique o arquivo `src/lib/station-data.ts` ou selecione outra prova.
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

