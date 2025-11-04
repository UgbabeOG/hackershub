'use server';

/**
 * @fileOverview An AI agent to generate a summary of a fraud case, including key details and potential recovery strategies.
 *
 * - generateCaseSummary - A function that handles the fraud case summarization process.
 * - GenerateCaseSummaryInput - The input type for the generateCaseSummary function.
 * - GenerateCaseSummaryOutput - The return type for the generateCaseSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCaseSummaryInputSchema = z.object({
  caseDetails: z
    .string()
    .describe('Detailed information about the fraud case, including transaction records, communications, and any relevant documents.'),
});
export type GenerateCaseSummaryInput = z.infer<typeof GenerateCaseSummaryInputSchema>;

const GenerateCaseSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the fraud case, highlighting key details and potential recovery strategies.'),
});
export type GenerateCaseSummaryOutput = z.infer<typeof GenerateCaseSummaryOutputSchema>;

export async function generateCaseSummary(input: GenerateCaseSummaryInput): Promise<GenerateCaseSummaryOutput> {
  return generateCaseSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCaseSummaryPrompt',
  input: {schema: GenerateCaseSummaryInputSchema},
  output: {schema: GenerateCaseSummaryOutputSchema},
  prompt: `You are an expert in fraud case analysis and recovery. Please provide a summary of the following fraud case, including key details and potential recovery strategies. Focus on identifying the most important information to help recovery specialists quickly understand the case and start the recovery process.

Case Details: {{{caseDetails}}}`,
});

const generateCaseSummaryFlow = ai.defineFlow(
  {
    name: 'generateCaseSummaryFlow',
    inputSchema: GenerateCaseSummaryInputSchema,
    outputSchema: GenerateCaseSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
