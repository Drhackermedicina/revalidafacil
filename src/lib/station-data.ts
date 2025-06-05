
// src/lib/station-data.ts

// Define types for checklist data (consistent with TrainingPageClient)
export interface ChecklistItemEvaluation {
  inadequate: number | null;
  partial: number | null;
  adequate: number | null;
}

export interface ChecklistItem {
  id: string;
  description: string;
  points: ChecklistItemEvaluation;
  type: string; // e.g., 'ac', 'an', 'dx', 'ct'
  observation?: string;
}

export interface PrintedMaterial {
  id: string;
  title: string;
  content: string;
  imageSrc?: string;
  imageAlt?: string;
  isLocked: boolean;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  tag: string;
}

export interface ChecklistData {
  title: string;
  area: string; // Padronizado para categorias principais
  code: string; // Unique code for routing
  scenario: { title: string; description: string };
  tasks: { title: string; timeLimit: string; items: string[] };
  actorInstructions: { title: string; content: string };
  printedMaterials: PrintedMaterial[];
  checklistItems: ChecklistItem[];
  references: { text: string; url: string }[];
  flashcards: Flashcard[];
}

export const allStations: ChecklistData[] = [
  {
    title: "Acidente por Água Viva",
    area: "Clínica Médica",
    code: "agua-viva",
    scenario: {
      title: "Cenário Clínico: Queimadura por Água Viva",
      description: "<p>Paciente, 25 anos, sexo masculino, previamente hígido, estava na praia quando sentiu uma dor súbita e intensa na perna direita após contato com uma água viva. Apresenta lesões lineares, eritematosas e edemaciadas no local.</p>",
    },
    tasks: {
      title: "Tarefas a Serem Cumpridas",
      timeLimit: "10 minutos",
      items: [
        "Avaliar a segurança da cena e do paciente.",
        "Realizar anamnese focada no incidente.",
        "Examinar a lesão.",
        "Instituir medidas para alívio da dor e neutralização do veneno.",
        "Orientar o paciente sobre cuidados posteriores e sinais de alerta.",
      ],
    },
    actorInstructions: {
      title: "Instruções para o Ator (Paciente Simulado)",
      content: "<h4>DADOS PESSOAIS</h4><p>Nome: Carlos Silva<br />Idade: 25 anos<br />Profissão: Estudante</p><br /><h4>MOTIVO DA CONSULTA</h4><p>Queimadura na perna direita por água viva há cerca de 15 minutos.</p><br /><h4>HISTÓRIA DA DOENÇA ATUAL (HDA)</h4><p>Relata dor intensa (8/10) em queimação na face anterior da coxa direita, iniciada subitamente após contato com água viva na praia. Lesões lineares, eritematosas e edemaciadas no local. Nega sintomas sistêmicos como febre, náuseas, tontura ou dispneia.</p><br /><h4>INTERROGATÓRIO SISTEMÁTICO</h4><p>Nega outros sintomas relevantes.</p><br /><h4>ANTECEDENTES</h4><p>Nega alergias ou comorbidades. Vacinação em dia.</p><br /><h4>HÁBITOS DE VIDA</h4><p>Natação 3x/semana. Nega tabagismo. Etilista social.</p><br /><h4>COMPORTAMENTO ESPERADO</h4><p>Demonstrar dor e ansiedade. Seguir as instruções do médico.</p>",
    },
    printedMaterials: [
      {
        id: "pm1-agua-viva",
        title: "Folder Informativo: Primeiros Socorros em Acidentes com Águas Vivas",
        content: "<p><strong>O que fazer:</strong><br/>1. Saia da água.<br/>2. Lave o local com água do mar (NÃO use água doce).<br/>3. Aplique vinagre (ácido acético a 5%) para neutralizar o veneno por 15-30 minutos, se disponível.<br/>4. Remova tentáculos visíveis com cuidado, usando uma pinça ou luvas (não esfregue).<br/>5. Para alívio da dor, compressas de água morna (40-45°C, tolerável à pele) podem ajudar após a neutralização do veneno, por cerca de 20 minutos.<br/>6. Analgésicos comuns podem ser utilizados.<br/>7. Procure um médico se a dor for muito intensa, a área afetada extensa, ou se surgirem sintomas sistêmicos como falta de ar, tontura, náuseas, vômitos, ou reações alérgicas graves.</p>",
        imageSrc: "https://placehold.co/600x400.png",
        imageAlt: "primeiros socorros agua viva",
        isLocked: false,
      },
    ],
    checklistItems: [
      { id: "ci1-av", description: "<strong>Acolhimento e Biossegurança:</strong> Apresentou-se, estabeleceu empatia, verificou segurança da cena (se aplicável) e utilizou EPIs básicos.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ac" },
      { id: "ci2-av", description: "<strong>Anamnese - HDA:</strong> Investigou detalhadamente a dor (início, localização, irradiação, qualidade, intensidade, duração, evolução, fatores de melhora/piora, sintomas associados locais e sistêmicos) e mecanismo do trauma.", points: { inadequate: 0, partial: 1.5, adequate: 3 }, type: "an" },
      { id: "ci3-av", description: "<strong>Anamnese - Antecedentes e Hábitos:</strong> Questionou sobre alergias, comorbidades, medicações em uso, vacinação, hábitos relevantes.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "an" },
      { id: "ci4-av", description: "<strong>Exame Físico:</strong> Inspecionou a lesão, avaliou extensão, características (eritema, edema, lesões lineares sugestivas de contato com tentáculos), e sinais de complicações locais.", points: { inadequate: 0, partial: 1, adequate: 2 }, type: "ef", observation: "Verificar se o estudante descreveu adequadamente os achados." },
      { id: "ci5-av", description: "<strong>Conduta Imediata:</strong> Orientou corretamente a lavagem inicial da área afetada com ÁGUA DO MAR e, em seguida, a aplicação de VINAGRE (ácido acético a 5%) por 15-30 minutos. NÃO utilizou água doce.", points: { inadequate: 0, partial: 1, adequate: 2 }, type: "ct", observation: "Criticamente importante: penalizar se usou ou orientou água doce antes do vinagre." },
      { id: "ci6-av", description: "<strong>Conduta para Alívio da Dor:</strong> Orientou sobre o uso de compressas mornas (40-45°C) APÓS a neutralização com vinagre e/ou considerou analgesia sistêmica.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ct" },
      { id: "ci7-av", description: "<strong>Orientação e Encaminhamento:</strong> Informou sobre sinais de alerta (piora da dor, infecção, sintomas sistêmicos), cuidados com a ferida, e necessidade de reavaliação médica se não houver melhora ou surgirem complicações.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ct" },
    ],
    references: [{ text: "Protocolos clínicos para acidentes com animais aquáticos (ex: Ministério da Saúde, Sociedades Médicas).", url: "#" }],
    flashcards: [
      { id: "fc1-av", question: "Qual o agente neutralizante de escolha para veneno de água viva (cnidários) na maioria dos casos no Brasil?", answer: "Vinagre (ácido acético a 5%) por 15-30 minutos.", tag: "Tratamento" },
      { id: "fc2-av", question: "Por que NÃO se deve usar água doce para lavar inicialmente uma queimadura por água viva?", answer: "A água doce pode causar a degranulação dos nematocistos íntegros por osmose, liberando mais veneno e piorando a dor/lesão.", tag: "Conduta Crítica" },
      { id: "fc3-av", question: "Cite 3 sinais de alerta que indicariam a necessidade de procurar um serviço de emergência após uma queimadura por água viva.", answer: "Dificuldade respiratória, tontura ou desmaio, náuseas/vômitos persistentes, dor muito intensa e incontrolável, reação alérgica extensa (urticária generalizada, inchaço de face/lábios).", tag: "Sinais de Alerta" },
    ],
  },
  {
    title: "Trauma Abdominal Fechado",
    area: "Cirurgia", 
    code: "trauma-abdominal",
    scenario: {
      title: "Cenário Clínico: Politraumatizado Pós-Colisão Automobilística",
      description: "<p>Paciente, 30 anos, sexo masculino, vítima de colisão frontal carro vs. poste há 30 minutos. Estava de cinto de segurança. Chega ao pronto-socorro trazido pelo SAMU, em prancha longa, com colar cervical. Queixa-se de dor abdominal difusa e dor na perna esquerda.</p>",
    },
    tasks: {
      title: "Tarefas a Serem Cumpridas",
      timeLimit: "10 minutos",
      items: [
        "Realizar avaliação primária (ABCDE do Trauma).",
        "Realizar avaliação secundária focada no abdômen e outras lesões.",
        "Solicitar exames complementares pertinentes (FAST, exames laboratoriais, TC se indicada).",
        "Definir conduta inicial para estabilização.",
      ],
    },
    actorInstructions: {
      title: "Instruções para o Ator (Paciente Simulado)",
      content: "<p>Você está com dor abdominal intensa (nota 9/10) e dor forte na coxa esquerda. Sente-se um pouco tonto. Responda às perguntas do estudante sobre o acidente e seus sintomas. Demonstre dor à palpação abdominal. Sua perna esquerda parece mais curta e rodada externamente (simular).</p>",
    },
    printedMaterials: [
      {
        id: "pm1-trauma",
        title: "Resultado do FAST (Focus Assessment with Sonography for Trauma)",
        content: "<p><strong>FAST:</strong> Positivo - líquido livre em cavidade abdominal (espaço hepatorrenal e esplenorrenal).</p>",
        imageSrc: "https://placehold.co/600x400.png",
        imageAlt: "resultado FAST ultrasound",
        isLocked: true, 
      },
       {
        id: "pm2-trauma",
        title: "Raio-X Bacia AP e Perna Esquerda",
        content: "<p><strong>RX Bacia AP:</strong> Sem fraturas evidentes.<br/><strong>RX Fêmur Esquerdo:</strong> Fratura diafisária transversa do fêmur esquerdo.</p>",
        imageSrc: "https://placehold.co/600x400.png",
        imageAlt: "raio x femur bacia",
        isLocked: true,
      },
    ],
    checklistItems: [
      { id: "ci1-ta", description: "<strong>A (Vias Aéreas e Coluna Cervical):</strong> Verificou perviedade, estabilizou coluna cervical.", points: { inadequate: 0, partial: 1, adequate: 2 }, type: "ac" },
      { id: "ci2-ta", description: "<strong>B (Respiração e Ventilação):</strong> Avaliou frequência respiratória, ausculta pulmonar, oximetria.", points: { inadequate: 0, partial: 1, adequate: 2 }, type: "ac" },
      { id: "ci3-ta", description: "<strong>C (Circulação com Controle de Hemorragia):</strong> Verificou pulso, PA, perfusão, procurou por sangramentos externos.", points: { inadequate: 0, partial: 1, adequate: 2 }, type: "ac" },
      { id: "ci4-ta", description: "<strong>D (Déficit Neurológico):</strong> Avaliou nível de consciência (Glasgow), pupilas.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ac" },
      { id: "ci5-ta", description: "<strong>E (Exposição e Controle do Ambiente):</strong> Removeu vestes, preveniu hipotermia.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ac" },
      { id: "ci6-ta", description: "<strong>Anamnese AMPLA (após avaliação primária):</strong> Coletou informações relevantes.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "an" },
      { id: "ci7-ta", description: "<strong>Exame Físico Abdominal:</strong> Realizou inspeção, ausculta, percussão, palpação.", points: { inadequate: 0, partial: 1, adequate: 2 }, type: "ef", observation: "Verificar se identificou dor à palpação e/ou defesa." },
      { id: "ci8-ta", description: "<strong>Exame Físico MMII:</strong> Inspecionou e palpou membro inferior esquerdo, identificando deformidade.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ef" },
      { id: "ci9-ta", description: "<strong>Conduta:</strong> Solicitou FAST e exames laboratoriais (hemograma, coagulograma, tipagem).", points: { inadequate: 0, partial: 1, adequate: 2 }, type: "ct" },
      { id: "ci10-ta", description: "<strong>Conduta:</strong> Indicou laparotomia exploradora baseado no FAST positivo e instabilidade.", points: { inadequate: 0, partial: 1, adequate: 2 }, type: "ct", observation: "Ou conduta conservadora se estável e outros achados." },
    ],
    references: [{ text: "ATLS - Advanced Trauma Life Support, 10th Edition.", url: "#" }],
    flashcards: [
      { id: "fc1-ta", question: "O que significa a sigla FAST no contexto do trauma?", answer: "Focused Assessment with Sonography for Trauma.", tag: "Diagnóstico" },
      { id: "fc2-ta", question: "Quais são os 4 espaços avaliados no FAST abdominal?", answer: "Hepatorrenal (Morison), Esplenorrenal, Pélvico (fundo de saco de Douglas) e Pericárdico.", tag: "Diagnóstico" },
    ],
  },
];
