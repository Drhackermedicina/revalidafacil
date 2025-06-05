
import AppLayout from "@/components/layout/app-layout";
import ProgressOverviewCard from "@/components/dashboard/progress-overview-card";
import StrengthsWeaknessesCard from "@/components/dashboard/strengths-weaknesses-card";
import PerformanceChartCard from "@/components/dashboard/performance-chart-card";
import DailyGoalsCard from "@/components/dashboard/daily-goals-card";
import RankingCard from "@/components/dashboard/ranking-card";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Placeholder data - substitua com seus dados reais
const studentData = {
  name: "Estudante Dedicado",
  avatarUrl: "https://placehold.co/100x100.png",
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
};

const rankings = {
  overallScore: [
    { id: "user1", name: "Ana Silva", score: 980, avatar: "https://placehold.co/40x40.png" },
    { id: "user2", name: "Bruno Costa", score: 950, avatar: "https://placehold.co/40x40.png" },
    { id: "user3", name: "Clara Dias", score: 920, avatar: "https://placehold.co/40x40.png" },
    { id: "user4", name: "Daniel Alves", score: 890, avatar: "https://placehold.co/40x40.png" },
    { id: "user5", name: studentData.name, score: 880, avatar: studentData.avatarUrl }, // Current user example
  ],
  stationsCompleted: [
    { id: "user6", name: "Carlos Lima", stations: 55, avatar: "https://placehold.co/40x40.png" },
    { id: "user7", name: "Diana Reis", stations: 52, avatar: "https://placehold.co/40x40.png" },
    { id: "user5", name: studentData.name, stations: 50, avatar: studentData.avatarUrl },
    { id: "user8", name: "Eduarda Souza", stations: 48, avatar: "https://placehold.co/40x40.png" },
    { id: "user9", name: "Felipe Barros", stations: 45, avatar: "https://placehold.co/40x40.png" },
  ],
  dailyChallenge: [
    { id: "user5", name: studentData.name, score: 120, avatar: studentData.avatarUrl },
    { id: "user10", name: "Elisa Matos", score: 115, avatar: "https://placehold.co/40x40.png" },
    { id: "user11", name: "Gabriel Rocha", score: 110, avatar: "https://placehold.co/40x40.png" },
    { id: "user12", name: "Helena Costa", score: 105, avatar: "https://placehold.co/40x40.png" },
    { id: "user13", name: "Igor Martins", score: 100, avatar: "https://placehold.co/40x40.png" },
  ]
};


export default function StudentDashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6 p-1 md:p-0"> {/* Adicionado padding responsivo */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl font-bold font-headline">Área do Estudante</CardTitle>
              <CardDescription>Bem-vindo(a) de volta, {studentData.name}!</CardDescription>
            </div>
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
              <AvatarImage src={studentData.avatarUrl} alt={studentData.name} data-ai-hint="profile person" />
              <AvatarFallback>{studentData.name.substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProgressOverviewCard progress={studentData.progress} />
          <StrengthsWeaknessesCard strengths={studentData.strengths} weaknesses={studentData.weaknesses} />
          <PerformanceChartCard data={studentData.performanceData} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            <DailyGoalsCard goals={studentData.dailyGoals} />
            <RankingCard rankings={rankings} currentUser={studentData} />
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
