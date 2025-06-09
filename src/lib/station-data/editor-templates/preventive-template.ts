
// src/lib/station-data/editor-templates/preventive-template.ts

export const preventiveEditorTemplate = {
  scenarioTitle: "Caso Clínico de Medicina Preventiva e de Família (Modelo)",
  scenarioDescription: `Nível de Atenção: Atenção primária à saúde
Tipo de Atendimento: Unidade Básica de Saúde (UBS), consulta ambutorial
Infraestrutura Disponível:
- Consultório equipado
- Balança, estadiômetro, fita métrica
- Acesso à caderneta de saúde do adulto/idoso
- Formulários de referência e contra-referência

Avisos Importantes (Para o candidato):
- ABORDE O PACIENTE DE FORMA INTEGRAL, CONSIDERANDO SEU CONTEXTO PSICOSSOCIAL.
- A COMUNICAÇÃO E O ACONSELHAMENTO SÃO PONTOS-CHAVE DESTA ESTAÇÃO.

Descrição do Caso:
[Paciente de [idade] anos, sexo [masculino/feminino], vem à consulta de rotina ou para acompanhamento de [condição crônica].]`,

  actorInstructions: `Perfil do Paciente:
Nome: [Nome fictício]
Idade: [Idade]
Profissão/Ocupação: [Profissão]

Script da Anamnese:
Motivo da Consulta: "[Descrição do motivo da consulta]"
História de Vida: [Detalhar hábitos (alimentação, atividade física), vícios (tabaco, álcool), condições de moradia, trabalho, rede de apoio familiar e social, e estado de saúde mental.]`,

  candidateTasksDescription: `[ ] Realizar anamnese com foco em hábitos de vida, fatores de risco e contexto psicossocial.
[ ] Realizar o exame físico direcionado.
[ ] Solicitar e/ou interpretar exames de rastreamento (ex: mamografia, Papanicolau).
[ ] Formular hipóteses diagnósticas e avaliar estadiamento de risco (ex: risco cardiovascular).
[ ] Elaborar um plano de cuidado multiprofissional.
[ ] Realizar aconselhamento e estabelecer um plano educacional com o paciente (ex: plano para parar de fumar, orientação alimentar).
[ ] Identificar a necessidade de referência para outros pontos da rede de atenção.`,

  printedMaterialsDescription: `IMPRESSO 1: Sinais Vitais e Dados Antropométricos (Peso, Altura, IMC, Circ. Abdominal)
IMPRESSO 2: Resultados de Exames de Rastreamento Anteriores
IMPRESSO 3: Resultados de Exames Laboratoriais (Glicemia, Lipidograma)
IMPRESSO 4: Ferramenta de Estratificação de Risco (Ex: Escore de Framingham)`,

  pepItemsDescription: `Checklist de Avaliação (Pontuação Sugerida):

Domínio: ANAMNESE E ABORDAGEM INTEGRAL (3.5 pontos)
- Abordagem Centrada na Pessoa (considerando contexto psicossocial) (1.5 pts)
- Investigação de Hábitos de Vida e Fatores de Risco (1.0 pts)
- Investigação de Saúde Mental (1.0 pts)

Domínio: DIAGNÓSTICO E ESTRATIFICAÇÃO (2.5 pontos)
- Solicitação/Interpretação de Exames de Rastreamento (1.0 pts)
- Estratificação de Risco (ex: cardiovascular, familiar) (1.5 pts)

Domínio: PLANO DE CUIDADOS E COMUNICAÇÃO (4.0 pontos)
- Elaboração de Plano Terapêutico Compartilhado (1.5 pts)
- Habilidades de Aconselhamento (ex: cessação do tabagismo) (1.5 pts)
- Comunicação Empática e Linguagem Acessível (1.0 pts)

PONTUAÇÃO TOTAL: 10.0 pontos

Bibliografia de Referência:
- [Ex: Tratado de Medicina de Família e Comunidade, 2ª ed.]
- [Ex: Cadernos de Atenção Básica (CAB) - Ministério da Saúde]`,
};
