import { GraphDataSet, TableDataSet } from "../types/Types";

export interface Asset {
    name: string;
    color: string;

    initialValue: number;
    growthRatePa: number;
    years: number;

    getGraphData(): GraphDataSet;
    getTableData(): TableDataSet;
}