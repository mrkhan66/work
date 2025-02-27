import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EMIBreakdown } from "../lib/calculator";

interface EMIBreakdownProps {
  breakdown: EMIBreakdown;
  tenure: number;
}

export function EMIBreakdownDisplay({ breakdown, tenure }: EMIBreakdownProps) {
  const formattedTenure = Number.isInteger(tenure) ? 
    `${tenure} year${tenure > 1 ? 's' : ''}` : 
    `${tenure * 12} months`;

  return (
    <Card className="transform transition-all hover:scale-[1.02]">
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-xl">EMI Breakdown for {formattedTenure}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-primary/5 rounded-lg">
              <p className="text-sm text-muted-foreground">Monthly EMI</p>
              <p className="text-2xl font-bold text-primary">₹{breakdown.monthlyEMI.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold text-primary">₹{breakdown.totalAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Principal per month</span>
              <span className="font-semibold">₹{breakdown.principalPerMonth.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Interest per month</span>
              <span className="font-semibold">₹{breakdown.interestPerMonth.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Total Interest</span>
              <span className="font-bold text-primary">₹{breakdown.totalInterest.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}