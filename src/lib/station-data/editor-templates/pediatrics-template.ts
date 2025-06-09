
// src/lib/station-data/editor-templates/pediatrics-template.ts

export const pediatricsEditorTemplate = {
  scenarioTitle: "Caso Clínico de Pediatria (Modelo)",
  scenarioDescription: `Nível de Atenção: [Atenção primária, secundária ou Urgência/Emergência]
Tipo de Atendimento: [Ex: UBS (consulta de puericultura), Pronto Socorro Pediátrico]
Infraestrutura Disponível:
- [Ex: Balança pediátrica, antropômetro]
- [Ex: Otoscópio, termômetro]
- [Ex: Material para nebulização]
- [Ex: Acesso à Caderneta de Saúde da Criança]

Avisos Importantes (Para o candidato):
- [Ex: A ANAMNESE SERÁ REALIZADA COM O RESPONSÁVEL PELA CRIANÇA.]
- [Ex: VERBALIZE TODOS OS CÁLCULOS DE DOSES DE MEDICAÇÃO.]

Descrição do Caso:
[Criança de [idade], sexo [masculino/feminino], é trazida pela mãe/responsável com queixa de [queixa principal] há [tempo].]`,

  actorInstructions: `Perfil do Responsável:
Nome do Responsável: [Nome fictício]
Relação com a criança: [Mãe, Pai, etc.]

Script da Anamnese (pelo Responsável):
Motivo da Consulta: "[Descrição da queixa da criança]"
História da Criança: [Detalhar história perinatal, alimentar (aleitamento), vacinal (se tem a caderneta), desenvolvimento neuropsicomotor, e doenças prévias.]`,

  candidateTasksDescription: `[ ] Realizar anamnese pediátrica (com o responsável), incluindo história gestacional, do parto, alimentar, vacinal e do desenvolvimento.
[ ] Realizar exame físico completo, adaptado à faixa etária.
[ ] Avaliar e interpretar curvas de crescimento e marcos do desenvolvimento.
[ ] Formular hipótese diagnóstica (ex: Bronquiolite, Gastroenterite com desidratação).
[ ] Elaborar conduta, incluindo cálculo de doses de medicamentos e plano de hidratação.
[ ] Orientar os responsáveis sobre a condição, tratamento, sinais de alerta e prevenção.
[ ] Verificar e orientar sobre o calendário vacinal.`,

  printedMaterialsDescription: `IMPRESSO 1: Sinais Vitais da Criança (FC, FR, Tax, SatO₂)
IMPRESSO 2: Achados do Exame Físico Pediátrico
IMPRESSO 3: Caderneta de Saúde da Criança (com curvas de crescimento e registro vacinal)
IMPRESSO 4: Resultados de Exames (se aplicável, ex: Hemograma, Raio-X de tórax)`,

  pepItemsDescription: `Checklist de Avaliação (Pontuação Sugerida):

Domínio: ANAMNESE (3.0 pontos)
- Coleta da História Perinatal, Alimentar e Vacinal (1.5 pts)
- Investigação da Doença Atual e Marcos do Desenvolvimento (1.5 pts)

Domínio: EXAME FÍSICO E AVALIAÇÃO (2.5 pontos)
- Técnica Adequada para o Exame Físico Pediátrico (1.5 pts)
- Interpretação das Curvas de Crescimento/Desenvolvimento (1.0 pts)

Domínio: DIAGNÓSTICO (1.5 pontos)
- Verbalização do Diagnóstico Principal (1.5 pts)

Domínio: CONDUTA E ORIENTAÇÃO (3.0 pontos)
- Elaboração da Conduta e Cálculo Correto de Doses (1.5 pts)
- Orientações aos Responsáveis (Sinais de alerta, prevenção) (1.0 pts)
- Orientação sobre o Calendário Vacinal (0.5 pts)

PONTUAÇÃO TOTAL: 10.0 pontos

Bibliografia de Referência:
- [Ex: Tratado de Pediatria - Sociedade Brasileira de Pediatria, 4ª ed.]
- [Ex: Manuais do Ministério da Saúde (AIDPI, Caderneta da Criança)]`,
};
