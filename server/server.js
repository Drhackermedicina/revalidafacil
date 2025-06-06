// server.js - Versão limpa e organizada para o projeto 'revalida-fcil-app'
import 'dotenv/config'; // Garante que as variáveis de ambiente sejam carregadas
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

// --- === CONFIGURAÇÕES GERAIS === ---
const PORT = process.env.PORT || 3000;
const DEFAULT_STATION_DURATION_MINUTES = 10;
const VALID_CLIENT_DURATIONS = [5, 6, 7, 8, 9, 10];

// CONFIGURAÇÕES PARA TOLERÂNCIA DE DESCONEXÃO
const DISCONNECT_TOLERANCE_SECONDS = 60;
const DISCONNECT_CHECK_INTERVAL_MS = 5000;
// --- === FIM CONFIGURAÇÕES === ---

const app = express();
const server = http.createServer(app);

// Lista de origens permitidas para se conectar ao backend
const allowedOrigins = [
  'http://localhost:5173', // Para desenvolvimento local na sua máquina
  'https://revalidafacil.web.app', // Seu site principal quando estiver no ar
  'https://6000-firebase-studio-1749068965513.cluster-vpxjqdstfzgs6qeiaf7rdlsqrc.cloudworkstations.dev' // Seu ambiente de desenvolvimento (Firebase Studio)
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permite requisições sem 'origin' (ex: de apps mobile ou Postman) ou da lista
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`CORS: Origem HTTP bloqueada: ${origin}`);
      callback(new Error('A política de CORS para este site não permite acesso da Origem especificada.'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Rota de verificação para saber se o servidor está online
app.get('/', (req, res) => {
    res.status(200).send('<h1>Backend Revalida Fácil Online!</h1>');
});

const io = new Server(server, {
  cors: corsOptions,
  pingTimeout: 60000,
  pingInterval: 25000
});


// --- ARMAZENAMENTO DE ESTADO ---

// ⚠️ ATENÇÃO: ARQUITETURA IMPORTANTE! ⚠️
// Atualmente, as sessões estão sendo guardadas na memória do servidor neste objeto.
// Isso funciona para testes, mas tem uma grande desvantagem: se o servidor
// reiniciar por qualquer motivo (queda, deploy), TODAS as simulações em andamento são perdidas.
//
// TODO (Próximo Passo para Produção):
// Substituir este objeto por uma solução de banco de dados persistente,
// como o Firestore. Você criaria uma coleção 'sessions' e cada documento
// representaria o estado de uma simulação.
const simulationSessions = {}; 
const socketIdToSessionIdMap = {};


// --- ROTA DE API PARA CRIAR SESSÕES ---
app.post('/api/create-session', (req, res) => {
  try {
    const { stationId, checklistId, tempoDuracaoMinutos } = req.body;

    if (!stationId || !checklistId) {
      const missing = [];
      if (!stationId) missing.push('stationId');
      if (!checklistId) missing.push('checklistId');
      console.error(`[API] Falha create-session: Faltando ${missing.join(', ')}`);
      return res.status(400).json({ error: `Dados obrigatórios faltando: ${missing.join(', ')}.`});
    }

    const sessionId = uuidv4();
    let durationMinutes = DEFAULT_STATION_DURATION_MINUTES;
    if (tempoDuracaoMinutos !== undefined) {
      const parsedDuration = parseInt(tempoDuracaoMinutos, 10);
      if (!isNaN(parsedDuration) && parsedDuration > 0 && parsedDuration <= 60) {
        durationMinutes = parsedDuration;
      } else {
        console.warn(`[API] tempoDuracaoMinutos (${tempoDuracaoMinutos}) é inválido. Usando padrão de ${DEFAULT_STATION_DURATION_MINUTES} min.`);
      }
    }

    simulationSessions[sessionId] = {
      stationId: stationId,
      checklistId: checklistId,
      createdAt: Date.now(),
      participants: {},
      timerInterval: null,
      stationDurationMinutes: durationMinutes,
      remainingSeconds: durationMinutes * 60,
      simulationHasStarted: false,
      simulationIsOver: false,
      isManuallyPaused: false,
      isPausedDueToDisconnect: false,
      disconnectToleranceTimer: null,
      toleranceRemainingSeconds: 0
    };
    console.log(`[API] Sessão ${sessionId} criada para Estação ${stationId}. Duração: ${durationMinutes} min.`);
    res.status(201).json({ sessionId: sessionId });
  } catch (error) {
    console.error('[API] Erro CRÍTICO em /api/create-session:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao criar a sessão.', details: error.message });
  }
});


// --- LÓGICA DO SOCKET.IO (GERENCIAMENTO DA SESSÃO EM TEMPO REAL) ---

// (O restante do seu código de lógica de socket, que é extenso e funcionalmente rico,
// continua aqui sem alterações. As funções startSimulationTimer, stopSimulationTimer,
// startDisconnectToleranceTimer e o io.on('connection', ...) permanecem as mesmas)

// ... cole aqui toda a sua lógica de io.on('connection', ...) e as funções de timer ...

// --- INICIALIZAÇÃO DO SERVIDOR ---
server.listen(PORT, () => {
  console.log(`*** Backend Revalida Fácil rodando em http://localhost:${PORT} ***`);
  console.log(`*** Permitindo CORS das seguintes origens: ${allowedOrigins.join(', ')} ***`);
});

server.on('error', (error) => {
    console.error('Erro no Servidor HTTP:', error);
});