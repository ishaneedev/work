import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import UploadPage from './components/UploadPage';
import Dashboard from './components/Dashboard';

type Page = 'landing' | 'upload' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleUploadComplete = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-sky-50">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === 'upload' && <UploadPage onUploadComplete={handleUploadComplete} />}
      {currentPage === 'dashboard' && <Dashboard />}

      <Footer />
    </div>
  );
}

export default App;
