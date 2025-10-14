import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { KeyClause } from '../types';

interface KeyClausesTabProps {
  clauses: KeyClause[];
}

export default function KeyClausesTab({ clauses }: KeyClausesTabProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleClause = (id: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const groupedClauses = clauses.reduce((acc, clause) => {
    if (!acc[clause.category]) {
      acc[clause.category] = [];
    }
    acc[clause.category].push(clause);
    return acc;
  }, {} as Record<string, KeyClause[]>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedClauses).map(([category, categoryClauses]) => (
        <div key={category} className="space-y-3">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>{category}</span>
          </h3>

          {categoryClauses.map(clause => {
            const isExpanded = expandedIds.has(clause.id);

            return (
              <div
                key={clause.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleClause(clause.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{clause.title}</span>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-600 flex-shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {clause.text}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
