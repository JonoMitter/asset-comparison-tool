import { DataSet } from "../../types/Types";
import { AssetInput } from "./AssetInput";
import { AssetModel } from "./AssetModel";

export class StockAsset extends AssetModel {
  calculate(input: AssetInput): DataSet {
    const { name, deposit, growthRatePa, years, color } = input;
    const data = [];
    let value = deposit;

    let months = years * 12;
    let growthRatePm = growthRatePa / 12;

    for (let i = 0; i <= months; i++) {
        if(i === 0){
            data.push({ period: i, value });
        }
        else{
            value = value * (1 + growthRatePm)
            data.push({ period: i, value });
        }
    }

    return {
      label: name || "Stock",
      color: color || '#dd4477',
      data,
    };
  }
}
