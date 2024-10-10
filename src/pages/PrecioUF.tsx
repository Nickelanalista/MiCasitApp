import React, { useState, useEffect } from 'react';
import UFChart from '../components/UFChart';
import { fetchUFData } from '../utils/ufDataFetcher';

interface PrecioUFProps {
  isDarkMode: boolean;
  ufData: { date: string; value: number }[];
}

const PrecioUF: React.FC<PrecioUFProps> = ({ isDarkMode, ufData: initialUFData }) => {
  const [ufData, setUFData] = useState(initialUFData);
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchUFData(startDate, endDate);
        setUFData(data);
      } catch (err) {
        setError('Error al cargar los datos. Por favor, intente nuevamente más tarde.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${isDarkMode ? 'bg-gray-800' : ''}`}>
      <div className="p-8">
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Tendencia del Precio UF</h2>
        <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          La Unidad de Fomento (UF) es una unidad de cuenta reajustable de acuerdo con la inflación, utilizada en Chile. Fue creada durante el gobierno de Eduardo Frei Montalva, mediante el decreto Nº 40 del 20 de enero de 1967, del Ministerio de Hacienda.
        </p>
        <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          La UF se utiliza ampliamente en el sistema financiero chileno, especialmente en:
        </p>
        <ul className={`list-disc pl-5 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <li>Préstamos hipotecarios</li>
          <li>Contratos a largo plazo</li>
          <li>Inversiones financieras</li>
          <li>Valoración de propiedades</li>
        </ul>
        <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Su importancia radica en que permite mantener el valor real de un bien o servicio a lo largo del tiempo, protegiéndolo de los efectos de la inflación.
        </p>
        <div className="flex space-x-4 mb-6">
          <div>
            <label htmlFor="startDate" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Fecha de inicio</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={handleDateChange}
              className={`mt-1 block w-full rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
            />
          </div>
          <div>
            <label htmlFor="endDate" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Fecha de fin</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={handleDateChange}
              className={`mt-1 block w-full rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
            />
          </div>
        </div>
        {isLoading && (
          <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Cargando datos...</p>
        )}
        {error && (
          <p className={`mb-4 text-red-600 bg-red-100 p-2 rounded ${isDarkMode ? 'bg-red-900' : ''}`}>
            {error}
          </p>
        )}
        {!isLoading && ufData.length > 0 ? (
          <UFChart data={ufData} isDarkMode={isDarkMode} />
        ) : (
          <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            No hay datos disponibles para el período seleccionado.
          </p>
        )}
      </div>
    </div>
  );
};

export default PrecioUF;