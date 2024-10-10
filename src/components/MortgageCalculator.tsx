import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar } from 'lucide-react';

interface MortgageCalculatorProps {
  onCalculate: (formData: {
    ufValue: number;
    propertyValueUF: number;
    annualInterestRate: number;
    loanTermYears: number;
    downPaymentPercentage: number;
    downPaymentBonus: number;
  }) => void;
  isDarkMode: boolean;
  currentUFValue: number | null;
}

const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ onCalculate, isDarkMode, currentUFValue }) => {
  const [formData, setFormData] = useState({
    ufValue: currentUFValue || 37895.28,
    propertyValueUF: 3500,
    annualInterestRate: 4.5,
    loanTermYears: 20,
    downPaymentPercentage: 10,
    downPaymentBonus: 0,
  });

  useEffect(() => {
    if (currentUFValue) {
      setFormData(prevData => ({ ...prevData, ufValue: currentUFValue }));
    }
  }, [currentUFValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const inputClass = `focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
    isDarkMode ? 'bg-gray-700 text-white border-gray-600' : ''
  }`;

  const labelClass = `block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('es-CL').format(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="ufValue" className={labelClass}>
          Valor de la UF (CLP)
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          </div>
          <input
            type="text"
            name="ufValue"
            id="ufValue"
            className={`${inputClass} pl-10 pr-12`}
            value={formatNumber(formData.ufValue)}
            onChange={(e) => setFormData(prev => ({ ...prev, ufValue: parseFloat(e.target.value.replace(/\./g, '').replace(',', '.')) }))}
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="propertyValueUF" className={labelClass}>
          Valor de la propiedad (UF)
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            name="propertyValueUF"
            id="propertyValueUF"
            className={inputClass}
            value={formatNumber(formData.propertyValueUF)}
            onChange={(e) => setFormData(prev => ({ ...prev, propertyValueUF: parseFloat(e.target.value.replace(/\./g, '').replace(',', '.')) }))}
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="annualInterestRate" className={labelClass}>
          Tasa de interés anual (%)
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Percent className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          </div>
          <input
            type="number"
            name="annualInterestRate"
            id="annualInterestRate"
            className={`${inputClass} pl-10`}
            value={formData.annualInterestRate}
            onChange={handleChange}
            step="0.1"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="loanTermYears" className={labelClass}>
          Plazo del crédito (años)
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          </div>
          <input
            type="number"
            name="loanTermYears"
            id="loanTermYears"
            className={`${inputClass} pl-10`}
            value={formData.loanTermYears}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="downPaymentPercentage" className={labelClass}>
          Porcentaje de pie (%)
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Percent className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          </div>
          <input
            type="number"
            name="downPaymentPercentage"
            id="downPaymentPercentage"
            className={`${inputClass} pl-10`}
            value={formData.downPaymentPercentage}
            onChange={handleChange}
            step="0.1"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="downPaymentBonus" className={labelClass}>
          Bono pie (%)
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Percent className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          </div>
          <input
            type="number"
            name="downPaymentBonus"
            id="downPaymentBonus"
            className={`${inputClass} pl-10`}
            value={formData.downPaymentBonus}
            onChange={handleChange}
            step="0.1"
            required
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          Calcular
        </button>
      </div>
    </form>
  );
};

export default MortgageCalculator;