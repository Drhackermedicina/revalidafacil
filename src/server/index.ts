
'use server'; // Embora seja um servidor Node.js, manter a diretiva pode ser útil se partes forem importadas por Server Components/Actions inadvertidamente.

import http from 'http';
import { Server as SocketIOServer, type Socket } from 'socket.io';

// A porta em que o servidor Socket.IO irá escutar.
// Em produção no App Hosting/Cloud Run, a variável PORT será fornecida pelo ambiente.
const PORT = process.env.PORT || 3001;

const httpServer = http.createServer((req, res) => {
  // Servidor HTTP básico. Pode ser usado para health checks se necessário.
  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
  } else {
    res.writeHead(404);
    res.end();
  }
});

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*", // ATENÇÃO: Para produção, restrinja esta origem ao(s) domínio(s) do seu frontend. Ex: process.env.FRONTEND_URL
    methods: ["GET", "POST"]
  },
  // Outras configurações do Socket.IO, se necessário
});

interface UserSessionDetails {
  userId: string;
  role: 'candidate' | 'actor' | 'observer'; // Defina os papéis conforme sua necessidade
  nickname: string;
  socketId: string;
  stationId: string; // Para saber em qual estação o usuário está
}

// Armazenamento em memória para as sessões ativas e usuários.
// ATENÇÃO: Em um ambiente de produção com múltiplos contêineres (como Cloud Run escalado),
// este estado em memória não será compartilhado. Considere usar um armazenamento persistente
// como Firestore ou Redis para gerenciar sessões e usuários de forma distribuída.
const activeSessions: Record<string, { stationId: string; users: Map<string, UserSessionDetails> }> = {};

console.log(`[Socket Server] Configurado. Tentando iniciar na porta ${PORT}`);

