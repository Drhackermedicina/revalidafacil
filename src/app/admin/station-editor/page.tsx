
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AppLayout from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { FilePlus2 } from "lucide-react";

// Zod schema for basic station fields
const stationFormSchema = z.object({
  title: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres." }),
  area: z.enum(["Clínica Médica", "Cirurgia", "G.O", "Pediatria", "Preventiva"], {
    required_error: "Por favor, selecione uma área.",
  }),
  code: z.string().min(3, { message: "O código deve ter pelo menos 3 caracteres." })
    .regex(/^[a-z0-9-]+$/, { message: "O código deve conter apenas letras minúsculas, números e hífens." }),
  scenarioTitle: z.string().min(5, { message: "O título do cenário deve ter pelo menos 5 caracteres." }),
  scenarioDescription: z.string().min(20, { message: "A descrição do cenário deve ter pelo menos 20 caracteres." }),
});

type StationFormValues = z.infer<typeof stationFormSchema>;

// Medical areas for the select component
const medicalAreas = [
  { name: "Clínica Médica", displayName: "Clínica Médica" },
  { name: "Cirurgia", displayName: "Cirurgia" },
  { name: "G.O", displayName: "Ginecologia e Obstetrícia" },
  { name: "Pediatria", displayName: "Pediatria" },
  { name: "Preventiva", displayName: "Medicina Preventiva" },
];

export default function StationEditorPage() {
  const form = useForm<StationFormValues>({
    resolver: zodResolver(stationFormSchema),
    defaultValues: {
      title: "",
      area: undefined, // Or a default value like "Clínica Médica"
      code: "",
      scenarioTitle: "",
      scenarioDescription: "",
    },
    mode: "onChange", // Validate on change for better UX
  });

  function onSubmit(data: StationFormValues) {
    console.log("Dados da Estação:", data);
    // Here, you would typically send the data to a backend API
    // For now, we'll just log it and potentially reset the form or show a success message.
    alert("Estação 'salva' no console! Verifique o console do navegador.");
    // form.reset(); // Optionally reset the form
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline flex items-center">
              <FilePlus2 className="mr-3 h-7 w-7 text-primary" />
              Editor de Estações Clínicas
            </CardTitle>
            <CardDescription>
              Crie ou modifique estações para treinamento de habilidades clínicas.
              Por enquanto, esta página permite apenas a criação dos campos básicos.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Informações Gerais da Estação */}
                <div className="space-y-4 p-4 border rounded-md">
                  <h3 className="text-lg font-medium text-primary">Informações Gerais</h3>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título da Estação</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Atendimento ao Politraumatizado" {...field} />
                        </FormControl>
                        <FormDescription>O nome principal da estação clínica.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Área Médica</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a área médica" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {medicalAreas.map((area) => (
                                <SelectItem key={area.name} value={area.name}>
                                  {area.displayName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código da Estação</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: politrauma-adulto-cm" {...field} />
                          </FormControl>
                          <FormDescription>Identificador único (letras minúsculas, números, hífens).</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Detalhes do Cenário */}
                <div className="space-y-4 p-4 border rounded-md">
                  <h3 className="text-lg font-medium text-primary">Cenário Clínico</h3>
                  <FormField
                    control={form.control}
                    name="scenarioTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do Cenário</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Paciente vítima de colisão automobilística" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="scenarioDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição Detalhada do Cenário</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva a situação inicial do paciente, ambiente, queixas, etc."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Este texto será apresentado ao participante no início da estação.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Placeholder para campos futuros (Tasks, ChecklistItems, etc.) */}
                <div className="p-4 border border-dashed rounded-md text-center text-muted-foreground">
                  <p>Mais campos (Tarefas, Checklist, Materiais Impressos, Flashcards) serão adicionados aqui em futuras interações.</p>
                </div>

                <Button type="submit" className="w-full md:w-auto">Salvar Estação (Log no Console)</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

    