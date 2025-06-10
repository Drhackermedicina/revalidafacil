
// Local: src/lib/socket.ts

import { io, Socket } from 'socket.io-client';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
let backendUrlToUse: string;

if (NEXT_PUBLIC_BACKEND_URL) {
  backendUrlToUse = NEXT_PUBLIC_BACKEND_URL;
  console.log(`[Socket] Usando NEXT_PUBLIC_BACKEND_URL: ${backendUrlToUse}`);
} else if (typeof window !== 'undefined') {
  // Se no browser e a variável não estiver definida, tenta conectar ao mesmo host que serve a página.
  // Isso é útil para App Hosting onde frontend e backend estão no mesmo serviço.
  backendUrlToUse = window.location.origin;
  console.log(`[Socket] NEXT_PUBLIC_BACKEND_URL não definida, usando origem da janela: ${backendUrlToUse}`);
} else {
  // Fallback para SSR ou ambientes onde window não está disponível e a URL não foi definida.
  // Isso pode não funcionar corretamente sem uma URL explícita.
  backendUrlToUse = 'http://localhost:3000'; // Ou uma URL de fallback apropriada
  console.warn(`[Socket] NEXT_PUBLIC_BACKEND_URL não definida e window não disponível. Usando fallback: ${backendUrlToUse}. Isso pode não funcionar em produção.`);
}

const socket: Socket = io(backendUrlToUse, {
  autoConnect: false,
  transports: ['websocket'],
  reconnectionAttempts: 5,
});

socket.on("connect", () => {
  console.log(`[Socket] Conectado com sucesso! ID: ${socket.id} à URL: ${backendUrlToUse}`);
});

socket.on("disconnect", (reason: string) => {
  console.log(`[Socket] Desconectado de ${backendUrlToUse}: ${reason}`);
});

socket.on("connect_error", (err: Error) => {
  console.error(`[Socket] Erro de conexão com ${backendUrlToUse}: ${err.message}`, (err as any).data || '');
});

export default socket;
