'use server';

/**
 * @fileOverview An AI agent that analyzes the emotional tone of a journal entry.
 *
 * - analyzeEntryTone - A function that analyzes the emotional tone of a journal entry.
 * - AnalyzeEntryToneInput - The input type for the analyzeEntryTone function.
 * - AnalyzeEntryToneOutput - The return type for the analyzeEntryTone function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeEntryToneInputSchema = z.object({
  entryText: z.string().describe('The text content of the journal entry to analyze.'),
});
export type AnalyzeEntryToneInput = z.infer<typeof AnalyzeEntryToneInputSchema>;

const AnalyzeEntryToneOutputSchema = z.object({
  tone: z
    .string()
    .describe(
      'The overall emotional tone of the journal entry, e.g., joy, sadness, anger, etc.'
    ),
  reason: z
    .string()
    .describe(
      'The reasoning for the determined tone, citing specific parts of the entry text.'
    ),
});
export type AnalyzeEntryToneOutput = z.infer<typeof AnalyzeEntryToneOutputSchema>;

export async function analyzeEntryTone(input: AnalyzeEntryToneInput): Promise<AnalyzeEntryToneOutput> {
  return analyzeEntryToneFlow(input);
}

const analyzeEntryTonePrompt = ai.definePrompt({
  name: 'analyzeEntryTonePrompt',
  input: {schema: AnalyzeEntryToneInputSchema},
  output: {schema: AnalyzeEntryToneOutputSchema},
  prompt: `You are an expert in emotional tone analysis. Analyze the following journal entry and determine the overall emotional tone. Provide a brief explanation for your reasoning, citing specific parts of the entry text.

Journal Entry:
{{entryText}}`,
});

const analyzeEntryToneFlow = ai.defineFlow(
  {
    name: 'analyzeEntryToneFlow',
    inputSchema: AnalyzeEntryToneInputSchema,
    outputSchema: AnalyzeEntryToneOutputSchema,
  },
  async input => {
    const {output} = await analyzeEntryTonePrompt(input);
    return output!;
  }
);
