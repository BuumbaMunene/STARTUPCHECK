import { BusinessEvaluation, EvaluationResult } from '../types';

export const questions = [
  {
    id: 'marketDemand' as const,
    question: 'How strong is the market demand for your product/service?',
    description: 'Consider market size, customer pain points, and willingness to pay',
    options: [
      { text: 'Very high demand with proven customer need', value: 5 },
      { text: 'Good demand with some validation', value: 4 },
      { text: 'Moderate demand, mixed signals', value: 3 },
      { text: 'Low demand, mostly assumptions', value: 2 },
      { text: 'Unclear or no proven demand', value: 1 }
    ]
  },
  {
    id: 'competition' as const,
    question: 'What does your competitive landscape look like?',
    description: 'Analyze direct and indirect competitors, market saturation',
    options: [
      { text: 'Blue ocean - little to no competition', value: 5 },
      { text: 'Light competition with clear differentiation', value: 4 },
      { text: 'Moderate competition, some differentiation', value: 3 },
      { text: 'Heavy competition, hard to differentiate', value: 2 },
      { text: 'Oversaturated market with giants', value: 1 }
    ]
  },
  {
    id: 'experience' as const,
    question: 'How relevant is your experience to this business?',
    description: 'Consider industry knowledge, skills, and network',
    options: [
      { text: 'Deep expertise and strong industry network', value: 5 },
      { text: 'Good experience with some gaps', value: 4 },
      { text: 'Some relevant experience', value: 3 },
      { text: 'Limited experience, steep learning curve', value: 2 },
      { text: 'No relevant experience', value: 1 }
    ]
  },
  {
    id: 'resources' as const,
    question: 'What are your available resources?',
    description: 'Consider financial capital, time, team, and equipment',
    options: [
      { text: 'Sufficient funding and resources for 2+ years', value: 5 },
      { text: 'Good resources for 1-2 years', value: 4 },
      { text: 'Limited resources, need funding soon', value: 3 },
      { text: 'Very limited resources', value: 2 },
      { text: 'No funding, bootstrapping only', value: 1 }
    ]
  },
  {
    id: 'clarity' as const,
    question: 'How clear is your business model and strategy?',
    description: 'Revenue streams, target customers, value proposition',
    options: [
      { text: 'Crystal clear with validated assumptions', value: 5 },
      { text: 'Clear plan with some validation', value: 4 },
      { text: 'Basic plan, needs refinement', value: 3 },
      { text: 'Vague plan, many assumptions', value: 2 },
      { text: 'No clear plan or strategy', value: 1 }
    ]
  },
  {
    id: 'uniqueness' as const,
    question: 'How unique is your value proposition?',
    description: 'What makes you different from existing solutions?',
    options: [
      { text: 'Revolutionary innovation, first to market', value: 5 },
      { text: 'Significant improvement over existing solutions', value: 4 },
      { text: 'Some unique features or approach', value: 3 },
      { text: 'Minor improvements, similar to competitors', value: 2 },
      { text: 'No clear differentiation', value: 1 }
    ]
  },
  {
    id: 'commitment' as const,
    question: 'What is your commitment level to this venture?',
    description: 'Time availability, long-term dedication, sacrifice willingness',
    options: [
      { text: 'Full-time commitment, all-in approach', value: 5 },
      { text: 'High commitment, can dedicate significant time', value: 4 },
      { text: 'Moderate commitment, part-time focus', value: 3 },
      { text: 'Limited commitment, side project', value: 2 },
      { text: 'Casual interest, minimal commitment', value: 1 }
    ]
  },
  {
    id: 'timing' as const,
    question: 'How is the market timing for your business?',
    description: 'Consider market trends, economic conditions, technology readiness',
    options: [
      { text: 'Perfect timing, riding major trends', value: 5 },
      { text: 'Good timing, favorable conditions', value: 4 },
      { text: 'Decent timing, mixed conditions', value: 3 },
      { text: 'Poor timing, challenging conditions', value: 2 },
      { text: 'Very poor timing, major headwinds', value: 1 }
    ]
  }
];

export function calculateScore(evaluation: BusinessEvaluation): EvaluationResult {
  const values = Object.values(evaluation);
  const totalScore = values.reduce((sum, value) => sum + value, 0);
  const maxScore = values.length * 5;
  const percentage = (totalScore / maxScore) * 100;

  let category: 'high' | 'medium' | 'low';
  let recommendation: string;

  if (percentage >= 75) {
    category = 'high';
    recommendation = 'Excellent potential! Your business idea shows strong fundamentals across multiple dimensions. Consider moving forward with a detailed business plan and seeking initial funding or partnerships.';
  } else if (percentage >= 50) {
    category = 'medium';
    recommendation = 'Good potential with some areas for improvement. Address the weaker areas before fully committing. Consider running small experiments or pilots to validate your assumptions.';
  } else {
    category = 'low';
    recommendation = 'Significant challenges ahead. While not impossible, this venture faces major hurdles. Consider pivoting your idea or gaining more experience/resources before proceeding.';
  }

  // Identify strengths and improvements
  const strengths: string[] = [];
  const improvements: string[] = [];

  Object.entries(evaluation).forEach(([key, value]) => {
    const question = questions.find(q => q.id === key);
    if (question) {
      if (value >= 4) {
        strengths.push(question.question.split('?')[0]);
      } else if (value <= 2) {
        improvements.push(question.question.split('?')[0]);
      }
    }
  });

  return {
    score: Math.round(percentage),
    category,
    recommendation,
    strengths,
    improvements
  };
}