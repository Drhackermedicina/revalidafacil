// src/lib/station-data/editor-templates/go-template.ts

export const goEditorTemplate = {
  // O título da estação e o código serão preenchidos pelo usuário no editor.
  // A área será "G.O" quando este template for aplicado.

  scenarioTitle: "Caso Clínico de Ginecologia e Obstetrícia (Modelo)",
  scenarioDescription: `Nível de Atenção: [Atenção primária, secundária ou terciária]
Tipo de Atendimento: [Ex: UBS, Ambulatório de Ginecologia/Pré-natal, Maternidade]
Infraestrutura Disponível:
- [Ex: Maca ginecológica]
- [Ex: Espéculo, material para coleta de Papanicolau]
- [Ex: Sonar doppler, fita obstétrica]
- [Ex: Manequim de parto (se aplicável)]

Avisos Importantes (Para o candidato):
- [Ex: SOLICITE A PRESENÇA DE UM AUXILIAR ANTES DE INICIAR O EXAME FÍSICO.]
- [Ex: VERBALIZE TODAS AS SUAS AÇÕES E ORIENTAÇÕES À PACIENTE.]

Descrição do Caso:
[Paciente de [idade] anos, G[X]P[Y]A[Z], procura atendimento com [queixa principal] ou para [tipo de consulta, ex: consulta de pré-natal].]`,

  actorInstructions: `Perfil do Paciente:
Nome: [Nome fictício]
Idade: [Idade]
Gesta/Para/Aborto: [G P A]

Script da Anamnese:
Motivo da Consulta: "[Descrição da queixa ou motivo da consulta]"
História Ginecológica/Obstétrica: [DUM, regularidade do ciclo, uso de contraceptivos, intercorrências em gestações prévias, etc.]`,

  candidateTasksDescription: `[ ] Realizar anamnese ginecológica/obstétrica completa (DUM, história menstrual, Gesta/Para/Aborto, vida sexual).
[ ] Realizar/descrever o exame físico ginecológico (exame especular, toque) ou obstétrico (medida de AU, ausculta de BCF, manobras de Leopold).
[ ] Solicitar e interpretar exames (ex: USG, sorologias do pré-natal, Papanicolau).
[ ] Formular hipótese diagnóstica (ex: Trabalho de Parto, Síndrome dos Ovários Policísticos).
[ ] Elaborar conduta (ex: prescrição de contraceptivo, acompanhamento pré-natal, indicação de via de parto).
[ ] Realizar aconselhamento sobre planejamento familiar ou orientações para a gestante.
[ ] Realizar procedimento simulado (ex: coleta de Papanicolau).`,

  printedMaterialsDescription: `IMPRESSO 1: Sinais Vitais
IMPRESSO 2: Achados do Exame Físico Ginecológico/Obstétrico
IMPRESSO 3: Laudo de Exame de Imagem (USG Pélvica/Obstétrica)
IMPRESSO 4: Resultados de Exames Laboratoriais (Beta-HCG, Sorologias, Papanicolau)`,

  pepItemsDescription: `Checklist de Avaliação (Pontuação Sugerida):

Domínio: ANAMNESE (3.0 pontos)
- Coleta da História Ginecológica e Obstétrica Completa (2.0 pts)
- Investigação de Fatores de Risco e Sintomas Associados (1.0 pts)

Domínio: EXAME FÍSICO (2.5 pontos)
- Técnica Adequada e Respeitosa do Exame Físico (1.5 pts)
- Realização de Manobras Específicas (Leopold, etc.) (1.0 pts)

Domínio: DIAGNÓSTICO (2.0 pontos)
- Solicitação e Interpretação Correta de Exames (1.0 pts)
- Verbalização do Diagnóstico Principal (1.0 pts)

Domínio: CONDUTA E COMUNICAÇÃO (2.5 pontos)
- Elaboração da Conduta Terapêutica/Plano de Acompanhamento (1.0 pts)
- Aconselhamento e Orientações (Planejamento familiar, pré-natal) (1.0 pts)
- Comunicação Clara e Empática (0.5 pts)

PONTUAÇÃO TOTAL: 10.0 pontos

Bibliografia de Referência:
- [Ex: Zugaib Obstetrícia, 3ª ed.]
- [Ex: Protocolos da FEBRASGO]
- [Ex: Manual de Ginecologia da SOGESP]`,
};
