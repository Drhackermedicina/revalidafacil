
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
        <p><strong>Dor na Perna Direita (Queimadura por Água Viva):</strong></p>
        <ul>
          <li><strong>Início e Causa:</strong> Súbito, há aproximadamente 15 minutos. O paciente estava na água do mar quando sentiu um contato seguido de dor aguda imediata. Ele identificou o contato como sendo de uma água viva.</li>
          <li><strong>Localização:</strong> Principalmente na face anterior da coxa direita, com algumas marcas lineares que se estendem para a face lateral da coxa.</li>
          <li><strong>Irradiação:</strong> A dor é mais intensa no local das marcas, mas há uma sensação de desconforto que se espalha por toda a coxa direita.</li>
          <li><strong>Qualidade/Tipo:</strong> Descrita como uma "queimação muito forte", "agulhadas quentes" ou "ardência intensa".</li>
          <li><strong>Intensidade (Escala de 0-10):</strong> No momento do incidente, refere dor 10/10. Ao chegar para atendimento, a dor está em 8/10.</li>
          <li><strong>Duração e Evolução:</strong> A dor tem sido contínua desde o início. Houve uma leve diminuição da intensidade após sair da água, mas permanece forte.</li>
          <li><strong>Fatores de Melhora/Piora:</strong> Piora com a movimentação da perna. Nenhuma medida de alívio foi tentada até o momento, exceto sair da água.</li>
          <li><strong>Sintomas Associados Locais:</strong> Vermelhidão (eritema), inchaço (edema) e presença de marcas lineares no local do contato. Refere também prurido (coceira) leve a moderado na área afetada.</li>
          <li><strong>Sintomas Associados Sistêmicos:</strong> Nega febre, calafrios, náuseas, vômitos, tontura, palpitações, falta de ar, dor de cabeça, alterações visuais ou qualquer outro sintoma geral.</li>
        </ul>
        <br />
        <h4>INTERROGATÓRIO SISTEMÁTICO</h4>
        <p>Além do já relatado na HDA, nega outros sintomas relevantes nos demais sistemas (cardiovascular, respiratório, gastrointestinal, neurológico, etc.).</p>
        <br />
        <h4>ANTECEDENTES</h4>
        <ul>
            <li><strong>Médicos:</strong> Nega comorbidades como diabetes, hipertensão, asma, doenças cardíacas ou reumatológicas. Nega internações prévias.</li>
            <li><strong>Cirúrgicos:</strong> Nega cirurgias anteriores.</li>
            <li><strong>Alergias:</strong> Nega alergias medicamentosas (dipirona, AAS, penicilina, etc.) ou alimentares conhecidas.</li>
            <li><strong>Vacinação:</strong> Refere vacinação em dia, conforme calendário nacional (importante para tétano).</li>
            <li><strong>Medicações em Uso:</strong> Nega uso de medicações contínuas.</li>
        </ul>
        <br />
        <h4>HÁBITOS DE VIDA</h4>
        <ul>
            <li><strong>Atividade Física:</strong> Pratica natação 3 vezes por semana na piscina do condomínio.</li>
            <li><strong>Alimentação:</strong> Refere alimentação variada, sem restrições.</li>
            <li><strong>Sono:</strong> Refere sono regular e reparador.</li>
            <li><strong>Tabagismo:</strong> Nega.</li>
            <li><strong>Etilismo:</strong> Consumo social de álcool (cerveja nos finais de semana, 2-3 latas), sem história de abuso.</li>
            <li><strong>Drogas Ilícitas:</strong> Nega.</li>
        </ul>
        <br />
        <h4>COMPORTAMENTO ESPERADO</h4>
        <p>Paciente deve demonstrar dor e ansiedade compatíveis com a intensidade referida (8/10). Deve cooperar com a anamnese e o exame físico, mas pode mostrar-se impaciente devido à dor. Seguir as instruções do médico durante a aplicação das condutas (lavagem, vinagre, compressas). Fazer perguntas sobre a gravidade da lesão e o tempo de recuperação, se o candidato der abertura.</p>
      `,
    },
    printedMaterials: [], // Removido o folder, pois o conteúdo será parte do PEP
    checklistItems: [
      { id: "ci1-av-acolhimento", description: "<strong>Acolhimento e Biossegurança:</strong> Apresentou-se ao paciente, estabeleceu uma comunicação empática e utilizou Equipamentos de Proteção Individual (EPIs) básicos (ex: luvas) antes de iniciar o contato.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ac" },
      { id: "ci2-av-anamnese-id-qp", description: "<strong>Anamnese - Identificação e Queixa Principal:</strong> Coletou dados de identificação do paciente e registrou claramente a queixa principal (dor/queimadura por água viva) e sua duração.", points: { inadequate: 0, partial: 0.25, adequate: 0.5 }, type: "an" },
      { id: "ci3-av-anamnese-hda", description: "<strong>Anamnese - História da Doença Atual (HDA):</strong> Investigou detalhadamente o sintoma principal (dor), incluindo: início, causa/mecanismo do trauma (contato com água viva), localização, irradiação, qualidade/tipo, intensidade (escala de 0-10), duração/evolução, fatores de melhora/piora. Questionou sobre sintomas associados locais (eritema, edema, prurido, marcas) e sistêmicos (febre, náuseas, tontura, dispneia, etc.).", points: { inadequate: 0, partial: 1.5, adequate: 3 }, type: "an", observation: "Avaliar a completude da investigação da dor e sintomas associados, conforme detalhado nas instruções do ator." },
      { id: "ci4-av-anamnese-antecedentes", description: "<strong>Anamnese - Antecedentes e Hábitos:</strong> Questionou sobre alergias, comorbidades, medicações em uso, estado vacinal (antitetânica), e hábitos relevantes.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "an" },
      { id: "ci5-av-examefisico-geral", description: "<strong>Exame Físico - Geral e Sinais Vitais:</strong> Avaliou o estado geral do paciente, nível de consciência, e aferiu/verificou os sinais vitais (PA, FC, FR, SatO2, Temp.), se aplicável ao cenário.", points: { inadequate: 0, partial: 0.25, adequate: 0.5 }, type: "ef" },
      { id: "ci6-av-examefisico-lesao", description: "<strong>Exame Físico - Inspeção da Lesão:</strong> Inspecionou cuidadosamente a área afetada, descrevendo as características da lesão (ex: lineares, eritematosas, edemaciadas, presença de tentáculos visíveis, extensão da lesão).", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ef", observation: "Verificar se o estudante descreveu adequadamente os achados cutâneos." },
      { id: "ci7-av-conduta-lavagem", description: "<strong>Conduta - Lavagem Inicial:</strong> Orientou/realizou a lavagem imediata e abundante da área afetada com ÁGUA DO MAR (ou soro fisiológico), explicando a importância de NÃO usar água doce neste momento.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ct", observation: "CRÍTICO: O uso de água doce antes do vinagre pode piorar a liberação de toxinas. Verificar se o candidato mencionou a contraindicação da água doce." },
      { id: "ci8-av-conduta-vinagre", description: "<strong>Conduta - Neutralização com Vinagre:</strong> Orientou/realizou a aplicação de VINAGRE comum (ácido acético a 5%) no local afetado por 15 a 30 minutos.", points: { inadequate: 0, partial: 1, adequate: 2 }, type: "ct", observation: "Fundamental para neutralizar cnidas não disparadas. Avaliar tempo de aplicação e se foi a medida subsequente à lavagem com água do mar." },
      { id: "ci9-av-conduta-tentaculos", description: "<strong>Conduta - Remoção de Tentáculos:</strong> Orientou/realizou a remoção de tentáculos visíveis com cuidado, utilizando uma pinça ou luvas, e evitando esfregar a área.", points: { inadequate: 0, partial: 0.25, adequate: 0.5 }, type: "ct", observation: "Verificar técnica de remoção (sem contato direto, sem esfregar)." },
      { id: "ci10-av-conduta-aliviodor", description: "<strong>Conduta - Alívio da Dor (Pós-Vinagre):</strong> APÓS a aplicação do vinagre, orientou/realizou a aplicação de compressas de água MORNA (40-45°C, tolerável à pele) por cerca de 20 minutos. Considerou analgesia sistêmica (ex: dipirona, paracetamol), se necessário e ausentes contraindicações.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ct", observation: "Enfatizar que as compressas mornas são APÓS o vinagre. Avaliar se a analgesia sistêmica foi considerada." },
      { id: "ci11-av-conduta-naofazer", description: "<strong>Conduta - Orientações sobre Práticas Incorretas:</strong> Orientou ativamente o paciente a NÃO utilizar/aplicar urina, álcool, ou outras substâncias não recomendadas na lesão.", points: { inadequate: 0, partial: null, adequate: 0.5 }, type: "ct", observation: "Verificar se o candidato abordou proativamente o que NÃO fazer." },
      { id: "ci12-av-conduta-orientacoes", description: "<strong>Conduta - Orientações Finais e Sinais de Alerta:</strong> Orientou o paciente sobre cuidados posteriores com a lesão (ex: evitar coçar), e detalhou os sinais de alerta que necessitam reavaliação médica (piora significativa da dor não responsiva a analgésicos comuns, sinais de infecção como febre/pus, ou sintomas sistêmicos como dificuldade respiratória, tontura, náuseas/vômitos persistentes, reações alérgicas graves). Verificou/orientou sobre a necessidade de profilaxia antitetânica se não atualizada.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ct" },
    ],
    references: [{ text: "Protocolos clínicos para acidentes com animais aquáticos (ex: Ministério da Saúde, Sociedades Médicas de Dermatologia ou Toxicologia).", url: "#" }],
    flashcards: [
      { id: "fc1-av", question: "Qual é o agente de escolha para a neutralização inicial do veneno de água viva (cnidários) na maioria das situações no Brasil?", answer: "Vinagre comum (solução de ácido acético a aproximadamente 5%), aplicado por 15 a 30 minutos.", tag: "Tratamento Crítico" },
      { id: "fc2-av", question: "Por que a lavagem inicial de uma queimadura por água viva NÃO deve ser feita com água doce?", answer: "A água doce, por diferença de osmolaridade, pode causar a ruptura dos nematocistos (células urticantes) ainda intactos na pele, liberando mais veneno e intensificando a dor e a lesão.", tag: "Conduta Crítica" },
      { id: "fc3-av", question: "Quais são três sinais de alerta sistêmicos que indicariam a necessidade de procurar um serviço de emergência após uma queimadura por água viva?", answer: "Dificuldade respiratória ou chiado no peito; tontura, confusão mental ou desmaio; náuseas/vômitos persistentes. Reações alérgicas graves (edema de glote, anafilaxia) também são emergências.", tag: "Sinais de Alerta" },
      { id: "fc4-av", question: "Após a neutralização com vinagre, qual medida física pode ser utilizada para alívio da dor em queimaduras por água viva?", answer: "Imersão ou compressas de água morna (entre 40-45°C, temperatura que seja tolerável à pele sem causar queimadura térmica adicional), por cerca de 20 minutos. O calor ajuda a desnaturar as toxinas termolábeis.", tag: "Tratamento Adjuvante" },
      { id: "fc5-av", question: "Quais são as duas principais ações do vinagre em uma queimadura por água-viva?", answer: "1. Inativa os nematocistos ainda não disparados, impedindo maior liberação de veneno. 2. Pode ajudar a diminuir a dor por mecanismos ainda não totalmente elucidados, mas não é um analgésico direto potente.", tag: "Mecanismo de Ação" },
      { id: "fc6-av", question: "Ao remover tentáculos de água viva da pele do paciente, qual cuidado essencial o profissional deve ter?", answer: "Utilizar uma barreira de proteção (luvas) e um instrumento (pinça), evitando o contato direto com os próprios dedos e não esfregar a área para não disparar mais nematocistos.", tag: "Procedimento Seguro" }
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

    