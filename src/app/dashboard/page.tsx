
import AppLayout from "@/components/layout/app-layout";
import ProgressOverviewCard from "@/components/dashboard/progress-overview-card";
import StrengthsWeaknessesCard from "@/components/dashboard/strengths-weaknesses-card";
import PerformanceChartCard from "@/components/dashboard/performance-chart-card";
import DailyGoalsCard from "@/components/dashboard/daily-goals-card";
import PerformancePieChartCard from "@/components/dashboard/performance-pie-chart-card";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Placeholder data - substitua com seus dados reais
const studentData = {
  name: "Estudante Dedicado",
  avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocJ8H_x94SYW29u_K1jP3xhkO_0U0_q1dJ6SgGjY0w=s100", // URL do avatar do Google
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
  categoryProficiency: [ // Dados para o gráfico de pontos fortes/fracos por categoria
    { name: "Acolhimento", value: 80, fill: "hsl(var(--chart-1))" },
    { name: "Anamnese", value: 65, fill: "hsl(var(--chart-2))" },
    { name: "Exame Físico", value: 70, fill: "hsl(var(--chart-3))" },
    { name: "Laboratório", value: 90, fill: "hsl(var(--chart-4))" },
    { name: "Diagnóstico", value: 60, fill: "hsl(var(--chart-5))" },
  ],
};

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6 p-1 md:p-0"> {/* Adicionado padding responsivo */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl font-bold font-headline">Área do Estudante</CardTitle>
              <CardDescription>Bem-vindo(a) de volta, {studentData.name}!</CardDescription>
            </div>
            <Avatar className="h-[100px] w-[100px]">
              <AvatarImage src={studentData.avatarUrl} alt={studentData.name} data-ai-hint="google avatar profile" />
              <AvatarFallback>{studentData.name.substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProgressOverviewCard progress={studentData.progress} />
          <PerformanceChartCard data={studentData.performanceData} />
          <PerformancePieChartCard
            data={studentData.categoryProficiency}
            title="Pontos Fortes e Fracos por Categoria"
            description="Nível de proficiência em cada área chave. Valores mais altos indicam maior força."
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"> {/* Ajustado para dois cards lado a lado */}
            <StrengthsWeaknessesCard strengths={studentData.strengths} weaknesses={studentData.weaknesses} />
            <DailyGoalsCard goals={studentData.dailyGoals} />
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Próximos Passos</CardTitle>
            <CardDescription>Sugestões para continuar seus estudos.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card className="bg-secondary/50 hover:shadow-md transition-shadow">
              <CardHeader><CardTitle className="text-lg">Revisar Pontos Fracos</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Foque nas áreas onde você pode melhorar para um aprendizado mais eficaz.</p></CardContent>
            </Card>
             <Card className="bg-secondary/50 hover:shadow-md transition-shadow">
              <CardHeader><CardTitle className="text-lg">Nova Estação Prática</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Desafie-se com um novo cenário clínico para aplicar seus conhecimentos.</p></CardContent>
            </Card>
             <Card className="bg-secondary/50 hover:shadow-md transition-shadow">
              <CardHeader><CardTitle className="text-lg">Participar de Simulado</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Teste seu conhecimento em um ambiente simulado completo.</p></CardContent>
            </Card>
          </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}
