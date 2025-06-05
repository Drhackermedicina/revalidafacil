
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Share2,
  Timer,
  Users,
  MessageSquareText,
  ClipboardList,
  Brain,
  Lock,
  Unlock,
  AlertTriangle,
  PlayCircle,
  PauseCircle,
  BarChartBig,
  Star,
  Smile,
  Meh,
  Frown,
  Info,
  MessageCircleQuestion,
  Copy,
  Link as LinkIcon,
  Eye,
  EyeOff,
  Menu,
  ListChecks
} from "lucide-react";
import Image from "next/image";
import { suggestQuestions, type SuggestQuestionsInput, type SuggestQuestionsOutput } from "@/ai/flows/suggest-questions";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";

// Define types for checklist data
interface ChecklistItemEvaluation {
  inadequate: number | null;
  partial: number | null;
  adequate: number | null;
}

interface ChecklistItem {
  id: string;
  description: string;
  points: ChecklistItemEvaluation;
  type: string; // e.g., 'ac', 'an', 'dx', 'ct'
  observation?: string;
}

interface PrintedMaterial {
  id: string;
  title: string;
  content: string;
  imageSrc?: string;
  imageAlt?: string;
  isLocked: boolean;
}

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  tag: string;
}

interface ChecklistData {
  title: string;
  area: string;
  code: string;
  scenario: { title: string; description: string };
  tasks: { title: string; timeLimit: string; items: string[] };
  actorInstructions: { title: string; content: string };
  printedMaterials: PrintedMaterial[];
  checklistItems: ChecklistItem[];
  references: { text: string; url: string }[];
  flashcards: Flashcard[];
}

interface TrainingPageClientProps {
  checklistData: ChecklistData;
}

type EvaluationScore = "inadequate" | "partial" | "adequate" | "not_evaluated";

interface ChecklistItemState extends ChecklistItem {
  evaluation: EvaluationScore;
  currentScore: number;
}

interface PrintedMaterialState extends PrintedMaterial {
  isRevealed: boolean;
}

const evaluationLabels: Record<EvaluationScore, string> = {
  inadequate: "I",
  partial: "P",
  adequate: "S",
  not_evaluated: "N/A"
};

const initialTimerValue = 10 * 60; // 10 minutes in seconds

