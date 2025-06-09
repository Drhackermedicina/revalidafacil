
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect } from "react";
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FilePlus2, UserCog, FileText, ListChecks, Info, Save, Loader2, ClipboardList } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import type { ChecklistData, PrintedMaterial, ChecklistItem } from '@/lib/station-data';
import { goEditorTemplate } from "@/lib/station-data/editor-templates/go-template";
import { pediatricsEditorTemplate } from "@/lib/station-data/editor-templates/pediatrics-template";
import { preventiveEditorTemplate } from "@/lib/station-data/editor-templates/preventive-template";
import { surgeryEditorTemplate } from "@/lib/station-data/editor-templates/surgery-template";
import { clinicalMedicineEditorTemplate } from "@/lib/station-data/editor-templates/clinical-medicine-template";


// Zod schema for station fields
const stationFormSchema = z.object({
  title: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres." }),
  area: z.enum(["Clínica Médica", "Cirurgia", "G.O", "Pediatria", "Preventiva"], {
    required_error: "Por favor, selecione uma área.",
  }),
  code: z.string().min(3, { message: "O código deve ter pelo menos 3 caracteres." })
    .regex(/^[a-z0-9-]+$/, { message: "O código deve conter apenas letras minúsculas, números e hífens." }),
  scenarioTitle: z.string().min(5, { message: "O título do cenário deve ter pelo menos 5 caracteres." }),
  scenarioDescription: z.string().min(20, { message: "A descrição do cenário deve ter pelo menos 20 caracteres." }),
  actorInstructions: z.string().min(20, { message: "As instruções para o ator devem ter pelo menos 20 caracteres." }),
  candidateTasksDescription: z.string().min(10, { message: "Descreva as tarefas do candidato (pelo menos 10 caracteres)." }).optional(),
  printedMaterialsDescription: z.string().optional().describe("Descrição textual dos materiais impressos, um por linha ou parágrafo."),
  pepItemsDescription: z.string().min(30, { message: "A descrição dos itens do PEP deve ter pelo menos 30 caracteres." }),
});

type StationFormValues = z.infer<typeof stationFormSchema>;

const medicalAreas = [
  { name: "Clínica Médica", displayName: "Clínica Médica" },
  { name: "Cirurgia", displayName: "Cirurgia" },
  { name: "G.O", displayName: "Ginecologia e Obstetrícia" },
  { name: "Pediatria", displayName: "Pediatria" },
  { name: "Preventiva", displayName: "Medicina Preventiva" },
];

const initialStationValues: StationFormValues = {
  title: "",
  area: undefined as any,
  code: "",
  scenarioTitle: "",
  scenarioDescription: "",
  actorInstructions: "",
  candidateTasksDescription: "",
  printedMaterialsDescription: "",
  pepItemsDescription: "",
};

