// src/ai/flows/suggest-questions.ts
'use server';

/**
 * @fileOverview A question suggestion AI agent for medical students during checklist exercises.
 *
 * - suggestQuestions - A function that suggests relevant questions based on the scenario and checklist items.
 * - SuggestQuestionsInput - The input type for the suggestQuestions function.
 * - SuggestQuestionsOutput - The return type for the suggestQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestQuestionsInputSchema = z.object({
  scenario: z.string().describe('The current medical scenario.'),
  checklistItems: z.string().describe('The list of checklist items for the exercise.'),
  actorDescription: z.string().describe('The description of the actor/patient in the simulation.'),
  studentQuestionsAsked: z.string().describe('The questions the student has already asked.')
});
export type SuggestQuestionsInput = z.infer<typeof SuggestQuestionsInputSchema>;

const SuggestQuestionsOutputSchema = z.object({
  suggestedQuestions: z.array(z.string()).describe('A list of suggested questions for the student to ask.')
});
export type SuggestQuestionsOutput = z.infer<typeof SuggestQuestionsOutputSchema>;

export async function suggestQuestions(input: SuggestQuestionsInput): Promise<SuggestQuestionsOutput> {
  return suggestQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestQuestionsPrompt',
  input: {schema: SuggestQuestionsInputSchema},
  output: {schema: SuggestQuestionsOutputSchema},
  prompt: `You are a medical education expert. You are helping a medical student practice a clinical encounter with a simulated patient.

The scenario is: {{{scenario}}}

The checklist items for the student to complete are:
{{{checklistItems}}}

The following is a description of the patient / actor:
{{{actorDescription}}}

The student has already asked the following questions:
{{{studentQuestionsAsked}}}

Suggest a list of questions that the student could ask the simulated patient to gather more information and complete the checklist items. Focus on questions that would help the student uncover relevant medical history or symptoms. Return the questions as a JSON array of strings.
`,
});

const suggestQuestionsFlow = ai.defineFlow(
  {
    name: 'suggestQuestionsFlow',
    inputSchema: SuggestQuestionsInputSchema,
    outputSchema: SuggestQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
