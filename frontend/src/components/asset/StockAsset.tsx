import { DataSet } from "../../types/Types";
import { AssetInput } from "./AssetInput";
import { AssetModel } from "./AssetModel";

export class StockAsset extends AssetModel {
    calculate(input: AssetInput): DataSet {
        const { name, deposit, growthRatePa, years, color } = input;
        const data = [];

        let growthRateDecimal = growthRatePa / 100;
        let growthRatePm = growthRateDecimal / 12;

        let value = deposit;

        let months = years * 12;

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
            label: name || "Stock",
            color: color || '#dd4477',
            data,
        };
    }
}
