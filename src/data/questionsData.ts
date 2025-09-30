import questions from './questions.json';
import weights from './weights.json';
import explanations from './explanations.json';

// Type assertion to ensure proper typing
export const questionsData = {
  questions: questions as Array<{
    id: string;
    category: string;
    question: string;
    options: string[];
  }>,
  weights: weights as Record<string, { cpu: number; ram: number; disk: number }>,
  explanations: explanations as Array<{
    category: string;
    text: string;
    example?: string;
  }>
};

export default questionsData;