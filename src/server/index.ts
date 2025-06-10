
// src/server/index.ts
import http from 'http';
import { Server as SocketIOServer, type Socket } from 'socket.io';
import next from 'next'; // Importar Next.js

// A porta em que o servidor Socket.IO irá escutar.
// Em produção no App Hosting/Cloud Run, a variável PORT será fornecida pelo ambiente.
const PORT = parseInt(process.env.PORT || '3000', 10); // Default para App Hosting é 3000
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost'; // Ou o hostname apropriado em produção

// Criar a aplicação Next.js
const nextApp = next({ dev, hostname, port: PORT });
const nextHandler = nextApp.getRequestHandler();

interface UserSessionDetails {
  userId: string;
  role: 'candidate' | 'actor' | 'observer';
  nickname: string;
  socketId: string;
  stationId: string;
}

const activeSessions: Record<string, { stationId: string; users: Map<string, UserSessionDetails> }> = {};

// Preparar o Next.js e então iniciar o servidor HTTP
nextApp.prepare().then(() => {
  const httpServer = http.createServer((req, res) => {
    // Passar requisições para o manipulador do Next.js
    // Isso permitirá que o Next.js sirva suas páginas e API routes
    // Se for uma rota que o Next.js não manipula, você pode adicionar lógica customizada aqui
    // antes ou depois de chamar nextHandler(req, res)
    // Para health checks, por exemplo:
    if (req.url === '/health' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
      return;
    }
    nextHandler(req, res);
  });

  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*", // ATENÇÃO: Para produção, restrinja esta origem
      methods: ["GET", "POST"]
    },
  });

  console.log(`[Socket Server] Configurado. Next.js preparado.`);

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

    socket.join(sessionId);

    if (!activeSessions[sessionId]) {
      activeSessions[sessionId] = { stationId, users: new Map() };
      console.log(`[Socket Server] Nova sessão criada: ${sessionId} para estação ${stationId}`);
    }

    const userDetails: UserSessionDetails = { userId, role, nickname: nickname || 'Anônimo', socketId: socket.id, stationId };
    activeSessions[sessionId].users.set(socket.id, userDetails);

    console.log(`[Socket Server] Usuário ${nickname} (${userId}) como ${role} entrou na sessão ${sessionId}. Total de usuários: ${activeSessions[sessionId].users.size}`);

    socket.to(sessionId).emit('userJoined', { ...userDetails, usersInSession: Array.from(activeSessions[sessionId].users.values()) });

    socket.emit('sessionJoined', {
      sessionId,
      stationId,
      yourRole: role,
      yourNickname: nickname,
      usersInSession: Array.from(activeSessions[sessionId].users.values())
    });

    socket.on('timerControl', (data: { action: 'start' | 'pause' | 'reset', duration?: number }) => {
      if (activeSessions[sessionId]?.users.get(socket.id)?.role === 'actor' || activeSessions[sessionId]?.users.get(socket.id)?.role === 'observer') {
        console.log(`[Socket Server] Evento timerControl recebido da sessão ${sessionId}:`, data);
        io.to(sessionId).emit('timerUpdateFromServer', { message: `Timer action ${data.action} recebido do servidor.` }); // Placeholder
      }
    });

    socket.on('candidateAction', (data: any) => {
      console.log(`[Socket Server] candidateAction da sessão ${sessionId}:`, data);
      socket.to(sessionId).emit('candidateActionForwarded', { fromUserId: userId, fromNickname: nickname, action: data });
    });

    socket.on('togglePrintedMaterial', (data: { materialId: string; isRevealed: boolean }) => {
       if (activeSessions[sessionId]?.users.get(socket.id)?.role === 'actor') {
          console.log(`[Socket Server] togglePrintedMaterial da sessão ${sessionId}:`, data);
          io.to(sessionId).emit('printedMaterialUpdated', data);
       }
    });

    socket.on('updateChecklistItem', (data: { itemId: string; evaluation: string; score: number }) => {
      if (activeSessions[sessionId]?.users.get(socket.id)?.role === 'actor' || activeSessions[sessionId]?.users.get(socket.id)?.role === 'observer') {
        console.log(`[Socket Server] updateChecklistItem da sessão ${sessionId}:`, data);
        io.to(sessionId).emit('checklistItemUpdatedByServer', data);
      }
    });

    socket.on('disconnect', (reason: string) => {
      console.log(`[Socket Server] Socket ${socket.id} (Usuário: ${userId}, Nick: "${nickname}") desconectado da sessão ${sessionId}. Razão: ${reason}`);
      if (activeSessions[sessionId]) {
        activeSessions[sessionId].users.delete(socket.id);
        console.log(`[Socket Server] Usuário removido da sessão ${sessionId}. Usuários restantes: ${activeSessions[sessionId].users.size}`);
        socket.to(sessionId).emit('userLeft', { userId, nickname, usersInSession: Array.from(activeSessions[sessionId].users.values()) });
        if (activeSessions[sessionId].users.size === 0) {
          console.log(`[Socket Server] Sessão ${sessionId} está vazia e será removida.`);
          delete activeSessions[sessionId];
        }
      }
    });
  });

  httpServer.listen(PORT, () => {
    console.log(`[Socket Server] Servidor Next.js e Socket.IO rodando na porta ${PORT}`);
    console.log(`[Socket Server] Certifique-se que NEXT_PUBLIC_BACKEND_URL no cliente aponta para esta instância se o Socket.IO estiver em um subdomínio ou caminho diferente.`);
  }).on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`[Socket Server] Erro: A porta ${PORT} já está em uso.`);
    } else {
      console.error(`[Socket Server] Erro ao iniciar o servidor HTTP:`, err);
    }
    process.exit(1);
  });

  const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'] as const;
  signals.forEach(signal => {
    process.on(signal, () => {
      console.log(`\n[Socket Server] Recebido ${signal}. Desligando servidor...`);
      io.close(() => {
        console.log('[Socket Server] Conexões Socket.IO fechadas.');
        httpServer.close(() => {
          console.log('[Socket Server] Servidor HTTP fechado.');
          process.exit(0);
        });
      });
    });
  });

}).catch(ex => {
  console.error("[Next.js Preparation Error]", ex.stack);
  process.exit(1);
});

export {};

    