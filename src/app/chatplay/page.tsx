
"use client";

import { useState, useEffect } from 'react';
import AppLayout from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Swords, CircleSlash, UserPlus, Coffee, Send, Users, MessageSquare, Search, Activity, Scissors, Stethoscope, Baby, ShieldCheck, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from '@/context/AuthContext';
import { toast } from "@/hooks/use-toast";

type UserStatus = "training" | "busy" | "looking" | "inactive";

interface ChatUser {
  id: string;
  nickname: string;
  avatarUrl?: string;
  status: UserStatus;
}

interface ChatMessage {
  id: string;
  userId: string;
  nickname: string;
  text: string;
  timestamp: Date;
}

const statusIcons: Record<UserStatus, React.ElementType> = {
  training: Swords,
  busy: CircleSlash,
  looking: UserPlus,
  inactive: Coffee,
};

const statusTooltips: Record<UserStatus, string> = {
  training: "Em treinamento",
  busy: "Ocupado",
  looking: "Procurando parceiro",
  inactive: "Inativo",
};

const mockUsers: ChatUser[] = [
  { id: '1', nickname: 'Dr. Estranho', status: 'looking', avatarUrl: 'https://placehold.co/40x40.png?text=DE' },
  { id: '2', nickname: 'Enfermeira Joy', status: 'training', avatarUrl: 'https://placehold.co/40x40.png?text=EJ' },
  { id: '3', nickname: 'CardioMaster', status: 'busy', avatarUrl: 'https://placehold.co/40x40.png?text=CM' },
  { id: '4', nickname: 'PedLover', status: 'inactive', avatarUrl: 'https://placehold.co/40x40.png?text=PL' },
  { id: '5', nickname: 'CirurgiãoRaiz', status: 'looking', avatarUrl: 'https://placehold.co/40x40.png?text=CR' },
];

interface AreaOption {
  value: string;
  label: string;
  icon: React.ElementType;
  iconClass: string;
}

const medicalAreas: AreaOption[] = [
  { value: "CM", label: "Clínica Médica", icon: Activity, iconClass: "text-sky-500" },
  { value: "CR", label: "Cirurgia", icon: Scissors, iconClass: "text-purple-500" },
  { value: "GO", label: "G.O", icon: Stethoscope, iconClass: "text-pink-500" },
  { value: "PE", label: "Pediatria", icon: Baby, iconClass: "text-green-500" },
  { value: "PR", label: "Preventiva", icon: ShieldCheck, iconClass: "text-orange-500" },
  { value: "ALEATORIO", label: "Aleatório", icon: Shuffle, iconClass: "text-muted-foreground" },
];

const difficulties = [
  { value: "FACIL", label: "Fácil" },
  { value: "MODERADO", label: "Moderado" },
  { value: "DIFICIL", label: "Difícil" },
];

const stationQuantities = [
  { value: "1", label: "x1" },
  { value: "2", label: "x2" },
  { value: "3", label: "x3" },
  { value: "4", label: "x4" },
  { value: "5", label: "x5" },
];


