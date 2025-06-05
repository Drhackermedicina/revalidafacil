
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
        "Acolher o paciente e garantir a biossegurança.",
        "Realizar anamnese detalhada focada no incidente, explorando as características da dor e sintomas associados.",
        "Examinar a lesão e o estado geral do paciente.",
        "Instituir medidas para alívio da dor e neutralização do veneno.",
        "Orientar o paciente sobre cuidados posteriores e sinais de alerta.",
      ],
    },
    actorInstructions: {
      title: "Instruções para o Ator (Paciente Simulado)",
      content: `
        <h4>DADOS PESSOAIS</h4>
        <p>Nome: Carlos Silva<br />Idade: 25 anos<br />Profissão: Estudante</p>
        <br />
        <h4>MOTIVO DA CONSULTA</h4>
        <p>Queimadura na perna direita por água viva há cerca de 15 minutos, com dor intensa.</p>
        <br />
        <h4>HISTÓRIA DA DOENÇA ATUAL (HDA)</h4>
        <p><strong>Dor na Perna Direita:</strong></p>
        <ul>
          <li><strong>Início e Causa:</strong> Súbito, há aproximadamente 15 minutos, enquanto estava na água do mar. Sentiu um contato e uma dor aguda imediata, percebendo que era uma água viva.</li>
          <li><strong>Localização:</strong> Principalmente na face anterior da coxa direita, mas com algumas marcas que se estendem um pouco para a lateral.</li>
          <li><strong>Irradiação:</strong> A dor é mais forte no local do contato, mas sente um desconforto que se espalha um pouco pela coxa.</li>
          <li><strong>Qualidade/Tipo:</strong> "É uma queimação muito forte, como se estivessem colocando agulhas quentes na minha perna."</li>
          <li><strong>Intensidade:</strong> "Agora está em 8 de 10. Quando aconteceu era 10 de 10."</li>
          <li><strong>Duração e Evolução:</strong> A dor tem sido contínua desde o incidente. Parece que a intensidade diminuiu um pouco depois que saiu da água, mas ainda está muito forte.</li>
          <li><strong>Fatores de Melhora/Piora:</strong> "Não tentei nada ainda, só saí da água. Movimentar a perna piora um pouco."</li>
          <li><strong>Sintomas Associados Locais:</strong> "A pele está vermelha, inchada e com umas marcas esquisitas, como se fossem os tentáculos." Prurido leve no local.</li>
          <li><strong>Sintomas Associados Sistêmicos:</strong> Nega febre, calafrios, náuseas, vômitos, tontura, palpitações, falta de ar ou qualquer outro sintoma geral.</li>
        </ul>
        <br />
        <h4>INTERROGATÓRIO SISTEMÁTICO</h4>
        <p>Além do já relatado na HDA, nega outros sintomas relevantes nos demais sistemas.</p>
        <br />
        <h4>ANTECEDENTES</h4>
        <p>Nega alergias conhecidas (medicamentos, alimentos, etc.).<br />Nega comorbidades (diabetes, hipertensão, asma, etc.).<br />Vacinação em dia, conforme calendário nacional.<br />Nega cirurgias prévias ou internações recentes.</p>
        <br />
        <h4>HÁBITOS DE VIDA</h4>
        <p>Pratica natação 3 vezes por semana na piscina do condomínio.<br />Nega tabagismo.<br />Consumo social de álcool (cerveja nos finais de semana, sem excessos).<br />Alimentação variada, sem restrições.</p>
        <br />
        <h4>COMPORTAMENTO ESPERADO</h4>
        <p>Demonstrar dor e ansiedade, compatível com a intensidade referida. Responder às perguntas de forma clara, mas focado na sua dor e preocupação com a lesão. Seguir as instruções do médico durante o exame e tratamento.</p>
      `,
    },
    printedMaterials: [
      {
        id: "pm1-agua-viva",
        title: "Folder Informativo: Primeiros Socorros em Acidentes com Águas Vivas",
        content: "<p><strong>O que fazer:</strong><br/>1. Saia da água imediatamente.<br/>2. Lave o local abundantemente com ÁGUA DO MAR (NÃO use água doce, pois pode piorar a liberação do veneno).<br/>3. Aplique VINAGRE (ácido acético a 5%) no local por 15 a 30 minutos. Isso ajuda a neutralizar o veneno ainda não descarregado.<br/>4. Remova tentáculos visíveis com cuidado, utilizando uma pinça ou luvas. Evite esfregar a área.<br/>5. Para alívio da dor, APÓS a aplicação do vinagre, compressas de água MORNA (temperatura suportável pela pele, entre 40-45°C) podem ser aplicadas por cerca de 20 minutos. Se não houver melhora significativa, analgésicos comuns (paracetamol, dipirona) podem ser considerados.<br/>6. NÃO urine no local, não aplique álcool ou outras substâncias não recomendadas.<br/>7. Procure atendimento médico se: a dor for muito intensa ou não melhorar com as medidas iniciais; a área afetada for extensa; ocorrerem sintomas sistêmicos como falta de ar, tontura, náuseas, vômitos, dor de cabeça intensa, confusão mental; ou se houver sinais de reação alérgica grave (inchaço de lábios/face, dificuldade para engolir/respirar, urticária generalizada).</p>",
        imageSrc: "https://placehold.co/600x400.png",
        imageAlt: "primeiros socorros agua viva",
        isLocked: false,
      },
    ],
    checklistItems: [
      { id: "ci1-av", description: "<strong>Acolhimento e Biossegurança:</strong> Apresentou-se ao paciente, estabeleceu uma comunicação empática, verificou a segurança da cena (se aplicável em ambiente simulado) e utilizou Equipamentos de Proteção Individual (EPIs) básicos (ex: luvas).", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ac" },
      { id: "ci2-av", description: "<strong>Anamnese - Identificação e Queixa Principal:</strong> Coletou dados de identificação do paciente e registrou claramente a queixa principal e sua duração.", points: { inadequate: 0, partial: 0.25, adequate: 0.5 }, type: "an" },
      { id: "ci3-av", description: "<strong>Anamnese - História da Doença Atual (HDA):</strong> Investigou detalhadamente o sintoma principal (dor), incluindo: início, causa/mecanismo do trauma, localização, irradiação, qualidade/tipo, intensidade (ex: escala de 0-10), duração/evolução, fatores de melhora/piora. Questionou sobre sintomas associados locais (eritema, edema, prurido, marcas) e sistêmicos (febre, náuseas, tontura, dispneia, etc.).", points: { inadequate: 0, partial: 1.5, adequate: 3 }, type: "an", observation: "Avaliar a completude da investigação da dor e sintomas associados." },
      { id: "ci4-av", description: "<strong>Anamnese - Antecedentes e Hábitos:</strong> Questionou sobre alergias (especialmente a medicamentos ou frutos do mar, se relevante), comorbidades pré-existentes, medicações em uso contínuo, estado vacinal (antitetânica), e hábitos relevantes (ex: primeira vez na praia, atividades aquáticas).", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "an" },
      { id: "ci5-av", description: "<strong>Exame Físico - Geral e Sinais Vitais:</strong> Avaliou o estado geral do paciente, nível de consciência, e aferiu/verificou os sinais vitais (PA, FC, FR, SatO2, Temp.), se aplicável ao cenário.", points: { inadequate: 0, partial: 0.25, adequate: 0.5 }, type: "ef" },
      { id: "ci6-av", description: "<strong>Exame Físico - Inspeção da Lesão:</strong> Inspecionou cuidadosamente a área afetada, descrevendo as características da lesão (ex: lineares, eritematosas, edemaciadas, presença de tentáculos visíveis, extensão da lesão).", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ef", observation: "Verificar se o estudante descreveu adequadamente os achados cutâneos." },
      { id: "ci7-av", description: "<strong>Conduta Imediata - Lavagem e Neutralização:</strong> Orientou/realizou corretamente a lavagem inicial da área afetada com ÁGUA DO MAR (ou soro fisiológico, se disponível) e, em seguida, a aplicação de VINAGRE (ácido acético a 5%) por 15-30 minutos. Penalizar se indicou uso de água doce antes do vinagre.", points: { inadequate: 0, partial: 1, adequate: 2 }, type: "ct", observation: "CRÍTICO: O uso de água doce inicialmente pode piorar o quadro. A aplicação de vinagre é fundamental." },
      { id: "ci8-av", description: "<strong>Conduta - Remoção de Tentáculos e Alívio da Dor:</strong> Orientou/realizou a remoção de tentáculos visíveis (com pinça ou proteção, sem esfregar). APÓS a neutralização com vinagre, considerou/orientou o uso de compressas mornas (40-45°C, tolerável à pele) por cerca de 20 minutos para alívio da dor e/ou analgesia sistêmica (ex: dipirona, paracetamol), se necessário e sem contraindicações.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ct" },
      { id: "ci9-av", description: "<strong>Orientação e Encaminhamento:</strong> Informou o paciente sobre os cuidados com a ferida, sinais de alerta para procurar reavaliação médica (piora da dor, sinais de infecção como pus ou febre, sintomas sistêmicos tardios), e a importância de evitar coçar o local. Considerou a necessidade de profilaxia antitetânica se não atualizada.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ct" },
    ],
    references: [{ text: "Protocolos clínicos para acidentes com animais aquáticos (ex: Ministério da Saúde, Sociedades Médicas de Dermatologia ou Toxicologia).", url: "#" }],
    flashcards: [
      { id: "fc1-av", question: "Qual é o agente de escolha para a neutralização inicial do veneno de água viva (cnidários) na maioria das situações no Brasil?", answer: "Vinagre comum (solução de ácido acético a aproximadamente 5%), aplicado por 15 a 30 minutos.", tag: "Tratamento Crítico" },
      { id: "fc2-av", question: "Por que a lavagem inicial de uma queimadura por água viva NÃO deve ser feita com água doce?", answer: "A água doce, por diferença de osmolaridade, pode causar a ruptura dos nematocistos (células urticantes) ainda intactos na pele, liberando mais veneno e intensificando a dor e a lesão.", tag: "Conduta Crítica" },
      { id: "fc3-av", question: "Quais são três sinais de alerta sistêmicos que indicariam a necessidade de procurar um serviço de emergência após uma queimadura por água viva?", answer: "Dificuldade respiratória ou chiado no peito; tontura, confusão mental ou desmaio; náuseas/vômitos persistentes (especialmente se acompanhados de dor abdominal intensa ou cãibras musculares). Reações alérgicas graves (edema de glote, anafilaxia) também são emergências.", tag: "Sinais de Alerta" },
      { id: "fc4-av", question: "Após a neutralização com vinagre, qual medida física pode ser utilizada para alívio da dor em queimaduras por água viva?", answer: "Imersão ou compressas de água morna (entre 40-45°C, temperatura que seja tolerável à pele sem causar queimadura térmica adicional), por cerca de 20 minutos. O calor ajuda a desnaturar as toxinas termolábeis.", tag: "Tratamento Adjuvante" },
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

