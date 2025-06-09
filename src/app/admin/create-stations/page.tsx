"use client";

import { useState } from 'react';
// Removido import de Button com caminho absoluto
import { stationTemplate } from '../../../../../lib/station-data/templates/station_template';
import { Button } from '../../../../components/ui/button'; // Mantido import de Button com caminho relativo

// Predefined data for some example diagnoses
const diagnosisData: { [key: string]: any } = {
  'Infarto Agudo do Miocárdio': {
    id: 'IAM',
    especialidade: 'CLÍNICA MÉDICA',
    palavrasChave: ['Dor torácica', 'IAM', 'ECG', 'Troponina', 'Angina'],
    nivelDificuldade: 'Difícil',
    cenarioAtendimento: {
      nivelAtencao: 'Urgência/Emergência',
      tipoAtendimento: 'Pronto Atendimento',
      infraestrutura: ['Eletrocardiógrafo', 'Laboratório de análises clínicas (resultados fornecidos)', 'Leito de observação', 'Materiais para acesso venoso'],
    },
    descricaoCaso: 'Paciente masculino, 55 anos, procura atendimento com queixa de dor torácica em aperto há 2 horas, irradiando para braço esquerdo.',
    tarefasPrincipais: [
      'Realizar a anamnese direcionada para dor torácica.',
      'Realizar o exame físico geral e cardiovascular.',
      'Solicitar ECG e enzimas cardíacas.',
      'Formular hipóteses diagnósticas (principalmente SCA).',
      'Verbalizar o diagnóstico mais provável.',
      'Elaborar e comunicar a conduta terapêutica inicial para SCA.',
    ],
    dadosPacienteSimulado: {
      motivoConsulta: 'Estou com uma dor forte no peito que não passa.',
      sintomasPrincipais: [
        {
          nome: 'Dor Torácica',
          inicio: 'Começou de repente, há umas duas horas.',
          localizacao: 'Bem aqui no meio do peito.',
          irradiacao: 'Sinto que vai para o meu braço esquerdo e pescoço.',
          qualidadeTipo: 'É uma dor tipo aperto, uma pressão forte.',
          intensidade: 'Agora está um 8. Começou mais forte, um 9.',
          duracao: 'Desde que começou, não parou mais.',
          fatoresMelhora: 'Nada que eu fiz melhorou.',
          fatoresPiora: 'Quando eu tento respirar fundo, parece que piora.',
          evolucao: 'Começou forte e continua forte.',
        }
      ],
      sintomasAcompanhantes: {
        dispneia: 'Sim, estou com falta de ar.',
        nauseasVomitos: 'Senti um pouco de enjoo, mas não vomitei.',
        sudorese: 'Sim, estou suando frio.',
        palpitacoes: 'Não senti palpitações.',
      },
      antecedentesPessoais: {
        doencasPrevias: 'Tenho pressão alta e diabetes.',
        medicamentosUsoContinuo: 'Uso Losartana 50mg de manhã e Metformina 850mg duas vezes ao dia.',
        alergias: 'Tenho alergia a dipirona.',
      },
      habitosVida: {
        tabagismo: 'Fumo um maço de cigarros por dia há 20 anos.',
      },
      historiaFamiliar: 'Meu pai morreu de infarto com 50 anos.',
    },
    impressosDisponiveis: [
      {
        id: 'estX_examefisico_geral',
        conteudo: 'Estado Geral: Regular, consciente, orientado. PA: 160x100 mmHg. FC: 95 bpm. FR: 22 irpm. Tax: 36.5ºC. SatO2: 92% (ar ambiente).',
      },
      {
        id: 'estX_imagem_ecg',
        conteudo: 'ECG: Supradesnivelamento do segmento ST em paredes inferior e lateral.',
      },
      {
        id: 'estX_lab_enzimas',
        conteudo: 'Troponina I: 2.5 ng/mL (Ref: < 0.04). CK-MB: 80 U/L (Ref: < 25).',
      }
    ],
    // Simplified checklist for this example
    itensAvaliacao: [
      { dominio: 'ANAMNESE', descricao: 'Investigação da dor torácica (4/7 características)', pontos: 1.0 },
      { dominio: 'ANAMNESE', descricao: 'Investigação de sinais de alarme para SCA', pontos: 1.0 },
      { dominio: 'EXAME FÍSICO', descricao: 'Verbaliza solicitação de Sinais Vitais', pontos: 0.25 },
      { dominio: 'DIAGNÓSTICO', descricao: 'Solicita ECG e enzimas cardíacas', pontos: 0.75 },
      { dominio: 'DIAGNÓSTICO', descricao: 'Interpretação correta do ECG e enzimas', pontos: 0.75 },
      { dominio: 'DIAGNÓSTICO', descricao: 'Verbaliza diagnóstico de IAM', pontos: 1.0 },
      { dominio: 'CONDUTA E COMUNICAÇÃO', descricao: 'Comunica conduta inicial para IAM (antiagregação, anticoagulação, nitrato, morfina)', pontos: 1.0 },
      { dominio: 'CONDUTA E COMUNICAÇÃO', descricao: 'Orienta sobre sinais de alarme para retorno', pontos: 1.0 },
    ],
  },
  'Dengue Clássica': {
    id: 'DENGUE',
    especialidade: 'CLÍNICA MÉDICA',
    palavrasChave: ['Dengue', 'Febre', 'Mialgia', 'Artralgia', 'Exantema', 'Prova do laço'],
    nivelDificuldade: 'Fácil',
    cenarioAtendimento: {
      nivelAtencao: 'Atenção primária à saúde',
      tipoAtendimento: 'Ambulatorial',
      infraestrutura: ['Consultório médico', 'Sala de procedimentos (para prova do laço)', 'Laboratório de análises clínicas (resultados fornecidos)'],
    },
    descricaoCaso: 'Paciente feminina, 30 anos, procura atendimento com queixa de febre alta e dores no corpo há 3 dias.',
    tarefasPrincipais: [
      'Realizar a anamnese direcionada para sintomas de dengue.',
      'Realizar o exame físico geral, buscando sinais de alarme.',
      'Realizar a prova do laço.',
      'Solicitar exames complementares pertinentes.',
      'Formular hipóteses diagnósticas.',
      'Verbalizar o diagnóstico provável e classificação de risco.',
      'Elaborar e comunicar a conduta terapêutica inicial.',
      'Orientar sobre sinais de alarme e retorno.',
    ],
    dadosPacienteSimulado: {
      motivoConsulta: 'Estou me sentindo muito mal, com febre e dores no corpo.',
      sintomasPrincipais: [
        {
          nome: 'Febre',
          inicio: 'Há 3 dias.',
          localizacao: 'Geral',
          irradiacao: 'Não se aplica.',
          qualidadeTipo: 'Alta, medida em casa, não sei o valor exato.',
          intensidade: 'Intensa.',
          duracao: 'Constante, não cedeu com antitérmicos comuns.',
          fatoresMelhora: 'Nenhum.',
          fatoresPiora: 'Nenhum.',
          evolucao: 'Começou alta e continua alta.',
        },
        {
          nome: 'Dores no corpo',
          inicio: 'Junto com a febre.',
          localizacao: 'Principalmente músculos e articulações.',
          irradiacao: 'Não.',
          qualidadeTipo: 'É uma dor forte, tipo cansaço.',
          intensidade: 'Moderada a forte.',
          duracao: 'Constante.',
          fatoresMelhora: 'Um pouco com repouso, mas volta.',
          fatoresPiora: 'Movimentação.',
          evolucao: 'Melhora um pouco com repouso.',
        }
      ],
      sintomasAcompanhantes: {
        cefaleia: 'Sim, uma dor de cabeça atrás dos olhos.',
        dorRetroOrbitaria: 'Sim.',
        exantema: 'Começou a aparecer umas pintinhas vermelhas no corpo hoje.',
        prurido: 'Sim, onde tem as pintinhas.',
        nauseasVomitos: 'Senti um pouco de enjoo hoje de manhã.',
      },
      antecedentesPessoais: {},
    },
    impressosDisponiveis: [
      {
        id: 'estX_examefisico_geral_dengue',
        conteudo: 'Estado Geral: Regular, consciente, orientada, hidratada, corada, acianótica, anictérica. PA: 110x70 mmHg. FC: 85 bpm. FR: 18 irpm. Tax: 38.9ºC. SatO2: 98% (ar ambiente).',
      },
      {
        id: 'estX_lab_hemograma_dengue',
        conteudo: 'Hemograma: Hemoglobina: 13.5 g/dL (Ref: 12-16). Hematocrito: 40% (Ref: 36-46). Leucocitos Totais: 3.200/mm³ (Ref: 4.000-11.000). Plaquetas: 90.000/mm³ (Ref: 150.000-450.000).',
      },
      {
        id: 'estX_teste_provadolaco_dengue',
        conteudo: 'Prova do Laço: Positiva (>20 petéquias em 2,5 cm²).',
      },
    ],
    itensAvaliacao: [
      { dominio: 'ANAMNESE', descricao: 'Investigação de febre e dores no corpo.', pontos: 1.0 },
      { dominio: 'ANAMNESE', descricao: 'Investigação de outros sintomas de dengue (cefaleia, dor retro-orbitária, exantema, etc.).', pontos: 1.0 },
      { dominio: 'ANAMNESE', descricao: 'Investigação sobre exposição em área endêmica / viagens recentes.', pontos: 0.5 },
      { dominio: 'EXAME FÍSICO', descricao: 'Verbaliza solicitação de Sinais Vitais.', pontos: 0.25 },
      { dominio: 'EXAME FÍSICO', descricao: 'Realiza ou verbaliza a realização da prova do laço.', pontos: 0.75 },
      { dominio: 'DIAGNÓSTICO', descricao: 'Solicita Hemograma e Sorologia para Dengue (se disponível).', pontos: 0.75 },
      { dominio: 'DIAGNÓSTICO', descricao: 'Interpretação correta do Hemograma (leucopenia, plaquetopenia) e Prova do Laço.', pontos: 0.75 },
      { dominio: 'DIAGNÓSTICO', descricao: 'Verbaliza diagnóstico de Dengue Clássica e classifica o risco (Grupo A ou B).', pontos: 1.0 },
      { dominio: 'CONDUTA E COMUNICAÇÃO', descricao: 'Comunica conduta inicial (hidratação oral, paracetamol para dor/febre).', pontos: 1.0 },
      { dominio: 'CONDUTA E COMUNICAÇÃO', descricao: 'Orienta a NÃO utilizar AAS e AINEs.', pontos: 0.75 },
      { dominio: 'CONDUTA E COMUNICAÇÃO', descricao: 'Orienta sobre sinais de alarme para retorno (dor abdominal, vômitos persistentes, sangramentos, etc.).', pontos: 1.0 },
      { dominio: 'CONDUTA E COMUNICAÇÃO', descricao: 'Verbaliza a necessidade de notificação compulsória (SINAN).', pontos: 0.5 },
    ],
  },
  // Add more diagnoses here following the same structure
};

