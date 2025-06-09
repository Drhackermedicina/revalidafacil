
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { stationTemplate } from '@/lib/station-data/templates/station_template';
import { Button } from '@/components/ui/button';
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

    try {
      const newStationData = JSON.parse(JSON.stringify(stationTemplate));
      const stationId = generateStationId(selectedArea, stationName);

      // Populate the template with form data
      newStationData.id = stationId; // stationId used as code in some contexts
      newStationData.title = stationName; // User-friendly title
      newStationData.area = selectedArea; // Area médica
      newStationData.especialidade = selectedArea; // Keeping for compatibility if template uses it
      
      newStationData.nomeEstacao = stationName; // Custom field for display name
      newStationData.instrucoesParticipante.descricaoCompletaCaso = `Paciente com quadro clínico sugestivo de ${stationName}. Detalhes a serem preenchidos.`;
      newStationData.palavrasChave = [stationName, selectedArea, "modelo", ...newStationData.palavrasChave.slice(0,2)];

      // 1. Save to Firebase Storage (as JSON file)
      const stationJsonString = JSON.stringify(newStationData, null, 2);
      const areaSlug = selectedArea.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const filePath = `estacoes_modelos_geradas/${areaSlug}/${stationId}.json`;
      const storageRef = ref(storage, filePath);
      await uploadString(storageRef, stationJsonString, 'raw', { contentType: 'application/json' });
      
      // 2. Save to Firestore (document in 'estacoes_clinicas' collection)
      // We save a summary or the necessary fields for listing and direct access.
      // For simplicity, saving the whole newStationData, but you might optimize this.
      const firestoreStationDoc = {
        code: stationId, // This will be the document ID and the 'code' for routing
        title: stationName,
        area: selectedArea,
        // Add other fields from newStationData that are essential for listing or quick access
        // For example:
        scenario: {
          title: newStationData.instrucoesParticipante.descricaoCompletaCaso.substring(0, 100) + "..." // A summary
        },
        // It's often better to store the full JSON in Storage and only metadata/summary in Firestore
        // But for now, we'll store the whole object for simplicity, aligning with ChecklistData type
        ...newStationData // Storing the full station data, can be large.
      };
      // The document ID in Firestore will be stationId
      await setDoc(doc(db, "estacoes_clinicas", stationId), firestoreStationDoc);
      
      toast({
        title: "Estação Gerada e Salva!",
        description: `Modelo para "${stationName}" salvo no Storage e Firestore.`,
        variant: "default",
      });
      console.log('Estação Gerada:', newStationData);
      console.log('Salva no Firebase Storage em:', filePath);
      console.log('Salva no Firestore na coleção "estacoes_clinicas" com ID:', stationId);

      setStationName('');
      setSelectedArea(undefined);
      // router.push('/admin'); // Or to a list of generated templates

    } catch (error)
     {
      console.error('Erro ao gerar ou salvar estação:', error);
      toast({
        title: "Erro ao Salvar",
        description: (error as Error).message || "Ocorreu um problema ao salvar o modelo da estação.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
            Preencha os campos abaixo para gerar um novo modelo de estação clínica.
            Será salvo um arquivo JSON no Storage e um documento no Firestore.
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
                Gerar e Salvar Estação
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateStationFromTemplatePage;
