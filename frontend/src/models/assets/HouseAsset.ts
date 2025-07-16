import { GraphDataSet } from "../datasets/GraphDataSet";
import { TableDataSet } from "../datasets/TableDataSet";
import { Asset } from "./Asset";

interface HouseAssetProps {
  name: string | null;
  color: string | null;
  purchasePrice: number;
  deposit: number;
  interestRatePa: number;       // Annual interest rate (%)
  growthRatePa: number;         // Annual property growth rate (%)
  offsetAccountBalance: number; // Starting offset balance
  years: number;                // Mortgage duration
}

interface PeriodData {
  period: number;
  mortgagePayment: number;
  principal: number;
  interest: number;
  totalAssetValue: number;
  principalPaid: number;
  propertyValueOwned: number;
}

export class HouseAsset implements Asset {
  name: string;
  color: string;
  purchasePrice: number;
  initialValue: number;
  interestRatePa: number;
  growthRatePa: number;
  offsetAccountBalance: number;
  years: number;

  interestRateMonthly: number;
  growthRateMonthly: number;
  residualMortgage: number;
  months: number;
  mortgagePayment: number;
  principalPaid: number = 0;
  propertyValueOwned: number;
  assetValue: number;

  // Pre-calculated data for all periods
  private periodData: PeriodData[];

  constructor(props: HouseAssetProps) {
    this.name = props.name || "House";
    this.color = props.color || '#2069c8ff';
    this.purchasePrice = props.purchasePrice;
    this.initialValue = props.deposit;
    this.interestRatePa = props.interestRatePa;
    this.growthRatePa = props.growthRatePa;
    this.offsetAccountBalance = props.offsetAccountBalance;
    this.years = props.years;

    this.interestRateMonthly = this.interestRatePa / 100 / 12;
    this.growthRateMonthly = Math.pow(1 + this.growthRatePa / 100, 1 / 12);
    this.residualMortgage = this.purchasePrice - this.initialValue;
    this.months = this.years * 12;

    this.mortgagePayment = this.calculateMonthlyPayment();
    this.propertyValueOwned = this.initialValue;
    this.assetValue = this.purchasePrice;

    // Calculate all period data at construction
    this.periodData = this.calculateAllPeriodData();
  }

  private calculateMonthlyPayment(): number {
    const r = this.interestRateMonthly;
    const n = this.months;
    const P = this.residualMortgage;
    return P * r / (1 - Math.pow(1 + r, -n));
  }

  private calculateAllPeriodData(): PeriodData[] {
    const data: PeriodData[] = [];
    let currentPropertyValue = this.purchasePrice;
    let remainingBalance = this.residualMortgage;
    let cumulativePrincipalPaid = 0;

    for (let period = 0; period <= this.months; period++) {
      if (period === 0) {
        // Initial period
        data.push({
          period: period,
          mortgagePayment: 0,
          principal: 0,
          interest: 0,
          totalAssetValue: this.purchasePrice,
          principalPaid: 0,
          propertyValueOwned: this.initialValue
        });
      } else {
        // Calculate current property value with growth
        currentPropertyValue = currentPropertyValue * this.growthRateMonthly;
        
        // Calculate interest and principal payments
        const effectiveBalance = Math.max(0, remainingBalance - this.offsetAccountBalance);
        const interestPayment = effectiveBalance * this.interestRateMonthly;
        const principalPayment = remainingBalance > 0 ? this.mortgagePayment - interestPayment : 0;
        
        // Update balances
        remainingBalance = Math.max(0, remainingBalance - principalPayment);
        cumulativePrincipalPaid += principalPayment;
        
        // Calculate property value owned (total property value minus remaining mortgage)
        const propertyValueOwned = currentPropertyValue - remainingBalance;
        
        data.push({
          period: period,
          mortgagePayment: remainingBalance > 0 || period === 1 ? this.mortgagePayment : 0,
          principal: principalPayment,
          interest: interestPayment,
          totalAssetValue: currentPropertyValue,
          principalPaid: cumulativePrincipalPaid,
          propertyValueOwned: propertyValueOwned
        });
      }
    }

    return data;
  }

  getGraphData(): GraphDataSet {
    // Extract only period and propertyValueOwned for graph display
    const graphData = this.periodData.map(period => ({
      period: period.period,
      value: period.propertyValueOwned
    }));

    return {
      label: this.name,
      color: this.color,
      data: graphData,
    };
  }

  getTableData(): PeriodData[] {
    // Return all calculated period data for table display
    return this.periodData;
  }

  // Helper method to get specific data if needed
  getPeriodData(period: number): PeriodData | undefined {
    return this.periodData.find(p => p.period === period);
  }

  // Helper method to get data for a range of periods
  getPeriodDataRange(startPeriod: number, endPeriod: number): PeriodData[] {
    return this.periodData.filter(p => p.period >= startPeriod && p.period <= endPeriod);
  }
}