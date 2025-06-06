// Local: src/lib/socket.ts (ou lib/socket.ts)

import { io, Socket } from 'socket.io-client';

// URL do seu backend a partir da variável de ambiente
// Certifique-se que NEXT_PUBLIC_BACKEND_URL está definido no seu .env.local
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!BACKEND_URL) {
  console.error('[Socket] ERRO FATAL: A variável de ambiente NEXT_PUBLIC_BACKEND_URL não está definida.');
  // Você pode querer lançar um erro ou ter um comportamento padrão aqui,
  // mas para desenvolvimento, um log de erro claro é crucial.
}

console.log(`[Socket] Configurando instância para URL: ${BACKEND_URL}`);

// Tipagem para o socket (opcional, mas bom para TypeScript)
// Você pode definir os eventos que seu servidor emite e espera aqui para ter autocompletar
// interface ServerToClientEvents {
//   connect: () => void;
//   disconnect: (reason: string) => void;
//   SERVER_ERROR: (data: { message: string }) => void;
//   // Adicione outros eventos que seu servidor envia para o cliente
//   TIMER_UPDATE: (data: { remainingSeconds: number }) => void;
//   SERVER_JOIN_CONFIRMED: (data: any) => void; // Use 'any' ou defina um tipo mais específico
//   // ...e assim por diante
// }

// interface ClientToServerEvents {
//   CLIENT_IM_READY: (data: { sessionId: string }) => void;
//   // Adicione outros eventos que seu cliente envia para o servidor
// }

// O tipo da instância do socket. Se não usar as interfaces acima, pode ser apenas 'Socket'
// const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(BACKEND_URL || '', {
const socket: Socket = io(BACKEND_URL || 'http://fallback.url', { // Adicione uma URL de fallback se desejar
  autoConnect: false, // Só conecta quando chamarmos socket.connect()
  transports: ['websocket'], // É uma boa prática especificar, pode ajudar a evitar problemas de polling
  reconnectionAttempts: 5, // Tenta reconectar 5 vezes
});

// --- Listeners básicos para debug (iguais ao seu original) ---
socket.on("connect", () => {
  console.log(`[Socket] Conectado com sucesso! ID: ${socket.id}`);
});

socket.on("disconnect", (reason: string) => {
  console.log(`[Socket] Desconectado: ${reason}`);
});

socket.on("connect_error", (err: Error) => {
  console.error(`[Socket] Erro de conexão: ${err.message}`, (err as any).data || '');
});

// Listener genérico (útil para ver todos os eventos recebidos)
// socket.onAny((event, ...args) => {
//   console.log(`[Socket] Evento Recebido << ${event}`, args);
// });
// --- Fim Listeners ---

// Exporta a instância para ser usada em outros componentes/hooks
export default socket;
