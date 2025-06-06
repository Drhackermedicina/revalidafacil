// Localização: src/app/dashboard/page.tsx
"use client";

// --- SUAS IMPORTAÇÕES EXISTENTES ---
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

// --- [NOVA IMPORTAÇÃO] Importa o useRouter para fazer o redirecionamento ---
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Seus dados estáticos existentes...
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
  // --- [NOVA LINHA] Pega o hook de roteamento ---
  const router = useRouter(); 

  // --- [NOVO BLOCO DE CÓDIGO] Este é o "guarda de segurança" ---
  useEffect(() => {
    // Se a verificação de auth terminou E não há usuário logado...
    if (!isAuthLoading && !user) {
      // ...redireciona para a página de login.
      router.push('/login');
    }
  }, [user, isAuthLoading, router]); // Dependências do efeito

  const getUserInitials = (name?: string | null) => {
    if (!name) return "??";
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  // --- [NOVA LÓGICA DE RENDERIZAÇÃO] ---
  // Se estiver carregando ou se o usuário não existir (e o redirect ainda não aconteceu),
  // mostramos uma tela de carregamento para evitar "piscar" o conteúdo.
  if (isAuthLoading || !user) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <p>Carregando Dashboard...</p>
        </div>
    );
  }

  // Se passou por tudo, o usuário está logado, então renderizamos seu ótimo dashboard.
  return (
    <AppLayout>
      <div className="space-y-6 p-1 md:p-0">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-4">
            {/* O resto do seu código JSX continua aqui, sem alterações */}
            <div>
                <CardTitle className="text-2xl font-bold font-headline">
                    {user?.displayName || "Estudante"}
                </CardTitle>
                <CardDescription>Bem-vindo(a) de volta!</CardDescription>
            </div>
            <Avatar className="h-[100px] w-[100px]">
                <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || "Avatar"} data-ai-hint="google avatar profile" />
                <AvatarFallback>{getUserInitials(user?.displayName)}</AvatarFallback>
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
