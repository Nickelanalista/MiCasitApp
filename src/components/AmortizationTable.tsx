import React from 'react';
import { MortgageResult } from '../utils/mortgageCalculations';
import { FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

interface AmortizationTableProps {
  results: MortgageResult;
  isDarkMode: boolean;
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({ results, isDarkMode }) => {
  // ... (previous code remains unchanged)

  return (
    <div>
      <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center`}>Tabla de Amortización</h3>
      <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Esta tabla muestra cómo se distribuye el pago de su hipoteca mes a mes. Cada fila representa un mes del préstamo y muestra la cuota mensual, el pago al capital, el pago de intereses y el saldo restante.
      </p>
      <div className="overflow-x-auto">
        <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
          <table className={`min-w-full ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            <thead className="sticky top-0 z-10">
              <tr className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <th className="px-4 py-2 text-center">Mes</th>
                <th className="px-4 py-2 text-center">Cuota</th>
                <th className="px-4 py-2 text-center">Capital Pagado</th>
                <th className="px-4 py-2 text-center">Intereses Pagados</th>
                <th className="px-4 py-2 text-center">Saldo Restante</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? (isDarkMode ? 'bg-gray-800' : 'bg-gray-100') : ''}>
                  <td className="px-4 py-2 text-center">{row.month}</td>
                  <td className="px-4 py-2 text-center">{formatCurrency(row.payment)}</td>
                  <td className="px-4 py-2 text-center">{formatCurrency(row.principalPayment)}</td>
                  <td className="px-4 py-2 text-center">{formatCurrency(row.interestPayment)}</td>
                  <td className="px-4 py-2 text-center">{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        onClick={downloadExcel}
        className={`mt-4 px-4 py-2 rounded-md ${
          isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
        } text-white flex items-center`}
      >
        <FileSpreadsheet className="mr-2" size={20} />
        Descargar Excel
      </button>
    </div>
  );
};

export default AmortizationTable;