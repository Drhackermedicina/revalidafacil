
import AppLayout from "@/components/layout/app-layout";
import TrainingPageClient from "@/components/training/training-page-client";

export default function Home() {
  // This data would typically come from a database or API
  const checklistData = {
    title: "ATENDIMENTO INICIAL AO POLITRAUMATIZADO (ABCDE)",
    area: "Cirúrgica",
    code: "DA1703612861883D", // Example code
    scenario: {
      title: "Cenário de atuação",
      description: `<strong>CENÁRIO DE ATENDIMENTO</strong><br><strong>Nível de atenção:</strong> atenção terciária.<br><strong>Tipo de atendimento:</strong> emergência hospitalar.<br><br><strong>A unidade apresenta a seguinte infraestrutura:</strong><br>- Salas de emergência equipadas, leitos de UTI, centro cirúrgico, laboratório de análises clínicas, radiografia e tomografia computadorizada.<br><br><strong>DESCRIÇÃO DO CASO</strong><br>Você está de plantão na sala de emergência de um hospital terciário e foi chamado para atender J.P.S., sexo masculino, 32 anos, vítima de acidente automobilístico (carro × carro) há 1 hora, trazido pelo Serviço de Atendimento Móvel de Urgência (SAMU). O paciente estava no banco do carona e usava cinto de segurança.<br><br>ATENÇÃO! CASO JULGUE NECESSÁRIO REALIZAR EXAME FÍSICO, VERBALIZE!<br>O PACIENTE SIMULADO NÃO DEVERÁ SER TOCADO DURANTE O ATENDIMENTO.`,
    },
    tasks: {
      title: "Tarefas",
      timeLimit: "10 minutos", // Example, could be dynamic
      items: [
        "Realizar a avaliação primária (ABCDE);",
        "Indicar exames complementares;",
        "Realizar a avaliação secundária e indicar condutas adequadas;",
        "Solicitar vaga em Unidade de Terapia Intensiva (UTI).",
      ],
    },
    actorInstructions: {
      title: "Orientações do Ator/Atriz",
      content: `<h4>DADOS PESSOAIS:</h4>
- J.P.S., 32 anos, masculino.
<br /><br />

<h4>AVALIAÇÃO PRIMÁRIA (ABCDE):</h4>
<strong>A (Vias aéreas e coluna cervical):</strong><br>
- Vias aéreas pérvias, sem presença de corpo estranho.<br>
- Colar cervical instalado pelo SAMU.<br>
<br />
<strong>B (Respiração e ventilação):</strong><br>
- Murmúrio vesicular presente e simétrico, sem ruídos adventícios.<br>
- Expansibilidade torácica simétrica.<br>
- Dispneico, com frequência respiratória de 28 ipm.<br>
- Saturação de oxigênio de 92% em ar ambiente.<br>
<br />
<strong>C (Circulação e controle de hemorragia):</strong><br>
- Pulso radial filiforme e taquicárdico (frequência cardíaca de 120 bpm).<br>
- Tempo de enchimento capilar de 4 segundos.<br>
- Pele fria e pegajosa.<br>
- Pressão arterial de 90 × 60 mmHg.<br>
- Abdome distendido, doloroso à palpação difusa, com ruídos hidroaéreos diminuídos.<br>
- Pelve estável.<br>
- Membros inferiores sem deformidades ou sangramentos ativos.<br>
<br />
<strong>D (Déficit neurológico):</strong><br>
- Escala de Coma de Glasgow: abertura ocular ao estímulo verbal (3), resposta verbal confusa (4), resposta motora obedece a comandos (6) = 13.<br>
- Pupilas isocóricas e fotorreagentes.<br>
<br />
<strong>E (Exposição e controle do ambiente):</strong><br>
- Escoriações em tórax e abdome.<br>
- Hipotermia (temperatura axilar de 35,5 °C).<br>
<br /><br />

<h4>AVALIAÇÃO SECUNDÁRIA (APÓS ESTABILIZAÇÃO INICIAL):</h4>
- <strong>História AMPLA:</strong><br>
  - <strong>Alergias:</strong> Nega.<br>
  - <strong>Medicamentos:</strong> Nega uso contínuo.<br>
  - <strong>Passado médico:</strong> Nega comorbidades.<br>
  - <strong>Líquidos e alimentos:</strong> Última refeição há 3 horas.<br>
  - <strong>Ambiente e eventos relacionados ao trauma:</strong> Acidente carro × carro, estava no banco do carona, usava cinto de segurança. Impacto frontal.<br>
<br />
- <strong>Exame físico detalhado (cabeça aos pés):</strong><br>
  - <strong>Cabeça e face:</strong> Sem deformidades ou hematomas.<br>
  - <strong>Pescoço:</strong> Colar cervical. Sem desvio de traqueia ou estase jugular.<br>
  - <strong>Tórax:</strong> Escoriações. Dor à palpação em arcos costais à direita. Murmúrio vesicular diminuído em base direita.<br>
  - <strong>Abdome:</strong> Distendido, doloroso à palpação difusa, principalmente em hipocôndrio esquerdo. Ruídos hidroaéreos diminuídos.<br>
  - <strong>Pelve:</strong> Estável.<br>
  - <strong>Membros:</strong> Sem deformidades. Pulsos periféricos palpáveis e simétricos (após reposição volêmica).<br>
  - <strong>Dorso:</strong> Sem deformidades ou hematomas.<br>
<br /><br />

<strong>RESPOSTAS A ESTÍMULOS E PERGUNTAS:</strong><br>
- Se perguntado sobre dor: "Sinto muita dor na barriga e no peito."<br>
- Se ofertado oxigênio: Aceita.<br>
- Se questionado sobre alergias ou doenças prévias: Nega.<br>
<br /><br />

<strong>No decorrer do atendimento, caso a investigação clínica for feita de maneira adequada pelo(a) participante, o paciente simulado poderá perguntar:</strong><br>
● Doutor(a), eu vou morrer?<br>
● O que aconteceu comigo?<br>
● Preciso de cirurgia?`,
    },
    printedMaterials: [
      {
        id: "imp1",
        title: "Impresso 1 ( Exames Laboratoriais )",
        content: `<strong>Resultados dos exames laboratoriais colhidos na admissão:</strong><br />
- <strong>Hemograma:</strong> Hb 9,5 g/dL, Ht 28%, Leucócitos 12.000/mm³ (Neutrófilos 70%, Linfócitos 20%, Monócitos 8%, Eosinófilos 2%), Plaquetas 180.000/mm³.<br />
- <strong>Gasometria arterial (em ar ambiente):</strong> pH 7,30, PaO2 75 mmHg, PaCO2 30 mmHg, HCO3 18 mEq/L, BE -5 mmol/L, SatO2 92%.<br />
- <strong>Lactato sérico:</strong> 4,5 mmol/L.<br />
- <strong>Tipagem sanguínea:</strong> O+.<br />
- <strong>Coagulograma:</strong> TP 13s (INR 1.1), TTPA 30s.<br />
- <strong>Função renal:</strong> Ureia 40 mg/dL, Creatinina 1,0 mg/dL.<br />
- <strong>Eletrólitos:</strong> Sódio 138 mEq/L, Potássio 3,8 mEq/L.<br />
- <strong>Glicemia:</strong> 110 mg/dL.`,
        isLocked: false, // Assumindo que os exames iniciais estão disponíveis
      },
      {
        id: "imp2",
        title: "Impresso 2 ( Raio-X de Tórax AP e Pelve AP )",
        imageSrc: "https://placehold.co/600x400.png", // Placeholder
        imageAlt: "Raio-X de Tórax e Pelve",
        content: `<strong>Laudo do Raio-X de Tórax AP:</strong> Velamento do seio costofrênico direito, compatível com derrame pleural. Demais estruturas sem alterações agudas.<br><br><strong>Laudo do Raio-X de Pelve AP:</strong> Sem sinais de fraturas.`,
        isLocked: true, // Geralmente liberado após solicitação
      },
      {
        id: "imp3",
        title: "Impresso 3 ( Tomografia de Crânio )",
        imageSrc: "https://placehold.co/600x400.png", // Placeholder
        imageAlt: "Tomografia de Crânio",
        content: `<strong>Laudo da Tomografia de Crânio sem contraste:</strong> Ausência de coleções extra-axiais. Ausência de desvio de linha média. Sulcos e cisternas de dimensões normais. Demais estruturas encefálicas sem alterações agudas.`,
        isLocked: true, // Geralmente liberado após solicitação específica
      },
    ],
    checklistItems: [
      { id: "check1", description: "1. <strong>Abordagem Primária - A (Vias Aéreas e Coluna Cervical):</strong><br>(1) Checa responsividade e chama por ajuda (se necessário); <br>(2) Garante perviedade das vias aéreas (e.g., manobras manuais, cânula orofaríngea se indicado); <br>(3) Mantém estabilização da coluna cervical (colar cervical).<br><br><strong>Adequado:</strong> Realiza as três ações. <br><strong>Parcialmente adequado:</strong> Realiza duas ações. <br><strong>Inadequado:</strong> Realiza uma ação ou não realiza ação alguma.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "abcde", observation: "Considerar intubação orotraqueal se Glasgow < 9, insuficiência respiratória ou via aérea instável." },
      { id: "check2", description: "2. <strong>Abordagem Primária - B (Respiração e Ventilação):</strong><br>(1) Avalia frequência respiratória, expansibilidade torácica e ausculta pulmonar; <br>(2) Oferta oxigênio suplementar (e.g., máscara não reinalante com reservatório 10-15 L/min); <br>(3) Considera ventilação assistida se necessário (e.g., AMBU).<br><br><strong>Adequado:</strong> Realiza as três ações. <br><strong>Parcialmente adequado:</strong> Realiza duas ações. <br><strong>Inadequado:</strong> Realiza uma ação ou não realiza ação alguma.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "abcde", observation: "Saturação alvo > 94%." },
      { id: "check3", description: "3. <strong>Abordagem Primária - C (Circulação com Controle de Hemorragia):</strong><br>(1) Avalia pulso, perfusão periférica (TEC), coloração da pele e pressão arterial; <br>(2) Obtém acesso venoso calibroso (e.g., 2 acessos periféricos ≥ 18G); <br>(3) Inicia reposição volêmica com cristaloide aquecido (e.g., Ringer Lactato ou SF 0,9%); <br>(4) Identifica e controla sangramentos externos.<br><br><strong>Adequado:</strong> Realiza as quatro ações. <br><strong>Parcialmente adequado:</strong> Realiza duas ou três ações. <br><strong>Inadequado:</strong> Realiza uma ação ou não realiza ação alguma.", points: { inadequate: 0, partial: 0.75, adequate: 1.5 }, type: "abcde", observation: "Considerar transfusão de hemocomponentes se choque refratário à reposição volêmica inicial ou Hb < 7-8 g/dL." },
      { id: "check4", description: "4. <strong>Abordagem Primária - D (Avaliação Neurológica):</strong><br>(1) Aplica Escala de Coma de Glasgow (ECG); <br>(2) Avalia pupilas (tamanho, simetria, fotorreatividade).<br><br><strong>Adequado:</strong> Realiza as duas ações. <br><strong>Inadequado:</strong> Realiza uma ação ou não realiza ação alguma.", points: { inadequate: 0, partial: null, adequate: 1 }, type: "abcde", observation: "" },
      { id: "check5", description: "5. <strong>Abordagem Primária - E (Exposição e Controle do Ambiente):</strong><br>(1) Remove vestes do paciente para exame completo; <br>(2) Previne hipotermia (e.g., manta térmica, fluidos aquecidos).<br><br><strong>Adequado:</strong> Realiza as duas ações. <br><strong>Inadequado:</strong> Realiza uma ação ou não realiza ação alguma.", points: { inadequate: 0, partial: null, adequate: 0.5 }, type: "abcde", observation: "" },
      { id: "check6", description: "6. <strong>Solicita exames complementares iniciais:</strong><br>(1) Tipagem sanguínea e prova cruzada; <br>(2) Hemograma completo; <br>(3) Gasometria arterial e lactato sérico; <br>(4) Coagulograma; <br>(5) Radiografia de tórax AP e pelve AP (FAST se disponível).<br><br><strong>Adequado:</strong> Solicita quatro ou mais exames/procedimentos. <br><strong>Parcialmente adequado:</strong> Solicita dois ou três exames/procedimentos. <br><strong>Inadequado:</strong> Solicita um exame/procedimento ou não solicita.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ex", observation: "FAST (Focused Assessment with Sonography for Trauma) pode substituir ou complementar radiografias." },
      { id: "check7", description: "7. <strong>Avaliação Secundária:</strong><br>(1) Realiza anamnese AMPLA (Alergias, Medicamentos, Passado médico, Líquidos e alimentos, Ambiente e eventos); <br>(2) Realiza exame físico detalhado (cabeça aos pés);<br>(3) Reavalia sinais vitais e resposta à terapêutica inicial.<br><br><strong>Adequado:</strong> Realiza as três ações. <br><strong>Parcialmente adequado:</strong> Realiza duas ações. <br><strong>Inadequado:</strong> Realiza uma ação ou não realiza ação alguma.", points: { inadequate: 0, partial: 0.75, adequate: 1.5 }, type: "aval", observation: "A avaliação secundária só deve ser iniciada após a estabilização primária." },
      { id: "check8", description: "8. <strong>Indica condutas específicas baseadas nos achados:</strong><br>(1) Drenagem torácica (se pneumotórax hipertensivo ou hemotórax maciço); <br>(2) Considera laparotomia exploradora (se instabilidade hemodinâmica com FAST positivo ou suspeita de lesão abdominal significativa); <br>(3) Solicita Tomografia Computadorizada de crânio, tórax, abdome e pelve (se indicado e paciente estável);<br>(4) Profilaxia para Tétano.<br><br><strong>Adequado:</strong> Indica três ou mais condutas pertinentes. <br><strong>Parcialmente adequado:</strong> Indica duas condutas pertinentes. <br><strong>Inadequado:</strong> Indica uma conduta pertinente ou não indica.", points: { inadequate: 0, partial: 1, adequate: 2 }, type: "cond", observation: "As condutas devem ser justificadas pelos achados clínicos e exames." },
      { id: "check9", description: "9. <strong>Monitorização Contínua e Reavaliação:</strong><br>(1) Mantém monitorização cardíaca, oximetria de pulso, pressão arterial não invasiva contínua; <br>(2) Reavalia o paciente frequentemente (ABCDE), especialmente após intervenções.<br><br><strong>Adequado:</strong> Realiza as duas ações. <br><strong>Inadequado:</strong> Realiza uma ação ou não realiza ação alguma.", points: { inadequate: 0, partial: null, adequate: 0.5 }, type: "monit", observation: "" },
      { id: "check10", description: "10. <strong>Encaminhamento Adequado:</strong><br>(1) Solicita vaga e encaminha o paciente para UTI após estabilização inicial;<br>(2) Comunica o caso de forma clara à equipe da UTI (SBAR ou similar).<br><br><strong>Adequado:</strong> Realiza as duas ações. <br><strong>Inadequado:</strong> Realiza uma ação ou não realiza ação alguma.", points: { inadequate: 0, partial: null, adequate: 1 }, type: "enc", observation: "" }
    ],
    references: [
      { text: "ATLS - Advanced Trauma Life Support. 10ª Edição. American College of Surgeons, 2018.", url: "#" },
      { text: "PHTLS - Prehospital Trauma Life Support. 9ª Edição. National Association of Emergency Medical Technicians (NAEMT), 2019.", url: "#" },
      { text: "Diretrizes Brasileiras de Atendimento ao Trauma. Sociedade Brasileira de Atendimento Integrado ao Traumatizado (SBAIT).", url: "#" }
    ],
    flashcards: [
       { id: "fc1", question: "Qual o nível de atenção do cenário de atendimento do politraumatizado?", answer: "Atenção terciária (emergência hospitalar).", tag: "cenario" },
       { id: "fc2", question: "Quais são os componentes da avaliação primária no trauma?", answer: "A (Vias aéreas e coluna cervical), B (Respiração e ventilação), C (Circulação e controle de hemorragia), D (Déficit neurológico), E (Exposição e controle do ambiente).", tag: "abcde" },
       { id: "fc3", question: "Qual a conduta inicial para um paciente com SatO2 de 92% em ar ambiente?", answer: "Ofertar oxigênio suplementar (e.g., máscara não reinalante 10-15 L/min).", tag: "abordagem_b" },
       { id: "fc4", question: "Quais são os sinais de choque hipovolêmico no paciente J.P.S.?", answer: "Pulso filiforme e taquicárdico, TEC > 2s, pele fria/pegajosa, hipotensão.", tag: "abordagem_c" },
       { id: "fc5", question: "Qual a pontuação na Escala de Coma de Glasgow do paciente J.P.S. na admissão?", answer: "13 (Abertura ocular ao estímulo verbal (3), resposta verbal confusa (4), resposta motora obedece a comandos (6)).", tag: "abordagem_d" },
       { id: "fc6", question: "Cite dois componentes da história AMPLA.", answer: "Alergias, Medicamentos, Passado médico, Líquidos e alimentos, Ambiente e eventos relacionados ao trauma (qualquer dois).", tag: "avaliacao_secundaria" },
       { id: "fc7", question: "Qual o achado no Raio-X de Tórax do paciente J.P.S.?", answer: "Velamento do seio costofrênico direito, compatível com derrame pleural.", tag: "exames" },
       { id: "fc8", question: "O que significa a sigla FAST no contexto do trauma?", answer: "Focused Assessment with Sonography for Trauma (Avaliação Focalizada com Ultrassonografia para Trauma).", tag: "exames" },
       { id: "fc9", question: "Quando a avaliação secundária deve ser iniciada no atendimento ao politraumatizado?", answer: "Após a conclusão e estabilização da avaliação primária (ABCDE).", tag: "avaliacao_secundaria" },
       { id: "fc10", question: "Qual é a principal preocupação ao expor o paciente (letra E do ABCDE)?", answer: "Prevenir a hipotermia.", tag: "abordagem_e" }
    ]
  };

  return (
    <AppLayout>
      <TrainingPageClient checklistData={checklistData} />
    </AppLayout>
  );
}

    