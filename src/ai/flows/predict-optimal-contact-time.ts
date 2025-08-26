'use server';

/**
 * @fileOverview Predicts the optimal time to contact a professor based on their historical status data.
 *
 * - predictOptimalContactTime - A function that predicts the optimal contact time for a professor.
 * - PredictOptimalContactTimeInput - The input type for the predictOptimalContactTime function.
 * - PredictOptimalContactTimeOutput - The return type for the predictOptimalContactTime function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictOptimalContactTimeInputSchema = z.object({
  professorName: z.string().describe('The name of the professor.'),
  studentNeeds: z.string().describe('The specific needs or questions of the student.'),
  historicalStatusData: z.string().describe('Historical status data of the professor, as a JSON string.'),
});
export type PredictOptimalContactTimeInput = z.infer<typeof PredictOptimalContactTimeInputSchema>;

const PredictOptimalContactTimeOutputSchema = z.object({
  optimalContactTime: z.string().describe('The predicted optimal time to contact the professor.'),
  reasoning: z.string().describe('The reasoning behind the predicted optimal contact time.'),
});
export type PredictOptimalContactTimeOutput = z.infer<typeof PredictOptimalContactTimeOutputSchema>;

export async function predictOptimalContactTime(input: PredictOptimalContactTimeInput): Promise<PredictOptimalContactTimeOutput> {
  return predictOptimalContactTimeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictOptimalContactTimePrompt',
  input: {schema: PredictOptimalContactTimeInputSchema},
  output: {schema: PredictOptimalContactTimeOutputSchema},
  prompt: `You are an AI assistant that helps students determine the best time to contact their professors.

You will analyze the professor's historical status data and the student's needs to predict the optimal contact time.

Professor Name: {{{professorName}}}
Student Needs: {{{studentNeeds}}}
Historical Status Data: {{{historicalStatusData}}}

Consider the following factors when predicting the optimal contact time:
- The professor's typical availability during different times of the day.
- The professor's historical response times to student inquiries.
- The urgency of the student's needs.

Based on your analysis, provide the optimal contact time and explain your reasoning.

Optimal Contact Time: {{optimalContactTime}}
Reasoning: {{reasoning}}`,
});

const predictOptimalContactTimeFlow = ai.defineFlow(
  {
    name: 'predictOptimalContactTimeFlow',
    inputSchema: PredictOptimalContactTimeInputSchema,
    outputSchema: PredictOptimalContactTimeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
