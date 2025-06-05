
// src/app/checklists/pense/page.tsx
import Link from 'next/link';
import AppLayout from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { allStations } from '@/lib/station-data'; // Adjust path as necessary
import { ListChecks } from 'lucide-react';

export default function PenseChecklistsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline flex items-center">
              <ListChecks className="mr-3 h-7 w-7 text-primary" />
              Estações Práticas - REVALIDA FÁCIL
            </CardTitle>
            <CardDescription>
              Acesse nossas estações práticas simuladas para treinar suas habilidades para o Revalida.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allStations.length > 0 ? (
            allStations.map((station) => (
              <Card key={station.code} className="flex flex-col hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{station.title}</CardTitle>
                  <CardDescription>{station.area}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: station.scenario.description.replace(/<p>|<\/p>/g, "") }}></p>
                </CardContent>
                <CardFooter>
                  <Link href={`/training/${station.code}`} passHref legacyBehavior>
                    <Button className="w-full">
                      Iniciar Estação
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground col-span-full text-center">
              Nenhuma estação disponível no momento.
            </p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

    