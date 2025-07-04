import React, { useState } from 'react';
import { TrendingUp, CheckCircle, Target, Lightbulb } from 'lucide-react';
import StartupForm from './components/StartupForm';
import Results from './components/Results';
import { BusinessEvaluation, EvaluationResult } from './types';
import { calculateScore } from './utils/scoring';

type AppState = 'landing' | 'form' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);

  const handleStartEvaluation = () => {
    setCurrentState('form');
  };

  const handleFormSubmit = (evaluation: BusinessEvaluation) => {
    const result = calculateScore(evaluation);
    setEvaluationResult(result);
    setCurrentState('results');
  };

  const handleRestart = () => {
    setEvaluationResult(null);
    setCurrentState('landing');
  };

  const handleBackToLanding = () => {
    setCurrentState('landing');
  };

  if (currentState === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <StartupForm onSubmit={handleFormSubmit} onBack={handleBackToLanding} />
      </div>
    );
  }

  if (currentState === 'results' && evaluationResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <Results result={evaluationResult} onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="pt-16 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-full">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            StartupCheck
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Evaluate your business idea's potential with our comprehensive assessment tool. 
            Get actionable insights and recommendations in minutes.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Comprehensive Analysis
              </h3>
              <p className="text-gray-600">
                Evaluate 8 critical dimensions of your business idea from market demand to competitive positioning.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Actionable Insights
              </h3>
              <p className="text-gray-600">
                Get specific recommendations and next steps tailored to your business idea's strengths and weaknesses.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Lightbulb className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Expert Framework
              </h3>
              <p className="text-gray-600">
                Based on proven startup evaluation methodologies used by investors and successful entrepreneurs.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Evaluate Your Business Idea?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Take our comprehensive assessment to understand your startup's potential. 
              Answer 8 strategic questions and receive a detailed analysis with actionable recommendations.
            </p>
            <button
              onClick={handleStartEvaluation}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
            >
              Start Your Assessment
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Takes 3-5 minutes • No registration required
            </p>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Answer Questions</h3>
                <p className="text-gray-600">
                  Respond to 8 strategic questions about your business idea, market, and resources.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Get Your Score</h3>
                <p className="text-gray-600">
                  Receive a comprehensive score and categorization of your business potential.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Take Action</h3>
                <p className="text-gray-600">
                  Follow personalized recommendations to improve your business idea's chances of success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;