export default function StationEditorPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<StationFormValues>({
    resolver: zodResolver(stationFormSchema),
    defaultValues: initialStationValues,
    mode: "onChange",
  });

  const selectedArea = form.watch("area");

  useEffect(() => {
    const currentValues = form.getValues();
    let templateToApply = null;

    if (selectedArea === "G.O") {
      templateToApply = goEditorTemplate;
    } else if (selectedArea === "Pediatria") {
      templateToApply = pediatricsEditorTemplate;
    } else if (selectedArea === "Preventiva") {
      templateToApply = preventiveEditorTemplate;
    } else if (selectedArea === "Cirurgia") {
      templateToApply = surgeryEditorTemplate;
    } else if (selectedArea === "Clínica Médica") {
      templateToApply = clinicalMedicineEditorTemplate;
    }


    if (templateToApply) {
      form.reset({
        title: currentValues.title, // Preserve user-entered title
        code: currentValues.code,   // Preserve user-entered code
        area: selectedArea,         // Keep selected area
        ...templateToApply,         // Apply template for other fields
      });
    } else if (selectedArea) { // Reset fields if an area is selected but no template exists (or for fallback)
      form.reset({
        title: currentValues.title,
        code: currentValues.code,
        area: selectedArea,
        scenarioTitle: "",
        scenarioDescription: "",
        actorInstructions: "",
        candidateTasksDescription: "",
        printedMaterialsDescription: "",
        pepItemsDescription: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedArea, form.reset]); // form.reset was added to dependency array


  async function onSubmit(data: StationFormValues) {
    setIsLoading(true);
    try {
      const printedMaterials: PrintedMaterial[] = [];
      if (data.printedMaterialsDescription && data.printedMaterialsDescription.trim() !== "") {
        printedMaterials.push({
          id: `editor-pm-${data.code}-1`,
          title: "Material Impresso Principal (Editor)",
          content: data.printedMaterialsDescription,
          isLocked: false, // Default to unlocked from editor
        });
      }

      const checklistItems: ChecklistItem[] = [];
      if (data.pepItemsDescription && data.pepItemsDescription.trim() !== "") {
        // Basic parsing of PEP items, assuming one item per line
        // A more robust solution would involve a structured input method for PEP items
        const pepDescriptions = data.pepItemsDescription.split('\n').filter(line => line.trim() !== "");
        pepDescriptions.forEach((desc, index) => {
          checklistItems.push({
            id: `editor-pep-${data.code}-${index + 1}`,
            description: desc,
            points: { inadequate: 0, partial: 0.5, adequate: 1 }, // Default points
            type: "geral", // Default type
            observation: "Item gerado pelo editor de estações.",
          });
        });
      }
      
      const taskItems = data.candidateTasksDescription
        ? data.candidateTasksDescription.split('\n').map(task => task.trim()).filter(task => task)
        : ["Realizar anamnese", "Realizar exame físico", "Definir diagnóstico e conduta"];


      const stationDoc: Partial<ChecklistData> & { code: string; title: string; area: string; editorVersion?: number; lastUpdatedAt?: string; } = {
        code: data.code,
        title: data.title,
        area: data.area,
        scenario: {
          title: data.scenarioTitle,
          description: data.scenarioDescription,
        },
        actorInstructions: {
          title: "Instruções para o Ator/Atriz (Editor)",
          content: data.actorInstructions,
        },
        tasks: {
          title: "Tarefas do Candidato (Editor)",
          timeLimit: "10 minutos", // Default time limit
          items: taskItems,
        },
        printedMaterials: printedMaterials,
        checklistItems: checklistItems,
        references: [{ text: "Referências a serem adicionadas (Editor)", url: "#" }], // Placeholder
        flashcards: [], // Placeholder
        editorVersion: 1, // Versioning for editor-created stations
        lastUpdatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "revalidafacio", data.code), stationDoc, { merge: true });

      toast({
        title: "Estação Salva!",
        description: `A estação "${data.title}" (${data.code}) foi salva com sucesso no Firestore.`,
        variant: "default",
      });
      
      // Optionally reset form or redirect
      // form.reset(initialStationValues); 

    } catch (error) {
      console.error("Erro ao salvar estação:", error);
      toast({
        title: "Erro ao Salvar",
        description: (error as Error).message || "Ocorreu um problema ao salvar a estação.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
              Selecionar uma Área Médica (G.O, Pediatria, Preventiva, Cirurgia, Clínica Médica) preencherá um modelo correspondente.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <div className="space-y-4 p-4 border rounded-md shadow-sm">
                  <h3 className="text-lg font-medium text-primary flex items-center">
                    <Info className="mr-2 h-5 w-5" />
                    Informações Gerais da Estação
                  </h3>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título da Estação</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Atendimento ao Politraumatizado" {...field} disabled={isLoading} />
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
                          <Select onValueChange={field.onChange} value={field.value || ""} disabled={isLoading}>
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
                            <Input placeholder="Ex: politrauma-adulto-cm" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormDescription>Identificador único (letras minúsculas, números, hífens). Será o ID no Firestore.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4 p-4 border rounded-md shadow-sm">
                  <h3 className="text-lg font-medium text-primary flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Cenário Clínico
                  </h3>
                  <FormField
                    control={form.control}
                    name="scenarioTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do Cenário</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Paciente vítima de colisão automobilística" {...field} disabled={isLoading} />
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
                            className="min-h-[120px]"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormDescription>Este texto será apresentado ao participante no início da estação.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4 p-4 border rounded-md shadow-sm">
                  <h3 className="text-lg font-medium text-primary flex items-center">
                    <UserCog className="mr-2 h-5 w-5" />
                    Instruções para o Ator/Atriz
                  </h3>
                  <FormField
                    control={form.control}
                    name="actorInstructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Orientações Detalhadas</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva o comportamento esperado, falas específicas, história pregressa, etc."
                            className="min-h-[150px]"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormDescription>Estas são as instruções completas para o paciente simulado.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4 p-4 border rounded-md shadow-sm">
                  <h3 className="text-lg font-medium text-primary flex items-center">
                    <ClipboardList className="mr-2 h-5 w-5" />
                    Tarefas do Candidato (Descrição Textual)
                  </h3>
                  <FormField
                    control={form.control}
                    name="candidateTasksDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lista de Tarefas</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Liste as tarefas que o candidato deve realizar, uma por linha. Ex:&#10;1. Realizar anamnese completa.&#10;2. Efetuar exame físico direcionado.&#10;3. Solicitar exames complementares."
                            className="min-h-[120px]"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormDescription>
                          As tarefas serão listadas para o candidato. Cada linha será um item da lista.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4 p-4 border rounded-md shadow-sm">
                  <h3 className="text-lg font-medium text-primary flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Materiais Impressos Disponíveis (Descrição Textual)
                  </h3>
                  <FormField
                    control={form.control}
                    name="printedMaterialsDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição dos Materiais</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva os materiais impressos textualmente. Para uma estrutura completa, use a criação por template ou edite o JSON. Ex: 'ECG: Ritmo sinusal...' "
                            className="min-h-[120px]"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormDescription>
                          Uma descrição textual. Para múltiplos materiais estruturados, considere editar o JSON no Storage após salvar.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4 p-4 border rounded-md shadow-sm">
                  <h3 className="text-lg font-medium text-primary flex items-center">
                    <ListChecks className="mr-2 h-5 w-5" />
                    Padrão Esperado de Procedimento (PEP) / Itens de Checklist (Descrição Textual)
                  </h3>
                  <FormField
                    control={form.control}
                    name="pepItemsDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Itens do Checklist</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Liste os itens do checklist textualmente. Para uma estrutura completa com pontuações, use a criação por template ou edite o JSON. Ex: '1. Higienizou as mãos. 2. Apresentou-se ao paciente...'"
                            className="min-h-[200px]"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormDescription>
                          Uma descrição textual dos itens. A estrutura detalhada de pontuação não é capturada aqui.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="p-4 border border-dashed rounded-md text-center text-muted-foreground">
                  <p>Campos detalhados para Flashcards e Referências podem ser adicionados editando o JSON no Storage ou via template.</p>
                </div>

                <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Estação no Firestore
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
