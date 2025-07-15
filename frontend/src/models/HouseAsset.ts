import { GraphDataSet, TableDataSet } from "../types/Types";
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

  }

  private calculateMonthlyPayment(): number {
    const r = this.interestRateMonthly;
    const n = this.months;
    const P = this.residualMortgage;
    return P * r / (1 - Math.pow(1 + r, -n));
  }

  getGraphData(): GraphDataSet {
    const data = [];
    let interestRateDec = this.interestRatePa / 100;

    let interestPayment = (interestRateDec / 12) * (this.residualMortgage - this.offsetAccountBalance);
    let principalPayment = this.mortgagePayment - interestPayment;

    for (let period = 0; period <= this.months; period++) {
      if (period === 0) {
        data.push({ period: period, value: this.initialValue });
      }
      else {
        this.assetValue = this.assetValue * this.growthRateMonthly;
        this.principalPaid += principalPayment;
        this.propertyValueOwned = this.assetValue - this.residualMortgage + principalPayment;
        data.push({ period: period, value: this.propertyValueOwned });
      }
    }

    return {
      label: this.name,
      color: this.color,
      data: data,
    };
  }

  // TODO
  getTableData(): TableDataSet {
    return {
      label: this.name,
      color: this.color,
      data: []
    };
  }
}
