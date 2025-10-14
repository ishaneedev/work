import { FileText, Shield, Zap } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8 mb-20">
          <h1 className="text-5xl sm:text-6xl font-bold text-blue-900 leading-tight">
            Understand any legal document in minutes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your lease, contract, or agreement and get an AI summary you can actually understand. No legal jargon, just clear answers.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('upload')}
              className="px-8 py-4 bg-blue-900 text-white rounded-2xl font-semibold text-lg hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Upload Your Document
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-8 py-4 bg-white text-blue-900 border-2 border-blue-900 rounded-2xl font-semibold text-lg hover:bg-blue-50 transition-all"
            >
              Try Demo
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-sky-500" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Plain English Summary</h3>
            <p className="text-gray-600">
              Get instant, easy-to-understand summaries of complex legal documents without the jargon.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Spot Red Flags</h3>
            <p className="text-gray-600">
              Automatically detect potentially problematic clauses and understand their impact on you.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-sky-500" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Ask Questions</h3>
            <p className="text-gray-600">
              Chat with AI about your document. Ask anything and get clear, helpful answers instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
