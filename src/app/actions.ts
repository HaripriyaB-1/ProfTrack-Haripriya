'use server';

import { predictOptimalContactTime, type PredictOptimalContactTimeInput } from '@/ai/flows/predict-optimal-contact-time';

export async function getOptimalContactTime(input: PredictOptimalContactTimeInput) {
  try {
    const result = await predictOptimalContactTime(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in getOptimalContactTime action:', error);
    return { success: false, error: 'Failed to predict optimal contact time. Please try again later.' };
  }
}
