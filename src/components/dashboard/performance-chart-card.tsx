
"use client"; 

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

interface PerformanceDataPoint {
  name: string; 
  score: number;
}

interface PerformanceChartCardProps {
  data: PerformanceDataPoint[];
}

const chartConfig = {
  score: {
    label: "Pontuação",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function PerformanceChartCard({ data }: PerformanceChartCardProps) {
  return (
    <Card className="shadow-md h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-headline">
          <TrendingUp className="mr-2 h-6 w-6 text-primary" />
          Desempenho Geral
        </CardTitle>
        <CardDescription>Sua pontuação média nos últimos meses.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-2"> {/* Ensure ChartContainer takes space */}
        {data.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <RechartsBarChart accessibilityLayer data={data} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={11}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={11}
                domain={[0, 100]} 
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel formatter={(value) => `${value}%`} />}
              />
              <Bar dataKey="score" fill="var(--color-score)" radius={[4, 4, 0, 0]} barSize={30}>
                <LabelList dataKey="score" position="top" offset={5} fontSize={10} formatter={(value: number) => `${value}%`} />
              </Bar>
            </RechartsBarChart>
          </ChartContainer>
        ) : (
           <div className="flex items-center justify-center h-[250px]">
            <p className="text-sm text-muted-foreground">Dados de desempenho insuficientes para exibir o gráfico.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
