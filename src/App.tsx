import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Home, Calculator, BarChart2, BookOpen, Menu, X } from 'lucide-react';
import Calculadora from './pages/Calculadora';
import Conceptos from './pages/Conceptos';
import IndicadoresEconomicos from './components/IndicadoresEconomicos';
import { fetchUFData, getCurrentUFValue } from './utils/ufDataFetcher';
import ChatbotButton from './components/ChatbotButton';

const App: React.FC = () => {
  const [ufData, setUFData] = useState<{ date: string; value: number }[]>([]);
  const [currentUFValue, setCurrentUFValue] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUFData();
        setUFData(data);
        const currentValue = await getCurrentUFValue();
        setCurrentUFValue(currentValue);
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Error al cargar los datos. Por favor, intente nuevamente más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-green-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <Home className="h-8 w-8 text-blue-500 mr-2" />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-900">MiCasitApp</span>
                    <span className="text-xs text-gray-500 ml-auto pr-1">AI Assistant</span>
                  </div>
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <NavLinks />
              </div>
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu, show/hide based on menu state */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLinks mobile />
            </div>
          </div>
        </nav>

        <div className="flex-grow container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center">
              <p className="text-xl">Cargando datos...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Calculadora currentUFValue={currentUFValue} />} />
              <Route path="/calculadora" element={<Calculadora currentUFValue={currentUFValue} />} />
              <Route path="/indicadores" element={<IndicadoresEconomicos />} />
              <Route path="/conceptos" element={<Conceptos />} />
            </Routes>
          )}
        </div>

        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>Desarrollado por @CordilleraLabs</p>
            <p>En colaboración con @FranciscoAckermann</p>
          </div>
        </footer>

        <ChatbotButton isDarkMode={false} />
      </div>
    </Router>
  );
};

const NavLinks: React.FC<{ mobile?: boolean }> = ({ mobile }) => {
  const baseClasses = mobile
    ? "text-gray-700 hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
    : "text-gray-700 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium";

  return (
    <>
      <Link to="/calculadora" className={baseClasses}>
        <Calculator className="inline-block mr-1" size={18} />
        Calculadora
      </Link>
      <Link to="/indicadores" className={baseClasses}>
        <BarChart2 className="inline-block mr-1" size={18} />
        Indicadores
      </Link>
      <Link to="/conceptos" className={baseClasses}>
        <BookOpen className="inline-block mr-1" size={18} />
        Conceptos
      </Link>
    </>
  );
};

export default App;