import React, { useState } from 'react';
import MortgageCalculator from '../components/MortgageCalculator';
import ResultsDisplay from '../components/ResultsDisplay';
import AmortizationTable from '../components/AmortizationTable';
import PaybackChart from '../components/PaybackChart';
import { MortgageResult, calculateMortgage } from '../utils/mortgageCalculations';

interface CalculadoraProps {
  currentUFValue: number | null;
}

const Calculadora: React.FC<CalculadoraProps> = ({ currentUFValue }) => {
  const [results, setResults] = useState<MortgageResult | null>(null);

  const handleCalculate = (formData: {
    ufValue: number;
    propertyValueUF: number;
    annualInterestRate: number;
    loanTermYears: number;
    downPaymentPercentage: number;
    downPaymentBonus: number;
  }) => {
    const result = calculateMortgage(formData);
    setResults(result);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">Calculadora Hipotecaria</h2>
          <p className="mb-6 text-gray-600">
            Esta calculadora te permite simular un crédito hipotecario en Chile. Ingresa el valor de la propiedad en UF, ajusta la tasa de interés anual, define el plazo del crédito en años, y establece el porcentaje de pie y el bono pie (si aplica). Con estos datos, obtendrás un resumen detallado del préstamo, incluyendo la cuota mensual, el total a pagar, y cómo se distribuyen los pagos entre capital e intereses a lo largo del tiempo.
          </p>
          <hr className="my-6 border-t border-gray-300" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <MortgageCalculator onCalculate={handleCalculate} currentUFValue={currentUFValue} />
            </div>
            <div>
              <ResultsDisplay results={results} />
            </div>
          </div>
        </div>
      </div>
      
      {results && (
        <>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <AmortizationTable results={results} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <PaybackChart results={results} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Calculadora;