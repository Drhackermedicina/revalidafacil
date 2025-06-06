
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
import { Swords, CircleSlash, UserPlus, Coffee, Send, Users, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from '@/context/AuthContext'; // Para pegar o usuário logado futuramente

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

export default function ChatplayPage() {
  const { user: authUser, isLoading: authLoading } = useAuth();
  const [nickname, setNickname] = useState<string | null>(null);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [tempNickname, setTempNickname] = useState('');
  const [users, setUsers] = useState<ChatUser[]>(mockUsers);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    // Simulação: Verificar se o nickname já foi definido (ex: localStorage)
    // Por enquanto, sempre mostra o modal se não houver nickname
    const storedNickname = localStorage.getItem('chatplayNickname');
    if (storedNickname) {
      setNickname(storedNickname);
    } else if (!authLoading && authUser) {
        // Se não tem no localStorage mas tem usuário autenticado, sugere o displayName
        setTempNickname(authUser.displayName || '');
        setShowNicknameModal(true);
    } else if (!authLoading && !authUser){
        // Se não tem usuário logado e nem nickname, força modal
        setShowNicknameModal(true);
    }
  }, [authUser, authLoading]);

  const handleSetNickname = () => {
    if (tempNickname.trim()) {
      setNickname(tempNickname.trim());
      localStorage.setItem('chatplayNickname', tempNickname.trim()); // Simula persistência
      setShowNicknameModal(false);
       // Adiciona o usuário atual à lista (ou atualiza se já existir com base no authUser.uid)
      if (authUser) {
        setUsers(prevUsers => {
          const existingUserIndex = prevUsers.findIndex(u => u.id === authUser.uid);
          const currentUser: ChatUser = {
            id: authUser.uid,
            nickname: tempNickname.trim(),
            avatarUrl: authUser.photoURL || `https://placehold.co/40x40.png?text=${tempNickname.trim().substring(0,2).toUpperCase()}`,
            status: 'looking', // Status inicial
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
        userId: authUser?.uid || 'guest', // Usar ID do usuário logado ou 'guest'
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


  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-var(--header-height,10rem))] md:h-[calc(100vh-var(--header-height,8rem))]"> {/* Ajustar altura */}
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
          {/* Painel de Usuários */}
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
             <CardFooter className="p-2 border-t">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">Mudar Status</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Mudar seu status</DialogTitle>
                            <DialogDescription>
                                Deixe os outros saberem se você está disponível.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                           {/* Aqui viriam os botões para mudar o status */}
                           <Button variant="outline"> <UserPlus className="mr-2 h-4 w-4 text-green-500"/> Procurando parceiro</Button>
                           <Button variant="outline"> <CircleSlash className="mr-2 h-4 w-4 text-red-500"/> Ocupado</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>
          </Card>

          {/* Painel de Chat */}
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
                 // Se o usuário tentar fechar sem definir um nickname, mantemos aberto ou redirecionamos.
                 // Por simplicidade, vamos apenas manter aberto forçando.
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
      </div>
    </AppLayout>
  );
}
