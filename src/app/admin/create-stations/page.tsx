
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { stationTemplate } from '@/lib/station-data/templates/station_template';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { FilePlus2, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext'; // Importar useAuth

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
  const { user, isLoading: authLoading } = useAuth(); // Adicionar useAuth

  const generateStationId = (area: string, name: string) => {
    const areaSlug = area.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const nameSlug = name.toLowerCase().replace(/[^a-z0-9áéíóúàèìòùâêîôûãõç]+/gi, '-').replace(/^-+|-+$/g, '');
    return `${areaSlug}-${nameSlug}-${Date.now().toString().slice(-5)}`; // Add timestamp for uniqueness
  };

  const handleGenerateAndSaveStation = async () => {
    if (authLoading) {
      toast({
        title: "Aguarde",
        description: "Verificando autenticação...",
        variant: "default",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Acesso Negado",
        description: "Você precisa estar logado para criar estações.",
        variant: "destructive",
      });
      router.push('/login'); // Opcional: redirecionar para login
      return;
    }

    if (!stationName || !selectedArea) {
      toast({
        title: "Campos Obrigatórios",
        description: "Por favor, preencha o nome da estação e selecione a área.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log('Iniciando geração da estação...');
    let generatedStationId = '';

    try {
      const newStationData = JSON.parse(JSON.stringify(stationTemplate));
      generatedStationId = generateStationId(selectedArea, stationName);
      console.log('Station ID gerado:', generatedStationId);

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
      
      console.log(`Tentando fazer upload para Storage: ${filePath}`);
      const storageRef = ref(storage, filePath);
      await uploadString(storageRef, stationJsonString, 'raw', { contentType: 'application/json' });
      console.log(`Upload para Storage bem-sucedido: ${filePath}`);
      
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

      console.log(`Tentando salvar no Firestore: coleção 'revalidafacio', ID '${generatedStationId}'`);
      await setDoc(doc(db, "revalidafacio", generatedStationId), firestoreStationDoc);
      console.log(`Salvo no Firestore com sucesso: revalidafacio/${generatedStationId}`);
      
      toast({
        title: "Estação Gerada!",
        description: `Modelo para "${stationName}" criado. Redirecionando para edição...`,
        variant: "default",
      });
      
      router.push(`/admin/station-editor?stationId=${generatedStationId}`);

    } catch (error) {
      console.error('Erro detalhado ao gerar ou salvar estação:', error);
      let description = "Ocorreu um problema ao salvar o modelo da estação.";
      if (error instanceof Error) {
        description = error.message;
      } else if (typeof error === 'string') {
        description = error;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        description = String((error as {message: string}).message);
      }
      
      toast({
        title: "Erro ao Salvar",
        description: description,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        Carregando...
      </div>
    );
  }

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
            disabled={isLoading || !stationName || !selectedArea || !user}
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
