import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface UFChartProps {
  data: { date: string; value: number }[];
  isDarkMode: boolean;
}

const UFChart: React.FC<UFChartProps> = ({ data, isDarkMode }) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const chartData = {
    labels: sortedData.map(item => item.date),
    datasets: [
      {
        label: 'Valor UF',
        data: sortedData.map(item => item.value),
        fill: false,
        backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.2)',
        borderColor: isDarkMode ? 'rgba(59, 130, 246, 1)' : 'rgba(59, 130, 246, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDarkMode ? '#fff' : '#333',
        },
      },
      title: {
        display: true,
        text: 'Tendencia del valor de la UF',
        color: isDarkMode ? '#fff' : '#333',
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? '#fff' : '#333',
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? '#fff' : '#333',
          callback: function(value: any) {
            return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
          },
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default UFChart;