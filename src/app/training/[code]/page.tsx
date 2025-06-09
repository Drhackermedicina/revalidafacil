
// src/app/training/[code]/page.tsx
import AppLayout from "@/components/layout/app-layout";
import TrainingPageClient from "@/components/training/training-page-client";
import { allStations, type ChecklistData } from '@/lib/station-data'; // Adjust path
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StationPageProps {
  params: {
    code: string;
  };
}

// This function can be uncommented and implemented if using ISR/SSG for station codes
// export async function generateStaticParams() {
//   return allStations.map((station) => ({
//     code: station.code,
//   }));
// }

async function getStationData(code: string): Promise<ChecklistData | undefined> {
  // In a real app, you might fetch this from a database or CMS
  return allStations.find((station) => station.code === code);
}

export default async function StationTrainingPage({ params }: StationPageProps) {
  // Correctly access params.code directly without await
  const stationCode = params.code; 

  const stationData = await getStationData(stationCode);

  if (!stationData) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
                    <CardTitle className="text-2xl font-bold">Estação Não Encontrada</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground">
                        A estação com o código "{stationCode}" não foi encontrada.
                        Por favor, verifique o código ou volte para a lista de estações.
                    </p>
                </CardContent>
            </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <TrainingPageClient checklistData={stationData} />
    </AppLayout>
  );
}
