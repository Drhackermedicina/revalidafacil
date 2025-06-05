
import AppLayout from "@/components/layout/app-layout";
import ProgressOverviewCard from "@/components/dashboard/progress-overview-card";
import StrengthsWeaknessesCard from "@/components/dashboard/strengths-weaknesses-card";
import PerformanceChartCard from "@/components/dashboard/performance-chart-card";
import DailyGoalsCard from "@/components/dashboard/daily-goals-card";
import NextStepsCard from "@/components/dashboard/next-steps-card";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const studentData = {
  name: "Estudante Dedicado",
  avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocJ8H_x94SYW29u_K1jP3xhkO_0U0_q1dJ6SgGjY0w=s100",
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
  return (
    <AppLayout>
      <div className="space-y-6 p-1 md:p-0">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl font-bold font-headline">{studentData.name}</CardTitle>
              <CardDescription>Bem-vindo(a) de volta!</CardDescription>
            </div>
            <Avatar className="h-[100px] w-[100px]">
              <AvatarImage src={studentData.avatarUrl} alt={studentData.name} data-ai-hint="google avatar profile" />
              <AvatarFallback>{studentData.name.substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <ProgressOverviewCard progress={studentData.progress} />
          <PerformanceChartCard data={studentData.performanceData} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <StrengthsWeaknessesCard strengths={studentData.strengths} weaknesses={studentData.weaknesses} />
            <DailyGoalsCard goals={studentData.dailyGoals} />
        </div>
        
        <NextStepsCard steps={studentData.nextSteps} />
      </div>
    </AppLayout>
  );
}
