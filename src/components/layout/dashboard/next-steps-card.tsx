
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ListTodo, BookOpen, ClipboardCheck, Youtube } from "lucide-react";

interface Step {
  id: string;
  title: string;
  type: "Revisão" | "Prática" | "Aula" | string; // Allow other types
  due: string;
}

interface NextStepsCardProps {
  steps: Step[];
}

const typeIcons: Record<string, React.ElementType> = {
  "Revisão": BookOpen,
  "Prática": ClipboardCheck,
  "Aula": Youtube,
};

const typeColors: Record<string, string> = {
  "Revisão": "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
  "Prática": "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
  "Aula": "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
  "Default": "bg-muted text-muted-foreground border-border"
}

export default function NextStepsCard({ steps }: NextStepsCardProps) {
  return (
    <Card className="shadow-md w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-headline">
          <ListTodo className="mr-2 h-6 w-6 text-primary" />
          Próximos Passos
        </CardTitle>
        <CardDescription>Suas tarefas e lembretes importantes.</CardDescription>
      </CardHeader>
      <CardContent>
        {steps.length > 0 ? (
          <ul className="space-y-3">
            {steps.map((step) => {
              const IconComponent = typeIcons[step.type] || ListTodo;
              const badgeColorClass = typeColors[step.type] || typeColors["Default"];
              return (
                <li key={step.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <IconComponent className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="font-medium text-sm text-foreground/90">{step.title}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 justify-end sm:justify-normal">
                    <Badge variant="outline" className={`text-xs ${badgeColorClass}`}>{step.type}</Badge>
                    <span className="text-xs text-muted-foreground">{step.due}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">Nenhuma tarefa pendente no momento.</p>
        )}
      </CardContent>
    </Card>
  );
}
