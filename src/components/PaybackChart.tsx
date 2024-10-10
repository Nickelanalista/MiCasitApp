import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { MortgageResult } from '../utils/mortgageCalculations';
import { Download } from 'lucide-react';

Chart.register(...registerables);

interface PaybackChartProps {
  results: MortgageResult;
  isDarkMode: boolean;
}

const PaybackChart: React.FC<PaybackChartProps> = ({ results, isDarkMode }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: Array.from({ length: results.loanTermMonths }, (_, i) => i + 1),
            datasets: [
              {
                label: 'Intereses Pagados',
                data: generateInterestData(),
                borderColor: isDarkMode ? 'rgba(59, 130, 246, 1)' : 'rgba(59, 130, 246, 0.8)',
                backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                fill: true,
                pointRadius: 0, // Remove points
                borderWidth: 2, // Thinner line
              },
              {
                label: 'Capital Pagado',
                data: generatePrincipalData(),
                borderColor: isDarkMode ? 'rgba(16, 185, 129, 1)' : 'rgba(16, 185, 129, 0.8)',
                backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)',
                fill: true,
                pointRadius: 0, // Remove points
                borderWidth: 2, // Thinner line
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Distribución de Pagos entre Intereses y Capital',
                color: isDarkMode ? '#fff' : '#333',
              },
              legend: {
                labels: {
                  color: isDarkMode ? '#fff' : '#333',
                },
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Mes',
                  color: isDarkMode ? '#fff' : '#333',
                },
                ticks: {
                  color: isDarkMode ? '#fff' : '#333',
                  maxTicksLimit: 12, // Limit the number of x-axis labels
                },
                grid: {
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Monto (CLP)',
                  color: isDarkMode ? '#fff' : '#333',
                },
                ticks: {
                  color: isDarkMode ? '#fff' : '#333',
                  callback: function(value: any) {
                    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value);
                  },
                },
                grid: {
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
              },
            },
          },
        });
      }
    }
  }, [results, isDarkMode]);

  const generateInterestData = () => {
    const data = [];
    let remainingBalance = results.loanAmount;
    const monthlyInterestRate = results.annualInterestRate / 12 / 100;

    for (let month = 1; month <= results.loanTermMonths; month++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = results.monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      data.push(interestPayment);
    }

    return data;
  };

  const generatePrincipalData = () => {
    const data = [];
    let remainingBalance = results.loanAmount;
    const monthlyInterestRate = results.annualInterestRate / 12 / 100;

    for (let month = 1; month <= results.loanTermMonths; month++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = results.monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      data.push(principalPayment);
    }

    return data;
  };

  const downloadChart = () => {
    if (chartRef.current) {
      const link = document.createElement('a');
      link.download = 'grafico_payback.png';
      link.href = chartRef.current.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div>
      <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center`}>Gráfico de Payback</h3>
      <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Este gráfico muestra cómo se distribuyen sus pagos mensuales entre el capital y los intereses a lo largo del tiempo del préstamo. 
        La línea azul representa los intereses pagados, mientras que la línea verde representa el capital pagado. 
        Observe cómo al principio del préstamo, una mayor parte de su pago va hacia los intereses, pero con el tiempo, 
        más de su pago va hacia el capital. El punto donde las líneas se cruzan indica el momento en que comienza a pagar más capital que intereses.
      </p>
      <div style={{ height: '400px', width: '100%' }}>
        <canvas ref={chartRef}></canvas>
      </div>
      <button
        onClick={downloadChart}
        className={`mt-4 px-4 py-2 rounded-md ${
          isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } text-white flex items-center`}
      >
        <Download className="mr-2" size={20} />
        Descargar Gráfico
      </button>
    </div>
  );
};

export default PaybackChart;