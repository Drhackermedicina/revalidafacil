
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import AppLayout from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Swords, CircleSlash, UserPlus, Coffee, Send, Users, MessageSquare, Search, Activity, Scissors, Stethoscope, Baby, ShieldCheck, Shuffle, PhoneCall, PhoneOff, Mic, MicOff, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from '@/context/AuthContext';
import { toast } from "@/hooks/use-toast";
import socket from '@/lib/socket'; 

type UserStatus = "training" | "busy" | "looking" | "inactive";

interface ChatUser {
  id: string; 
  nickname: string;
  authUserId?: string; 
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

const STUN_SERVER = 'stun:stun.l.google.com:19302';

export default function ChatplayPage() {
  const { user: authUser, isLoading: authLoading } = useAuth();
  const [nickname, setNickname] = useState<string | null>(null);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [tempNickname, setTempNickname] = useState('');
  
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const [showPartnerSearchModal, setShowPartnerSearchModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | undefined>(medicalAreas[0].value);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | undefined>(difficulties[0].value);
  const [selectedQuantity, setSelectedQuantity] = useState<string | undefined>(stationQuantities[0].value);

  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const remoteStream = useRef<MediaStream | null>(null);
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [incomingCall, setIncomingCall] = useState<{ fromId: string, fromNickname: string, offer: RTCSessionDescriptionInit } | null>(null);
  const [targetUserForCall, setTargetUserForCall] = useState<ChatUser | null>(null);
  const [hasMicPermission, setHasMicPermission] = useState(false);

  const getInitials = (name: string) => {
    if (!name) return '??';
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + (parts[parts.length - 1][0] || '')).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const connectToSocket = useCallback(() => {
    if (!socket.connected && nickname && authUser?.uid) {
      socket.auth = {
        nickname: nickname,
        authUserId: authUser.uid,
        avatarUrl: authUser.photoURL || `https://placehold.co/40x40.png?text=${getInitials(nickname)}`
      };
      socket.connect();
    }
  }, [nickname, authUser]);

  useEffect(() => {
    if(nickname && authUser) {
      connectToSocket();
    }
    return () => {
      if (socket.connected) {
        // Clean up call if socket disconnects abruptly
        if(isCallActive) handleEndCall(false); 
        socket.disconnect();
      }
    };
  }, [nickname, authUser, connectToSocket, isCallActive]);


  useEffect(() => {
    const storedNickname = localStorage.getItem('chatplayNickname');
    if (storedNickname) {
      setNickname(storedNickname);
    } else if (!authLoading && authUser) {
        setTempNickname(authUser.displayName || '');
        setShowNicknameModal(true);
    } else if (!authLoading && !authUser){
        // If not logged in and no stored nickname, force modal
        setShowNicknameModal(true);
    }
  }, [authUser, authLoading]);

  const initializePeerConnection = useCallback(() => {
    if (peerConnection.current) {
        peerConnection.current.close();
    }
    const pc = new RTCPeerConnection({ iceServers: [{ urls: STUN_SERVER }] });

    pc.onicecandidate = (event) => {
      if (event.candidate && targetUserForCall?.id) {
        socket.emit('ice-candidate', { to: targetUserForCall.id, candidate: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        remoteStream.current = event.streams[0];
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream.current;
          remoteAudioRef.current.play().catch(e => console.warn("Remote audio play error", e));
        }
      }
    };
    
    if (localStream.current) {
        localStream.current.getTracks().forEach(track => pc.addTrack(track, localStream.current!));
    }

    peerConnection.current = pc;
  }, [targetUserForCall?.id]);


  const getMicrophonePermission = useCallback(async () => {
    if (hasMicPermission && localStream.current) return localStream.current; // Already have permission and stream

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      localStream.current = stream;
      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
        // localAudioRef.current.muted = true; // Mute local playback
        localAudioRef.current.play().catch(e => console.warn("Local audio play error", e));
      }
      setHasMicPermission(true);
      toast({ title: "Microfone Habilitado!", description: "Você pode iniciar chamadas."});
      return stream;
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microfone Necessário",
        description: "Permita o acesso ao microfone para usar o chat de áudio.",
        variant: "destructive",
      });
      setHasMicPermission(false);
      return null;
    }
  }, [toast, hasMicPermission]);


  useEffect(() => {
    if (!socket || !nickname) return;

    socket.on('update-user-list', (userList: ChatUser[]) => {
      setUsers(userList.map(u => ({...u, id: u.id || u.authUserId! })));
    });

    socket.on('new-message', (message: ChatMessage) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    socket.on('audio-call-request', async ({ fromId, fromNickname, offerSdp }) => {
        console.log(`[Client] Recebendo audio-call-request de ${fromNickname} (${fromId})`);
        const userMakingCall = users.find(u => u.id === fromId || u.authUserId === fromId);
        if(userMakingCall) {
             setTargetUserForCall(userMakingCall); 
        }
        setIncomingCall({ fromId, fromNickname, offer: offerSdp });
    });
    
    socket.on('audio-call-accepted', async ({ fromId, fromNickname, answerSdp }) => {
        console.log(`[Client] Chamada aceita por ${fromNickname}. Configurando remote description.`);
        if (peerConnection.current && answerSdp) {
            try {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answerSdp));
                setIsCallActive(true);
                toast({ title: "Chamada Conectada!", description: `Você está em uma chamada com ${fromNickname}`});
            } catch (error) {
                 console.error("[Client] Erro ao definir remote description (answer):", error);
                 toast({title: "Erro de Conexão", description: "Falha ao processar resposta da chamada.", variant: "destructive"});
            }
        }
    });
    
    socket.on('ice-candidate-received', async ({ candidate }) => {
        // console.log("[Client] Recebido ICE candidate:", candidate);
        if (peerConnection.current && candidate) {
            try {
                await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (e) {
                console.error('[Client] Erro ao adicionar ICE candidate recebido:', e);
            }
        }
    });

    socket.on('call-ended', ({ fromNickname, reason }) => {
        const reasonMessage = reason === 'disconnect' ? `${fromNickname} desconectou.` : `A chamada com ${fromNickname} foi encerrada.`
        toast({ title: "Chamada Encerrada", description: reasonMessage });
        handleEndCall(false); 
    });
    
    return () => {
      socket.off('update-user-list');
      socket.off('new-message');
      socket.off('audio-call-request');
      socket.off('audio-call-accepted');
      socket.off('ice-candidate-received');
      socket.off('call-ended');
    };
  }, [socket, nickname, users, toast, initializePeerConnection]);


  const handleSetNickname = () => {
    if (tempNickname.trim()) {
      const finalNickname = tempNickname.trim();
      setNickname(finalNickname);
      localStorage.setItem('chatplayNickname', finalNickname);
      setShowNicknameModal(false);
      // connectToSocket will be called by useEffect
    } else {
      toast({title: "Apelido Inválido", description: "Por favor, insira um apelido.", variant:"destructive"});
    }
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() && nickname && socket.connected) {
      const messageData = {
        text: currentMessage.trim(),
      };
      socket.emit('send-message', messageData);
      setCurrentMessage('');
    }
  };

  const handleStartPartnerSearch = () => {
    toast({
      title: "Busca Iniciada!",
      description: `Procurando parceiro para área ${selectedArea}, dificuldade ${selectedDifficulty}, ${selectedQuantity} estação(ões).`,
    });
    setShowPartnerSearchModal(false);
    // TODO: Implement actual partner search logic via socket
  };

  const handleInitiateCall = async (targetUser: ChatUser) => {
    if (isCallActive) {
        toast({ title: "Chamada em Andamento", description: "Você já está em uma chamada.", variant: "default" });
        return;
    }
    const stream = await getMicrophonePermission();
    if(!stream) return;
    
    setTargetUserForCall(targetUser);
    initializePeerConnection(); 

    if (peerConnection.current && localStream.current) {
        // Ensure tracks are added if PC was re-initialized
        if(peerConnection.current.getSenders().length === 0) {
            localStream.current.getTracks().forEach(track => {
                peerConnection.current?.addTrack(track, localStream.current!);
            });
        }

        try {
            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);
            socket.emit('audio-call-request', { to: targetUser.id, offerSdp: offer });
            toast({ title: "Chamando...", description: `Ligando para ${targetUser.nickname}` });
        } catch (error) {
            console.error("[Client] Erro ao criar offer:", error);
            toast({ title: "Erro ao Ligar", description: "Não foi possível iniciar a chamada.", variant: "destructive"});
        }
    }
  };

  const handleAcceptCall = async () => {
    if (!incomingCall) return;

    const stream = await getMicrophonePermission();
    if(!stream) {
        setIncomingCall(null);
        return;
    }

    const caller = users.find(u => u.id === incomingCall.fromId);
    setTargetUserForCall(caller || { id: incomingCall.fromId, nickname: incomingCall.fromNickname, status: 'busy'}); // Set target for ICE candidates etc.
    initializePeerConnection(); 

    if (peerConnection.current && localStream.current) {
        if(peerConnection.current.getSenders().length === 0) {
            localStream.current.getTracks().forEach(track => {
                 peerConnection.current?.addTrack(track, localStream.current!);
            });
        }
        try {
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);
            socket.emit('audio-call-accepted', { to: incomingCall.fromId, answerSdp: answer });
            setIsCallActive(true);
            toast({ title: "Chamada Aceita!", description:`Em chamada com ${incomingCall.fromNickname}`});
        } catch (error) {
            console.error("[Client] Erro ao lidar com chamada recebida:", error);
            toast({ title: "Erro ao Atender", description: "Não foi possível atender a chamada.", variant: "destructive"});
        }
    }
    setIncomingCall(null);
  };

  const handleRejectCall = () => {
    if (incomingCall) {
      // Optionally, inform the other user the call was rejected
      // socket.emit('call-rejected', { to: incomingCall.fromId });
      toast({ title: "Chamada Recusada"});
    }
    setIncomingCall(null);
  };

  const handleEndCall = useCallback((emitEvent = true) => {
    if (emitEvent && targetUserForCall?.id && socket.connected) {
      socket.emit('end-audio-call', { to: targetUserForCall.id });
    }
    
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    if (localStream.current) {
      localStream.current.getTracks().forEach(track => track.stop());
      localStream.current = null;
    }
    if (remoteStream.current) {
        remoteStream.current.getTracks().forEach(track => track.stop());
        remoteStream.current = null;
    }
    if (localAudioRef.current) localAudioRef.current.srcObject = null;
    if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;
    
    setIsCallActive(false);
    setTargetUserForCall(null);
    setIncomingCall(null);
    // Do not reset hasMicPermission here, user might want to make another call.
    // It will be reset if they leave and come back or refresh.
    if (emitEvent) toast({title: "Chamada Encerrada"});
  }, [targetUserForCall, socket, toast]);

  const handleToggleMute = () => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(prev => !prev);
      toast({title: isMuted ? "Microfone Ativado" : "Microfone Desativado"});
    }
  };

  useEffect(() => {
    // Attempt to get microphone permission early if nickname is set
    if (nickname && !hasMicPermission && !authLoading) {
      getMicrophonePermission();
    }
  }, [nickname, hasMicPermission, getMicrophonePermission, authLoading]);


  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-var(--header-height,10rem))] md:h-[calc(100vh-var(--header-height,8rem))]">
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline flex items-center">
              <MessageSquare className="mr-3 h-7 w-7 text-primary" />
              Chatplay Revalida Fácil
            </CardTitle>
            <CardDescription>
              Conecte-se, forme duplas e discuta casos. {nickname ? `Você está como: ${nickname}` : "Defina um apelido para começar."}
               {!hasMicPermission && nickname && " (Microfone não habilitado)"}
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-hidden">
          <Card className="md:col-span-1 lg:col-span-1 flex flex-col overflow-hidden shadow-md">
            <CardHeader className="py-3 px-4 border-b">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5" /> Usuários Online ({users.filter(u => u.id !== socket.id && u.nickname).length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-3 space-y-2">
                  {users.filter(u => u.id !== socket.id && u.nickname).map(user => {
                    const StatusIcon = statusIcons[user.status] || Coffee;
                    return (
                      <div key={user.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                        <div className="flex items-center space-x-2 overflow-hidden">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatarUrl} alt={user.nickname} data-ai-hint="profile avatar" />
                            <AvatarFallback>{getInitials(user.nickname)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium truncate" title={user.nickname}>{user.nickname}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => handleInitiateCall(user)}
                            disabled={isCallActive || !nickname || !hasMicPermission || incomingCall !== null}
                            title={`Ligar para ${user.nickname}`}
                          >
                            <PhoneCall className="h-4 w-4" />
                          </Button>
                          <StatusIcon className={cn("h-4 w-4",
                            user.status === 'looking' && 'text-green-500',
                            user.status === 'training' && 'text-blue-500',
                            user.status === 'busy' && 'text-red-500',
                            user.status === 'inactive' && 'text-yellow-500'
                          )} title={statusTooltips[user.status]} />
                        </div>
                      </div>
                    );
                  })}
                   {users.filter(u => u.id !== socket.id && u.nickname).length === 0 && (
                    <p className="text-xs text-muted-foreground p-2 text-center">Nenhum outro usuário online.</p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
             <CardFooter className="p-2 border-t flex flex-col gap-2">
                <Button variant="default" size="sm" className="w-full" onClick={() => setShowPartnerSearchModal(true)} disabled={!nickname}>
                  <Search className="mr-2 h-4 w-4" /> Buscar Parceiro
                </Button>
                 {isCallActive && targetUserForCall && (
                    <Card className="w-full p-2 mt-2 border-primary">
                        <CardDescription className="text-xs text-center mb-1">Em chamada com: {targetUserForCall.nickname}</CardDescription>
                        <div className="flex justify-center space-x-2">
                            <Button onClick={handleToggleMute} variant="outline" size="icon" className="h-8 w-8">
                                {isMuted ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4 text-green-500" />}
                            </Button>
                            <Button onClick={() => handleEndCall()} variant="destructive" size="icon" className="h-8 w-8">
                                <PhoneOff className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                )}
                {!hasMicPermission && nickname && !isCallActive && (
                    <Button variant="outline" size="sm" className="w-full mt-1" onClick={getMicrophonePermission}>
                        <Mic className="mr-2 h-4 w-4 text-orange-500"/> Habilitar Microfone
                    </Button>
                )}
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
                  disabled={!nickname || !socket.connected}
                  className="flex-grow"
                />
                <Button onClick={handleSendMessage} disabled={!nickname || !currentMessage.trim() || !socket.connected}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Enviar</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <audio ref={localAudioRef} autoPlay muted playsInline className="hidden"></audio>
        <audio ref={remoteAudioRef} autoPlay playsInline className="hidden"></audio>

        <Dialog open={showNicknameModal} onOpenChange={(isOpen) => {
            if (!nickname && !isOpen) {
                 // Prevent closing if nickname not set, unless auth is also loading (to avoid locking user)
                 if(!authLoading) setShowNicknameModal(true); 
            } else {
                 setShowNicknameModal(isOpen);
            }
        }}>
          <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => { if(!nickname && !authLoading) e.preventDefault()}} onEscapeKeyDown={(e) => {if(!nickname && !authLoading) e.preventDefault()}}>
            <DialogHeader>
              <DialogTitle>Bem-vindo ao Chatplay!</DialogTitle>
              <DialogDescription>
                {authUser ? "Confirme ou altere seu apelido para o chat." : "Escolha um apelido para ser exibido no chat."}
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
                  onKeyPress={(e) => e.key === 'Enter' && handleSetNickname()}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSetNickname} disabled={!tempNickname.trim()}>Salvar Apelido</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {incomingCall && !isCallActive && (
          <Dialog open={!!incomingCall} onOpenChange={() => !isCallActive && setIncomingCall(null)}>
            <DialogContent onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle className="flex items-center"><PhoneCall className="mr-2 h-5 w-5 text-green-500"/>Chamada Recebida</DialogTitle>
                <DialogDescription>
                  {incomingCall.fromNickname || "Alguém"} está te ligando.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4 sm:justify-between">
                <Button variant="destructive" onClick={handleRejectCall} className="w-full sm:w-auto">Recusar</Button>
                <Button onClick={handleAcceptCall} className="bg-green-500 hover:bg-green-600 w-full sm:w-auto mt-2 sm:mt-0">Atender</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

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

    