
import AppLayout from "@/components/layout/app-layout";
import TrainingPageClient from "@/components/training/training-page-client";

export default function Home() {
  // This data would typically come from a database or API
  const checklistData = {
    title: "Acidente Por Animal Peçonhento - Águas-vivas e Caravelas",
    area: "Preventiva",
    code: "DA1703612861883C", // Example code
    scenario: {
      title: "Cenário de atuação",
      description: `<strong>CENÁRIO DE ATENDIMENTO</strong><br><strong>Nível de atenção:</strong> atenção primária à saúde.<br><strong>Tipo de atendimento:</strong> atendimento ambulatorial <br>- Unidade básica de saúde (UBS).<br><br> <strong>A unidade apresenta a seguinte infraestrutura:</strong><br> - Consultório médico e salas de procedimentos e observação.  <br><br><strong>DESCRIÇÃO DO CASO</strong><br>Você é médico(a) em uma UBS em uma cidade do litoral de Santa Catarina. Você atenderá um homem com 32 anos de idade com queixa de dor de cabeça, mal estar geral e dor intensa em queimação na pele na coxa direita. <br><br>ATENÇÃO! CASO JULGUE NECESSÁRIO REALIZAR EXAME FÍSICO, VERBALIZE! <br>A PACIENTE SIMULADA NÃO DEVERÁ SER TOCADA DURANTE O ATENDIMENTO.`,
    },
    tasks: {
      title: "Tarefas",
      timeLimit: "10 minutos", // Example, could be dynamic
      items: [
        "Realizar a anamnese dirigida à queixa principal da paciente;",
        "Solicitar exame físico do membro afetado;",
        "Verbalizar e explicar o diagnóstico;",
        "Pactuar plano de cuidado com a paciente usando método clínico centrado na pessoa;",
        "Avaliar a necessidade de adoção de outras medidas sanitárias.",
      ],
    },
    actorInstructions: {
      title: "Orientações do Ator/Atriz",
      content: `<strong>DADOS PESSOAIS:</strong>
-Gustavo, 32 anos, solteiro, surfista.

<strong>MOTIVO DE CONSULTA:</strong>
Doutor(a), hoje pela manhã, enquanto estava surfando na praia, senti uma dor forte e súbita na coxa direita.

<strong>SOBRE A DOR:</strong>
<strong>Tempo de evolução:</strong> Faz cerca de 40 minutos.
<strong>Localização:</strong> Na coxa direita.
<strong>Intensidade:</strong> É uma dor intensa, 8 na escala de dor.
<strong>Características:</strong> Do tipo queimação.
<strong>Irradiação</strong>: Está se espalhando pela coxa, o local da lesão é sensível ao toque.
<strong>Progressão dos sintomas</strong>: Está piorando com o tempo.
<strong>Fatores de melhora ou Fatores de piora</strong>: Lavei o local com água doce e coloquei gelo, mesmo assim a dor piorou.
<strong>Episódios anteriores:</strong> Nega.

<strong>FATORES DESENCADEANTES</strong>:
-<strong>Contato com planta, produto químico, inseto ou bicho</strong>: Uma água-viva encostou na minha coxa. 
<strong>(NESSE MOMENTO LIBERAR IMAGEM DA ÁGUA-VIVA)</strong>.
-<strong>Higienização do local</strong>: Logo após o incidente, lavei o local lesionado com água doce e coloquei gelo, mesmo assim a dor piorou.
-<strong>Uso de medicamentos</strong>: Não ingeri remédios.

<strong>SINTOMAS ASSOCIADOS:</strong>
-<strong>Mal- estar geral</strong>: Sim.
-<strong>Dor de cabeça</strong>: Sim.
-<strong>Enjoos</strong>: Sim.
-<strong>Prurido</strong>: Sim.
-<strong>Não apresento outros sintomas</strong>.

<strong>ANTECEDENTES PESSOAIS/PATOLÓGICOS</strong>:
-<strong>Comorbidades</strong>: Não tenho problemas de saúde.
-<strong>Medicações</strong>: Nega.
-<strong>Alergias</strong>: Nega.
-<strong>Cirurgia prévia</strong>: Nega.
-<strong>Internações prévias:</strong> Nega.

<strong>HÁBITOS</strong>:
-<strong>Tabagismo</strong>: Nega.
-<strong>Etilismo</strong>: Nega.
-<strong>Drogas ilícitas</strong>: Nega.
<strong>Atividade Física:</strong> Pratico surf regularmente.
<strong>Dieta:</strong> Alimentação balanceada.

●Ao questionar se alguma planta, produto químico, inseto ou bicho encostou na pele do paciente, liberar o <strong>IMPRESSO - IMAGEM DA ÁGUA-VIVA</strong>.

<strong>No decorrer do atendimento, caso a investigação clínica for feita de maneira adequada pelo(a) participante, a paciente simulada poderá perguntar</strong>: 
● Como está o minha coxa? O que eu tenho é grave? 
● Como vamos tratar o minha coxa? 
● Por que devo ser internado? Estou correndo risco de vida?
● O que devo fazer quando isso acontecer?`,
    },
    printedMaterials: [
      {
        id: "imp1",
        title: "Impresso 1 ( Exame Físico )",
        content: `<strong>Sinais vitais:</strong><br />
-<strong>Pressão Arterial</strong>: 128 × 95 mmHg.<br />
- <strong>Frequência respiratória</strong>: 38 incursões respiratórias por minuto.<br />
- <strong>Frequência cardíaca</strong>: 98 batimentos por minuto.<br />
<br />
-Abdome normotenso e indolor à palpação.<br />
<br />
-Ausculta cardíaca e respiratória inalteradas.<br />
<br />
<strong>Exame da Lesão:</strong><br />
-<strong>Coxa direita</strong>: Presença de múltiplas lesões lineares, eritematosas, edemaciadas, urticariformes e dolorosas nos pontos de inoculação dos tentáculos, com cerca de 1 a 3 cm de extensão, dispostas de forma irregular na face anterior da coxa direita, com presença de tentáculos aderidos.<br />
Bolhas e necrose cutânea superficial não visualizadas.`,
        isLocked: true,
      },
      {
        id: "imp2",
        title: "Impresso 2 ( IMAGEM DA ÁGUA-VIVA )",
        imageSrc: "https://app.penserevalida.com/impressos/1022/1745973000.jpg",
        imageAlt: "Imagem da Água-viva",
        content: `IMAGEM DA ÁGUA-VIVA`,
        isLocked: true,
      },
    ],
    checklistItems: [
      { id: "check1", description: "1. <strong>Apresenta-se:</strong><br>(1) Cumprimenta o paciente simulada; <br>(2) Identifica-se; e, <br>(3) Dirige-se a ele pelo nome, pelo menos uma vez. <br><br><strong>Adequado:</strong> Realiza as três ações. <br><strong>Parcialmente adequado:</strong> Realiza apenas duas ações. <br><strong>Inadequado:</strong> Realiza apenas uma ação ou não realiza ação alguma.", points: { inadequate: 0, partial: 0.25, adequate: 0.5 }, type: "ac", observation: "" },
      { id: "check2", description: "2. <strong>Demonstra empatia com a paciente:</strong><br>(1) Estabelece contato visual; e, <br>(2) Mantém postura atenta e interessada ao longo da consulta. <br><br><strong>Adequado:</strong> Realiza as duas ações.<br><strong>Parcialmente adequado:</strong> Realiza uma ação.<br><strong>Inadequado:</strong> Não realiza ação alguma.", points: { inadequate: 0, partial: 0.15, adequate: 0.25 }, type: "ac", observation: "" },
      { id: "check3", description: "3. <strong>Escuta ativamente a fala do paciente, sem interrompê-lo.</strong><br><br><strong>Adequado:</strong> Realiza a ação. <br><strong>Inadequado:</strong> Não realiza a ação.", points: { inadequate: 0, partial: null, adequate: 0.25 }, type: "ac", observation: "" },
      { id: "check4", description: "4. <strong>Usa linguagem acessível com o paciente simulada, evitando termos técnicos de difícil compreensão.</strong> <br><br><strong>Adequado:</strong> Utiliza linguagem acessível. <br><strong>Inadequado:</strong> Não utiliza linguagem acessível.", points: { inadequate: 0, partial: null, adequate: 0.25 }, type: "ac", observation: "" },
      { id: "check5", description: "5. <strong>Pergunta se o paciente teve contato direto com:</strong><br>(1) Animais ou insetos;<br>(2) Produtos químicos;<br>(3) Plantas alergênicas.<br><br><strong>Adequado:</strong> Pergunta os três itens.<br><strong>Parcialmente adequado:</strong> Pergunta um ou dois itens.<br><strong>Inadequado:</strong> Não pergunta item algum.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "an", observation: "" },
      { id: "check6", description: "6. <strong>Pergunta sobre as características da dor:</strong><br>(1) Tempo desde o início do quadro;<br>(2) Tipo de dor;<br>(3) Localização e irradiação;<br>(4) Intensidade ou graduação;<br>(5) Fatores de melhoria;<br>(6) Fatores de agravamento; e,<br>(7) Uso de medicamentos.<br><br><strong>Adequado:</strong> Pergunta cinco ou mais características.<br><strong>Parcialmente adequado:</strong> Pergunta três ou quatro características.<br><strong>Inadequado:</strong> Pergunta uma ou duas características ou não pergunta característica alguma.", points: { inadequate: 0, partial: 0.25, adequate: 0.5 }, type: "an", observation: "" },
      { id: "check7", description: "7. <strong>Pergunta sobre as características das manifestações locais:</strong><br>(1) Evolução da lesão cutânea desde o início do quadro; e,<br>(2) Prurido.<br><br><strong>Adequada</strong>: Pergunta sobre as duas manifestações locais.<br><strong>Parcialmente adequado</strong>: Pergunta sobre uma manifestação local.<br><strong>Inadequado</strong>: Não pergunta manifestação alguma.", points: { inadequate: 0, partial: 0.25, adequate: 0.5 }, type: "an", observation: "" },
      { id: "check8", description: "8. <strong>Pergunta sobre manifestações sistêmicas:</strong><br>(1) Cefaleia;<br>(2) Mal-estar;<br>(3) Náuseas ou vômito ou dor abdominal; e,<br>(4) Dificuldade para respirar.<br><br><strong>Adequado</strong>: Pergunta quatro manifestações.<br><strong>Parcialmente adequado</strong>: Pergunta três manifestações.<br><strong>Inadequado</strong>: Pergunta uma ou duas manifestações ou não pergunta sobre manifestação alguma.", points: { inadequate: 0, partial: 0.75, adequate: 1.5 }, type: "an", observation: "" },
      { id: "check9", description: "9. <strong>Verbaliza o diagnóstico de acidente com água-viva:</strong><br><br><strong>Adequado</strong>: Verbaliza. <br><strong>Parcialmente adequado</strong>: Verbaliza acidente com animal peçonhento.<br><strong>Inadequado</strong>: Não verbaliza.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "dx", observation: "" },
      { id: "check10", description: "10. <strong>Indica ou propõe a prescrição de:</strong><br>(1) Lavar a área afetada com soro fisiológico OU ácido acético a 5% (vinagre);<br>(2) Retirada de tentáculos aderidos (com pinça ou lâmina);<br>(3) Analgésico; <br>(4) Anti-histamínico sistêmico; <br>(5) Aplicar compressa fria.<br><br><strong>Adequado</strong>: Realiza quatro ou mais ações. <br><strong>Parcialmente adequado</strong>: Realiza duas ou três ações.<br><strong>Inadequado</strong>: Realiza uma ação ou não realiza ação alguma.<br><br><strong>OBSERVAÇÃO:</strong> Caso o candidato cite lavar área afetada com água OU água doce não pontuar esse item.", points: { inadequate: 0, partial: 0.5, adequate: 1 }, type: "ct", observation: "Não usar água doce, pois pode romper as nematocistos (células urticantes) remanescentes e liberar mais toxinas." },
      { id: "check11", description: "11. <strong>Explica à paciente:</strong><br>(1) Sobre a necessidade de encaminhamento para serviço hospitalar de referência de acidentes por animais peçonhentos; <br>(2) A potencial gravidade ou risco de morte.<br><br><strong>Adequado</strong>: Explica os dois itens. <br><strong>Parcialmente adequado</strong>: Explica um item. <br><strong>Inadequado</strong>: Não explica item algum.", points: { inadequate: 0, partial: 1, adequate: 2 }, type: "ct", observation: "" },
      { id: "check12", description: "12. <strong>Notifica o acidente ao SINAN.</strong><br><br><strong>Adequado:</strong> Realiza a notificação.<br><strong>Inadequado:</strong> Não realiza a notificação.", points: { inadequate: 0, partial: null, adequate: 1.25 }, type: "ct", observation: "" },
    ],
    references: [
      { text: "Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos", url: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/animais-peconhentos/aguas-vivas-e-caravelas/publicacoes/manual-de-diagnostico-e-tratamento-de-acidentes-por-animais-peconhentos.pdf/view" },
      { text: "Águas-Vivas e Caravelas - Informações Gerais", url: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/animais-peconhentos/aguas-vivas-e-caravelas" },
    ],
    flashcards: [
       { id: "fc1", question: "Qual o nível de atenção do cenário de atendimento?", answer: "Atenção primária à saúde.", tag: "cenario" },
       { id: "fc2", question: "Qual o tipo de atendimento?", answer: "Atendimento ambulatorial em Unidade Básica de Saúde (UBS).", tag: "cenario" },
       { id: "fc3", question: "Descreva o caso clínico principal.", answer: "Homem de 32 anos com dor de cabeça, mal-estar geral e dor intensa em queimação na coxa direita após contato com água-viva enquanto surfava.", tag: "caso" },
       { id: "fc4", question: "Quais são as tarefas principais a serem realizadas pelo médico?", answer: "Realizar anamnese, solicitar exame físico, verbalizar diagnóstico, pactuar plano de cuidado e avaliar necessidade de outras medidas sanitárias.", tag: "tarefas" },
       { id: "fc5", question: "Quais são os dados pessoais do paciente simulado (Gustavo)?", answer: "32 anos, solteiro, surfista.", tag: "ator" },
       { id: "fc6", question: "Qual o principal sintoma e sua evolução segundo o ator?", answer: "Dor forte e súbita na coxa direita, tipo queimação, intensidade 8/10, há 40 minutos, piorando com o tempo.", tag: "ator" },
       { id: "fc7", question: "O que o ator fez após o incidente com a água-viva?", answer: "Lavou o local com água doce e colocou gelo, mas a dor piorou.", tag: "ator" },
       { id: "fc8", question: "Quais sintomas associados o ator relata?", answer: "Mal-estar geral, dor de cabeça, enjoos e prurido.", tag: "ator" },
       { id: "fc9", question: "O que deve ser feito se o participante perguntar sobre contato com animais/plantas?", answer: "Liberar o IMPRESSO - IMAGEM DA ÁGUA-VIVA.", tag: "ator_acao" },
       { id: "fc10", question: "Cite um exemplo de pergunta que o paciente simulado pode fazer.", answer: "Como está minha coxa? O que eu tenho é grave?", tag: "ator_pergunta" },
    ]
  };

  return (
    <AppLayout>
      <TrainingPageClient checklistData={checklistData} />
    </AppLayout>
  );
}
