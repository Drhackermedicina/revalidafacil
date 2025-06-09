
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { stationTemplate } from '/home/runner/work/revalida-project/revalida-project/src/lib/station-data/templates/station_template.ts';
import { Button } from '/home/runner/work/revalida-project/revalida-project/src/components/ui/button.tsx';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { FilePlus2, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Firebase imports
import { getStorage, ref, uploadString } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; // Firestore imports
import { storage, db } from '@/lib/firebase'; // Ensure storage and db are exported

const medicalAreas = [
  "Clínica Médica",
  "Cirurgia",
  "G.O", // Ginecologia e Obstetrícia
  "Pediatria",
  "Preventiva", // Medicina Preventiva e Social / Saúde Coletiva
];

const CreateStationFromTemplatePage = () => {
  const [stationName, setStationName] = useState('');
  const [selectedArea, setSelectedArea] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const generateStationId = (area: string, name: string) => {
    const areaSlug = area.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const nameSlug = name.toLowerCase().replace(/[^a-z0-9áéíóúàèìòùâêîôûãõç]+/gi, '-').replace(/^-+|-+$/g, '');
    return `${areaSlug}-${nameSlug}-${Date.now().toString().slice(-5)}`; // Add timestamp for uniqueness
  };

  const handleGenerateAndSaveStation = async () => {
    if (!stationName || !selectedArea) {
      toast({
        title: "Campos Obrigatórios",
        description: "Por favor, preencha o nome da estação e selecione a área.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    let generatedStationId = '';

    try {
      const newStationData = JSON.parse(JSON.stringify(stationTemplate));
      generatedStationId = generateStationId(selectedArea, stationName);

      // Populate the template with form data
      newStationData.id = generatedStationId; 
      newStationData.title = stationName; 
      newStationData.area = selectedArea; 
      newStationData.especialidade = selectedArea; 
      
      newStationData.nomeEstacao = stationName; 
      newStationData.instrucoesParticipante.descricaoCompletaCaso = `Paciente com quadro clínico sugestivo de ${stationName}. Detalhes a serem preenchidos.`;
      newStationData.palavrasChave = [stationName, selectedArea, "modelo", ...newStationData.palavrasChave.slice(0,2)];

      const stationJsonString = JSON.stringify(newStationData, null, 2);
      const areaSlug = selectedArea.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const filePath = `estacoes_modelos_geradas/${areaSlug}/${generatedStationId}.json`;
      const storageRef = ref(storage, filePath);
      await uploadString(storageRef, stationJsonString, 'raw', { contentType: 'application/json' });
      
      const firestoreStationDoc = {
        code: generatedStationId, 
        title: stationName,
        area: selectedArea,
        scenario: {
          title: newStationData.instrucoesParticipante.descricaoCompletaCaso.substring(0, 100) + "...",
          description: newStationData.instrucoesParticipante.descricaoCompletaCaso,
        },
        actorInstructions: {
          title: "Instruções para o Ator/Atriz (Modelo)",
          content: "Instruções detalhadas para o ator/atriz devem ser preenchidas aqui.",
        },
        tasks: {
            title: "Tarefas do Candidato (Modelo)",
            timeLimit: "10 minutos",
            items: ["Realizar anamnese", "Realizar exame físico", "Definir diagnóstico e conduta"],
        },
        printedMaterials: [],
        checklistItems: [],
        references: [{ text: "Referências a serem adicionadas (Modelo)", url: "#" }],
        flashcards: [],
        // ...newStationData // Spread other fields from the template if needed, but ensure it matches editor structure
      };
      await setDoc(doc(db, "revalidafacio", generatedStationId), firestoreStationDoc);
      
      toast({
        title: "Estação Gerada!",
        description: `Modelo para "${stationName}" criado. Redirecionando para edição...`,
        variant: "default",
      });
      
      // Redirect to the station editor page with the new station's ID
      router.push(`/admin/station-editor?stationId=${generatedStationId}`);

      // No longer clearing fields here as we redirect
      // setStationName('');
      // setSelectedArea(undefined);

    } catch (error) {
      console.error('Erro ao gerar ou salvar estação:', error);
      toast({
        title: "Erro ao Salvar",
        description: (error as Error).message || "Ocorreu um problema ao salvar o modelo da estação.",
        variant: "destructive",
      });
      setIsLoading(false); // Only set isLoading to false on error, as redirect handles success
    }
    // setIsLoading(false); // Removed from here, handled in error or by redirect
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-headline">
            <FilePlus2 className="mr-3 h-7 w-7 text-primary" />
            Criar Modelo de Estação
          </CardTitle>
          <CardDescription>
            Preencha os campos abaixo para gerar um novo modelo.
            Ele será salvo e você será redirecionado para o editor.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="stationName">Nome da Doença/Estação</Label>
            <Input
              id="stationName"
              placeholder="Ex: Infarto Agudo do Miocárdio, Dengue Clássica"
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="medicalArea">Área da Medicina</Label>
            <Select value={selectedArea} onValueChange={setSelectedArea} disabled={isLoading}>
              <SelectTrigger id="medicalArea">
                <SelectValue placeholder="Selecione a área médica" />
              </SelectTrigger>
              <SelectContent>
                {medicalAreas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerateAndSaveStation} 
            disabled={isLoading || !stationName || !selectedArea}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando e Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Gerar e Ir para Editor
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateStationFromTemplatePage;