export default function TrainingPageClient({ checklistData }: TrainingPageClientProps) {
  const { toast } = useToast();
  const [isManagerView, setIsManagerView] = useState(true); // Simulate manager/student view
  const [checklistItemsState, setChecklistItemsState] = useState<ChecklistItemState[]>(
    checklistData.checklistItems.map(item => ({ ...item, evaluation: "not_evaluated", currentScore: 0 }))
  );
  const [printedMaterialsState, setPrintedMaterialsState] = useState<PrintedMaterialState[]>(
    checklistData.printedMaterials.map(item => ({ ...item, isRevealed: !item.isLocked }))
  );
  
  const [studentQuestions, setStudentQuestions] = useState("");
  const [suggestedAIQuestions, setSuggestedAIQuestions] = useState<string[]>([]);
  const [isAISuggesting, setIsAISuggesting] = useState(false);
  
  const [currentTimer, setCurrentTimer] = useState(initialTimerValue);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<"up" | "down" | "clock" | "hidden">("down");
  
  const [totalScore, setTotalScore] = useState(0);
  const [maxPossibleScore, setMaxPossibleScore] = useState(0);

  const [tasksCompleted, setTasksCompleted] = useState<boolean[]>(new Array(checklistData.tasks.items.length).fill(false));

  const [activeRightPanelTab, setActiveRightPanelTab] = useState<"controls" | "actor" | "impressos">("controls");
  const [shareableLink, setShareableLink] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareableLink(`${window.location.origin}/training?code=${checklistData.code}`);
    }
  }, [checklistData.code]);

  useEffect(() => {
    const maxScore = checklistItemsState.reduce((sum, item) => {
      const scores = [item.points.inadequate, item.points.partial, item.points.adequate].filter(s => s !== null) as number[];
      return sum + (scores.length > 0 ? Math.max(...scores) : 0);
    }, 0);
    setMaxPossibleScore(maxScore);
  }, [checklistItemsState]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isTimerRunning) {
      if (timerMode === "down" && currentTimer > 0) {
        interval = setInterval(() => setCurrentTimer(prev => prev - 1), 1000);
      } else if (timerMode === "up") {
        interval = setInterval(() => setCurrentTimer(prev => prev + 1), 1000);
      } else if (timerMode === "down" && currentTimer === 0) {
        setIsTimerRunning(false);
        toast({ title: "Tempo esgotado!", variant: "destructive" });
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, currentTimer, timerMode, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleEvaluationChange = (itemId: string, evaluation: EvaluationScore) => {
    setChecklistItemsState(prevItems => {
      const newItems = prevItems.map(item => {
        if (item.id === itemId) {
          let score = 0;
          if (evaluation === "inadequate") score = item.points.inadequate ?? 0;
          else if (evaluation === "partial") score = item.points.partial ?? 0;
          else if (evaluation === "adequate") score = item.points.adequate ?? 0;
          return { ...item, evaluation, currentScore: score };
        }
        return item;
      });
      
      const newTotalScore = newItems.reduce((sum, item) => sum + item.currentScore, 0);
      setTotalScore(newTotalScore);
      return newItems;
    });
  };

  const togglePrintedMaterialLock = (materialId: string) => {
    if (!isManagerView) return; // Only manager can unlock
    setPrintedMaterialsState(prevMaterials =>
      prevMaterials.map(material =>
        material.id === materialId ? { ...material, isRevealed: !material.isRevealed } : material
      )
    );
  };

  const handleAISuggest = async () => {
    setIsAISuggesting(true);
    setSuggestedAIQuestions([]);
    try {
      const checklistItemsText = checklistItemsState.map(item => item.description.replace(/<[^>]+>/g, '')).join('\n');
      const input: SuggestQuestionsInput = {
        scenario: checklistData.scenario.description.replace(/<[^>]+>/g, ''),
        checklistItems: checklistItemsText,
        actorDescription: checklistData.actorInstructions.content.replace(/<[^>]+>/g, ''),
        studentQuestionsAsked: studentQuestions,
      };
      const result = await suggestQuestions(input);
      setSuggestedAIQuestions(result.suggestedQuestions);
      toast({ title: "Sugestões de IA recebidas!", description: `${result.suggestedQuestions.length} perguntas sugeridas.` });
    } catch (error) {
      console.error("AI suggestion error:", error);
      toast({ title: "Erro ao buscar sugestões", description: "Tente novamente mais tarde.", variant: "destructive" });
    } finally {
      setIsAISuggesting(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: `${type} copiado!`, description: text });
    }).catch(err => {
      toast({ title: `Falha ao copiar ${type}`, description: err.message, variant: "destructive" });
    });
  };

  const handleTaskToggle = (index: number) => {
    setTasksCompleted(prev => {
      const newTasks = [...prev];
      newTasks[index] = !newTasks[index];
      return newTasks;
    });
  };
  const completedTasksCount = tasksCompleted.filter(Boolean).length;

  const ChecklistItemEvaluationButtons: React.FC<{ item: ChecklistItemState }> = ({ item }) => (
    <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1">
      {(Object.keys(item.points) as Array<keyof ChecklistItemEvaluation>).map(key => {
        const pointValue = item.points[key];
        if (pointValue === null && key === "partial") return null; // Skip partial if not applicable
        
        const scoreKey = key as EvaluationScore;

        return (
          <Button
            key={key}
            size="sm"
            variant={item.evaluation === scoreKey ? "default" : "outline"}
            onClick={() => handleEvaluationChange(item.id, scoreKey)}
            className="text-xs px-2 py-1 h-auto flex-1 min-w-[60px]"
            disabled={!isManagerView}
          >
            {evaluationLabels[scoreKey]} ({pointValue ?? "-"})
          </Button>
        );
      })}
    </div>
  );

  return (
    <div className="container mx-auto p-0 md:p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area (Checklist, Scenario, etc.) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="border-b pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <Badge variant="secondary" className="mb-1">{checklistData.area}</Badge>
                  <h1 className="text-2xl font-bold font-headline text-primary">{checklistData.title}</h1>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm"><Share2 className="mr-2 h-4 w-4" /> Compartilhar</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Compartilhar Checklist</DialogTitle>
                      <DialogDescription>Copie o código ou o link para compartilhar com seus parceiros de estudo.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex items-center space-x-2">
                        <Input readOnly value={checklistData.code} />
                        <Button onClick={() => copyToClipboard(checklistData.code, "Código")} size="icon"><Copy className="h-4 w-4"/></Button>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Input readOnly value={shareableLink} />
                        <Button onClick={() => copyToClipboard(shareableLink, "Link")} size="icon" disabled={!shareableLink}><LinkIcon className="h-4 w-4"/></Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="p-4 border rounded-md bg-background">
                <h3 className="text-lg font-semibold flex items-center"><Info className="mr-2 h-5 w-5 text-accent"/> {checklistData.scenario.title}</h3>
                <div className="text-sm text-foreground/80 mt-2 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: checklistData.scenario.description }} />
              </div>
              <div className="p-4 border rounded-md bg-background">
                <h3 className="text-lg font-semibold flex items-center"><ClipboardList className="mr-2 h-5 w-5 text-accent"/> {checklistData.tasks.title} <Badge variant="outline" className="ml-2">Próximos {checklistData.tasks.timeLimit}</Badge></h3>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-foreground/80">
                  {checklistData.tasks.items.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {isManagerView && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center"><MessageSquareText className="mr-2 h-5 w-5 text-accent"/> {checklistData.actorInstructions.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-48">
                  <div className="text-sm text-foreground/80 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: checklistData.actorInstructions.content }} />
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Materiais Impressos</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {printedMaterialsState.map((material) => (
                  <AccordionItem value={material.id} key={material.id}>
                    <AccordionTrigger className="text-base">
                      <div className="flex items-center justify-between w-full">
                        <span>{material.title}</span>
                        {material.isLocked && !material.isRevealed && <Lock className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {material.isLocked && !material.isRevealed && isManagerView && (
                        <Button onClick={() => togglePrintedMaterialLock(material.id)} size="sm" className="mb-2">
                          <Unlock className="mr-2 h-4 w-4" /> Revelar Material
                        </Button>
                      )}
                      {material.isRevealed ? (
                        <>
                          {material.imageSrc && (
                            <div className="my-2 relative w-full max-w-xs h-auto aspect-video">
                              <Image src={material.imageSrc} alt={material.imageAlt || material.title} layout="fill" objectFit="contain" className="rounded-md border" data-ai-hint={material.imageAlt || "medical document"}/>
                            </div>
                          )}
                          <div className="text-sm text-foreground/80 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: material.content }} />
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">Material bloqueado. {isManagerView ? "Clique em 'Revelar Material' para visualizar." : "Aguardando liberação pelo avaliador."}</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center"><ListChecks className="mr-2 h-5 w-5 text-accent"/> Checklist (PEP)</CardTitle>
              {maxPossibleScore > 0 && (
                 <CardDescription>
                  Pontuação: {totalScore.toFixed(2)} / {maxPossibleScore.toFixed(2)} ({(totalScore / maxPossibleScore * 100).toFixed(1)}%)
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-[600px]">
                <div className="space-y-4">
                  {checklistItemsState.map((item) => (
                    <div key={item.id} className="p-3 border rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                        <div className="md:col-span-2">
                          <div className="text-sm prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: item.description }} />
                          {item.observation && (
                            <p className="mt-2 text-xs text-destructive italic bg-destructive/10 p-2 rounded-md flex items-start">
                              <AlertTriangle className="h-3 w-3 mr-1 mt-0.5 shrink-0" />
                              {item.observation}
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-1">
                          <ChecklistItemEvaluationButtons item={item} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="vertical"/>
              </ScrollArea>
               {!isManagerView && !checklistItemsState.every(item => item.evaluation !== "not_evaluated") && (
                <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 text-yellow-700 rounded-md text-sm">
                  <AlertTriangle className="inline h-4 w-4 mr-1" />
                  <strong>Atenção:</strong> O checklist só será salvo após todos os itens do PEP serem avaliados pelo gerenciador.
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4 flex flex-col sm:flex-row gap-2">
               <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" className="w-full sm:w-auto" disabled={!isManagerView && totalScore === 0}><BarChartBig className="mr-2 h-4 w-4"/>Análise de Resultados</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader><DialogTitle>Análise de Resultados</DialogTitle></DialogHeader>
                    <p className="text-center py-8">Gráfico de resultados aparecerá aqui.</p>
                    <Progress value={maxPossibleScore > 0 ? (totalScore / maxPossibleScore * 100) : 0} className="w-full" />
                    <p className="text-center text-sm mt-2">Pontuação: {totalScore.toFixed(2)} / {maxPossibleScore.toFixed(2)} ({(maxPossibleScore > 0 ? (totalScore / maxPossibleScore * 100) : 0).toFixed(1)}%)</p>
                  </DialogContent>
                </Dialog>
                 <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto"><MessageCircleQuestion className="mr-2 h-4 w-4"/>Feedback</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Feedback | Erro, Dúvida ou Sugestão</DialogTitle></DialogHeader>
                    {/* Feedback form would go here */}
                     <Textarea placeholder="Escreva aqui o erro, dúvida ou sugestão." rows={5}/>
                     <DialogFooter className="mt-2">
                       <DialogClose asChild><Button variant="ghost">Cancelar</Button></DialogClose>
                       <Button>Enviar Feedback</Button>
                     </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                     <Button variant="secondary" className="w-full sm:w-auto"><Brain className="mr-2 h-4 w-4"/>Flashcards</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
                     <DialogHeader><DialogTitle>Flashcards | {checklistData.title}</DialogTitle></DialogHeader>
                     <ScrollArea className="flex-1">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
                       {checklistData.flashcards.map(fc => (
                         <Card key={fc.id} className="min-h-[200px] flex flex-col">
                           <CardHeader className="pb-2">
                             <CardTitle className="text-base">{fc.question}</CardTitle>
                             <Badge variant="outline" className="w-fit text-xs">{fc.tag}</Badge>
                           </CardHeader>
                           <CardContent className="flex-1">
                             <Accordion type="single" collapsible>
                               <AccordionItem value="answer" className="border-none">
                                 <AccordionTrigger className="text-sm py-1 text-accent hover:no-underline">Ver Resposta</AccordionTrigger>
                                 <AccordionContent className="text-sm text-foreground/80 pt-1">{fc.answer}</AccordionContent>
                               </AccordionItem>
                             </Accordion>
                           </CardContent>
                           <CardFooter className="pt-2 border-t mt-auto">
                             <div className="flex justify-around w-full">
                               <Button variant="ghost" size="icon" className="hover:bg-red-100 dark:hover:bg-red-900"><Frown className="h-5 w-5 text-red-500"/></Button>
                               <Button variant="ghost" size="icon" className="hover:bg-yellow-100 dark:hover:bg-yellow-900"><Meh className="h-5 w-5 text-yellow-500"/></Button>
                               <Button variant="ghost" size="icon" className="hover:bg-green-100 dark:hover:bg-green-900"><Smile className="h-5 w-5 text-green-500"/></Button>
                             </div>
                           </CardFooter>
                         </Card>
                       ))}
                       </div>
                     </ScrollArea>
                  </DialogContent>
                </Dialog>
            </CardFooter>
          </Card>
        </div>

        {/* Right Panel (Timer, AI, Participants, etc.) */}
        <div className="lg:col-span-1 space-y-6 sticky top-[calc(theme(spacing.16)+theme(spacing.6))] h-fit">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold flex items-center"><Timer className="mr-2 h-5 w-5 text-primary"/>Controle</CardTitle>
               <div className="flex items-center gap-1">
                  <Button variant={activeRightPanelTab === 'controls' ? 'default': 'ghost'} size="icon" onClick={() => setActiveRightPanelTab('controls')} aria-label="Controles e Timer">
                    <Menu className="h-4 w-4"/>
                  </Button>
                  <Button variant={activeRightPanelTab === 'actor' ? 'default': 'ghost'} size="icon" onClick={() => setActiveRightPanelTab('actor')} aria-label="Informações do Ator" disabled={!isManagerView}>
                    <MessageSquareText className="h-4 w-4"/>
                  </Button>
                  <Button variant={activeRightPanelTab === 'impressos' ? 'default': 'ghost'} size="icon" onClick={() => setActiveRightPanelTab('impressos')} aria-label="Materiais Impressos">
                    <Eye className="h-4 w-4"/>
                  </Button>
                </div>
            </CardHeader>
            
            {activeRightPanelTab === 'controls' && (
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{formatTime(currentTimer)}</div>
                <div className="text-xs text-muted-foreground">
                  {timerMode === "down" ? "Tempo Restante" : "Tempo Decorrido"}
                </div>
              </div>
              {isManagerView && (
                <Button onClick={() => setIsTimerRunning(!isTimerRunning)} className="w-full">
                  {isTimerRunning ? <PauseCircle className="mr-2 h-4 w-4" /> : <PlayCircle className="mr-2 h-4 w-4" />}
                  {isTimerRunning ? "Pausar" : "Iniciar"}
                </Button>
              )}
              <Separator />
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {maxPossibleScore > 0 ? `${(totalScore / maxPossibleScore * 100).toFixed(1)}%` : "0.0%"}
                </div>
                <div className="text-xs text-muted-foreground">Resultado Atual</div>
              </div>
              <Progress value={maxPossibleScore > 0 ? (totalScore / maxPossibleScore * 100) : 0} className="w-full" />
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center"><Users className="mr-2 h-4 w-4 text-primary"/>Participantes</h4>
                <div className="p-2 bg-muted rounded-md text-xs text-center text-muted-foreground">Aguardando participante...</div>
                {/* Participant list would go here */}
              </div>
            </CardContent>
            )}
            {activeRightPanelTab === 'actor' && isManagerView && (
               <CardContent>
                 <h4 className="text-sm font-medium mb-2">{checklistData.actorInstructions.title}</h4>
                 <ScrollArea className="h-64 text-xs text-foreground/80 prose prose-xs max-w-none" dangerouslySetInnerHTML={{ __html: checklistData.actorInstructions.content }} />
               </CardContent>
            )}
            {activeRightPanelTab === 'impressos' && (
               <CardContent>
                 <h4 className="text-sm font-medium mb-2">Materiais Impressos</h4>
                 <ScrollArea className="h-64">
                   <div className="space-y-2">
                   {printedMaterialsState.map(material => (
                     <Button key={material.id} variant="outline" size="sm" className="w-full justify-start text-xs" 
                             onClick={() => {
                               const element = document.getElementById(material.id)?.querySelector('button'); // Find trigger
                               if (element) {
                                 element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                 if (element.getAttribute('data-state') === 'closed') element.click(); // Open if closed
                               }
                               if (isManagerView && material.isLocked && !material.isRevealed) {
                                 togglePrintedMaterialLock(material.id);
                               }
                             }}
                             disabled={!isManagerView && material.isLocked && !material.isRevealed}
                     >
                       {material.isLocked && !material.isRevealed ? <Lock className="mr-2 h-3 w-3"/> : <Eye className="mr-2 h-3 w-3"/>}
                       {material.title}
                     </Button>
                   ))}
                   </div>
                 </ScrollArea>
               </CardContent>
            )}
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center"><Brain className="mr-2 h-5 w-5 text-accent"/>Sugestões da IA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="Digite aqui as perguntas que você já fez ao paciente..."
                value={studentQuestions}
                onChange={(e) => setStudentQuestions(e.target.value)}
                rows={4}
                className="text-sm"
              />
              <Button onClick={handleAISuggest} disabled={isAISuggesting} className="w-full">
                {isAISuggesting ? "Sugerindo..." : "Obter Sugestões"}
              </Button>
              {suggestedAIQuestions.length > 0 && (
                <div className="mt-3 p-3 border rounded-md bg-accent/10">
                  <h4 className="text-sm font-medium mb-2 text-accent">Perguntas Sugeridas:</h4>
                  <ScrollArea className="h-32">
                    <ul className="list-disc list-inside space-y-1 text-sm text-foreground/90">
                      {suggestedAIQuestions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Task Button and Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="default"
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-xl flex flex-col items-center justify-center z-50"
            aria-label="Tarefas"
          >
            <span className="text-lg font-bold">{completedTasksCount}/{checklistData.tasks.items.length}</span>
            <span className="text-xs">Tarefas</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Tarefas</SheetTitle>
            <SheetDescription>Marque as tarefas conforme as completa.</SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-120px)] mt-4">
            <div className="space-y-3 pr-4">
            {checklistData.tasks.items.map((task, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 border rounded-md hover:bg-muted/50">
                <Checkbox
                  id={`task-${index}`}
                  checked={tasksCompleted[index]}
                  onCheckedChange={() => handleTaskToggle(index)}
                />
                <Label htmlFor={`task-${index}`} className="text-sm cursor-pointer flex-1">{task}</Label>
              </div>
            ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

