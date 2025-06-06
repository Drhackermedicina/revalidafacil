// Localização: src/lib/socket.ts

import { io, Socket } from 'socket.io-client';

// Pega a URL do seu backend do arquivo .env.local
const BACKEND\_URL = process.env.NEXT\_PUBLIC\_BACKEND\_URL;

// Uma verificação de segurança para garantir que a variável está configurada
if (\!BACKEND\_URL) {
throw new Error("ERRO CRÍTICO: A variável de ambiente NEXT\_PUBLIC\_BACKEND\_URL não está definida.");
}

// Cria a instância do socket. Ela não se conectará até que você chame socket.connect()
// nos seus componentes, graças à opção 'autoConnect: false'.
export const socket: Socket = io(BACKEND\_URL, {
autoConnect: false,
transports: ['websocket'], // Boa prática para forçar uma conexão mais estável
});

// Você pode adicionar listeners de debug aqui, se quiser, como no seu arquivo original
socket.on("connect\_error", (err) =\> {
console.error(`[Socket] Erro de conexão: ${err.message}`);
});