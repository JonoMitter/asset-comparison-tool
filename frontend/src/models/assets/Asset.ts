import { GraphDataSet } from "../datasets/GraphDataSet";
import { PeriodData } from "../datasets/PeriodData";
import { TableDataSet } from "../datasets/TableDataSet";


export interface Asset {
    name: string;
    color: string;

    initialValue: number;
    growthRatePa: number;
    years: number;

    getGraphData(): GraphDataSet;
    getTableData(): PeriodData[];
}