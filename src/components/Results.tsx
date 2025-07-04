import React from 'react';
import { CheckCircle, AlertCircle, XCircle, TrendingUp, Target, ArrowRight } from 'lucide-react';
import { EvaluationResult } from '../types';

interface ResultsProps {
  result: EvaluationResult;
  onRestart: () => void;
}

export default function Results({ result, onRestart }: ResultsProps) {
  const getScoreColor = (category: string) => {
    switch (category) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getScoreIcon = (category: string) => {
    switch (category) {
      case 'high': return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'medium': return <AlertCircle className="h-8 w-8 text-yellow-600" />;
      case 'low': return <XCircle className="h-8 w-8 text-red-600" />;
      default: return null;
    }
  };

  const getScoreLabel = (category: string) => {
    switch (category) {
      case 'high': return 'High Potential';
      case 'medium': return 'Moderate Potential';
      case 'low': return 'Low Potential';
      default: return 'Unknown';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Score Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          {getScoreIcon(result.category)}
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {result.score}% Score
        </h2>
        
        <p className={`text-xl font-semibold mb-4 ${getScoreColor(result.category)}`}>
          {getScoreLabel(result.category)}
        </p>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ease-out ${
              result.category === 'high' ? 'bg-green-500' :
              result.category === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${result.score}%` }}
          />
        </div>
        
        <p className="text-gray-700 text-lg leading-relaxed">
          {result.recommendation}
        </p>
      </div>

      {/* Detailed Analysis */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Strengths */}
        {result.strengths.length > 0 && (
          <div className="bg-green-50 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-xl font-bold text-green-900">Strengths</h3>
            </div>
            <ul className="space-y-2">
              {result.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-green-800">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Areas for Improvement */}
        {result.improvements.length > 0 && (
          <div className="bg-orange-50 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <Target className="h-6 w-6 text-orange-600 mr-2" />
              <h3 className="text-xl font-bold text-orange-900">Areas to Improve</h3>
            </div>
            <ul className="space-y-2">
              {result.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-orange-800">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Recommended Next Steps</h3>
        <div className="space-y-3">
          {result.category === 'high' && (
            <>
              <div className="flex items-center">
                <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800">Develop a comprehensive business plan</span>
              </div>
              <div className="flex items-center">
                <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800">Seek funding or investment opportunities</span>
              </div>
              <div className="flex items-center">
                <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800">Build a minimum viable product (MVP)</span>
              </div>
            </>
          )}
          
          {result.category === 'medium' && (
            <>
              <div className="flex items-center">
                <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800">Validate your assumptions through market research</span>
              </div>
              <div className="flex items-center">
                <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800">Run small experiments or pilot programs</span>
              </div>
              <div className="flex items-center">
                <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800">Address identified weaknesses before scaling</span>
              </div>
            </>
          )}
          
          {result.category === 'low' && (
            <>
              <div className="flex items-center">
                <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800">Consider pivoting or refining your idea</span>
              </div>
              <div className="flex items-center">
                <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800">Gain more experience or build relevant skills</span>
              </div>
              <div className="flex items-center">
                <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800">Seek mentorship or advisory support</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Restart Button */}
      <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Evaluate Another Business Idea
        </button>
      </div>
    </div>
  );
}