import React from 'react';
import { MortgageResult } from '../utils/mortgageCalculations';

interface ResultsDisplayProps {
  results: MortgageResult | null;
  isDarkMode: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, isDarkMode }) => {
  if (!results) {
    return (
      <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <p>Ingresa los datos y haz clic en "Calcular" para ver los resultados.</p>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('es-CL').format(value);
  };

  const labelClass = `text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`;
  const valueClass = `mt-1 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`;

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Resumen del Análisis Hipotecario</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <p className={labelClass}>Valor de la propiedad inicial</p>
          <p className={valueClass}>
            {formatNumber(results.propertyValueUF)} UF ({formatCurrency(results.propertyValueCLP)})
          </p>
        </div>
        <div className="col-span-2">
          <p className={labelClass}>Valor de la propiedad con bono pie</p>
          <p className={valueClass}>{formatCurrency(results.propertyValueWithBonusCLP)}</p>
        </div>
        <div>
          <p className={labelClass}>Pie inicial</p>
          <p className={valueClass}>{formatCurrency(results.downPayment)}</p>
        </div>
        <div>
          <p className={labelClass}>Monto del préstamo</p>
          <p className={valueClass}>{formatCurrency(results.loanAmount)}</p>
        </div>
        <div>
          <p className={labelClass}>Tasa de interés anual</p>
          <p className={valueClass}>{results.annualInterestRate.toFixed(2)}%</p>
        </div>
        <div>
          <p className={labelClass}>Cuota mensual</p>
          <p className={valueClass}>{formatCurrency(results.monthlyPayment)}</p>
        </div>
        <div className="col-span-2">
          <p className={labelClass}>Total pagado al final del préstamo</p>
          <p className={valueClass}>{formatCurrency(results.totalPaid)}</p>
        </div>
        <div className="col-span-2">
          <p className={labelClass}>Total de intereses pagados</p>
          <p className={valueClass}>{formatCurrency(results.totalInterestPaid)}</p>
        </div>
        <div className="col-span-2">
          <p className={labelClass}>Duración del préstamo</p>
          <p className={valueClass}>
            {results.loanTermMonths} meses ({results.loanTermYears} años)
          </p>
        </div>
      </div>
      <div className="mt-6">
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Este análisis considera un bono de pie del {results.downPaymentBonusPercentage}%, lo que ajusta el valor de la
          propiedad y el monto del préstamo en consecuencia.
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;