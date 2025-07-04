export interface BusinessEvaluation {
  marketDemand: number;
  competition: number;
  experience: number;
  resources: number;
  clarity: number;
  uniqueness: number;
  commitment: number;
  timing: number;
}

export interface EvaluationResult {
  score: number;
  category: 'high' | 'medium' | 'low';
  recommendation: string;
  strengths: string[];
  improvements: string[];
}

export interface Question {
  id: keyof BusinessEvaluation;
  question: string;
  description: string;
  options: {
    text: string;
    value: number;
  }[];
}