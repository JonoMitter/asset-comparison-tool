import { GraphDataSet } from "../datasets/GraphDataSet";
import { PeriodData } from "../datasets/PeriodData";
import { TableDataSet } from "../datasets/TableDataSet";
import { Asset } from "./Asset";

interface StockAssetProps {
    name: string | null;
    color: string | null;
    deposit: number;
    growthRatePa: number;         // Annual property growth rate (%)
    years: number;                // Mortgage duration
    brokerageCost: number;
}

export class StockAsset implements Asset {
    name: string;
    color: string;
    deposit: number;
    growthRatePa: number;
    years: number;
    months: number;
    brokerageCost: number;

    constructor(props: StockAssetProps) {
        this.name = props.name || "Stock";
        this.color = props.color || '#dd4477';
        this.deposit = props.deposit;
        this.growthRatePa = props.growthRatePa;
        this.years = props.years;
        this.brokerageCost = props.brokerageCost
        this.months = this.years * 12;
    }

    getGraphData(): GraphDataSet {
        const data = [];

        let growthRateDecimal = this.growthRatePa / 100;
        let growthRatePm = growthRateDecimal / 12;

        let months = this.years * 12;
        let value = this.deposit;

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
    getTableData(): PeriodData[] {
        return [];
    }
}