export default function ChatplayPage() {
  const { user: authUser, isLoading: authLoading } = useAuth();
  const [nickname, setNickname] = useState<string | null>(null);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [tempNickname, setTempNickname] = useState('');
  const [users, setUsers] = useState<ChatUser[]>(mockUsers);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const [showPartnerSearchModal, setShowPartnerSearchModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | undefined>(medicalAreas[0].value);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | undefined>(difficulties[0].value);
  const [selectedQuantity, setSelectedQuantity] = useState<string | undefined>(stationQuantities[0].value);


  useEffect(() => {
    const storedNickname = localStorage.getItem('chatplayNickname');
    if (storedNickname) {
      setNickname(storedNickname);
    } else if (!authLoading && authUser) {
        setTempNickname(authUser.displayName || '');
        setShowNicknameModal(true);
    } else if (!authLoading && !authUser){
        setShowNicknameModal(true);
    }
  }, [authUser, authLoading]);

  const handleSetNickname = () => {
    if (tempNickname.trim()) {
      const finalNickname = tempNickname.trim();
      setNickname(finalNickname);
      localStorage.setItem('chatplayNickname', finalNickname);
      setShowNicknameModal(false);
      if (authUser) {
        setUsers(prevUsers => {
          const existingUserIndex = prevUsers.findIndex(u => u.id === authUser.uid);
          const currentUser: ChatUser = {
            id: authUser.uid,
            nickname: finalNickname,
            avatarUrl: authUser.photoURL || `https://placehold.co/40x40.png?text=${finalNickname.substring(0,2).toUpperCase()}`,
            status: 'looking',
          };
          if (existingUserIndex > -1) {
            const updatedUsers = [...prevUsers];
            updatedUsers[existingUserIndex] = currentUser;
            return updatedUsers;
          }
          return [currentUser, ...prevUsers.filter(u => u.id !== authUser.uid)];
        });
      }
    }
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() && nickname) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        userId: authUser?.uid || 'guest',
        nickname: nickname,
        text: currentMessage.trim(),
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setCurrentMessage('');
    }
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + (parts[parts.length - 1][0] || '')).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleStartPartnerSearch = () => {
    console.log("Iniciando busca de parceiro com os seguintes filtros:", {
      area: selectedArea,
      difficulty: selectedDifficulty,
      quantity: selectedQuantity,
    });
    toast({
      title: "Busca Iniciada!",
      description: `Procurando parceiro para área ${selectedArea}, dificuldade ${selectedDifficulty}, ${selectedQuantity} estação(ões).`,
    });
    // Aqui viria a lógica de busca real (backend)
    setShowPartnerSearchModal(false);
  };


  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-var(--header-height,10rem))] md:h-[calc(100vh-var(--header-height,8rem))]">
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline flex items-center">
              <MessagesSquare className="mr-3 h-7 w-7 text-primary" />
              Chatplay Revalida Fácil
            </CardTitle>
            <CardDescription>
              Conecte-se com outros estudantes, forme duplas e discuta casos.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-hidden">
          <Card className="md:col-span-1 lg:col-span-1 flex flex-col overflow-hidden shadow-md">
            <CardHeader className="py-3 px-4 border-b">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5" /> Usuários Online ({users.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-3 space-y-2">
                  {users.map(user => {
                    const StatusIcon = statusIcons[user.status];
                    return (
                      <div key={user.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                        <div className="flex items-center space-x-2 overflow-hidden">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatarUrl} alt={user.nickname} data-ai-hint="profile avatar" />
                            <AvatarFallback>{getInitials(user.nickname)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium truncate" title={user.nickname}>{user.nickname}</span>
                        </div>
                        <StatusIcon className={cn("h-4 w-4",
                          user.status === 'looking' && 'text-green-500',
                          user.status === 'training' && 'text-blue-500',
                          user.status === 'busy' && 'text-red-500',
                          user.status === 'inactive' && 'text-yellow-500'
                        )} title={statusTooltips[user.status]} />
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
             <CardFooter className="p-2 border-t flex flex-col gap-2">
                <Button variant="default" size="sm" className="w-full" onClick={() => setShowPartnerSearchModal(true)} disabled={!nickname}>
                  <Search className="mr-2 h-4 w-4" /> Buscar Parceiro
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full" disabled={!nickname}>Mudar Status</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Mudar seu status</DialogTitle>
                            <DialogDescription>
                                Deixe os outros saberem se você está disponível.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                           <Button variant="outline"> <UserPlus className="mr-2 h-4 w-4 text-green-500"/> Procurando parceiro</Button>
                           <Button variant="outline"> <CircleSlash className="mr-2 h-4 w-4 text-red-500"/> Ocupado</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>
          </Card>

          <Card className="md:col-span-2 lg:col-span-3 flex flex-col overflow-hidden shadow-md">
            <CardHeader className="py-3 px-4 border-b">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" /> Chat Geral
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow overflow-hidden">
              <ScrollArea className="h-full p-4 space-y-3">
                {messages.map(msg => (
                  <div key={msg.id} className={cn("flex", msg.nickname === nickname ? "justify-end" : "justify-start")}>
                    <div className={cn("max-w-[70%] p-2 rounded-lg text-sm",
                      msg.nickname === nickname ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      {msg.nickname !== nickname && <p className="font-semibold text-xs mb-0.5">{msg.nickname}</p>}
                      <p>{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                ))}
                {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-10">
                        <MessageSquare className="mx-auto h-12 w-12 mb-2" />
                        <p>Nenhuma mensagem ainda. Comece a conversa!</p>
                    </div>
                )}
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-3 border-t">
              <div className="flex w-full space-x-2">
                <Input
                  type="text"
                  placeholder={nickname ? "Digite sua mensagem..." : "Defina um nickname para conversar"}
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={!nickname}
                  className="flex-grow"
                />
                <Button onClick={handleSendMessage} disabled={!nickname || !currentMessage.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Enviar</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <Dialog open={showNicknameModal} onOpenChange={(isOpen) => {
            if (!nickname && !isOpen) {
                 setShowNicknameModal(true);
            } else {
                setShowNicknameModal(isOpen);
            }
        }}>
          <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => { if(!nickname) e.preventDefault()}} onEscapeKeyDown={(e) => {if(!nickname) e.preventDefault()}}>
            <DialogHeader>
              <DialogTitle>Bem-vindo ao Chatplay!</DialogTitle>
              <DialogDescription>
                Escolha um apelido para ser exibido no chat.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nickname" className="text-right">
                  Apelido
                </Label>
                <Input
                  id="nickname"
                  value={tempNickname}
                  onChange={(e) => setTempNickname(e.target.value)}
                  className="col-span-3"
                  placeholder="Seu apelido aqui"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSetNickname} disabled={!tempNickname.trim()}>Salvar Apelido</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Busca de Parceiro */}
        <Dialog open={showPartnerSearchModal} onOpenChange={setShowPartnerSearchModal}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5" /> Buscar Parceiro de Treinamento
              </DialogTitle>
              <DialogDescription>
                Configure suas preferências para encontrar um parceiro.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div>
                <Label className="text-sm font-medium">Área da Medicina</Label>
                <RadioGroup value={selectedArea} onValueChange={setSelectedArea} className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {medicalAreas.map(area => {
                    const AreaIcon = area.icon;
                    return (
                    <Label key={area.value} htmlFor={`area-${area.value}`} className={cn(
                        "flex items-center space-x-2 rounded-md border p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                        selectedArea === area.value && "bg-accent text-accent-foreground border-primary ring-2 ring-primary"
                    )}>
                      <RadioGroupItem value={area.value} id={`area-${area.value}`} className="sr-only" />
                      <AreaIcon className={cn("h-5 w-5", area.iconClass)} />
                      <span className="text-sm font-medium">{area.label}</span>
                    </Label>
                  )})}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium">Dificuldade da Estação</Label>
                 <RadioGroup value={selectedDifficulty} onValueChange={setSelectedDifficulty} className="mt-2 flex flex-wrap gap-2">
                  {difficulties.map(diff => (
                    <Label key={diff.value} htmlFor={`diff-${diff.value}`} className={cn(
                        "rounded-md border px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm",
                        selectedDifficulty === diff.value && "bg-accent text-accent-foreground border-primary ring-2 ring-primary"
                    )}>
                      <RadioGroupItem value={diff.value} id={`diff-${diff.value}`} className="sr-only" />
                      {diff.label}
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium">Quantidade de Estações (por rodada)</Label>
                <p className="text-xs text-muted-foreground mb-2">Cada um será ator e candidato pelo menos uma vez por estação selecionada.</p>
                <RadioGroup value={selectedQuantity} onValueChange={setSelectedQuantity} className="mt-2 flex flex-wrap gap-2">
                  {stationQuantities.map(qty => (
                     <Label key={qty.value} htmlFor={`qty-${qty.value}`} className={cn(
                        "rounded-md border px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm",
                        selectedQuantity === qty.value && "bg-accent text-accent-foreground border-primary ring-2 ring-primary"
                    )}>
                      <RadioGroupItem value={qty.value} id={`qty-${qty.value}`} className="sr-only" />
                      {qty.label}
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button onClick={handleStartPartnerSearch} disabled={!selectedArea || !selectedDifficulty || !selectedQuantity}>
                <Search className="mr-2 h-4 w-4" /> Iniciar Busca
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

