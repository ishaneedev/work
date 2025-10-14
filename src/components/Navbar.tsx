import { Scale } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <Scale className="h-8 w-8 text-blue-900" />
            <span className="text-xl font-bold text-blue-900">T2T Legal Analyzer</span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate('landing')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'landing'
                  ? 'text-blue-900'
                  : 'text-gray-600 hover:text-blue-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'dashboard'
                  ? 'text-blue-900'
                  : 'text-gray-600 hover:text-blue-900'
              }`}
            >
              Dashboard
            </button>
            <button
              className="text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors"
            >
              Support
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
