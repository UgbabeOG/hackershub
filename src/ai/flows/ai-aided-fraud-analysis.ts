'use server';
/**
 * @fileOverview AI-Aided Fraud Analysis Flow.
 *
 * This file defines a Genkit flow for analyzing user-submitted fraud case details and identifying potential recovery pathways.
 * - analyzeFraudCase - Analyzes fraud case details and identifies potential recovery pathways.
 * - FraudAnalysisInput - The input type for the analyzeFraudCase function.
 * - FraudAnalysisOutput - The return type for the analyzeFraudCase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FraudAnalysisInputSchema = z.object({
  caseDetails: z
    .string()
    .describe(
      'Detailed description of the fraud case, including transaction records, communications, and any other relevant information.'
    ),
});
export type FraudAnalysisInput = z.infer<typeof FraudAnalysisInputSchema>;

const FraudAnalysisOutputSchema = z.object({
  potentialRecoveryPathways: z
    .string()
    .describe(
      'A detailed analysis of potential recovery pathways, including specific actions the user can take to recover their funds.'
    ),
  riskAssessment: z
    .string()
    .describe(
      'An assessment of the risks associated with each potential recovery pathway.'
    ),
  legalConsiderations: z
    .string()
    .describe(
      'A summary of the legal considerations relevant to the fraud case.'
    ),
});
export type FraudAnalysisOutput = z.infer<typeof FraudAnalysisOutputSchema>;

export async function analyzeFraudCase(input: FraudAnalysisInput): Promise<FraudAnalysisOutput> {
  return analyzeFraudCaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fraudAnalysisPrompt',
  input: {schema: FraudAnalysisInputSchema},
  output: {schema: FraudAnalysisOutputSchema},
  prompt: `You are an AI-powered fraud analysis tool. Analyze the following fraud case details and identify potential recovery pathways for the user.

Case Details: {{{caseDetails}}}

Based on the case details, provide the following:

1.  Potential Recovery Pathways: A detailed analysis of potential recovery pathways, including specific actions the user can take to recover their funds.
2.  Risk Assessment: An assessment of the risks associated with each potential recovery pathway.
3.  Legal Considerations: A summary of the legal considerations relevant to the fraud case.

Format your response in a clear and concise manner, providing actionable advice to the user.
`,
});

const analyzeFraudCaseFlow = ai.defineFlow(
  {
    name: 'analyzeFraudCaseFlow',
    inputSchema: FraudAnalysisInputSchema,
    outputSchema: FraudAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
