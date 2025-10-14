import { useState } from 'react';
import { FileText, AlertTriangle, MessageSquare, BookOpen } from 'lucide-react';
import ConfidenceMeter from './ConfidenceMeter';
import KeyClausesTab from './KeyClausesTab';
import RedFlagsTab from './RedFlagsTab';
import AskAITab from './AskAITab';
import { AnalysisResult } from '../types';

const mockData: AnalysisResult = {
  summary: `This is a standard residential lease agreement for a 12-month term. The monthly rent is $1,800, due on the first of each month.

Key points to know:
• You're required to provide 60 days written notice if you want to move out at the end of the lease term
• A security deposit of $1,800 is required and will be returned within 30 days after move-out if there's no damage
• The landlord can increase rent with 90 days notice
• You're responsible for minor repairs under $100
• Pets are not allowed without written permission
• Subleasing requires landlord approval

The lease automatically converts to month-to-month after the initial term unless either party provides notice.`,
  key_clauses: [
    {
      id: '1',
      title: 'Monthly Rent Amount',
      text: 'Tenant agrees to pay a monthly rent of $1,800, due on the 1st day of each month. Late payments after the 5th will incur a $75 late fee.',
      category: 'Payment Terms',
    },
    {
      id: '2',
      title: 'Security Deposit',
      text: 'A security deposit of $1,800 is required before move-in. This deposit will be held to cover any damages beyond normal wear and tear. It will be returned within 30 days of lease termination, minus any deductions for damages.',
      category: 'Payment Terms',
    },
    {
      id: '3',
      title: 'Lease Termination Notice',
      text: 'Either party must provide 60 days written notice before the end of the lease term if they wish to terminate the agreement. Without notice, the lease automatically converts to a month-to-month tenancy.',
      category: 'Termination',
    },
    {
      id: '4',
      title: 'Early Termination',
      text: 'Early termination by the tenant requires payment of two months rent as a penalty, plus forfeiture of the security deposit. The landlord may terminate early only for cause (non-payment or violation of terms).',
      category: 'Termination',
    },
    {
      id: '5',
      title: 'Automatic Renewal',
      text: 'This lease will automatically convert to a month-to-month tenancy at the end of the initial 12-month term unless either party provides 60 days written notice of termination.',
      category: 'Renewal',
    },
    {
      id: '6',
      title: 'Rent Increase Terms',
      text: 'Landlord reserves the right to increase rent with 90 days written notice. Any increase during the initial lease term is capped at 5% of the current rent amount.',
      category: 'Renewal',
    },
    {
      id: '7',
      title: 'Maintenance Responsibilities',
      text: 'Tenant is responsible for minor repairs under $100, including replacing light bulbs, air filters, and batteries. Landlord is responsible for major repairs and structural maintenance.',
      category: 'Maintenance',
    },
    {
      id: '8',
      title: 'Pet Policy',
      text: 'No pets are allowed on the premises without prior written consent from the landlord. If approved, an additional pet deposit of $500 and monthly pet rent of $50 will apply.',
      category: 'Property Use',
    },
  ],
  red_flags: [
    {
      id: '1',
      issue: 'High Early Termination Penalty',
      explanation: 'The penalty for ending your lease early is unusually high at two months rent plus security deposit. Most standard leases charge one month\'s rent or allow you to find a replacement tenant. This could cost you $3,600 plus your deposit if you need to move unexpectedly.',
      severity: 'high',
    },
    {
      id: '2',
      issue: 'Automatic Rent Increase Clause',
      explanation: 'While rent increases with notice are normal, this clause gives the landlord unilateral power to raise rent by up to 5% during your initial lease term. Make sure you\'re comfortable with a potential increase from $1,800 to $1,890 per month.',
      severity: 'medium',
    },
    {
      id: '3',
      issue: 'Broad Maintenance Responsibility',
      explanation: 'You\'re responsible for "minor repairs under $100" which is somewhat vague. Make sure you get clarification on what specific repairs fall into this category to avoid surprise expenses.',
      severity: 'low',
    },
  ],
  confidence: 'high',
};

type TabType = 'summary' | 'clauses' | 'flags' | 'ask';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('summary');

  const tabs = [
    { id: 'summary' as TabType, label: 'Summary', icon: BookOpen },
    { id: 'clauses' as TabType, label: 'Key Clauses', icon: FileText },
    { id: 'flags' as TabType, label: 'Red Flags', icon: AlertTriangle, badge: mockData.red_flags.length },
    { id: 'ask' as TabType, label: 'Ask AI', icon: MessageSquare },
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Document Analysis</h1>
          <p className="text-gray-600">Review the AI-generated insights for your legal document</p>
        </div>

        <div className="mb-6">
          <ConfidenceMeter confidence={mockData.confidence} />
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap relative ${
                      isActive
                        ? 'text-blue-900 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {tab.badge}
                      </span>
                    )}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-900 rounded-t-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'summary' && (
              <div className="space-y-4">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                    {mockData.summary}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'clauses' && <KeyClausesTab clauses={mockData.key_clauses} />}

            {activeTab === 'flags' && <RedFlagsTab redFlags={mockData.red_flags} />}

            {activeTab === 'ask' && <AskAITab />}
          </div>
        </div>
      </div>
    </div>
  );
}
