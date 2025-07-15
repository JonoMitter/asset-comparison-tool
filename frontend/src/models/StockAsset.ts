import { GraphDataSet, TableDataSet } from "../types/Types";
import { Asset } from "./Asset";

interface StockAssetProps {
    name: string | null;
    color: string | null;
    purchasePrice: number;
    deposit: number;
    interestRatePa: number;       // Annual interest rate (%)
    growthRatePa: number;         // Annual property growth rate (%)
    offsetAccountBalance: number; // Starting offset balance
    years: number;                // Mortgage duration
}

export class StockAsset implements Asset {
    name: string;
    color: string;
    initialValue: number;
    growthRatePa: number;
    years: number;
    months: number;

    constructor(props: StockAssetProps) {
        this.name = props.name || "Stock";
        this.color = props.color || '#dd4477';
        this.initialValue = props.deposit;
        this.growthRatePa = props.growthRatePa;
        this.years = props.years;
        this.months = this.years * 12;
    }

    getGraphData(): GraphDataSet {
        const data = [];

        let growthRateDecimal = this.growthRatePa / 100;
        let growthRatePm = growthRateDecimal / 12;

        let months = this.years * 12;
        let value = this.initialValue;

        for (let month = 0; month <= months; month++) {
            if (month === 0) {
                data.push({ period: month, value: value });
            }
            else {
                value = value * (1 + growthRatePm)
                data.push({ period: month, value: value });
            }
        }

        return {
            label: this.name,
            color: this.color,
            data,
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
