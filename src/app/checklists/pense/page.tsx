// src/app/checklists/pense/page.tsx
import Link from 'next/link';
import AppLayout from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// Removed Button import as it's no longer used here
import { allStations, type ChecklistData } from '@/lib/station-data'; // Adjust path as necessary
import { ListChecks, Stethoscope, Baby, ShieldEllipsis, GitFork, Activity } from 'lucide-react'; // Added icons for categories

const stationCategories = [
  { name: "Clínica Médica", icon: Activity },
  { name: "Cirurgia", icon: GitFork },
  { name: "G.O", displayName: "Ginecologia e Obstetrícia", icon: Stethoscope },
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
              As estações estão organizadas por grandes áreas. Clique em uma estação para iniciar.
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
                    <Link href={`/training/${station.code}`} passHref key={station.code} className="block h-full rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none">
                      <Card className="flex flex-col hover:shadow-xl transition-shadow duration-200 ease-in-out rounded-lg overflow-hidden cursor-pointer h-full">
                        <CardHeader className="bg-card-foreground/5 dark:bg-card-foreground/10 p-4 flex-grow">
                          <CardTitle className="text-lg leading-tight">{station.title}</CardTitle>
                        </CardHeader>
                        {/* CardFooter with Button removed */}
                      </Card>
                    </Link>
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
