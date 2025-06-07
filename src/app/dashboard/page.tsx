// Localização: src/app/dashboard/page.tsx
"use client";

import React, { useEffect } from 'react'; // useEffect não será mais usado para redirecionamento, mas pode ser útil para outras coisas.
import { useRouter } from 'next/navigation';

import AppLayout from "@/components/layout/app-layout";
import ProgressOverviewCard from "@/components/dashboard/progress-overview-card";
import StrengthsWeaknessesCard from "@/components/dashboard/strengths-weaknesses-card";
import PerformanceChartCard from "@/components/dashboard/performance-chart-card";
import DailyGoalsCard from "@/components/dashboard/daily-goals-card";
import NextStepsCard from "@/components/dashboard/next-steps-card";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

// Dados estáticos para prototipação
const dashboardStaticData = {
  progress: [
    { area: "Cirúrgica", completed: 7, total: 15 },
    { area: "Clínica Médica", completed: 12, total: 20 },
    { area: "Pediatria", completed: 5, total: 10 },
    { area: "Ginecologia e Obstetrícia", completed: 8, total: 12 },
    { area: "Medicina Preventiva", completed: 10, total: 10 },
  ],
  strengths: ["Avaliação Primária (ABCDE)", "Comunicação com Paciente", "Exames Complementares"],
  weaknesses: ["Avaliação Secundária Detalhada", "Condutas Específicas", "Interpretação de ECG"],
  performanceData: [
    { name: "Jan", score: 65 },
    { name: "Fev", score: 70 },
    { name: "Mar", score: 78 },
    { name: "Abr", score: 75 },
    { name: "Mai", score: 82 },
    { name: "Jun", score: 85 },
  ],
  dailyGoals: { completed: 2, total: 3, streak: 5 },
  nextSteps: [
    { id: "1", title: "Revisar Casos de Pediatria", type: "Revisão", due: "Em 2 dias" },
    { id: "2", title: "Praticar Estação de Trauma", type: "Prática", due: "Amanhã" },
    { id: "3", title: "Assistir Aula de ECG", type: "Aula", due: "Hoje" },
  ],
};

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  // const router = useRouter(); // Não será mais usado para redirecionamento obrigatório

  // REMOVIDO O useEffect QUE FORÇAVA O LOGIN:
  // useEffect(() => {
  //   if (!isAuthLoading && !user) {
  //     router.push('/login');
  //   }
  // }, [user, isAuthLoading, router]);

  const getUserInitials = (name?: string | null) => {
    if (!name) return "??";
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  // Mostra o Skeleton apenas durante o carregamento inicial da autenticação
  if (isAuthLoading) {
    return (
        <AppLayout>
            <div className="space-y-6 p-1 md:p-0">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-[100px] w-[100px] rounded-full" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Skeleton className="h-64 w-full rounded-lg" />
                    <Skeleton className="h-64 w-full rounded-lg" />
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-48 w-full rounded-lg" />
                </div>
                <Skeleton className="h-32 w-full rounded-lg" />
            </div>
        </AppLayout>
    );
  }

  // Se não estiver carregando, mostra o dashboard, adaptando para usuário logado ou não
  return (
    <AppLayout>
      <div className="space-y-6 p-1 md:p-0">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-4">
            <div>
                <CardTitle className="text-2xl font-bold font-headline">
                    {user?.displayName || "Visitante"}
                </CardTitle>
                <CardDescription>
                  {user ? "Bem-vindo(a) de volta!" : "Explorando como visitante."}
                </CardDescription>
            </div>
            <Avatar className="h-[100px] w-[100px]">
                <AvatarImage src={user?.photoURL || "https://placehold.co/100x100.png?text=Vis"} alt={user?.displayName || "Visitante"} data-ai-hint="profile avatar" />
                <AvatarFallback>{getUserInitials(user?.displayName || "Visitante")}</AvatarFallback>
            </Avatar>
          </CardHeader>
        </Card>
        <div className="grid gap-6 md:grid-cols-2">
          <ProgressOverviewCard progress={dashboardStaticData.progress} />
          <PerformanceChartCard data={dashboardStaticData.performanceData} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <StrengthsWeaknessesCard strengths={dashboardStaticData.strengths} weaknesses={dashboardStaticData.weaknesses} />
            <DailyGoalsCard goals={dashboardStaticData.dailyGoals} />
        </div>
        <NextStepsCard steps={dashboardStaticData.nextSteps} />
      </div>
    </AppLayout>
  );
}
