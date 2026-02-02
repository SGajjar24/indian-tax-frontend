/**
 * Tax Calculator Utility for FY 2024-2025
 * This file contains functions for calculating income tax based on the latest tax slabs
 */

// Types for tax calculation
export interface IncomeDetails {
  salaryIncome: number;
  businessIncome: number;
  capitalGains: number;
  housePropertyIncome: number;
  otherIncome: number;
}

export interface DeductionDetails {
  section80C: number;
  section80D: number;
  hra: number;
  lta: number;
  nps: number;
  homeLoanInterest: number;
  otherDeductions: number;
}

export interface TaxResult {
  totalIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  incomeTax: number;
  surcharge: number;
  cess: number;
  totalTaxLiability: number;
}

/**
 * Calculate total income from all sources
 */
export const calculateTotalIncome = (income: IncomeDetails): number => {
  return (
    income.salaryIncome +
    income.businessIncome +
    income.capitalGains +
    income.housePropertyIncome +
    income.otherIncome
  );
};

/**
 * Calculate total eligible deductions (for old regime)
 */
export const calculateTotalDeductions = (deductions: DeductionDetails): number => {
  return (
    50000 + // Standard Deduction for Salaried Employees (Old Regime)
    Math.min(deductions.section80C, 150000) +
    Math.min(deductions.section80D, 50000) +
    deductions.hra +
    Math.min(deductions.lta, 50000) +
    Math.min(deductions.nps, 50000) +
    Math.min(deductions.homeLoanInterest, 200000) +
    deductions.otherDeductions
  );
};

/**
 * Calculate tax based on old regime slabs for FY 2024-2025
 */
export const calculateOldRegimeTax = (taxableIncome: number): number => {
  let tax = 0;

  if (taxableIncome <= 250000) {
    tax = 0;
  } else if (taxableIncome <= 500000) {
    tax = (taxableIncome - 250000) * 0.05;
  } else if (taxableIncome <= 1000000) {
    tax = 12500 + (taxableIncome - 500000) * 0.2;
  } else {
    tax = 112500 + (taxableIncome - 1000000) * 0.3;
  }

  return tax;
};

/**
 * Calculate tax based on new regime slabs for FY 2024-2025
 */
export const calculateNewRegimeTax = (taxableIncome: number): number => {
  let tax = 0;

  // New Tax Slab FY 2024-25 (Final Budget)
  if (taxableIncome <= 300000) {
    tax = 0;
  } else if (taxableIncome <= 700000) {
    tax = (taxableIncome - 300000) * 0.05;
  } else if (taxableIncome <= 1000000) {
    tax = 20000 + (taxableIncome - 700000) * 0.1;
  } else if (taxableIncome <= 1200000) {
    tax = 50000 + (taxableIncome - 1000000) * 0.15;
  } else if (taxableIncome <= 1500000) {
    tax = 80000 + (taxableIncome - 1200000) * 0.2;
  } else {
    tax = 140000 + (taxableIncome - 1500000) * 0.3;
  }

  // Section 87A Rebate for New Regime: Up to 7 Lakhs (Income after Std Deduction)
  if (taxableIncome <= 700000) {
    tax = 0;
  }

  return tax;
};

/**
 * Calculate surcharge based on income level
 */
export const calculateSurcharge = (tax: number, taxableIncome: number): number => {
  if (taxableIncome <= 5000000) return 0;
  if (taxableIncome <= 10000000) return tax * 0.1;
  if (taxableIncome <= 20000000) return tax * 0.15;
  if (taxableIncome <= 50000000) return tax * 0.25;
  return tax * 0.37;
};

/**
 * Calculate health and education cess (4% for FY 2024-2025)
 */
export const calculateCess = (tax: number, surcharge: number): number => {
  return (tax + surcharge) * 0.04;
};

/**
 * Main function to calculate complete tax liability
 */
export const calculateTaxLiability = (
  income: IncomeDetails,
  deductions: DeductionDetails,
  regime: 'old' | 'new'
): TaxResult => {
  const totalIncome = calculateTotalIncome(income);

  // Standard Deduction: ₹50,000 for Old Regime, ₹75,000 for New Regime (FY 24-25 Final)
  const standardDeduction = regime === 'old' ? 50000 : 75000;

  const totalDeductions = regime === 'old' ? calculateTotalDeductions(deductions) : standardDeduction;
  const taxableIncome = Math.max(totalIncome - totalDeductions, 0);

  const incomeTax = regime === 'old'
    ? calculateOldRegimeTax(taxableIncome)
    : calculateNewRegimeTax(taxableIncome);

  const surcharge = calculateSurcharge(incomeTax, taxableIncome);
  const cess = calculateCess(incomeTax, surcharge);
  const totalTaxLiability = incomeTax + surcharge + cess;

  return {
    totalIncome,
    totalDeductions,
    taxableIncome,
    incomeTax,
    surcharge,
    cess,
    totalTaxLiability
  };
};

/**
 * Calculate tax savings between old and new regime
 */
export const calculateTaxSavings = (
  income: IncomeDetails,
  deductions: DeductionDetails
): { oldRegimeTax: number; newRegimeTax: number; savings: number; betterRegime: 'old' | 'new' } => {
  const oldRegimeResult = calculateTaxLiability(income, deductions, 'old');
  const newRegimeResult = calculateTaxLiability(income, deductions, 'new');

  const oldRegimeTax = oldRegimeResult.totalTaxLiability;
  const newRegimeTax = newRegimeResult.totalTaxLiability;
  const savings = Math.abs(oldRegimeTax - newRegimeTax);
  const betterRegime = oldRegimeTax <= newRegimeTax ? 'old' : 'new';

  return {
    oldRegimeTax,
    newRegimeTax,
    savings,
    betterRegime
  };
};
