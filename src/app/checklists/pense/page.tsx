
// src/app/checklists/pense/page.tsx
import Link from 'next/link';
import AppLayout from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { allStations, type ChecklistData } from '@/lib/station-data'; // Adjust path as necessary
import { ListChecks, Stethoscope, Baby, ShieldEllipsis, GitFork, Activity } from 'lucide-react'; // Added icons for categories

const stationCategories = [
  { name: "Clínica Médica", icon: Activity },
  { name: "Cirurgia", icon: GitFork },
  { name: "G.O", displayName: "Ginecologia e Obstetrícia", icon: Stethoscope }, // Assuming Stethoscope for G.O, adjust if better icon exists
  { name: "Pediatria", icon: Baby },
  { name: "Preventiva", displayName: "Medicina Preventiva", icon: ShieldEllipsis },
];

export default function PenseChecklistsPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline flex items-center">
              <ListChecks className="mr-3 h-7 w-7 text-primary" />
              Estações Práticas - REVALIDA FÁCIL
            </CardTitle>
            <CardDescription>
              Acesse nossas estações práticas simuladas para treinar suas habilidades para o Revalida.
              As estações estão organizadas por grandes áreas.
            </CardDescription>
          </CardHeader>
        </Card>

        {stationCategories.map((category) => {
          const stationsInCategory = allStations.filter(station => station.area === category.name);
          const CategoryIcon = category.icon;

          return (
            <section key={category.name} className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary flex items-center">
                <CategoryIcon className="mr-3 h-6 w-6" />
                {category.displayName || category.name}
              </h2>
              {stationsInCategory.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {stationsInCategory.map((station) => (
                    <Card key={station.code} className="flex flex-col hover:shadow-xl transition-shadow duration-200 ease-in-out rounded-lg overflow-hidden">
                      <CardHeader className="bg-card-foreground/5 dark:bg-card-foreground/10 p-4 flex-grow">
                        <CardTitle className="text-lg leading-tight">{station.title}</CardTitle>
                         {/* A descrição da área foi removida daqui pois já está no título da categoria */}
                      </CardHeader>
                      {/* CardContent com a descrição do cenário foi removido */}
                      <CardFooter className="p-4 border-t bg-card-foreground/5 dark:bg-card-foreground/10">
                        <Link href={`/training/${station.code}`} passHref legacyBehavior>
                          <Button className="w-full">
                            Iniciar Estação
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">
                      Nenhuma estação disponível em <strong className="text-foreground">{category.displayName || category.name}</strong> no momento.
                    </p>
                  </CardContent>
                </Card>
              )}
            </section>
          );
        })}

        {allStations.length === 0 && (
           <Card className="border-dashed">
              <CardContent className="p-10 text-center">
                <ListChecks className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-xl font-semibold text-muted-foreground">
                  Nenhuma estação prática disponível no momento.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Por favor, verifique novamente mais tarde.
                </p>
              </CardContent>
            </Card>
        )}
      </div>
    </AppLayout>
  );
}
