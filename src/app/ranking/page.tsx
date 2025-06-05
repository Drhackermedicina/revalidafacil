
import AppLayout from "@/components/layout/app-layout";
import RankingCard from "@/components/dashboard/ranking-card";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Placeholder data - esta deve idealmente vir de um serviço ou contexto compartilhado
const studentData = {
  name: "Estudante Dedicado", // Este é o usuário atual, para destacar no ranking
  avatarUrl: "https://placehold.co/100x100.png", 
  // Outros dados do studentData podem não ser necessários aqui, mas o avatarUrl e nome são usados pelo RankingCard
};

const rankings = {
  overallScore: [
    { id: "user1", name: "Ana Silva", score: 980, avatar: "https://placehold.co/40x40.png" },
    { id: "user2", name: "Bruno Costa", score: 950, avatar: "https://placehold.co/40x40.png" },
    { id: "user3", name: "Clara Dias", score: 920, avatar: "https://placehold.co/40x40.png" },
    { id: "user4", name: "Daniel Alves", score: 890, avatar: "https://placehold.co/40x40.png" },
    { id: "user5", name: studentData.name, score: 880, avatar: studentData.avatarUrl }, 
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

export default function RankingPage() {
  return (
    <AppLayout>
      <div className="space-y-6 p-1 md:p-0">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline">Ranking da Plataforma</CardTitle>
            <CardDescription>Compare seu desempenho com outros estudantes.</CardDescription>
          </CardHeader>
        </Card>
        <RankingCard rankings={rankings} currentUser={studentData} />
      </div>
    </AppLayout>
  );
}
