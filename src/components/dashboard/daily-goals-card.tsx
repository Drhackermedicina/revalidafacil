
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Target, Zap, PlayCircle } from "lucide-react";

interface DailyGoalsCardProps {
  goals: {
    completed: number;
    total: number;
    streak: number;
  };
}

export default function DailyGoalsCard({ goals }: DailyGoalsCardProps) {
  const progressPercentage = goals.total > 0 ? (goals.completed / goals.total) * 100 : 0;

  return (
    <Card className="shadow-md h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-headline">
          <Target className="mr-2 h-6 w-6 text-primary" />
          Metas Diárias
        </CardTitle>
        <CardDescription>Seu progresso nas metas de hoje e sua sequência.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <div>
          <div className="mb-1 flex justify-between items-baseline">
            <span className="text-sm font-medium">Estações de Hoje</span>
            <span className="text-sm text-muted-foreground">{goals.completed}/{goals.total}</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>
        <div className="flex items-center justify-between rounded-md bg-amber-400/10 dark:bg-amber-500/20 p-3 border border-amber-500/30">
          <div className="flex items-center">
            <Zap className="mr-2 h-5 w-5 text-amber-500 dark:text-amber-400" />
            <span className="font-semibold text-sm">Sequência Atual</span>
          </div>
          <span className="text-lg font-bold text-amber-600 dark:text-amber-400">{goals.streak} dias</span>
        </div>
         <Button className="w-full mt-2">
          <PlayCircle className="mr-2 h-5 w-5" />
          Iniciar Nova Estação
        </Button>
      </CardContent>
    </Card>
  );
}
