
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { stationTemplate } from '@/lib/station-data/templates/station_template';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { FilePlus2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Firebase Storage imports
import { getStorage, ref, uploadString } from "firebase/storage";
import { storage } from '@/lib/firebase'; // Ensure storage is exported from your firebase config

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
    return `${areaSlug}-${nameSlug}`;
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
      // 1. Create a deep copy of the template
      const newStation = JSON.parse(JSON.stringify(stationTemplate));

      // 2. Populate the template with form data
      const stationId = generateStationId(selectedArea, stationName);
      newStation.id = stationId;
      newStation.especialidade = selectedArea;
      
      // Add/Update a title field for easier identification, if not already in template
      // For example, directly in the root or within instrucoesParticipante
      newStation.nomeEstacao = stationName; // Custom field for display name
      newStation.instrucoesParticipante.descricaoCompletaCaso = `Paciente com quadro clínico sugestivo de ${stationName}. Detalhes a serem preenchidos.`;
      newStation.palavrasChave = [stationName, selectedArea, "modelo", ...newStation.palavrasChave.slice(0,2)];


      // 3. Convert to JSON string for saving
      const stationJsonString = JSON.stringify(newStation, null, 2);

      // 4. Define Firebase Storage path
      const areaSlug = selectedArea.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const filePath = `estacoes_modelos_geradas/${areaSlug}/${stationId}.json`;
      const storageRef = ref(storage, filePath);

      // 5. Upload to Firebase Storage
      await uploadString(storageRef, stationJsonString, 'raw', { contentType: 'application/json' });
      
      toast({
        title: "Estação Gerada e Salva!",
        description: `Modelo para "${stationName}" salvo em: ${filePath}`,
        variant: "default",
      });
      console.log('Estação Gerada:', newStation);
      console.log('Salva no Firebase Storage em:', filePath);

      // Optionally reset form or navigate
      setStationName('');
      setSelectedArea(undefined);
      // router.push('/admin'); // Or to a list of generated templates

    } catch (error) {
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
            Preencha os campos abaixo para gerar um novo modelo de estação clínica baseado no gabarito padrão.
            O arquivo JSON será salvo no Firebase Storage.
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

// Renomeando o export default para evitar conflito se houver outro com mesmo nome no escopo global da página.
export default CreateStationFromTemplatePage;

// Loader2 icon for loading state (if not already imported, add to lucide-react imports)
import { Loader2 } from 'lucide-react';
