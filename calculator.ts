export interface EMIBreakdown {
  monthlyEMI: number;
  totalInterest: number;
  totalAmount: number;
  principalPerMonth: number;
  interestPerMonth: number;
}

export function calculateEMI(
  principal: number,
  interestRate: number,
  tenure: number
): EMIBreakdown {
  // Calculate yearly interest
  const yearlyInterest = principal * (interestRate / 100);

  // Calculate total amount (principal + yearly interest * tenure)
  const totalInterest = yearlyInterest * tenure;
  const totalAmount = principal + totalInterest;

  // Calculate monthly EMI
  const monthlyEMI = totalAmount / (tenure * 12);

  return {
    monthlyEMI: Math.round(monthlyEMI),
    totalInterest: Math.round(totalInterest),
    totalAmount: Math.round(totalAmount),
    principalPerMonth: Math.round(principal / (tenure * 12)),
    interestPerMonth: Math.round(totalInterest / (tenure * 12))
  };
}