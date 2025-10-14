import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface ConfidenceMeterProps {
  confidence: 'high' | 'medium' | 'low';
}

export default function ConfidenceMeter({ confidence }: ConfidenceMeterProps) {
  const getConfidenceColor = () => {
    switch (confidence) {
      case 'high':
        return 'text-green-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-red-600';
    }
  };

  const getConfidenceIcon = () => {
    switch (confidence) {
      case 'high':
        return <CheckCircle className="h-6 w-6" />;
      case 'medium':
        return <AlertCircle className="h-6 w-6" />;
      case 'low':
        return <AlertTriangle className="h-6 w-6" />;
    }
  };

  const getConfidencePercentage = () => {
    switch (confidence) {
      case 'high':
        return 90;
      case 'medium':
        return 60;
      case 'low':
        return 30;
    }
  };

  const getConfidenceBgColor = () => {
    switch (confidence) {
      case 'high':
        return 'bg-green-600';
      case 'medium':
        return 'bg-amber-600';
      case 'low':
        return 'bg-red-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Analysis Confidence</h3>
        <div className={`flex items-center space-x-2 ${getConfidenceColor()}`}>
          {getConfidenceIcon()}
          <span className="font-semibold capitalize">{confidence}</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-4">
        <div
          className={`h-full transition-all duration-1000 ease-out rounded-full ${getConfidenceBgColor()}`}
          style={{ width: `${getConfidencePercentage()}%` }}
        />
      </div>

      {confidence === 'low' && (
        <div className="flex items-start space-x-2 p-4 bg-red-50 rounded-xl border border-red-200">
          <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-900">Consider consulting a lawyer</p>
            <p className="text-xs text-red-700 mt-1">
              This document contains complex legal language that may require professional review.
            </p>
          </div>
        </div>
      )}

      {confidence === 'medium' && (
        <p className="text-sm text-gray-600">
          The analysis is generally reliable, but some clauses may benefit from expert review.
        </p>
      )}

      {confidence === 'high' && (
        <p className="text-sm text-gray-600">
          The document structure is clear and our analysis is highly confident.
        </p>
      )}
    </div>
  );
}
