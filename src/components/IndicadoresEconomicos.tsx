import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Indicador {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: string;
  valor: number;
}

interface IndicadoresData {
  version: string;
  autor: string;
  fecha: string;
  [key: string]: any;
}

const IndicadoresEconomicos: React.FC = () => {
  const [data, setData] = useState<IndicadoresData | null>(null);
  const [selectedIndicador, setSelectedIndicador] = useState<string>('uf');
  const [historicalData, setHistoricalData] = useState<Indicador[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mindicador.cl/api');
        setData(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('No se pudieron cargar los indicadores económicos. Por favor, intente más tarde.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (data && selectedIndicador) {
        try {
          const response = await axios.get(`https://mindicador.cl/api/${selectedIndicador}`);
          setHistoricalData(response.data.serie.sort((a: Indicador, b: Indicador) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()));
          setError(null);
        } catch (error) {
          console.error('Error fetching historical data:', error);
          setError('No se pudieron cargar los datos históricos. Por favor, intente más tarde.');
        }
      }
    };

    fetchHistoricalData();
  }, [data, selectedIndicador]);

  const getChartData = () => {
    if (!historicalData.length) return null;

    return {
      labels: historicalData.map(item => new Date(item.fecha).toLocaleDateString()),
      datasets: [
        {
          label: data?.[selectedIndicador]?.nombre || '',
          data: historicalData.map(item => item.valor),
          fill: false,
          borderColor: 'rgba(75, 192, 192, 0.8)',
          tension: 0.1
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Indicador Económico',
      },
    },
    scales: {
      x: {
        reverse: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-4">Indicadores Económicos</h2>
      <p className="mb-4">
        Los indicadores económicos son estadísticas que reflejan el estado y la evolución de la economía de un país. 
        En Chile, algunos de los indicadores más importantes incluyen la UF, el IPC, el dólar observado y la UTM.
      </p>
      <p className="mb-4">
        <strong>La Unidad de Fomento (UF)</strong> es una unidad de cuenta reajustable de acuerdo con la inflación. 
        Se utiliza ampliamente en el mercado inmobiliario chileno para valorar propiedades, establecer precios de 
        alquiler y calcular préstamos hipotecarios. La UF se ajusta diariamente, lo que ayuda a mantener el valor 
        real del dinero en transacciones a largo plazo.
      </p>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <select
            value={selectedIndicador}
            onChange={(e) => setSelectedIndicador(e.target.value)}
            className="mb-4 p-2 border rounded"
          >
            {data && Object.keys(data).filter(key => typeof data[key] === 'object' && 'codigo' in data[key]).map((key) => (
              <option key={key} value={key}>
                {data[key].nombre}
              </option>
            ))}
          </select>
          {data && data[selectedIndicador] && (
            <div className="mb-4">
              <p><strong>{data[selectedIndicador].nombre}:</strong> {data[selectedIndicador].valor} {data[selectedIndicador].unidad_medida}</p>
              <p><strong>Fecha:</strong> {new Date(data[selectedIndicador].fecha).toLocaleDateString()}</p>
            </div>
          )}
          {getChartData() && (
            <Line data={getChartData()!} options={chartOptions} />
          )}
        </>
      )}
    </div>
  );
};

export default IndicadoresEconomicos;