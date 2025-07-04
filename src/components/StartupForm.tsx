import React, { useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { BusinessEvaluation, Question } from '../types';
import { questions } from '../utils/scoring';

interface StartupFormProps {
  onSubmit: (evaluation: BusinessEvaluation) => void;
  onBack: () => void;
}

export default function StartupForm({ onSubmit, onBack }: StartupFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<BusinessEvaluation>>({});

  const handleAnswer = (value: number) => {
    const questionId = questions[currentQuestion].id;
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        onSubmit(newAnswers as BusinessEvaluation);
      }, 300);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <button
          onClick={goBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-sm text-gray-600 mb-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {question.question}
        </h2>
        <p className="text-gray-600 mb-8">
          {question.description}
        </p>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-900 group-hover:text-blue-700">
                  {option.text}
                </span>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}