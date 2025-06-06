// Localização: src/lib/socket.ts

import { io, Socket } from 'socket.io-client';

// A URL do seu backend é lida a partir das variáveis de ambiente.
// Garanta que o arquivo .env.local na raiz do seu frontend tenha a linha:
// NEXT_PUBLIC_BACKEND_URL=https://revalidafacil-backend-160232798179.southamerica-east1.run.app
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Esta verificação é importante. Se a URL não for encontrada, um erro claro
// será lançado, ajudando a identificar o problema rapidamente.
if (!BACKEND_URL) {
  throw new Error(
    '[Socket] A variável de ambiente NEXT_PUBLIC_BACKEND_URL não está definida. Verifique seu arquivo .env.local.'
  );
}

// Cria a instância do socket.
// A opção 'autoConnect: false' é crucial. Ela impede que o socket tente se conectar
// assim que o app carrega. A conexão só será iniciada quando você chamar
// socket.connect() dentro de um componente.
export const socket: Socket = io(BACKEND_URL, {
  autoConnect: false,
  transports: ['websocket'], // Ajuda a ter uma conexão mais estável.
  reconnectionAttempts: 5, // Tenta reconectar 5 vezes em caso de queda.
});

// Listeners (Ouvintes) para depuração. Ajudam a ver o que está acontecendo no console do navegador.
socket.on('connect', () => {
  console.log(`[Socket] Conectado com sucesso ao servidor. ID: ${socket.id}`);
});

socket.on('disconnect', (reason: string) => {
  console.log(`[Socket] Desconectado do servidor. Razão: ${reason}`);
});

socket.on('connect_error', (err: Error) => {
  // Este evento é muito útil para diagnosticar problemas de conexão, como erros de CORS.
  console.error(`[Socket] Erro de conexão: ${err.message}`);
});
