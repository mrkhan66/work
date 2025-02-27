import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/calculate-loan", async (req, res) => {
    try {
      const { principal, annualRate, termYears } = req.body;
      
      // Validate inputs
      if (!principal || !annualRate || !termYears) {
        res.status(400).json({ message: "Missing required parameters" });
        return;
      }
      
      // Convert annual rate to monthly rate
      const monthlyRate = (annualRate / 100) / 12;
      const totalPayments = termYears * 12;
      
      // Calculate monthly payment using loan amortization formula
      const monthlyPayment = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
      
      // Calculate total payment and interest
      const totalPayment = monthlyPayment * totalPayments;
      const totalInterest = totalPayment - principal;
      
      res.json({
        monthlyPayment: Math.round(monthlyPayment * 100) / 100,
        totalPayment: Math.round(totalPayment * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100
      });
    } catch (error) {
      res.status(500).json({ message: "Error calculating loan details" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
