
// src/server/index.ts
import http from 'http';
import { Server as SocketIOServer, type Socket } from 'socket.io';
import next from 'next';

const PORT = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';

const nextApp = next({ dev, hostname, port: PORT });
const nextHandler = nextApp.getRequestHandler();

interface ChatUserServerData {
  id: string; // socket.id
  authUserId: string;
  nickname: string;
  avatarUrl?: string;
  status: 'looking' | 'training' | 'busy' | 'inactive';
}

// Store users connected to the chat namespace, not specific to a session yet.
const chatUsers = new Map<string, ChatUserServerData>();

// Stores active WebRTC call pairings: { callerSocketId: calleeSocketId }
const activeWebRTCPairs = new Map<string, string>();


nextApp.prepare().then(() => {
  const httpServer = http.createServer((req, res) => {
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
    const { nickname, authUserId, avatarUrl } = socket.handshake.auth;

    if (!nickname || !authUserId) {
      console.error(`[Socket Server] Falha na autenticação do handshake para socket ${socket.id}: Nickname ou authUserId ausente.`);
      socket.emit('authError', { message: 'Nickname e UserID são obrigatórios.' });
      socket.disconnect(true);
      return;
    }
    
    const userData: ChatUserServerData = {
      id: socket.id,
      authUserId,
      nickname,
      avatarUrl,
      status: 'looking', // Default status
    };
    chatUsers.set(socket.id, userData);
    console.log(`[Socket Server] Usuário "${nickname}" (AuthID: ${authUserId}, SocketID: ${socket.id}) conectado ao chat.`);

    // Notify all clients about the updated user list
    io.emit('update-user-list', Array.from(chatUsers.values()));

    socket.on('send-message', (data: { text: string }) => {
      const sender = chatUsers.get(socket.id);
      if (sender) {
        const message = {
          id: Date.now().toString(),
          userId: sender.authUserId,
          nickname: sender.nickname,
          text: data.text,
          timestamp: new Date(),
        };
        console.log(`[Socket Server] Mensagem de "${sender.nickname}": ${data.text}`);
        io.emit('new-message', message); // Broadcast to all chat users
      }
    });

    // WebRTC Signaling
    socket.on('audio-call-request', ({ to, offerSdp }) => {
        const requester = chatUsers.get(socket.id);
        const targetUser = chatUsers.get(to);
        if (requester && targetUser) {
            console.log(`[Socket Server] ${requester.nickname} requisitando chamada para ${targetUser.nickname}`);
            io.to(to).emit('audio-call-request', { fromId: socket.id, fromNickname: requester.nickname, offerSdp });
        } else {
            console.warn(`[Socket Server] Usuário alvo ${to} não encontrado para audio-call-request`);
        }
    });

    socket.on('audio-call-accepted', ({ to, answerSdp }) => {
        const accepter = chatUsers.get(socket.id);
        const originalCaller = chatUsers.get(to);
         if (accepter && originalCaller) {
            console.log(`[Socket Server] ${accepter.nickname} aceitou chamada de ${originalCaller.nickname}`);
            activeWebRTCPairs.set(socket.id, to);
            activeWebRTCPairs.set(to, socket.id); // Pair them
            io.to(to).emit('audio-call-accepted', { fromId: socket.id, fromNickname: accepter.nickname, answerSdp });
        }
    });
    
    // Fallback for direct offer/answer if call-request/accepted is not used for SDP exchange
    socket.on('audio-offer', ({ to, offerSdp }) => {
        const sender = chatUsers.get(socket.id);
        console.log(`[Socket Server] ${sender?.nickname} enviando offer para ${chatUsers.get(to)?.nickname}`);
        io.to(to).emit('audio-offer-received', { fromId: socket.id, offerSdp });
    });

    socket.on('audio-answer', ({ to, answerSdp }) => {
        const sender = chatUsers.get(socket.id);
        console.log(`[Socket Server] ${sender?.nickname} enviando answer para ${chatUsers.get(to)?.nickname}`);
        io.to(to).emit('audio-answer-received', { fromId: socket.id, answerSdp });
    });

    socket.on('ice-candidate', ({ to, candidate }) => {
        const sender = chatUsers.get(socket.id);
        // console.log(`[Socket Server] ${sender?.nickname} enviando ICE candidate para ${chatUsers.get(to)?.nickname}`);
        io.to(to).emit('ice-candidate-received', { fromId: socket.id, candidate });
    });

    socket.on('end-audio-call', ({ to }) => {
        const userEndingCall = chatUsers.get(socket.id);
        const otherUserInCall = chatUsers.get(to);

        if (userEndingCall && otherUserInCall) {
            console.log(`[Socket Server] ${userEndingCall.nickname} encerrando chamada com ${otherUserInCall.nickname}`);
            io.to(to).emit('call-ended', { fromId: socket.id, fromNickname: userEndingCall.nickname });
            
            // Clear pairing
            activeWebRTCPairs.delete(socket.id);
            activeWebRTCPairs.delete(to);
        } else if (to) { // If "to" is provided, still try to notify that user
             io.to(to).emit('call-ended', { fromId: socket.id, fromNickname: userEndingCall?.nickname || "Alguém" });
        }
    });


    socket.on('disconnect', (reason: string) => {
      const departingUser = chatUsers.get(socket.id);
      if (departingUser) {
        console.log(`[Socket Server] Usuário "${departingUser.nickname}" (SocketID: ${socket.id}) desconectado. Razão: ${reason}`);
        
        // Check if this user was in an active call and notify the other party
        const pairedSocketId = activeWebRTCPairs.get(socket.id);
        if (pairedSocketId) {
            const otherUser = chatUsers.get(pairedSocketId);
            if (otherUser) {
                 io.to(pairedSocketId).emit('call-ended', { fromId: socket.id, fromNickname: departingUser.nickname, reason: 'disconnect' });
            }
            activeWebRTCPairs.delete(socket.id);
            activeWebRTCPairs.delete(pairedSocketId);
        }

        chatUsers.delete(socket.id);
        io.emit('update-user-list', Array.from(chatUsers.values()));
      } else {
        console.log(`[Socket Server] Socket ${socket.id} desconectado. Razão: ${reason}. Usuário não encontrado no chatUsers.`);
      }
    });
  });

  httpServer.listen(PORT, () => {
    console.log(`[Socket Server] Servidor Next.js e Socket.IO rodando na porta ${PORT}`);
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
