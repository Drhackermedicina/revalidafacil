
import AppLayout from "@/components/layout/app-layout";
import MentorCard, { type MentorProps } from "@/components/mentorship/mentor-card";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const mentorsData: MentorProps[] = [
  {
    name: "Dr. Alan dos Santos",
    photoUrl: "https://firebasestorage.googleapis.com/v0/b/appestacoes.firebasestorage.app/o/Dr.%20Alan.jpg?alt=media&token=c9031f67-1652-452b-8838-923238d548e5",
    photoAiHint: "doctor portrait",
    contact: {
      phone: "(92) 99231-1092",
      whatsappLink: "https://wa.me/5592992311092",
      email: "alanslumbeats@gmail.com",
    },
    education: "UPE CDE - Ciudad Del Este Paraguay",
    graduationYear: "2023",
    experience: [
      "Mentoria para a Prova Prática INEP Revalida 2ª Fase",
      "Mentoria para a Prova Objetiva INEP Revalida 1ª Fase",
    ],
    specialties: ["Clínica Médica", "Preparo Revalida"],
    bio: [
        "Natural de Manaus, Amazonas, Brasil.",
        "Antivacina.",
        "Tem como inspiração Dr. Lair Ribeiro."
    ],
  },
  // Add more mentors here in the future
];

export default function MentorshipPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline flex items-center">
              <Users className="mr-3 h-7 w-7 text-primary" />
              Conheça Nossos Mentores
            </CardTitle>
            <CardDescription>
              Conecte-se com profissionais experientes para guiar sua preparação.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentorsData.map((mentor) => (
            <MentorCard key={mentor.name} {...mentor} />
          ))}
        </div>
        {mentorsData.length === 0 && (
            <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                    <Users className="mx-auto h-12 w-12 mb-4" />
                    <p className="text-lg font-semibold">Nenhum mentor disponível no momento.</p>
                    <p className="text-sm">Volte em breve para conferir nossa lista de mentores.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </AppLayout>
  );
}
