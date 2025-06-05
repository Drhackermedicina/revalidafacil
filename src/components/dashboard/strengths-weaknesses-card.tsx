
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldAlert } from "lucide-react";

interface StrengthsWeaknessesCardProps {
  strengths: string[];
  weaknesses: string[];
}

export default function StrengthsWeaknessesCard({ strengths, weaknesses }: StrengthsWeaknessesCardProps) {
  return (
    <Card className="shadow-md h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-headline">Pontos Fortes e Fracos</CardTitle>
        <CardDescription>Análise baseada nos seus últimos simulados.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <div>
          <h4 className="mb-2 flex items-center text-md font-semibold text-green-600 dark:text-green-400">
            <ShieldCheck className="mr-2 h-5 w-5" />
            Pontos Fortes
          </h4>
          <div className="flex flex-wrap gap-2">
            {strengths.length > 0 ? strengths.map((strength, index) => (
              <Badge key={index} variant="outline" className="border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400 dark:border-green-500/70 dark:bg-green-500/20">{strength}</Badge>
            )) : <p className="text-sm text-muted-foreground">Nenhum ponto forte identificado ainda.</p>}
          </div>
        </div>
        <div className="mt-4">
          <h4 className="mb-2 flex items-center text-md font-semibold text-red-600 dark:text-red-400">
            <ShieldAlert className="mr-2 h-5 w-5" />
            Pontos a Melhorar
          </h4>
          <div className="flex flex-wrap gap-2">
            {weaknesses.length > 0 ? weaknesses.map((weakness, index) => (
              <Badge key={index} variant="outline" className="border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400 dark:border-red-500/70 dark:bg-red-500/20">{weakness}</Badge>
            )) : <p className="text-sm text-muted-foreground">Nenhum ponto a melhorar identificado ainda.</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
