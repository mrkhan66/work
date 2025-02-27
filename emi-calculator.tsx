import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { BikeSelector } from "./bike-selector";
import { EMIBreakdownDisplay } from "./emi-breakdown";
import { calculateEMI } from "../lib/calculator";
import type { Bike } from "@shared/schema";

export function EMICalculator() {
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [customMRP, setCustomMRP] = useState<number>(0);
  const [schemeAmount, setSchemeAmount] = useState<number>(0);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(10);

  // When a bike is selected, initialize the custom MRP
  const handleBikeSelect = (bike: Bike) => {
    setSelectedBike(bike);
    setCustomMRP(bike.price);
    setSchemeAmount(0);
    setDownPayment(0);
  };

  const totalMRP = customMRP + schemeAmount;
  const loanAmount = totalMRP - downPayment;

  const breakdowns = [1, 2, 2.5, 3].map(tenure =>
    calculateEMI(loanAmount, interestRate, tenure)
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        Bike Loan EMI Calculator
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <BikeSelector
            selectedBike={selectedBike}
            onBikeSelect={handleBikeSelect}
          />

          {selectedBike && (
            <Card>
              <CardHeader>
                <CardTitle>Price & Loan Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>MRP (₹)</Label>
                  <Input
                    type="number"
                    value={customMRP}
                    onChange={(e) => setCustomMRP(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Scheme Amount (₹)</Label>
                  <Input
                    type="number"
                    value={schemeAmount}
                    onChange={(e) => setSchemeAmount(Number(e.target.value))}
                    className="mt-2"
                    placeholder="Enter additional scheme amount"
                  />
                </div>

                <div>
                  <Label>Total Price: ₹{totalMRP.toLocaleString()}</Label>
                </div>

                <div>
                  <Label>Down Payment</Label>
                  <div className="flex gap-4 items-center">
                    <Slider
                      value={[downPayment]}
                      onValueChange={([value]) => setDownPayment(value)}
                      max={totalMRP}
                      step={1000}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-32"
                    />
                  </div>
                </div>

                <div>
                  <Label>Interest Rate (%)</Label>
                  <div className="flex gap-4 items-center">
                    <Slider
                      value={[interestRate]}
                      onValueChange={([value]) => setInterestRate(value)}
                      max={20}
                      step={0.5}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-32"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Label className="text-lg font-semibold">Loan Amount</Label>
                  <p className="text-3xl font-bold mt-2 text-primary">
                    ₹{loanAmount.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {selectedBike && breakdowns.map((breakdown, index) => (
            <EMIBreakdownDisplay
              key={index}
              breakdown={breakdown}
              tenure={[1, 2, 2.5, 3][index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}