
// src/lib/station-data/editor-templates/clinical-medicine-template.ts

export const clinicalMedicineEditorTemplate = {
  scenarioTitle: "Caso Clínico de Clínica Médica (Modelo)",
  scenarioDescription: `Nível de Atenção: [Atenção secundária ou terciária]
Tipo de Atendimento: [Ex: Pronto Atendimento, Enfermaria, Ambulatório de especialidades]
Infraestrutura Disponível:
- [Ex: Leito de observação/exame]
- [Ex: Monitor multiparamétrico]
- [Ex: Acesso a ECG]
- [Ex: Acesso a exames de imagem e laboratoriais complexos]

Avisos Importantes (Para o candidato):
- [Ex: OS RESULTADOS DOS EXAMES SERÃO ENTREGUES PELO AVALIADOR APÓS A SOLICITAÇÃO.]

Descrição do Caso:
[Paciente de [idade] anos, sexo [masculino/feminino], é trazido(a) ao [tipo de atendimento] com queixa de [queixa principal] há [tempo].]`,

  actorInstructions: `Perfil do Paciente:
Nome: [Nome fictício]
Idade: [Idade]
Profissão/Ocupação: [Profissão]

Script da Anamnese:
Motivo da Consulta: "[Descrição da queixa principal pelo paciente]"
HDA : [Detalhar início, localização, irradiação, qualidade, intensidade, duração, fatores de melhora/piora, evolução e sintomas associados.]
Antecedentes Pessoais: [Comorbidades, medicamentos em uso, alergias, cirurgias prévias.]
Hábitos de Vida: [Tabagismo, etilismo, etc.]
História Familiar: [Doenças relevantes em familiares de primeiro grau.]`,

  candidateTasksDescription: `[ ] Realizar anamnese detalhada e sistemática.
[ ] Realizar exame físico completo e direcionado aos sistemas relevantes.
[ ] Solicitar e interpretar exames complementares (laboratoriais, ECG, imagem).
[ ] Formular hipóteses diagnósticas diferenciais.
[ ] Verbalizar o diagnóstico mais provável e sua classificação (ex: Insuficiência Cardíaca perfil B, Sepse com foco pulmonar).
[ ] Elaborar conduta terapêutica inicial (farmacológica e não farmacológica).
[ ] Indicar critérios de internação ou alta hospitalar.
[ ] Orientar o paciente e/ou familiares sobre a condição.`,

  printedMaterialsDescription: `IMPRESSO 1: Sinais Vitais e Exame Físico Geral
IMPRESSO 2: Exame Físico Específico
IMPRESSO 3: Eletrocardiograma (ECG)
IMPRESSO 4: Exames Laboratoriais (Hemograma, Bioquímica, Marcadores Cardíacos, etc.)
IMPRESSO 5: Laudo de Exame de Imagem (Raio-X de tórax, TC, etc.)`,

  pepItemsDescription: `Checklist de Avaliação (Pontuação Sugerida):

Domínio: ANAMNESE (3.0 pontos)
- Investigação da Queixa Principal e HDA (1.0 pts)
- Investigação de Sintomas Associados Relevantes (1.0 pts)
- Investigação de Antecedentes e Fatores de Risco (1.0 pts)

Domínio: EXAME FÍSICO (2.0 pontos)
- Aferição/Verbalização de Sinais Vitais Completos (0.5 pts)
- Realização de Exame Físico Direcionado e Sistemático (1.5 pts)

Domínio: DIAGNÓSTICO (3.0 pontos)
- Solicitação de Exames Complementares Pertinentes (1.0 pts)
- Interpretação Correta dos Exames Fornecidos (1.0 pts)
- Verbalização do Diagnóstico Principal e Diferenciais (1.0 pts)

Domínio: CONDUTA E COMUNICAÇÃO (2.0 pontos)
- Elaboração de Conduta Terapêutica Inicial Adequada (1.0 pts)
- Definição do Nível de Cuidado (Internação/Alta) (0.5 pts)
- Comunicação com o Paciente (Clareza, Empatia) (0.5 pts)

PONTUAÇÃO TOTAL: 10.0 pontos

Bibliografia de Referência:
- [Ex: Diretriz Brasileira de Hipertensão Arterial, 2020]
- [Ex: Harrison's Principles of Internal Medicine, 21st ed.]`,
};
