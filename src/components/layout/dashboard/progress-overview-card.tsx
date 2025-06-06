
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChartBig } from "lucide-react"; // Changed from BarChart for a slightly different look

type ProgressItem = {
  area: string;
  completed: number;
  total: number;
};

interface ProgressOverviewCardProps {
  progress: ProgressItem[];
}

export default function ProgressOverviewCard({ progress }: ProgressOverviewCardProps) {
  const totalCompleted = progress.reduce((sum, item) => sum + item.completed, 0);
  const totalOverall = progress.reduce((sum, item) => sum + item.total, 0);

  return (
    <Card className="shadow-md h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-headline">
          <BarChartBig className="mr-2 h-6 w-6 text-primary" />
          Progresso nas Estações
        </CardTitle>
        {totalOverall > 0 && (
          <CardDescription>
            Total: {totalCompleted} de {totalOverall} estações ({((totalCompleted / totalOverall) * 100).toFixed(0)}%)
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
        {progress.length > 0 ? progress.map((item) => (
          <div key={item.area}>
            <div className="mb-1 flex justify-between items-baseline">
              <span className="text-sm font-medium text-foreground/90">{item.area}</span>
              <span className="text-xs text-muted-foreground">
                {item.completed}/{item.total}
              </span>
            </div>
            <Progress value={item.total > 0 ? (item.completed / item.total) * 100 : 0} className="h-2.5" />
          </div>
        )) : (
          <p className="text-sm text-muted-foreground text-center py-4">Nenhum progresso registrado ainda.</p>
        )}
      </CardContent>
    </Card>
  );
}