io.on('connection', (socket: Socket) => {
  const { sessionId, userId, role, stationId, nickname } = socket.handshake.auth;

  console.log(`[Socket Server] Nova tentativa de conexão de socket: ${socket.id}. Handshake auth:`, socket.handshake.auth);

  if (!sessionId || !userId || !role || !stationId) {
    console.error(`[Socket Server] Falha na autenticação do handshake para socket ${socket.id}: Dados ausentes.`, { sessionId, userId, role, stationId });
    socket.emit('sessionError', { message: 'Dados da sessão inválidos ou ausentes no handshake. Conexão recusada.' });
    socket.disconnect(true);
    return;
  }

  console.log(`[Socket Server] Socket ${socket.id} (Usuário: ${userId}, Nick: "${nickname}", Papel: ${role}) autenticado para sessão ${sessionId}, Estação: ${stationId}`);

  // Adiciona o usuário à sala (sessão)
  socket.join(sessionId);

  // Inicializa a sessão se for a primeira vez
  if (!activeSessions[sessionId]) {
    activeSessions[sessionId] = { stationId, users: new Map() };
    console.log(`[Socket Server] Nova sessão criada: ${sessionId} para estação ${stationId}`);
  }

  // Adiciona ou atualiza o usuário na sessão
  const userDetails: UserSessionDetails = { userId, role, nickname: nickname || 'Anônimo', socketId: socket.id, stationId };
  activeSessions[sessionId].users.set(socket.id, userDetails);

  console.log(`[Socket Server] Usuário ${nickname} (${userId}) como ${role} entrou na sessão ${sessionId}. Total de usuários: ${activeSessions[sessionId].users.size}`);

  // Notifica todos na sala (exceto o remetente) que um novo usuário entrou
  socket.to(sessionId).emit('userJoined', { ...userDetails, usersInSession: Array.from(activeSessions[sessionId].users.values()) });

  // Notifica o usuário que acabou de entrar sobre os participantes atuais e confirma entrada
  socket.emit('sessionJoined', {
    sessionId,
    stationId,
    yourRole: role,
    yourNickname: nickname,
    usersInSession: Array.from(activeSessions[sessionId].users.values())
  });


  // --- Manipuladores de Eventos Específicos da Simulação ---

  // Exemplo: Atualização do Timer (o servidor deve ser a fonte da verdade)
  socket.on('timerControl', (data: { action: 'start' | 'pause' | 'reset', duration?: number }) => {
    if (activeSessions[sessionId]?.users.get(socket.id)?.role === 'actor' || activeSessions[sessionId]?.users.get(socket.id)?.role === 'observer') { // Ex: só o ator/observador controla
      console.log(`[Socket Server] Evento timerControl recebido da sessão ${sessionId}:`, data);
      // Lógica para controlar o timer da sessão
      // io.to(sessionId).emit('timerUpdate', { remainingSeconds: ..., isRunning: ... });
      socket.to(sessionId).emit('timerUpdateFromServer', { message: `Timer action ${data.action} recebido do servidor.` }); // Placeholder
    }
  });

  // Exemplo: Ação do candidato
  socket.on('candidateAction', (data: any) => {
    console.log(`[Socket Server] candidateAction da sessão ${sessionId}:`, data);
    // Validar se é o candidato quem enviou, e encaminhar para o ator/observador
    socket.to(sessionId).emit('candidateActionForwarded', { fromUserId: userId, fromNickname: nickname, action: data });
  });

  // Exemplo: Liberação de material impresso pelo ator
  socket.on('togglePrintedMaterial', (data: { materialId: string; isRevealed: boolean }) => {
     if (activeSessions[sessionId]?.users.get(socket.id)?.role === 'actor') {
        console.log(`[Socket Server] togglePrintedMaterial da sessão ${sessionId}:`, data);
        io.to(sessionId).emit('printedMaterialUpdated', data);
     }
  });

  // Exemplo: Atualização de item do checklist pelo ator/avaliador
  socket.on('updateChecklistItem', (data: { itemId: string; evaluation: string; score: number }) => {
    if (activeSessions[sessionId]?.users.get(socket.id)?.role === 'actor' || activeSessions[sessionId]?.users.get(socket.id)?.role === 'observer') {
      console.log(`[Socket Server] updateChecklistItem da sessão ${sessionId}:`, data);
      io.to(sessionId).emit('checklistItemUpdatedByServer', data);
    }
  });


  // --- Desconexão ---
  socket.on('disconnect', (reason: string) => {
    console.log(`[Socket Server] Socket ${socket.id} (Usuário: ${userId}, Nick: "${nickname}") desconectado da sessão ${sessionId}. Razão: ${reason}`);

    if (activeSessions[sessionId]) {
      activeSessions[sessionId].users.delete(socket.id);
      console.log(`[Socket Server] Usuário removido da sessão ${sessionId}. Usuários restantes: ${activeSessions[sessionId].users.size}`);

      // Notifica os demais usuários na sala
      socket.to(sessionId).emit('userLeft', { userId, nickname, usersInSession: Array.from(activeSessions[sessionId].users.values()) });

      // Se a sessão ficar vazia, pode removê-la
      if (activeSessions[sessionId].users.size === 0) {
        console.log(`[Socket Server] Sessão ${sessionId} está vazia e será removida.`);
        delete activeSessions[sessionId];
      }
    }
  });

  // --- Outros Eventos ---
  // Adicione aqui outros manipuladores para eventos customizados da sua aplicação
  // Ex: socket.on('chatMessage', (msg) => { io.to(sessionId).emit('newChatMessage', msg); });

});

httpServer.listen(PORT, () => {
  console.log(`[Socket Server] Servidor Socket.IO rodando e escutando na porta ${PORT}`);
  console.log(`[Socket Server] Certifique-se que NEXT_PUBLIC_BACKEND_URL no cliente aponta para esta instância.`);
});

// Lida com o encerramento gracioso do servidor
const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'] as const;
signals.forEach(signal => {
  process.on(signal, () => {
    console.log(`\n[Socket Server] Recebido ${signal}. Desligando servidor Socket.IO...`);
    io.close(() => {
      console.log('[Socket Server] Todas as conexões Socket.IO foram fechadas.');
      httpServer.close(() => {
        console.log('[Socket Server] Servidor HTTP fechado.');
        process.exit(0);
      });
    });
  });
});

export {}; // Garante que o arquivo seja tratado como um módulo
    
