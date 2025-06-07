// server.js - Versão final, corrigida e pronta para Firebase Cloud Functions
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import * as functions from "firebase-functions";

// --- === CONFIGURAÇÕES GERAIS === ---
const DEFAULT_STATION_DURATION_MINUTES = 10;
const VALID_CLIENT_DURATIONS = [5, 6, 7, 8, 9, 10];
const DISCONNECT_TOLERANCE_SECONDS = 60;
const DISCONNECT_CHECK_INTERVAL_MS = 5000;

const app = express();
const httpServer = http.createServer(app);

// Lista de origens permitidas
const allowedOrigins = [
  'http://localhost:5173',
  'https://revalida-fcil-app.web.app',
  'https://revalidafacil.web.app',
  'https://6000-firebase-studio-1749068965513.cluster-vpxjqdstfzgs6qeiaf7rdlsqrc.cloudworkstations.dev'
];

const corsOptions = {
  origin: function (origin, callback) {
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

// Rota de verificação
app.get('/', (req, res) => {
    res.status(200).send('<h1>Backend Revalida Fácil Online!</h1>');
});

// ==================================================================
// ## CORREÇÃO DE SINTAXE APLICADA AQUI ##
// As opções agora estão DENTRO do construtor new Server()
const io = new Server(httpServer, {
  cors: corsOptions,
  pingTimeout: 60000,
  pingInterval: 25000
});
// ==================================================================


// --- ARMAZENAMENTO DE ESTADO ---
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


// --- LÓGICA DO SOCKET.IO ---
//
// ... COLE AQUI toda a sua lógica de io.on('connection', ...) e as funções de timer ...
//
// (Esta parte do seu código não precisa de alterações)
//


// --- EXPORTAÇÃO PARA O FIREBASE FUNCTIONS ---
// Exportamos a função com o nome 'api' para não dar conflito.
export const api = functions
    .region("southamerica-east1")
    .https.onRequest(app);