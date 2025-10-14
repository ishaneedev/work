import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { RedFlag } from '../types';

interface RedFlagsTabProps {
  redFlags: RedFlag[];
}

export default function RedFlagsTab({ redFlags }: RedFlagsTabProps) {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'high':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-300',
          iconColor: 'text-red-600',
          badgeColor: 'bg-red-600',
          textColor: 'text-red-900',
        };
      case 'medium':
        return {
          icon: AlertCircle,
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-300',
          iconColor: 'text-amber-600',
          badgeColor: 'bg-amber-600',
          textColor: 'text-amber-900',
        };
      case 'low':
        return {
          icon: Info,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-300',
          iconColor: 'text-blue-600',
          badgeColor: 'bg-blue-600',
          textColor: 'text-blue-900',
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-300',
          iconColor: 'text-gray-600',
          badgeColor: 'bg-gray-600',
          textColor: 'text-gray-900',
        };
    }
  };

  const sortedFlags = [...redFlags].sort((a, b) => {
    const severityOrder = { high: 0, medium: 1, low: 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });

  return (
    <div className="space-y-4">
      {sortedFlags.length === 0 ? (
        <div className="bg-green-50 border border-green-300 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-green-900 mb-2">No Red Flags Detected</h3>
          <p className="text-green-700">
            This document appears to have standard clauses without significant concerns.
          </p>
        </div>
      ) : (
        sortedFlags.map(flag => {
          const config = getSeverityConfig(flag.severity);
          const Icon = config.icon;

          return (
            <div
              key={flag.id}
              className={`${config.bgColor} border ${config.borderColor} rounded-2xl p-6 shadow-sm`}
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 ${config.iconColor}`}>
                  <Icon className="h-6 w-6" />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className={`text-lg font-semibold ${config.textColor}`}>{flag.issue}</h4>
                    <span
                      className={`${config.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full uppercase flex-shrink-0`}
                    >
                      {flag.severity}
                    </span>
                  </div>

                  <p className={`text-sm ${config.textColor} leading-relaxed`}>
                    {flag.explanation}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