const CreateStationPage = () => {
  const [diagnostico, setDiagnostico] = useState('');


  const handleGerarEstacao = () => { // Function to generate the station based on the input diagnosis
    const data = diagnosisData[diagnostico];
    if (data) {
      // Deep copy template to avoid modifying the original
      // This ensures that we start with a fresh template each time
      const newStation = JSON.parse(JSON.stringify(stationTemplate));

      // Merge diagnosis data into the template, prioritizing diagnosis data
      Object.assign(newStation, data); // Merge data into the copied template
      console.log('Estação Gerada:', newStation); // Log the generated station object
      // TODO: Implement display or saving of the generated station (e.g., in a state or pushing to a list)
      // For example, you might set another state variable here
      // setGeneratedStation(newStation); // Assuming you have a state variable to hold the generated station
    } else {
      console.error(`Dados para o diagnóstico "${diagnostico}" não encontrados.`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Estação</h1>
      <div className="mb-4">
        <label htmlFor="diagnostico" className="block text-sm font-medium text-gray-700">
          Nome do Diagnóstico/Estação
        </label>
        <input
          type="text"
          id="diagnostico"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={diagnostico}
          onChange={(e) => setDiagnostico(e.target.value)}
        />
      </div>
      <Button onClick={handleGerarEstacao}>
        Gerar Estação
      </Button>
    </div>
  );
};

export default CreateStationPage;
