
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { PieChart as LucidePieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface PerformancePieDataPoint {
  name: string;
  value: number;
  fill: string; 
}

interface PerformancePieChartCardProps {
  data: PerformancePieDataPoint[];
  title?: string;
  description?: string;
}

export default function PerformancePieChartCard({
  data,
  title = "Desempenho por Categoria",
  description = "Sua performance detalhada por área de avaliação."
}: PerformancePieChartCardProps) {
  
  const chartConfig = data.reduce<ChartConfig>((acc, item) => {
    acc[item.name] = { label: item.name, color: item.fill };
    return acc;
  }, {});

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number, name: string }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7; // Adjust label position
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percentage = (percent * 100).toFixed(0);

    if (parseFloat(percentage) < 8) return null; // Don't show label for very small slices to avoid clutter

    return (
      <text
        x={x}
        y={y}
        fill="hsl(var(--primary-foreground))" // Use a contrasting color for the label
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="11px"
        fontWeight="medium"
      >
        {`${percentage}%`}
      </text>
    );
  };


  return (
    <Card className="shadow-md h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-headline">
          <LucidePieChartIcon className="mr-2 h-6 w-6 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-4 flex items-center justify-center">
        {data.length > 0 ? (
          <ChartContainer config={chartConfig} className="min-h-[250px] h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={<ChartTooltipContent 
                              nameKey="name" 
                              hideLabel 
                              formatter={(value, name, item) => {
                                return (
                                  <div className="flex flex-col">
                                    <span className="font-medium">{item.payload.name}</span>
                                    <span className="text-muted-foreground">{`${value}%`}</span>
                                  </div>
                                );
                              }}
                            />}
                />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  height={40}
                  iconSize={10}
                  wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                  formatter={(value, entry) => (
                    <span className="text-xs text-muted-foreground" style={{ color: entry.color }}>{value}</span>
                  )}
                />
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%" // Relative outer radius
                  labelLine={false}
                  label={renderCustomizedLabel}
                  strokeWidth={1}
                  stroke="hsl(var(--background))" // Add a subtle border between slices
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-sm text-muted-foreground">Dados insuficientes para exibir o gráfico.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
