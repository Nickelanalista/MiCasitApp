export interface MortgageResult {
  propertyValueUF: number;
  propertyValueCLP: number;
  propertyValueWithBonusCLP: number;
  loanAmount: number;
  downPayment: number;
  annualInterestRate: number;
  monthlyPayment: number;
  totalPaid: number;
  totalInterestPaid: number;
  loanTermMonths: number;
  loanTermYears: number;
  downPaymentBonusPercentage: number;
}

export const calculateMortgage = (formData: {
  ufValue: number;
  propertyValueUF: number;
  annualInterestRate: number;
  loanTermYears: number;
  downPaymentPercentage: number;
  downPaymentBonus: number;
}): MortgageResult => {
  const {
    ufValue,
    propertyValueUF,
    annualInterestRate,
    loanTermYears,
    downPaymentPercentage,
    downPaymentBonus,
  } = formData;

  const propertyValueCLP = propertyValueUF * ufValue;
  const propertyValueWithBonusCLP = propertyValueCLP * (1 + downPaymentBonus / 100);
  const downPayment = propertyValueWithBonusCLP * (downPaymentPercentage / 100);
  const loanAmount = propertyValueWithBonusCLP - downPayment;

  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const loanTermMonths = loanTermYears * 12;

  const monthlyPayment =
    (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) /
    (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

  const totalPaid = monthlyPayment * loanTermMonths;
  const totalInterestPaid = totalPaid - loanAmount;

  return {
    propertyValueUF,
    propertyValueCLP,
    propertyValueWithBonusCLP,
    loanAmount,
    downPayment,
    annualInterestRate,
    monthlyPayment,
    totalPaid,
    totalInterestPaid,
    loanTermMonths,
    loanTermYears,
    downPaymentBonusPercentage: downPaymentBonus,
  };
};